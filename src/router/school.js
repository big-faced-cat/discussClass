import Content from "../components/Content"

/**
 * 学校管理
 */
module.exports = {
    path: "school",
    name: "school",
    component: Content,
    children: [
        {
            path:"",
            redirect:{
                name:"schoolList"
            }
        },
        {
            path: "list",
            name: "schoolList",
            component: () => import('../views/school/schoolList'),
        }
 ]
};
