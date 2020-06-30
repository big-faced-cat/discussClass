import Content from "../components/Content"
/**
 * 课堂评价
 */
module.exports = {
    path: "classEval",
    name: "classEval",
    component: Content,
    children: [
        {
            path: "",
            redirect: {
                name: "classEvalList"
            }
        },
        {
            path: "list",
            name: "classEvalList",
            component: () => import('../views/keTangPingJia/keTangPingJiaList.vue'),
            meta: {requiresAuth: true},
        },
        {
            path: "ckcl",
            name: "classEvalView",
            component: () => import('../views/keTangPingJia/keTangPingJiaView.vue'),
        },
        {
            path: "stuEvuList",
            name: "stuEvuList",
            component: () => import('../views/keTangPingJia/stuEvuList.vue'),
        },
        {
            path: "stuEvuView",
            name: "stuEvuView",
            component: () => import('../views/keTangPingJia/stuEvuView.vue'),
        },
        {
            path: "keTangDuiBi",
            name: "keTangDuiBi",
            component: () => import("../views/keTangPingJia/keTangDuiBi.vue")
        },
        {
            path: "StudentsDuiBi",
            name: "StudentsDuiBi",
            component: () => import("../views/keTangPingJia/StudentsDuiBi.vue")
        }
    ]
};