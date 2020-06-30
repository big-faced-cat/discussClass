import Content from "../components/Content"

/**
 * 学校管理
 */
module.exports = {
    path: "patolClass",
    name: "patolClass",
    component: Content,
    children: [
        {
            path:"",
            redirect:{
                name:"patolClass"
            }
        },
        {
            path: "list",
            name: "patolClass",
            component: () => import('../views/patolClass/patolClassList'),
        }
    ]
};
