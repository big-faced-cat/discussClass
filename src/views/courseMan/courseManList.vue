<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="s01_courseMan" >
        <ContentTitle>课堂管理</ContentTitle>
        <ListCondition>

            <el-select class="s01_search_input" v-model="teacherId" filterable placeholder="教师" style="width:150px;"
                       size="medium">
                <el-option :value="-1" label="全部教师" selected></el-option>
                <el-option
                        v-for="item in teacherList"
                        :key="item.id"
                        :label="item.staffNo"
                        :value="item.id">
                </el-option>
            </el-select>

            <el-select class="s01_search_input" v-model="value5" filterable placeholder="学科" style="width:150px;"
                       size="medium">
                <el-option :value="-1" label="全部学科" selected></el-option>
                <el-option
                        v-for="item in subjectList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
            <el-select class="s01_search_input" v-model="value6" filterable placeholder="课程类型" style="width:150px;"
                       size="medium">
                <el-option :value="-1" label="全部课程类型" selected></el-option>
                <el-option
                        v-for="item in courseList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
            <el-select class="s01_search_input" v-model="value1" filterable placeholder="年级" style="width:150px;"
                       size="medium">
                <el-option :value="-1" label="全部年级" selected></el-option>
                <el-option
                        v-for="item in gradeList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
            <el-select class="s01_search_input" v-model="value2" filterable placeholder="班级" style="width:150px;"
                       size="medium">
                <el-option :value="-1" label="全部班级" selected></el-option>
                <el-option
                        v-for="item in classList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
            <DateRanger2 v-model="startEndTime"></DateRanger2>
            <el-button type="primary" size="medium" style="background:#fdb045;border:none;margin-left:0.33rem;"  @click="refresh">查询
        </el-button>
            <el-button type="success" class="s01_compare_btn" @click="openAdd()" size="medium" >添加
            </el-button>
            <el-button type="success" class="s01_compare_btn" size="medium" @click="clickDel()" >删除
            </el-button>
            <el-button type="success" class="s01_compare_btn" size="medium"  @click="opClass()">开课
            </el-button>
            <el-button type="success" class="s01_compare_btn" size="medium"    @click="classImports()" >Excel导入
            </el-button>

        </ListCondition>
        <div class="s01_ketang_table">
                <Mytable
                        ref="Mytable"
                        :option="300"
                        :tableHead="tableHead"
                        :tableData="tableData"
                        :total="pagination.total"
                        :current-page="pagination.currentPage"
                        :page-size="pagination.pageSize"
                        @selection-change="handleSelectionChange"
                        @current-change="currentPageChange"
                        :currentSelect="multipleSelection">
                <!--列表操作-->
                <template v-slot:tableActions="slotProps" >
                    <el-button type="primary" plain
                               @click="classAnalysis"
                               size="mini">课堂分析
                    </el-button>
                    <el-button type="primary" plain
                                                 @click="studentAnalysis"
                                                 size="mini">学生分析
                    </el-button>
                    <el-button type="primary" plain
                               @click="courseAnalysis"
                               size="mini">考勤
                    </el-button>
                    <el-button type="primary" plain
                               @click="toPage( slotProps.scopeT.row)"
                               size="mini">评教
                    </el-button>
                </template>
                <!--列表操作-->
            </Mytable>
        </div>


        <!--弹出框-->
        <CourseManAdd ref="CourseManAdd" @refresh-list="refresh" ></CourseManAdd>
        <CourseManInport ref="CourseManInport"   @refresh-list="refresh"></CourseManInport>
        <!--弹出框-->

    </div>

</template>
<script>
    import ContentTitle from "../../components/ContentTitle.vue"
    import ListCondition from "../../components/ListCondition.vue"
    import Mytable from "../../components/Mytable.vue"
    import CourseManAdd from "../../components/courseMan/CourseManAdd.vue"
    import DateRanger2 from "../../components/DateRanger2"
    import CourseManInport from "../../components/courseMan/CourseManInport.vue"
    import moment from "moment"
    export default {
        name: "s01_courseMan",
        props: ["categoryId"],
        components: {ContentTitle, ListCondition, Mytable, CourseManAdd, DateRanger2, CourseManInport},
        data() {
            return {
                TeacherName: "",
                startEndTime: "",//上课开始和结束时间
                gradeList: [],//年级
                value1: null,
                classList: [],//班级
                value2: null,
                teacherList: [],//老师
                teacherId: null,
                subjectList: [],//学科
                value5: null,
                courseList: [],//课程
                value6: null,
                tableHead: [
                    {type: "selection", prop: "", label: "序号", width: "50"},
                    {type: "", prop: "no", label: "课程编号", minWidth: "50"},
                    {
                        type: "", prop: "planStartTime", label: "计划开课时间", minWidth: "50",
                        formatter(row, column, cellValue, index) {
                            if (row.planStartTime) {
                                return utc_local(row.planStartTime)
                            }
                        }
                    },
                    {
                        type: "", prop: "planEndTime", label: "计划开课时间", minWidth: "50",
                        formatter(row, column, cellValue, index) {
                            if (row.planStartTime) {
                                return utc_local(row.planStartTime)
                            }
                        }
                    },
                    {type: "", prop: "teacherStaffNo", label: "教师编号", minWidth: "50"},
                    {type: "", prop: "classroomNo", label: "教室编号", minWidth: "50"},
                    {type: "", prop: "subjectName", label: "学科", minWidth: "50"},
                    {type: "", prop: "courseTypeName", label: "课程内容", minWidth: "50"},
                    {type: "", prop: "classNo", label: "班级编号", minWidth: "50"},
                    {type: "", prop: "schoolNo", label: "学校编号", minWidth: "50"},
                    {type: "", prop: "schoolName", label: "学校名称", minWidth: "50"},
                    {type: "", prop: "attendanceRate", label: "出勤率", minWidth: "50",
                     formatter(row, column, cellValue, index) {
                if (row.attendanceRate) {
                    return '' + row.attendanceRate + '%'
                }
            }},
                    {type: "", prop: "statusName", label: "状态", minWidth: "50"},
                ],
                tableData: [],
                keyword: "",//模糊搜索
                multipleSelection: [],//勾选框列表选中的行
                pagination: {
                    currentPage: 1,
                    pageSize: 15,
                    total: 0
                }
            }
        },
        methods: {
            handleSelectionChange(val, tableData) {
                val =val.filter(temp =>  typeof(temp) != 'undefined');
                this.multipleSelection = [... this.multipleSelection , ...val];
                this.multipleSelection  = this.multipleSelection.filter(temp =>  typeof(temp) != 'undefined');
                let tableIds = [];
                tableData.filter(temp => {
                    if ( ( this.multipleSelection.map(tempss => tempss.id)).indexOf(temp.id) > -1) {
                        tableIds.push(temp.id);
                    }
                } );
                let notExistId = [];
                tableIds.filter( temp =>{
                    if ( (val.map(tempss => tempss.id)).indexOf(temp) < 0){
                        notExistId.push(temp);
                    }
                });
                // 合成部分去重
                let tempMultipSelection = [];
                this.multipleSelection.filter(temp => {
                    if (tempMultipSelection.length >= 0 &&    this.multipleSelection.length > 0) {
                        let ids =  tempMultipSelection.map(tempss => tempss.id);
                        if ( ids.indexOf(temp.id) < 0 && notExistId.indexOf(temp.id) < 0 ) {
                            tempMultipSelection.push(temp);
                        }
                    }
                });
                this.multipleSelection = tempMultipSelection;
            },
            // 班级导入
            classImports() {
                this.$refs.CourseManInport.openPopup();
            },
            // 学生分析
            studentAnalysis() {
                this.$router.push({
                    name: "stuEvalFollowList"
                })
            },
            // 课堂分析
           classAnalysis() {
               this.$router.push({
                   name: "classEvalView"
               })
           },
            // 考勤
            courseAnalysis() {
                this.$router.push({
                    name: "attendanceList"
                })
            },
            refresh() {
                var params = {
                    PageIndex: this.pagination.currentPage,
                    PageSize: this.pagination.pageSize,
                    TeacherId: this.teacherId,
                };

                if (this.value5 !== null && this.value5 !== '') {
                    params["SubjectId"] = this.value5;
                }
                if (this.value6 !== null && this.value6 !== '') {
                    params["CourseTypeId"] = this.value6;
                }
                if (this.value1 !== null && this.value1 !== '') {
                    params["GradeTypeId"] = this.value1;
                }
                if (this.value2 !== null && this.value2 !== '') {
                    params["ClassTypeId"] = this.value2;
                }
                if (this.startEndTime !== null && this.startEndTime !== '') {
                    if (this.startEndTime[0] ) {
                        params["PlanStartTimeStart"] = moment.utc(this.startEndTime[0]).format("YYYY-MM-DD HH:mm:ss");
                    }
                    if (this.startEndTime[1] ) {
                        params["PlanEndTimeStart"] = moment.utc(this.startEndTime[1]).format("YYYY-MM-DD HH:mm:ss");
                    }
                }
                Ajax.CourseMan.get(params).then((res) => {
                    if (res.status == 200) {
                        this.tableData = res.data.content.pagedData;
                        this.pagination.total = res.data.content.totalCount;
                        this.$nextTick(function () {
                            this.$refs.Mytable.toggleSelection(this.multipleSelection, true);
                        })
                    }
                })
            },
            toPage(item) {
                this.$router.push({
                    path: "/courseManDiscuss/" + item.id
                });
                this.courseMain= 2;
            },
            // 开课
            opClass(item) {
                this.$router.push({
                    name: "openClassList"
                });
            },
            /**
             * 打开 添加的 弹出框
             */
            openAdd() {
                this.$refs.CourseManAdd.openPopup(null)
            },
            /**
             * 打开 编辑的 弹出框
             */
            openEdit(index, item, rowObj) {
                if (item) {
                    this.$refs.CourseManAdd.openPopup(item)
                } else {
                    layer.msg("请勾选一条记录")
                }
            },
            // handleSelectionChange(val) {
            //     this.multipleSelection = val;
            // },
            clickDel() {
                if (this.multipleSelection.length === 0) {
                    this.$notify({
                        title: "注意",
                        message: "至少勾选一条记录"
                    });
                    return;
                }

                layer.confirm("确认删除" + this.multipleSelection.length + "项", (layro) => {
                    var ids = [];
                    this.multipleSelection.map((item) => {
                        ids.push(item.id)
                    });
                    Ajax.CourseMan.delete(ids).then((res) => {
                        if (res.status == 200) {
                            layer.close(layro);
                            this.multipleSelection = [];
                            this.refresh();
                        }
                    })
                })
            },
            /**
             * currentPage 改变时会触发
             */
            currentPageChange(arg) {
                this.pagination.currentPage = arg;
                this.refresh();
            },
            /**
             *获取教师
             */
            getTeachers() {
                let params = {
                    PageIndex: 1,
                    PageSize: 100000,
                };
                Ajax.Teacher.get(params).then((res) => {
                    console.log('教师',  res);
                    this.teacherList = res.data.content.pagedData;
                })
            },

            // 获取基础数据的内容
            getdata(params) {
                Ajax.EssentialData.getLists(params).then((res)=>{
                    if (res.status == 200) {
                        if (params == 8) {
                            this.gradeList = res.data.content;
                        }
                        if (params == 9) {
                            this.classList = res.data.content;
                        }
                        if (params == 0) {
                            this.subjectList = res.data.content;
                        }
                        if (params == 4) {
                            this.courseList = res.data.content;
                        }

                    }
                });
            },
        },
        created() {
        },
        mounted() {
            this.refresh();
            // 学科、课程类型、年级、班级
            this.getdata(8);
            this.getdata(9);
            this.getdata(0);
            this.getdata(4);
            this.getTeachers();

        }
    }
</script>

<style lang="scss">
    .birthData_css{
        z-index: 100000000000 !important;
    }
    .card_all {
        border: 1px solid  rgb(253, 176, 69);
        padding: 0 !important;
        height: auto;
        .cardss {
            /*border: 1px solid  rgb(253, 176, 69);*/
            /*height: 40px;*/
            height: 28px;
            background-color: rgb(253, 176, 69) ;

            .card_title_left {
                float: left;
                height: 40px;
                padding: 0 !important;
                color: white;
            }

            .card_title_right {
                float: right;
                height: 40px;
                padding: 0 !important;
                color: white;
            }
        }
    }
    .discuss_all {
        background-color: white;
        padding: 0.33333rem;
        font-size: 14px;
        *{
            padding: 10px;
        }

    }
    .s01_courseMan {
        .s01_ketang_table {
            // width: 100%;
            position: absolute;
            //top: 140rem * 480 / (1200 * 12);-->
            bottom: 0;
            overflow: auto;
            left: 20rem * 480 / (1200 * 12);
            right: 0;

            .s01_table_table {
                position: absolute;
                top: 10rem * 480 / (1200 * 12);
                bottom: 146rem * 480 / (1200 * 12);
                left: 10rem * 480 / (1200 * 12);
                right: 0rem * 480 / (1200 * 12);
                overflow: auto;
            }
        }
    }

    /*响应式*/
    .s01_courseMan {
        .s01_ketang_table {
            @media all and (max-width: 1780px) {
                top: 200rem * 480 / (1200 * 12);
            }
            @media all and (max-width: 975px) {
                top: 250rem * 480 / (1200 * 12);
            }
            @media all and (max-width: 801px) {
                top: 300rem * 480 / (1200 * 12);
            }
            @media all and (max-width: 625px) {
                margin-top: 10rem * 480 / (1200 * 12);
                position: initial;
                .s01_table_table {
                    position: initial;
                }
                .s01_paginate_box {
                    position: initial;
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

    /*响应式*/

</style>
