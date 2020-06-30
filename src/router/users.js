import Content from "../components/Content"

/**
 * 用户管理
 */
module.exports = {
    path: "users",
    name: "users",
    component: Content,
    children: [
        {
            path:"",
            redirect:{
                name:"usersList"
            }
        },
        {
            path: "list",
            name: "usersList",
            component: () => import('../views/users/usersList.vue'),
        }
    ]
};