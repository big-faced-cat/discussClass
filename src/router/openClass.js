import Content from "../components/Content"

/**
 * 开课
 */
module.exports = {
    path: "openClass",
    name: "openClass",
    component: Content,
    children: [
        {
            path:"",
            redirect:{
                name:"openClassList"
            }
        },
        {
            path: "list",
            name: "openClassList",
            component: () => import('../views/openClass/openClassList'),
        }
    ]
};
