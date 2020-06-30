import Content from "../components/Content"

/**
 * 学校管理
 */
module.exports = {
    path: "classroom",
    name: "classroom",
    component: Content,
    children: [
        {
            path:"",
            redirect:{
                name:"classroomList"
            }
        },
        {
            path: "list",
            name: "classroomList",
            component: () => import('../views/classroom/classroomList'),
        }
    ]
};
