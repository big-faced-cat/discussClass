<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="s01_stuEvalFollowList">
        <ContentTitle>学生分析</ContentTitle>
        <div class="s01_ketang_table">
<!--            <MyZtree @node-click="treeNodeClick"></MyZtree>-->
            <div>
                <!--  @handle-view="handelView"-->
                <Mytable   :tableHead="tableHead" :tableData="tableData">
                    <!--列表删选条件-->
                    <template v-slot:tableConditions="slotProps">
                        <el-row>
                            <el-input class="s01_search_input" v-model="TeacherName" filterable placeholder="请输入老师姓名"
                                      style="width:150px;" clearable
                                      size="medium">
                            </el-input>

                            <el-select class="s01_search_input" v-model="value5" filterable placeholder="学科" style="width:150px;"
                                       clearable
                                       size="medium">
                                <el-option
                                        v-for="item in options5"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                            <el-select class="s01_search_input" v-model="value6" filterable placeholder="课程类型" style="width:150px;"
                                       clearable
                                       size="medium">
                                <el-option
                                        v-for="item in options6"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                            <DateRanger v-model="startEndTime"></DateRanger>
                            <el-button type="primary" class="s01_compare_btn" size="medium"
                                       style="background:#fdb045;border:none;" @click="changeTableData()">查询
                            </el-button>

                            <el-button type="success"  size="medium" @click="backPage">
                                返回
                            </el-button>

                        </el-row>
                    </template>

                    <!--列表删选条件-->
                    <!--列表操作-->
                    <template v-slot:tableActions="slotProps">
                        <i class="iconfont s01_table_ck"
                           @click="handleView(slotProps.scopeT.$index, slotProps.scopeT.row,slotProps.scopeT)">&#xe62d;</i>
                            <el-button type="primary" plain
                               @click="toPage"
                               size="mini">删除
                            </el-button>
                    </template>
                    <!--列表操作-->

                 <!-- <template v-slot:tableActions="slotProps" >
                    <el-button type="primary" plain
                               @click="toPage"
                               size="mini">删除
                    </el-button>
                </template>
                <template v-slot:tableActions="slotProps" >
                    <el-button type="primary" plain
                               @click="toPage"
                               size="mini">查看
                    </el-button>
                </template> -->
                </Mytable>
            </div>
        </div>
    </div>
</template>
<script>
    import ContentTitle from "../../components/ContentTitle.vue"
    import ListCondition from "../../components/ListCondition.vue"
    import DateRanger from "../../components/DateRanger.vue"
    import Mytable from "../../components/Mytable.vue"
    import MyZtree from "../../components/MyZtree.vue"
    import moment from "moment"

    export default {
        name: "stuEvalFollowList",
        components: {ContentTitle, ListCondition, DateRanger, Mytable, MyZtree},
        data() {
            return {
                startEndTime: null,
                studentName:"张三",
                TeacherName: null,
                options1: [],
                value1: '',
                options2: [],
                value2: null,
                options3: [],
                value3: null,
                options5: [],//学科
                value5: null,
                options6: [],//课程
                value6: null,
                tableHead: [
                    {type: "", prop: "xuhao", label: "学号", width: "70"},
                    {type: "", prop: "startTime", label: "上课时间", minWidth: "180",
                        formatter(row, column, cellValue, index) {
                            if (row.startTime) {
                                return utc_local(row.startTime)
                            }
                        }},
                    // {type: "", prop: "a0", label: "学生姓名", minWidth: "70"},
                    {type: "", prop: "teacherName", label: "学生姓名", minWidth: "70"},
                    {type: "", prop: "subjectName", label: "活跃", minWidth: "100"},
                    {type: "", prop: "classDuration", label: "倾听", minWidth: "70"},
                    {type: "", prop: "courseTypeName", label: "思考", minWidth: "70"},
                    {type: "", prop: "classFocus", label: "集中", minWidth: "70"},
                    {type: "", prop: "class", label: "分散", minWidth: "70"},
                    // {type: "", prop: "evaluationNeeded", label: "操作", minWidth: "100"},
                    // {type: "", prop: "a8", label: "活跃度", minWidth: "70"},
                    // {type: "", prop: "a9", label: "参与度", minWidth: "70"},
                    // {type: "", prop: "a10", label: "授课类型", minWidth: "70"},

                ],
                tableData: [
                    {xuhao:'s210101',startTime:'row.startTime',teacherName:'李小龙',subjectName:'6.94',classDuration:'83.99',courseTypeName:'4.86',classFocus:'99',class:'0'},
                    {xuhao:'s210102',startTime:'row.startTime',teacherName:'陈真',subjectName:'5.93',classDuration:'88.96',courseTypeName:'5.16',classFocus:'93',class:'0'},
                    {xuhao:'s210103',startTime:'row.startTime',teacherName:'叶问',subjectName:'6.98',classDuration:'81.91',courseTypeName:'4.15',classFocus:'98',class:'0'},
                    {xuhao:'s210104',startTime:'row.startTime',teacherName:'霍元甲',subjectName:'6.91',classDuration:'89.82',courseTypeName:'4.26',classFocus:'100',class:'0'},
                ],
                keyword: "",//模糊查询

            }
        },
        methods: {
            // 返回
            backPage() {
                this.$router.push({
                    name: "courseManList"
                });
            },
            changeTableData(){
                let params = {
                    PageIndex: 1,
                    PageSize: 100,
                };
                if (this.TeacherName !== null && this.TeacherName !== '') {
                    console.log('dddteacher', this.TeacherName );
                    params["TeacherName"] = this.TeacherName;
                }
                if (this.value5 !== null && this.value5 !== '') {
                    params["SubjectId"] = this.value5;
                }
                if (this.value6 !== null && this.value6 !== '') {
                    params["CourseTypeId"] = this.value6;
                }
                if (this.value1 !== null && this.value1 !== '') {
                    params["GradeId"] = this.value1;
                }
                if (this.value2 !== null && this.value2 !== '') {
                    params["ClassId"] = this.value2;
                }
                if (this.startEndTime !== null && this.startEndTime !== '') {
                    if (this.startEndTime[0] ) {
                        params["StartTime"] = moment.utc(this.startEndTime[0]).format("YYYY-MM-DD HH:mm:ss");
                    }
                    if (this.startEndTime[1] ) {
                        params["EndTime"] = moment.utc(this.startEndTime[1]).format("YYYY-MM-DD HH:mm:ss");
                    }
                }
                Ajax.CourseMan.get(params).then((res) => {
                    if (res.data.code == 200) {
                        var result = res.data.content;
                        console.log('查询的数据',result);
                        this.tableData = result.data;
                    }
                })
            },
            /**
             * 详情页
             * @param index
             * @param row
             */
            // handleView
            handleView(index, item, row) {
                console.log('goto page');
                console.log('ddd', item );
                this.$router.push(
                    {name:'stuEvuView',params: {studentName:this.studentName, rows: item }});
            },
            /**
             * 树形 点击事件
             */
            treeNodeClick(node) {
                this.value1 = node.gradeId;
                this.value2 = node.classId;
                if (arguments &&  arguments[0] && arguments[0].id) {
                    this.studentName = arguments[0].label;
                    this.changeTableData();
                }
            },
            /**
             *获取教师
             */
            getTeachers() {
                Ajax.EssentialData.getTeachers().then((res) => {
                    this.options4 = res.data.content;
                })
            },
            /**
             * 学科种类
             */
            getCourseList() {
                Ajax.EssentialData.getCourseList().then((res) => {
                    this.options5 = res.data.content;
                })
            },
            /**
             * 课程类型
             */
            getCourseTypes() {
                Ajax.EssentialData.getCourseTypes().then((res) => {
                    this.options6 = res.data.content;
                })
            },
        },
        mounted() {
            // this.changeTableData();
        },
        created() {
            // this.getTeachers();
            // this.getCourseList();
            // this.getCourseTypes();

        },
    }
</script>

<style lang="scss">
    .s01_stuEvalFollowList {

        .s01_ketang_table {
            position: absolute;
            top: 60rem * 480 / (1200 * 12);
            bottom: 0;
            left: 20rem * 480 / (1200 * 12);
            right: 0;
            overflow: auto;
            background: #fff;

            .s01_MyZtree {

            }

            .s01_stu_table {
                position: absolute;
                left: 179rem * 480 / (1200 * 12);
                right: 0;
                top: 0;
                bottom: 0;

                .s01_Mytable {
                    padding: 10rem * 480 / (1200 * 12);

                    .s01_table_table {
                        position: absolute;
                        top: 55rem * 480 / (1200 * 12);
                        bottom: 146rem * 480 / (1200 * 12);
                        left: 10rem * 480 / (1200 * 12);
                        right: 0rem * 480 / (1200 * 12);
                        overflow: auto;
                    }
                }

                .s01_search_input {
                    width: 140rem * 480 / (1200 * 12);
                    margin-right: 20rem * 480 / (1200 * 12);
                    margin-bottom: 10rem * 480 / (1200 * 12);
                }

                .s01_DateRanger {
                }

                .s01_compare_btn {
                    vertical-align: super;
                }


            }
        }
    }

    /*响应式*/
    .s01_stuEvalFollowList {
        .s01_ketang_table {
            .s01_stu_table {
                .s01_Mytable {
                    .s01_table_table {
                        @media all and (max-width: 1185px) {
                            top: 105rem * 480 / (1200 * 12);
                        }
                        @media all and (max-width: 812px) {
                            top: 155rem * 480 / (1200 * 12);
                        }
                        @media all and (max-width: 693px) {
                            top: 205rem * 480 / (1200 * 12);
                        }
                        @media all and (max-width: 630px) {
                            top: 255rem * 480 / (1200 * 12);
                        }
                        @media all and (max-width: 480px) {
                            margin-top: 10rem * 480 / (1200 * 12);
                            position: initial;
                            .s01_table_table {
                                position: initial;
                            }
                            .s01_paginate_box {
                                position: initial;
                            }
                        }
                    }

                    @media all and (max-width: 480px) {
                        .s01_paginate_box {
                            position: initial;
                        }
                    }
                }
            }
        }
    }

    @media all and (max-width: 700px) {
        .s01_stuEvalFollowList {
            .s01_ketang_table {
                .s01_MyZtree {
                    width: 100%;
                }

                .s01_stu_table {
                    position: initial;

                    .s01_Mytable {
                        .s01_table_table {
                            margin-top: 10rem * 480 / (1200 * 12);
                            position: initial;

                            .s01_table_table {
                                position: initial;
                            }

                            .s01_paginate_box {
                                position: initial;
                            }
                        }

                        .s01_paginate_box {
                            position: initial;
                            -webkit-transform: translate(0);
                            -moz-transform: translate(0);
                            -ms-transform: translate(0);
                            -o-transform: translate(0);
                            transform: translate(0);
                        }
                    }
                }
            }
        }
    }

    /*响应式*/

</style>
