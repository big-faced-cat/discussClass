import Content from "../components/Content"

/**
 * 基础数据
 */
module.exports = {
    path: "dataBase",
    name: "dataBase",
    component: Content,
    children: [
        {
            path: "/",
            redirect:{
                name:"dataBaseList"
            }
        },
        {
            path: "list",
            name: "dataBaseList",
            component: () => import('../views/dataBase/dataBaseList.vue'),
            props:true,
        }
    ]
};