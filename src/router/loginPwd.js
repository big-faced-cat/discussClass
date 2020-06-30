import Content from "../components/Content"

/**
 * 修改登录密码
 */
module.exports = {
    path: "loginPwd",
    name: "loginPwd",
    component: Content,
    children: [
        {
            path:"",
            redirect:{
                name:"loginPwdChange"
            }
        },
        {
            path: "list",
            name: "loginPwdChange",
            component: () => import('../views/loginPwdChange/loginPwdChange'),
        }
    ]
};
