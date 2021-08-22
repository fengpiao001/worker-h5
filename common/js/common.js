axios.defaults.withCredentials=true;
/**
 * ajax请求
 */
function MyAjax(){
    /**
     * get请求
     * @param {*} url 
     * @param {*} paramsInfo 
     * @param {*} callBackFun 
     */
    this.get = function (url,paramsInfo,callBackFun){
        axios.get(url,{
            withCredentials:true,
            crossDomain: true,
            params : paramsInfo,
            timeout:5000
        }).then(res=>{
            if(res.data === undefined || res.data === null){
                Toast('系统异常');
            }else if(res.data.code != 0){
                if(res.data.code == 600 || res.data.code == 601){
                    Toast('登陆已失效');
                }else{
                    Toast(res.data.message);
                }
            }else{
                callBackFun(res.data);
            }
        });
        
    }

    /**
     * post请求
     * @param {*} url 
     * @param {*} paramsInfo 
     * @param {*} callBackFun 
     */
    this.post = function (url,paramsInfo,callBackFun){
        axios.post(url,paramsInfo).then(res=>{
            if(res.data === undefined || res.data === null){
                Toast('系统异常');
            }else if(res.data.code != 0){
                if(res.data.code == 600 || res.data.code == 601){
                    Toast('登陆已失效');
                }else{
                    Toast(res.data.message);
                }
            }else{
                callBackFun(res.data);
            }
        });
        
    }
};

var myAjax = new MyAjax();

var SESSION_TOKEN = '0657a03e25788caeccad5b69f3dd812f';

var BASE_URL = 'http://81.68.102.150/api';


/**
 * 获取url参数
 * @param {} key 
 * @returns 
 */
function getParameter(key){
    var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == key){return pair[1];}
       }
       return null;
}


//提示信息 封装
function Toast(msg,duration){  
    duration=isNaN(duration)?3000:duration;  
    var m = document.createElement('div');  
    m.innerHTML = msg;  
    m.style.cssText="font-size: 14px;color: rgb(255, 255, 255);background-color: rgba(0, 0, 0, 0.6);padding: 10px 15px;margin: 0 0 0 -60px;border-radius: 4px;position: fixed;    top: 50%;left: 50%;width: 130px;text-align: center;";
    document.body.appendChild(m);  
    setTimeout(function() {  
        var d = 0.5;
        m.style.opacity = '0';  
        setTimeout(function() { document.body.removeChild(m) }, d * 1000);  
    }, duration);  
}  
