import Content from "../components/Content"

/**
 * 基础数据
 */
module.exports = {
    path: "comprehensiveQuery",
    name: "comprehensiveQuery",
    component: Content,
    children: [
        {
            path: "/",
            redirect:{
                name:"comprehensiveQueryList"
            }
        },
        {
            path: "list",
            name: "comprehensiveQueryList",
            component: () => import('../views/comprehensiveQuery/comprehensiveQueryList.vue'),
            props:true,
        }
    ]
};
