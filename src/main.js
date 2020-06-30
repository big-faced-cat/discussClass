// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueBus from 'vue-bus';


import router from './router'
import '../static/iconfont/iconfont.css'

import "babel-polyfill";


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VueBus);
Vue.use(ElementUI);
//Swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'
import 'video.js/dist/video-js.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */)


import store from "./vuex/store"

Vue.config.productionTip = false
/* eslint-disable no-new */

// 去除搜索字段的空格和特殊字符
Vue.prototype.removeSpecialCharacter = function(inputString){
    if(inputString != ""){
        let pattern=/[`~!@#$^&*()=|{}':;',\\\[\]\.<>\/?~！@#￥……&*（）——|{}【】'；：""'。，、？\s]/g;
        return  inputString.replace(pattern,"")
    }
}

Vue.prototype.numberVail = function(inputString){
    if(inputString != ""){
        var reg=/^(([a-z]+[0-9]+)|([0-9]+[a-z]+))[a-z0-9]*$/i;
        return /^(([a-z]+[0-9]+)|([0-9]+[a-z]+))[a-z0-9]*$/i.test(inputString);
    }
}



export default new Vue({
    el: '#app',
    data() {
        return {
            TIMEOUT: null
        }
    },
    router,
    store,
    components: {App},
    template: '<App/>',
    created() {
        this.windowResize();
    },
    methods: {
        /**
         * 计算body尺寸
         */
        windowResize() {
            var $body = $("body");

            var winWidth, winHeight, fontSize;
// 获取窗口宽度
            if (window.innerWidth)
                winWidth = window.innerWidth;
            else if ((document.body) && (document.body.clientWidth))
                winWidth = document.body.clientWidth;
// 获取窗口高度
            if (window.innerHeight)
                winHeight = window.innerHeight;
            else if ((document.body) && (document.body.clientHeight))
                winHeight = document.body.clientHeight;
// 通过深入 Document 内部对 body 进行检测，获取窗口大小
//             if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
//                 winHeight = document.documentElement.clientHeight;
//                 winWidth = document.documentElement.clientWidth;
//             }
            this.$store.commit("windowWidthA", winWidth);
            this.$store.commit("windowHeightA", winHeight);

            // fontSize=winWidth<480?12:winWidth<1600?(winWidth*12/480):(1600*12/480);
            // console.log(fontSize);
            // $("html,body").css("fontSize",fontSize);
            //body字体大小
            // this.$store.commit("fontSizeA", fontSize)
        }
    },
    mounted() {
        var _self = this;
        //body字体大小
        this.$store.commit("fontSizeA", parseInt($("body").css("fontSize")))
        //窗口大小变化时 刷新页面
        $(window).on('resize', function () {
            if (_self.TIMEOUT) {
                clearTimeout(_self.TIMEOUT)
            }
            _self.TIMEOUT = setTimeout(function () {

                _self.windowResize();
                // location.reload();
                BUS.$emit("resize");
            }, 1)
        })

    }
});
