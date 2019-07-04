import axios from 'axios';
import qs from 'qs'

export var baseUrl: string = "http://zxjy.jjzszy688.com";

export var imageUrl: string = "http://zxjy.jjzszy688.com/";

axios.interceptors.request.use((config: any): any => {
    console.log(`${config.url}?${config.data}`);
    return config;
}, (error: any) => {
    return Promise.reject(error);
});

export var $http = {
    post(context: any, url: string, data: any = {}) {
        return new Promise(((resolve, reject) => {
            if (localStorage.getItem('token')) {
                data.token = localStorage.getItem('token');
            }
            axios.post(`${baseUrl}/${url}`, qs.stringify(data, {arrayFormat: 'indices'}))
                .then(response => {
                    if (response.status == 200) {
                        console.log(response.data);
                        if (response.data.status === 1) {
                            context.$router.replace({path: '/login'});
                            resolve({status: 201, msg: '请登录'});
                        } else {
                            resolve(response.data);
                        }
                    } else {
                        reject(response.statusText);
                    }
                }).catch(error => {
                    alert('系统繁忙');
                    reject(error);
                });
        }));
    },
    uploadFile(context:any, files:any[] = []) {
        return new Promise((resolve, reject) => {
            let params = new FormData();
            if (localStorage.getItem('token')) {
                params.append('token', localStorage.getItem('token') as string);
            }
            for (let file of files) {
                params.append('file', file, file.name);
            }
            let config = {
                headers: {'Content-Type': 'multipart/form-data'}
            };
            axios.post(`${baseUrl}/mobile/MobileBase/upload`, params, config)
                .then(function (response) {
                    if (response.status === 200) {
                        console.log(`${baseUrl}/mobile/MobileBase/upload`);
                        console.log(response.data);
                        if (response.data.status === 1) {
                            context.$router.replace({path: '/login'});
                            resolve({status: 201, msg: '请登录'});
                        } else {
                            resolve(response.data);
                        }
                    } else {
                        reject(response.statusText);
                    }
                })
                .catch(function (error) {
                    alert('系统繁忙');

                    reject(error);
                });
        })
    }
};

export var commonUtils = {
    timestampToTime(timestamp:number,format:string):string{
        let date:Date = new Date(timestamp*1000);
        let Y:string = date.getFullYear()+"";
        let M:string = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1+"";
        let D:string = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()+"";
        let H:string = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()+"";
        let m:string = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()+"";
        let s:string = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()+"";
        format=format.indexOf('Y')>-1?format.replace('Y',Y):format;
        format=format.indexOf('M')>-1?format.replace('M',M):format;
        format=format.indexOf('D')>-1?format.replace('D',D):format;
        format=format.indexOf('H')>-1?format.replace('H',H):format;
        format=format.indexOf('m')>-1?format.replace('m',m):format;
        format=format.indexOf('s')>-1?format.replace('s',s):format;
        return format;
    },
    /**
     * 截取字符串末尾加省略号
     * @param str
     * @param length
     * @returns {string}
     */
    ellipsis(str:string, length:number):string {
        return str.length > length ? str.substring(0, length) + "..." : str;
    },
    /**
     * 获取路由query传参
     * @param router
     * @param name
     * @param defaultStr
     * @returns {string}
     */
    getQueryString(context:any,name:string,defaultStr=''):string{
        return context.$route.query[name]?context.$route.query[name]:defaultStr;
    },

    changeTab(context:any,data:any){
        let query=JSON.parse(JSON.stringify(context.$route.query));
        for (let key in data){
            query[key]=data[key];
        }
        context.$router.replace({
            name:context.$route.name,
            query:query
        })
    },
    bind(obj:any,name:string,callback:()=>void){
        if(obj.handler){
            obj.removeEventListener(name,obj.handler);
        }
        obj.handler=()=>{
            callback();
        };
        obj.addEventListener(name,obj.handler);
        console.log(obj);
    },
    unbind(obj:any,name:string){
        obj.removeEventListener(name,obj.handler);
    },
};