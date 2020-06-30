import storage from "store"
import api from "./api.js"
import moment from "moment"

const MyPlugin = {};
MyPlugin.install = function (Vue, options) {
    //缓存
    window.storage = {
        set(key, value) {
            sessionStorage.setItem(key, JSON.stringify(value))
        },
        get(key) {
            return JSON.parse(sessionStorage.getItem(key))
        },
        clear() {
            sessionStorage.clear()
        },
        removeItem(key) {
            sessionStorage.removeItem(key);
        }
    };
    window.isValidIP = function (ip) {
        var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
        return reg.test(ip);
    };
    //Token
    window.getToken = function () {
        return window.storage.get("token")
    };
    //全局广播事件
    window.BUS = new Vue();
    window.Ajax = api.Ajax;

    /**
     * UTC时间转本地
     * @param str
     */
    window.utc_local = function (str) {
        return moment.utc(str).local().format("YYYY-MM-DD HH:mm:ss")
    };

    window.utc_local_Month = function (str) {
        return moment.utc(str).local().format("YYYY-MM-DD")
    };

    /**
     * 本地转UTC时间
     * @param str
     */
    window.local_utc = function (str) {
        return moment(str).utc().format("YYYY-MM-DD HH:mm:ss")
    };

    /**
     * 中文数字转阿拉伯数字
     */
    var chnNumChar = {零: 0, 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9};
    var chnNameValue = {
        十: {value: 10, secUnit: false},
        百: {value: 100, secUnit: false},
        千: {value: 1000, secUnit: false},
        万: {value: 10000, secUnit: true},
        亿: {value: 100000000, secUnit: true}
    };
    window.ChineseToNumber = function (chnStr) {
        var rtn = 0;
        var section = 0;
        var number = 0;
        var secUnit = false;
        var str = chnStr.split('');

        for (var i = 0; i < str.length; i++) {
            var num = chnNumChar[str[i]];
            if (typeof num !== 'undefined') {
                number = num;
                if (i === str.length - 1) {
                    section += number;
                }
            } else {
                var unit = chnNameValue[str[i]].value;
                secUnit = chnNameValue[str[i]].secUnit;
                if (secUnit) {
                    section = (section + number) * unit;
                    rtn += section;
                    section = 0;
                } else {
                    section += (number * unit);
                }
                number = 0;
            }
        }
        return rtn + section;
    };
    /**
     * 进入全屏
     * @param element
     */
    window.fullScreenFun = function (element) {
        return new Promise((resolve,reject)=>{

            //此方法不可以在異步任務中執行，否則火狐無法全屏

            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {

                element.mozRequestFullScreen();

            } else if (element.msRequestFullscreen) {

                element.msRequestFullscreen();

            } else if (element.oRequestFullscreen) {

                element.oRequestFullscreen();

            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullScreen();

            } else {


                var docHtml = document.documentElement;

                var docBody = document.body;

                var videobox = document.getElementById('videobox');

                var cssText = 'width:100%;height:100%;overflow:hidden;';

                docHtml.style.cssText = cssText;

                docBody.style.cssText = cssText;

                videobox.style.cssText = cssText + ';' + 'margin:0px;padding:0px;';

            }
            resolve()
        })


    };

    //退出全屏
    function exitFullscreen() {

        if (document.exitFullscreen) {

            document.exitFullscreen();

        } else if (document.msExitFullscreen) {

            document.msExitFullscreen();

        } else if (document.mozCancelFullScreen) {

            document.mozCancelFullScreen();

        } else if (document.oRequestFullscreen) {

            document.oCancelFullScreen();

        } else if (document.webkitExitFullscreen) {

            document.webkitExitFullscreen();

        } else {

            var docHtml = document.documentElement;

            var docBody = document.body;

            var videobox = document.getElementById('videobox');

            docHtml.style.cssText = "";

            docBody.style.cssText = "";

            videobox.style.cssText = "";

            document.IsFullScreen = false;

        }

    }

    /**
     * 判断当前是否全屏
     * @returns {boolean}
     */
    window.isFullScreen=function() {
        return  !! (
            document.fullscreen ||
            document.mozFullScreen ||
            document.webkitIsFullScreen ||
            document.webkitFullScreen ||
            document.msFullScreen
        );
    }
}
export default MyPlugin