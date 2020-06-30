import Content from "../components/Content"

/**
 * 学生管理
 */
module.exports = {
    path: "students",
    name: "students",
    component: Content,
    children: [
        {
            path: "/",
            redirect: {
                name: "studentsList"
            }
        },
        {
            path: "list",
            name: "studentsList",
            component: () => import('../views/students/studentsList.vue'),
        }
    ]
};