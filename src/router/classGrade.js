import Content from "../components/Content"

/**
 * 用户管理
 */
module.exports = {
    path: "classGrade",
    name: "classGrade",
    component: Content,
    children: [
        {
            path:"",
            redirect:{
                name:"classGradeList"
            }
        },
        {
            path: "list",
            name: "classGradeList",
            component: () => import('../views/classGrade/classGradeList.vue'),
        }
    ]
};