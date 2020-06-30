import Content from "../components/Content"

/**
 * 学校管理
 */
module.exports = {
    path: "myclass",
    name: "myclass",
    component: Content,
    children: [
        {
            path:"",
            redirect:{
                name:"myclassList"
            }
        },
        {
            path: "list",
            name: "myclassList",
            component: () => import('../views/myclass/myclassList'),
        }
    ]
};
