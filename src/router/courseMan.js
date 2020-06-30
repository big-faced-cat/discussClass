import Content from "../components/Content"

/**
 * 课程管理
 */
module.exports = {
    path: "courseMan",
    name: "courseMan",
    component: Content,
    children: [
        {
            path: "",
            redirect: {
                name: "courseManList"
            }
        },
        {
            path: "list",
            name: "courseManList",
            component: () => import('../views/courseMan/courseManList.vue'),
        },
        {
            path: "/courseManDiscuss/:id",
            name: "courseManDiscuss",
            component: () => import('../views/courseMan/courseManDiscuss.vue'),
        }
    ]
};
