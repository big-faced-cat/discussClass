import service from './request.js';
export default {
    Ajax: {
        // 我的班级
        MyClass: {
            getCourseDetail(params) {
                return service.get("/MyClass/Course", {
                    params: params,
                })
            },
            getDetail(params) {
                return service.get("/MyClass/Detail", {
                    params: params,
                })
            },
            getLeftPanelCourseList(params){
                return service.get("/MyClass/Courses", {
                    params: params,
                })
               },
            // 查询左侧学生
            getLeftStudentList(params) {
                return service.get("/MyClass/Students", {
                    params: params,
                })

            },
            // 获取选中学生后的详情
            getLeftStudentDetail(params) {
                return service.get("/MyClass/Student", {
                    params: params,
                })

            },

        },
        // 评教
        Comment: {
            get(params) {
                return service.get("/Comment", {
                    params: params,
                })
            },
            post(params) {
                return service.post("/Comment", params, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            },
            put(params) {
                return service.put("/Comment", params)
            },
        },
        // 获取权限
         Permission: {
             get(params) {
                 return service.get("/Permission", {
                     params: params,
                 })
             },

         }
         ,
        // 角色
        Role: {
            delete(params) {
                return service.delete("/Role",
                    {
                        data: params,
                    })
            },
            put(params) {
                return service.put("/Role", params)
            },
            getDetail(params) {
                let urls = '/Role/' + params.id;
                return service.get(urls)
            },
            get(params) {
                return service.get("/Role", {
                    params: params,
                })
            },
            post(params) {
                return service.post("/Role", params, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            },

        },
        // 教师
        Teacher: {
            assignClass(params) {
                return service.put("/Teacher/ClassArrange", params);
            },
            delete(params) {
                return service.delete("/Teacher",
                    {
                        data: params,
                    })
            },
            get(params) {
                return service.get("/Teacher", {
                    params: params,
                })
            },
            getDetail(params) {
                let urls = '/Teacher/' + params.id;
                return service.get(urls)
            },
            post(params) {
                return service.post("/Teacher/WithAvatar", params, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            },
            put(params) {
                return service.put("/Teacher/WithAvatar", params)
            },
            downloadTemplate() {
                window.open(url_prefix + "/Teacher/Download", "_blank")
            },
            excelImport(data, mediaType) {
                return service.post("/Teacher/ImportWithAvatar", data, mediaType);
            },

            downloadMultiTemplate() {
                window.open(url_prefix + "/Teacher/DownloadTeacherClass", "_blank")
            },
            excelMultiImport(data, mediaType) {
                return service.post("/Teacher/ImportTeacherClass", data, mediaType);
            },

        },

        // 班级
        Class: {
            /**
             * 班级学生下载
             */
            downloadTemplateClassStu() {
                window.open(url_prefix + "/Class/DownloadClassStudent", "_blank")
            },
            /**
             * 班级学生导入
             */
            excelImportClassStu(data, mediaType) {
                return service.post("/Class/ImportClassStudent", data, mediaType);
            },
            /**
             * 班级模板下载
             */
            downloadTemplate() {
                window.open(url_prefix + "/Class/Download", "_blank")
            },
            /**
             * 班级批量导入数据
             */
            excelImport(data, mediaType) {
                return service.post("/Class/Import", data, mediaType);
            },

            getDetail(params) {
                let urls = '/Class/' + params.id;
                return service.get(urls)
            },
            get(params) {
                return service.get("/Class", {
                    params: params,
                })
            },
            getMyClass(params) {
                return service.get("/Class/my", {
                    params: params,
                })
            },
            deleteMyClass(params) {
                return service.delete("/Class/my", {
                    params: params,
                })
            },
            delete(params) {
                return service.delete("/Class",
                    {
                        data: params,
                    })
            },
            post(params) {
                return service.post("/Class", params, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            },
            put(params) {
                return service.put("/Class", params)
            },

        },
        // 教室管理
         Classroom: {
             /**
              * 批量导入数据
              */
             excelImport(data, mediaType) {
                 console.log('进入classroom');
                 return service.post("/Classroom/Import", data, mediaType)
             },
             // 下载模板
             downloadTemplate() {
                 window.open(url_prefix + "/Classroom/Download", "_blank")
             },
            // 获取详情 /user?ID=12345
            getDetail(params) {
                let urls = '/Classroom/' + params.id;
                return service.get(urls)
            },
             get(params) {
                 return service.get("/Classroom", {
                     params: params,
                 })
             },
             delete(params) {
                 return service.delete("/Classroom",
                     {
                         data: params,
                     })
             },
             put(params) {
                 return service.put("/Classroom", params)
             },
             post(params) {
                 return service.post("/Classroom", params, {
                     headers: {
                         "Content-Type": "application/json"
                     }
                 })
             },
         },
        // 学校数据
        School: {
            getDetail(params) {
                let urls = '/School/' + params.id;
                return service.get(urls)
            },
            get(params) {
                return service.get("/School", {
                    params: params,
                })
            },
            post(params) {
                return service.post("/School", params, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            },
            delete(params) {
                return service.delete("/School",
                    {
                        data: params,
                    })
            },
            put(params) {
                return service.put("/School", params)
            },

        },

        // 地区数据
        Area: {
            get(params) {
                return service.get("/Area", {
                        params: params
                    }
                )
            }
        },
        EssentialData: {
            get(params) {
                return service.get("/EssentialData", {
                    params: params,
                })
            },
            post(params) {
                return service.post("/EssentialData", params, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            },
            put(params) {
                return service.put("/EssentialData", params)
            },
            delete(params) {
                return service.delete("/EssentialData",
                    {
                        data: params,
                    })
            },
            /**
             * 导入
             */
            excelImport(data, mediaType) {
                return service.post("/EssentialData/Import", data, mediaType)
            },
            /**
             * 下载模板
             */
            downloadTemplate() {
                window.open(url_prefix + "/EssentialData/Download", "_blank")
            },
            /**
             * 类目列表
             * @returns {*|void}
             * @constructor
             */
            Categories() {
                return service({
                    url: "/EssentialData/Categories",
                    method: "get",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            },
            /**
             * 查找年级
             */
            getGradeList() {
                //取出年级排序
                var p = new Promise(function (resolve, reject) {
                    service({
                        url: "/EssentialData",
                        params: {
                            Category: ID_GRADE
                        },
                        method: "get"
                    }).then(function (res) {
                        if (res.status == 200) {
                            var list = res.data.content;
                             list.sort(function (a, b) {
                                return ChineseToNumber(a.name.slice(0, -2)) - ChineseToNumber(b.name.slice(0, -2))
                            });
                        }

                        resolve(res)
                    }, function (res) {
                        reject(res)
                    })
                });
                return p
            },
            /**
             * 查找班级
             */
            getClassList() {
                //取出班级排序
                var p = new Promise(function (resolve, reject) {
                    service({
                        url: "/EssentialData",
                        params: {
                            Category: ID_CLASS
                        },
                        method: "get"
                    }).then(function (res) {
                        if (res.status == 200) {
                            var list = res.data.content;
                            list.sort(function (a, b) {
                                return ChineseToNumber(a.name.slice(0, -2)) - ChineseToNumber(b.name.slice(0, -2))
                            });
                        }

                        resolve(res)
                    }, function (res) {
                        reject(res)
                    })
                });
                return p
            },

            // 查找对应的基础数据
            getLists(params) {
                return service({
                    url: "/EssentialData",
                    params: {
                        Category: params
                    },
                    method: "get"
                })
            },
            /**
             * 查找教室
             */
            getClassRoomList() {
                return service({
                    url: "/EssentialData",
                    params: {
                        Category: ID_CLASSROOM
                    },
                    method: "get"
                })
            },
            /**
             * 查找教师
             */
            getTeachers() {
                return service({
                    url: "/EssentialData",
                    params: {
                        Category: ID_TEACHERS
                    },
                    method: "get"
                })
            },
            /**
             * 学科种类
             */
            getCourseList() {
                return service({
                    url: "/EssentialData",
                    params: {
                        Category: ID_COURSE_LIST
                    },
                    method: "get"
                })
            },
            /**
             * 课程类型
             */
            getCourseTypes() {
                return service({
                    url: "/EssentialData",
                    params: {
                        Category: ID_COURSE_TYPE
                    },
                    method: "get"
                })
            },
            /**
             * 课评方式
             */
            getKePingTypes() {
                return service({
                    url: "/EssentialData",
                    params: {
                        Category: ID_KEPING_TYPE
                    },
                    method: "get"
                })
            },
            /**
             * 获取课时
             */
            getClassDuration() {
                return service({
                    url: "/EssentialData",
                    params: {
                        Category: ID_CLASS_DURATIONID
                    },
                    method: "get"
                })
            }
        },
        User: {
            putRoleArrange(params) {
                return service.put("/User/RoleArrange", params);
            },
            getDetail(params) {
                let urls = '/User/' + params.id;
                return service.get(urls)
            },
            get(params) {
                return service.get("/User", {
                        params: params
                    }
                )
            },
            post(params) {
                return service.post("/User", params, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            },
            put(params) {
                return service.put("/User", params)
            },
            delete(params) {
                return service.delete("/User",
                    {
                        data: params,
                    })
            },
            ModifyPassword(params) {
                return service.put("/User/ModifyPassword", params)
            },
            ResetPassword(params) {
                return service.put("/User/ResetPassword", params)
            },
            login(params) {
                return service({
                    url: "/User/SignIn",
                    method: "post",
                    data: params
                })
            }
        },
        ClassGrade: {
            get(params) {
                return service({
                    url: "/ClassGrade",
                    method: "get",
                    params: params
                })
            },
            post(params) {
                return service({
                    url: "/ClassGrade",
                    method: "post",
                    data: params,
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            },
            put(params) {
                return service.put("/ClassGrade", params)
            },
            delete(params) {
                return service.delete("/ClassGrade",
                    {
                        data: params,
                    })
            },
        },
        Camera: {
            getHttps(params) {
                return service.put("/Camera/TransformForClassroom", params)
            },
            // 获取详情 /user?ID=12345
            getDetail(params) {
                let urls = '/Camera/' + params.id;
                return service.get(urls)
            },
            /**
             * 导入
             */
            excelImport(data, mediaType) {
                return service.post("/Camera/Import", data, mediaType)
            },
            /**
             * 下载模板
             */
            downloadTemplate() {
                window.open(url_prefix + "/Camera/Download", "_blank")
            },
            get(params) {
                return service({
                    url: "/Camera",
                    method: "get",
                    params: params
                })
            },
            post(params) {
                return service({
                    url: "/Camera",
                    method: "post",
                    data: params,
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            },
            put(params) {
                return service.put("/Camera", params)
            },
            delete(params) {
                return service.delete("/Camera",
                    {
                        data: params,
                    })
            },
        },
        Student: {
            getDetail(params) {
                let urls = '/Student/' + params.id;
                return service.get(urls)
            },
            get(params) {
                return service({
                    url: "/Student",
                    method: "get",
                    params: params
                })
            },
            post(params) {
                return service.post("/Student/WithAvatar", params)
                // return service({
                //     url: "/Student/WithAvatar",
                //     method: "post",
                //     data: params,
                //     headers: {
                //         "Content-Type": "multipart/form-data",
                //     }
                // })
            },
            put(params) {
                return service.put("/Student/WithAvatar", params)
            },
            delete(params) {
                return service.delete("/Student",
                    {
                        data: params,
                    })
            },
            /**
             * 导入
             */
            excelImport(data, mediaType) {
                return service.post("/Student/ImportWithAvatar", data, mediaType)
            },
            /**
             * 下载模板
             */
            downloadTemplate() {
                window.open(url_prefix + "/Student/Download", "_blank")
            },
        },
        CourseMan: {
            /**
             * 批量导入数据
             */
            excelImport(data, mediaType) {
                console.log('111111111111111111112222222222222');
                return service.post("/Course/Import", data, mediaType)
            },
            // 下载模板
            downloadTemplate() {
                window.open(url_prefix + "/Course/Download", "_blank")
            },
            get(params) {
                return service({
                    url: "/Course",
                    method: "get",
                    params: params
                })
            },
            post(params) {
                return service({
                    url: "/Course",
                    method: "post",
                    data: params,
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            },
            put(params) {
                return service.put("/Course", params)
            },
            delete(params) {
                return service.delete("/Course",
                    {
                        data: params,
                    })
            },
        },

    }
}
