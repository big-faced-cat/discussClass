import Content from "../components/Content"

/**
 * 摄像头管理
 */
module.exports = {
    path: "attendance",
    name: "attendance",
    component: Content,
    children: [
        {
            path:"",
            redirect:{
                name:"attendanceList"
            }
        },
        {
            path: "list",
            name: "attendanceList",
            component: () => import('../views/attendance/attendanceList'),
        }
    ]
};
