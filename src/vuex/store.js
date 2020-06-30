import Vue from 'vue'
import Vuex from 'vuex'
import utils from "../utils.js"
Vue.use(utils);

Vue.use(Vuex);

import A from "./modules/A.js"

const store = new Vuex.Store({
    state: {
        user: storage.get("user"),
        token: storage.get("token"),
        fontSize: 12, //当前窗体rem大小
        windowWidth: 1200,//当前窗体宽度
        windowHeight: 768//当前窗体高度
    },
    mutations: {
        powerA( state, arg) {
            storage.set("power",arg);
            state.power = arg;
        },
        userA(state, arg){
            storage.set("user",arg);
            state.user = arg;
        },
        tokenA(state,arg){
            storage.set("token",arg);
            state.token = arg;
        },
        fontSizeA(state, size) {
            state.fontSize = size
        },
        windowWidthA(state, arg) {
            state.windowWidth = arg;
        },
        windowHeightA(state, arg) {
            state.windowHeight = arg;
        }
    },

    modules: {
        A
    }
})

export default store