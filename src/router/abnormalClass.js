import Content from "../components/Content"

/**
 * 摄像头管理
 */
module.exports = {
    path: "abnormalClass",
    name: "abnormalClass",
    component: Content,
    children: [
        {
            path:"",
            redirect:{
                name:"abnormalClassList"
            }
        },
        {
            path: "list",
            name: "abnormalClassList",
            component: () => import('../views/abnormalClass/abnormalClassList'),
        }
    ]
};
