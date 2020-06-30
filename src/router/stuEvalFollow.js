import Content from "../components/Content"

/**
 * 学生评价跟踪
 */
module.exports = {
    path: "stuEvalFollow",
    name: "stuEvalFollow",
    component: Content,
    children: [
        {
            path: "",
            redirect:{name:"stuEvalFollowList"}
        },
        {
            path: "list",
            name: "stuEvalFollowList",
            component: () => import('../views/stuEvalFollow/stuEvalFollowList.vue'),
        }
    ]
};