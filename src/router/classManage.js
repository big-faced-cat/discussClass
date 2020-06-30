import Content from "../components/Content"

/**
 * 班级管理
 */
module.exports = {
    path: "classManage",
    name: "classManage",
    component: Content,
    children: [
        {
            path:"",
            redirect:{
                name:"classManageList"
            }
        },
        {
            path: "list",
            name: "classManageList",
            component: () => import('../views/classManage/classManageList.vue'),
        }
    ]
};
