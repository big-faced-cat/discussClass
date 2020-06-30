import axios from 'axios';
import router from "vue-router"
import app from './main'

const service = axios.create({
    baseURL: url_prefix,  // api的base_url
    timeout: 50000  // 请求超时时间
});
/****** request拦截器==>对请求参数做处理 ******/
service.interceptors.request.use(
    config => {
        config.loading = app.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
            customClass: "s01_vue_loading"
        });
        const xToken = getToken();
        if (xToken !== null) {
            config.headers['Authorization'] = xToken
        }
        config.sb = 123;
        return config
    }, function (error) {
        return Promise.reject(error)
    }
);


service.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误

        if (response.status === 200) {
            response.config.loading.close();
            return Promise.resolve(response);
        } else {
            response.config.loading.close();
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是2开头的的情况
    // 这里可以跟你们的后台开发人员协商好统一的错误状态码
    // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    // 下面列举几个常见的操作，其他需求可自行扩展
    error => {
        error.config.loading.close();
        if (error.response.status) {
            if (/^5.*/.test(error.response.status)) {
                app.$notify.error({
                    title: '错误',
                    message: '服务器错误'
                });
            }
            if (/^403.*/.test(error.response.status)) {
                app.$notify.error({
                    title: '错误',
                    message: '用户没有授权'
                });
            } else {
                if (/^4.*/.test(error.response.status)) {
                    app.$notify.error({
                        title: '错误',
                        message: error.response.data.message
                    });
                }
            }
            return Promise.reject(error.response);
        }
    }
);
// service.interceptors.response.use((res) => {
//     console.log('进入测试统一页面', res);
//     res.config.loading.close();
//     // token 已过期，重定向到登录页面
//     if (res.config.method === 'post') {
//         res.config.headers.contentType = "application/json"
//     }
//
//     if (res.status === 200) {
//         if (res.data.content === false) {
//             app.$notify.error({
//                 title: '错误',
//                 // message: res.data.message ? res.data.message : "请求接口执行异常"
//                 message: "请求接口执行异常"
//             });
//         }
//     } else if (/^5.*/.test(res.status)) {
//         console.log('进入500状态');
//         app.$notify.error({
//             title: '错误',
//             // message: res.data.message ? res.data.message : "请求接口出现未知错误"
//             message: "服务端错误"
//         });
//
//     } else if (/^4.*/.test(res.status)) {
//         console.log('进入400状态');
//         app.$notify.error({
//             title: '错误',
//             // message: res.data.message ? res.data.message : "请求接口出现未知错误"
//             message:  res.data.message
//         });
//     }
//     else if (res.data.message != null) {
//         console.log('进入400状态');
//         app.$notify.error({
//             title: '错误',
//             // message: res.data.message ? res.data.message : "请求接口出现未知错误"
//             message:  res.data.message
//         });
//     }
//     return res
// }, function (error) {
//     error.config.loading.close();
//     console.log('rrrrrrrrrrrrrrrrrr',error);
//     if (error.code == "ECONNABORTED") {
//         console.log('进入ECONNABORTED状态');
//         app.$notify.error({
//             title: '错误',
//             duration: 5000,
//             message: "请求超时"
//         });
//     } else {
//         if (/^4.*/.test(error.code)) {
//             console.log('进入400状态码');
//             app.$notify.error({
//                 title: '错误',
//                 // message: res.data.message ? res.data.message : "请求接口出现未知错误"
//                 message:  res.data.message
//             });
//         }
//
//         // app.$notify.error({
//         //     title: '错误',
//         //     duration: 5000,
//         //     message: "请求后台出现未知错误"
//         // });
//     }
//     return Promise.reject(error)
// });
export default service
