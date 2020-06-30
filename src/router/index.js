import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'

import Content from "../components/Content"
import classEval from "./classEval.js"
import stuEvalFollow from "./stuEvalFollow.js"
import dataBase from "./dataBase.js"
import students from "./students.js"
import teachers from "./teachers.js"
import courseMan from "./courseMan.js"
import users from "./users.js"
import classGrade from './classGrade.js'
import camera from './camera.js'
import school from './school.js'
import classroom from './classroom.js'
import myclass from './myclass.js'
import patolClass from './patolClass.js'
import comprehensiveQuery from './comprehensiveQuery.js'
import abnormalClass from './abnormalClass.js'
import userRole from './userRole.js'
import attendance from './attendance.js'
import openClass from './openClass.js'
import loginPwd from './loginPwd'

// 班级管理
import classManage from './classManage.js'






import store from "../vuex/store"

Vue.use(Router);
const router = new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            redirect: "/login"
        },
        {
            path: "/login",
            name: "Login",
            component: () => import('@/views/Login')
        },
        {
            path: "/sys",
            name: "Layout",
            meta: { requiresAuth: true },
            component: () => import('@/views/Layout'),
            children: [
                openClass,
                attendance,
                classEval,
                stuEvalFollow,
                dataBase,
                students,
                courseMan,
                users,
                classGrade,
                camera,
                school,
                classroom,
                myclass,
                teachers,
                patolClass,
                comprehensiveQuery,
                abnormalClass,
                 userRole,
                school,
                classManage,
                loginPwd
            ]
        },
        {
            path: "/*",
            redirect: "/login"
        }
    ],
});
//路由守卫
// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//         // this route requires auth, check if logged in
//         // if not, redirect to login page.
//         if (!store.state.user) {
//             next({
//                 path: '/login',
//             })
//         } else {
//             next()
//         }
//     } else {
//         next() // 确保一定要调用 next()
//     }
// })
export default router
