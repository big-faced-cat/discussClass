import Content from "../components/Content"

/**
 * 教师管理
 */
module.exports = {
    path: "teachers",
    name: "teachers",
    component: Content,
    children: [
        {
            path: "/",
            redirect: {
                name: "teachersList"
            }
        },
        {
            path: "list",
            name: "teachersList",
            component: () => import('../views/teachers/teachersList.vue'),
        }
    ]
};