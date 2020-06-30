import Content from "../components/Content"

/**
 * 用户管理
 */
module.exports = {
    path: "userRole",
    name: "userRole",
    component: Content,
    children: [
        {
            path:"",
            redirect:{
                name:"userRoleList"
            }
        },
        {
            path: "list",
            name: "userRoleList",
            component: () => import('../views/userRole/userRoleList.vue'),
        }
    ]
};
