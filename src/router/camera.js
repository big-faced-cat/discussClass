import Content from "../components/Content"

/**
 * 摄像头管理
 */
module.exports = {
    path: "camera",
    name: "camera",
    component: Content,
    children: [
        {
            path:"",
            redirect:{
                name:"cameraList"
            }
        },
        {
            path: "list",
            name: "cameraList",
            component: () => import('../views/camera/cameraList'),
        }
    ]
};