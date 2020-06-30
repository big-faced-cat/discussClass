<template>
    <div class="s01_classGrade">
        <ContentTitle>我的班级</ContentTitle>
        <ListCondition v-if="!lookOver">
            <el-select class="s01_search_input" v-model="gradeId" filterable placeholder="年级" style="width:150px;"
                       size="medium">
                <el-option :value="-1" label="全部年级" selected></el-option>
                <el-option
                        v-for="item in gradeList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
            <el-select class="s01_search_input" v-model="classId" filterable placeholder="班级" style="width:150px;"
                       size="medium">
                <el-option :value="-1" label="全部班级" selected></el-option>
                <el-option
                        v-for="item in classList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
            <el-button type="primary" size="medium"  @click="refresh" style="background:#fdb045;border:none;margin-left:0.33rem;">查询
            </el-button>
<!--            <el-button type="success" class="s01_compare_btn"   @click="clickDel()"  size="medium">删除-->
<!--            </el-button>-->
        </ListCondition>
        <div   v-if="!lookOver"  class="s01_ketang_table">
            <Mytable
                    ref="Mytable"
                    :tableHead="tableHead"
                    :tableData="tableData"
                    :total="pagination.total"
                    :current-page="pagination.currentPage"
                    :page-size="pagination.pageSize"
                    :currentSelect="multipleSelection"
                    :option="200"
                    @selection-change="handleSelectionChange"
                    @current-change="currentPageChange">
                <!--列表操作-->
                <template v-slot:tableActions="slotProps">
                    <el-button type="primary" plain
                               @click="lookOvers(slotProps.scopeT.$index, slotProps.scopeT.row,slotProps.scopeT)"
                               size="mini">查看
                    </el-button>
                </template>
                <!--列表操作-->
            </Mytable>
        </div>
        <ListCondition v-if="lookOver">
    <div style=" display: flex; flex-direction: row; padding-top: 20px;">
        <el-input v-model="contents" style="width: 250px; padding-right: 10px;" :placeholder="serchPlaceHold" clearable></el-input>
        <el-date-picker
                v-model="month"
                type="month"
                format="yyyy-MM"
                placeholder="选择日期时间">
        </el-date-picker>
        <span style="line-height: 40px; margin-left: 10px;">
            <span>班级名称：{{classNameContact}}</span>
            <span>总课程数： {{courseNum}}</span>
            <span>总人数： {{studentNum}} </span>
        </span>
<!--        <el-button type="primary" size="medium"   style="margin-left: 50px;"  @click="search"  >查询-->
<!--        </el-button>-->
        <el-button type="primary" size="medium"   style="margin-left: 50px;"  @click="backPage"  >返回
        </el-button>
     </div>
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="按学生查看" name="1">
                    <div class="myClass_01_viewStudent">
                        <div  class="myclassList_left_all" style="width: 200px;">
                            <div v-for="(item, i) in studentList "
                                 :class="studentClickNum == i ? 'activeLeft': 'myclass_left'"
                                 :key="i"  v-on:click="changeLeftStudentActive(i, item)" >
                                <span>
                                      <el-image :src="item.avatarPath" lazy style="max-width:2rem;max-height:2rem;"></el-image>
                                    </span>
                                <span class="myclass_colomn">
                                            <span class="class_column_mess"> <span class="class_left_title">学号:</span>{{item.no}}</span>
                                            <span class="class_column_mess"> <span class="class_left_title">姓名:</span>{{item.name}}</span>
                                            <span class="class_column_mess"> <span class="class_left_title">缺勤:</span>{{item.recognition ? '缺勤': ''}}</span>
                                </span>
                            </div>
                        </div>
                        <div style="display: flex">
                                    <div style="width: 50%">
                                        <div class="tagBox_left">
                                            <div class="tagBox_left_title"> 已学习课程列表</div>
                                            <div class="tagBox_left_content">
                                            <el-table
                                                    :data="studentCourseStudied"
                                                    stripe
                                                    style="width: 100%">
                                                <el-table-column
                                                        prop="classNo"
                                                        label="课程编号"
                                                        width="180">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="content"
                                                        label="课程内容"
                                                        width="180">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="teacherStaffNo"
                                                        label="授课老师">
                                                </el-table-column>
                                            </el-table>
                                            </div>
                                        </div>
                                    </div>
                                    <div  style="width: 50%">
                                        <div class="tagBox_right">
                                            <div class="tagBox_right_title"> 未学习课程列表</div>
                                            <div class="tagBox_right_content">
                                            <el-table
                                                    :data="studentCourseUnstudied"
                                                    stripe
                                                    style="width: 100%">
                                                <el-table-column
                                                        prop="classNo"
                                                        label="课程编号"
                                                        width="180">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="content"
                                                        label="课程内容"
                                                        width="180">
                                                </el-table-column>
                                                <el-table-column
                                                        prop="teacherStaffNo"
                                                        label="授课老师">
                                                </el-table-column>
                                            </el-table>
                                            </div>
                                        </div>
                                    </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="按课程查看" name="2">
                    <div class="myClass_01_viewStudent">
                        <div  class="myclassList_left_all" style="width: 200px;">
                            <div v-for="(item, i) in courseListList "
                                 :class="clickNum == i ? 'activeLeft': 'myclass_left'"
                                 :key="i"  v-on:click="changeLeftCourse(i, item)" >
                                <span class="myclass_colomn">
                                            <span class="class_column_mess"> <span class="class_left_title">时间:</span>{{item.planStartTime}}</span>
                                            <span class="class_column_mess"> <span class="class_left_title">内容:</span>{{item.courseTypeName}}</span>
                                            <span class="class_column_mess"> <span class="class_left_title">状态:</span>{{item.statusName}}</span>
                                </span>
                            </div>
                        </div>
                        <div style="display: flex">
                            <div style="width: 50%">
                                <div class="tagBox_left">
                                    <div class="tagBox_left_title"> 实到学生列表</div>
                                    <div class="tagBox_left_content">
                                        <el-table
                                                :data="CourseStudentStudied"
                                                stripe
                                                style="width: 100%">
                                            <el-table-column
                                                    prop="no"
                                                    label="学号"
                                                    width="180">
                                            </el-table-column>
                                            <el-table-column
                                                    prop="name"
                                                    label="学生名称"
                                                    width="180">
                                            </el-table-column>
                                            <el-table-column
                                                    label="学生照片">
                                                <template slot-scope="scope">
                                                    <el-image :src="scope.row.avatarPath" lazy style="max-width:2rem;max-height:2rem;"></el-image>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </div>
                            </div>
                            <div  style="width: 50%">
                                <div class="tagBox_right">
                                    <div class="tagBox_right_title"> 缺勤学生列表</div>
                                    <div class="tagBox_right_content">
                                        <el-table
                                                :data="CourseStudentUnstudied"
                                                stripe
                                                style="width: 100%">
                                            <el-table-column
                                                    prop="no"
                                                    label="学号"
                                                    width="180">
                                            </el-table-column>
                                            <el-table-column
                                                    prop="name"
                                                    label="学生名称"
                                                    width="180">
                                            </el-table-column>
                                            <el-table-column
                                                    label="学生照片">
                                                <template slot-scope="scope">
                                                    <el-image :src="scope.row.avatarPath" lazy style="max-width:2rem;max-height:2rem;"></el-image>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </ListCondition>
    </div>
</template>
<script>
    import ContentTitle from "../../components/ContentTitle.vue"
    import ListCondition from "../../components/ListCondition.vue"
    import Mytable from "../../components/Mytable.vue"
    import ClassGradeAdd from "../../components/classGrade/ClassGradeAdd.vue"
    import moment from 'moment'

    export default {
        name: "myclassList",
        components: {ContentTitle, ListCondition, Mytable, ClassGradeAdd, moment},
        data() {
            return {
                studentCourseStudied: [],
                studentCourseUnstudied: [],
                CourseStudentStudied: [],
                CourseStudentUnstudied: [],
                studentList: [],
                courseListList: [],
                contents: '',
                month: new Date(),
                serchPlaceHold: '请输入学生学号或者姓名',
                studentNum: null,
                courseNum: null,
                classNameContact: '',
                globalClassId: null,
                classId: -1,
                gradeId: -1,
                gradeList: [],
                classList:[],
                studentClickNum: 0,
                clickNum: -12,
                peopleList: [
                    {studentNum:  'S412341',  studentName: 'yyy',  onWork: '0'},],
                lookOver: false,
                value1: '',
                tableHead: [
                    {type: "", prop: "gradeName", label: "年级", minWidth: "180"},
                    {type: "", prop: "className", label: "班级", minWidth: "180"},
                    {type: "", prop: "schoolName", label: "学校名称", minWidth: "180"},
                    {type: "", prop: "schoolNo", label: "学校编号", minWidth: "180"},
                ],
                tableData: [],
                multipleSelection: [],//勾选框列表选中的行
                pagination:{
                    currentPage:1,
                    pageSize:15,
                    total:0
                },
                ruleForm: {
                    ClassId: null,
                    StudentNoOrName: '',
                    PageIndex: null,
                    PageSize: null
                },
                select:'',
                activeName: '1',
            }
        },
        methods: {
            // 点击获取右侧的学生 getCourseDetail
            changeLeftCourse(param1, param2) {
                this.studentClickNum = param1;
                let params = {
                    CourseId: param2.id,
                };
                Ajax.MyClass.getCourseDetail(params).then((res) => {
                    if (res.status == 200) {
                        console.log('右侧学生列表', res);
                        this.CourseStudentStudied= res.data.content.presentStudentDtos;
                        this.CourseStudentUnstudied = res.data.content.absentStudentDtos;
                        console.log('获取到左侧学生点击后的详情的数据', res);
                    }
                })

            },
            // 课程学生切换
            handleClick(params){
                if (params.name == 1) {
                    this.serchPlaceHold = '请输入学生学号或姓名'
                    this.changeLeftActive(0);
                } else {
                    this.serchPlaceHold = '请输入课程内容';
                    this.changeLeftActive(0);
                    //获取课程列表
                    this.getcourseList(1);
                }
            },
            // 获取课程列表
            getcourseList(paramses) {
                var firstDate = moment(this.month).startOf("month"); 
                var lastDate = moment(this.month).endOf("month");
                let params = {
                    // ClassId: this.globalClassId ,
                    ClassId: 1,
                    CourseContent: '',
                    MonthFirstDay: utc_local_Month(firstDate),
                    MonthLastDay: utc_local_Month(lastDate),
                     // CourseMonth: utc_local_Month(this.month),
                     PageIndex: 1,
                     PageSize: 15,
                 };
                Ajax.MyClass.getLeftPanelCourseList(params).then((res) => {
                    if (res.status == 200) {
                        this.courseListList = res.data.content.pagedData;
                        console.log('获取到左侧课程数据', res);
                        if (paramses == 1) {
                            this.changeLeftCourse(0, {id: this.courseListList[0].id});
                        }
                    }
                })


            },
            //查询左侧学生列表
            getStudentList() {
                let params = this.ruleForm;
                Ajax.Class.getMyClass(params).then((res) => {
                    if (res.status == 200) {
                        if (res.data.content == null) {
                            this.tableData= [];
                            this.pagination.total= 0;
                        } else {
                            this.tableData=res.data.content.pagedData;
                            this.pagination.total=res.data.content.totalCount;
                            this.$nextTick(function () {
                                this.$refs.Mytable.toggleSelection(this.multipleSelection, true);
                            });
                        }
                    }
                })

            },
            // 获取学生点击数据列表
            getStudentDetail(id) {
                let firstDate = moment(this.month).startOf("month"); 
                let lastDate = moment(this.month).endOf("month");
                    let params = {
                        StudentId: id,
                        MonthFirstDay: utc_local_Month(firstDate),
                        MonthLastDay: utc_local_Month(lastDate),
                        // OneMonthTime: utc_local_Month(this.month),
                    };
                    Ajax.MyClass.getLeftStudentDetail(params).then((res) => {
                        if (res.status == 200) {
                            console.log('resresresresresres', res);
                            this.studentCourseStudied= res.data.content.studiedCourseDtos;
                            this.studentCourseUnstudied = res.data.content.unStudyCourseDtos;
                            console.log('获取到左侧学生点击后的详情的数据', res);
                        }
                    })

                },
            // 左侧学生点击数据
            changeLeftStudentActive(param, item) {
                this.studentClickNum = param;
                // 获取学生点击数据
                this.getStudentDetail(item.id);
            },
            // 左侧选中
            changeLeftActive(param) {
                this.clickNum = param;
            },
            refresh() {
                let params = {
                    PageIndex: this.pagination.currentPage,
                    PageSize: this.pagination.pageSize,
                    GradeId: this.gradeId,
                    ClassId: this.classId,
                };
                Ajax.Class.getMyClass(params).then((res) => {
                    if (res.status == 200) {
                        if (res.data.content == null) {
                            this.tableData= [];
                            this.pagination.total= 0;
                        } else {
                            this.tableData=res.data.content.pagedData;
                            this.pagination.total=res.data.content.totalCount;
                            this.$nextTick(function () {
                                this.$refs.Mytable.toggleSelection(this.multipleSelection, true);
                            });
                        }
                    }
                })
            },
            /**
             * 打开 添加的 弹出框
             */
            openAdd() {
                this.$refs.ClassGradeAdd.openPopup(null)
            },
            /**
             * 打开 编辑的 弹出框
             */
            openEdit(index, item, rowObj) {
                if (item) {
                    this.$refs.ClassGradeAdd.openPopup(item)
                } else {
                    layer.msg("请勾选一条记录")
                }
            },
            //返回
            backPage() {
                this.lookOver= false;
            },
            myclassDetai() {
                var firstDate = moment(this.month).startOf("month");
                var lastDate = moment(this.month).endOf("month");
                let params = {
                    ClassId:   this.globalClassId,
                    MonthFirstDay: utc_local_Month(firstDate),
                    MonthLastDay: utc_local_Month(lastDate),
                    // courseMonth:  utc_local_Month(this.month),
                };
                console.log('paramsparamsparams', params);
                Ajax.MyClass.getDetail(params).then((res) => {
                    if (res.status == 200) {
                        this.classNameContact = res.data.content.schoolName + res.data.content.gradeName +  res.data.content.className;
                        this.studentNum =  res.data.content.studentNum;
                        this.courseNum =  res.data.content.courseNum;
                        console.log('获取到的详情信息', res);

                    }
                })
            },
            // 查看
            lookOvers(index, item, rowObj) {
                this.activeName = '1';
                this.globalClassId = item.id;
                // 查询我的班级详情
                this.lookOver= true;
                this.myclassDetai();
                this.getLeftStudentList(1);


                // this.getStudentDetail(this.studentList[0].id);
                // new promise(   this.getLeftStudentList()).then( this.getStudentDetail(this.studentList[0].id));

            },
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
                    Ajax.Class.deleteMyClass(ids).then((res) => {
                        if (res.data.code == 200) {
                            this.refresh()
                            layer.close(layro)
                        }
                    })
                })
            },
            /**
             * currentPage 改变时会触发
             */
            currentPageChange(arg){
                this.pagination.currentPage=arg;
                this.refresh();
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
                    }
                });
            },

            // 获取左侧学生列表
            getLeftStudentList(paramddd) {
                let params = {
                    ClassId: this.globalClassId,
                    StudentNoOrName:  this.StudentNoOrName,
                    PageIndex: 1,
                    PageSize: 15,
                };
                Ajax.MyClass.getLeftStudentList(params).then((res) => {
                    if (res.status == 200) {
                        this.studentList = res.data.content.pagedData;
                        console.log('获取到左侧学生的数据', res);
                        if (paramddd == 1) {
                            this.getStudentDetail(this.studentList[0].id);
                        }
                    }
                })

            },
        },
        created(){
        },
        mounted() {
            this.getdata(8);
            this.getdata(9);
            this.refresh();
        }
    }
</script>

<style lang="scss">
    .myClass_01_viewStudent{
        display: flex;
        flex-direction: row;
    }
    .tagBox_left {
        border:  1px solid #bce8f1;
        border-radius: 4px;
        margin: 10px;
        .tagBox_left_title{
            color: #31708f;
            background-color: #d9edf7;
            border-color: #bce8f1;
            padding: 10px 15px;
        }
        .tagBox_left_content {
            padding: 20px;
        }
    }
    .tagBox_right {
        border:  1px solid #bce8f1;
        border-radius: 4px;
        margin: 10px;
        .tagBox_right_title{
            color: #a94442;
            background-color: #f2dede;
            border-color: #bce8f1;
            padding: 10px 15px;
        }
        .tagBox_right_content{
            padding: 20px;

        }

    }
    .myclassList_left_all {
        background-color: #eee;
        background-color: #eee;
        padding: 5px;
        .activeLeft{
            display: flex;
            flex-direction: row;
            cursor: pointer;
            background-color: white;
            padding-top: 5px;
            .myclass_colomn {
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding-left: 10px;
                .class_column_mess {
                    line-height: 20px;
                    padding-bottom: 5px;
                    .class_left_title {
                        padding-right: 5px;
                    }
                }
            }
        }
        .myclass_left {
            display: flex;
            flex-direction: row;
            cursor: pointer;
            padding-top: 5px;
            .myclass_colomn {
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding-left: 10px;
                .class_column_mess {
                    line-height: 20px;
                    padding-bottom: 5px;
                    .class_left_title {
                        padding-right: 5px;
                    }
                }
            }
        }
    }
    .s01_classGrade {
        .s01_ketang_table {
            // width: 100%;
            position: absolute;
            top: 140rem * 480 / (1200 * 12);
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
    .s01_classGrade {
        .s01_ketang_table {
            @media all and (max-width: 730px) {
                top: 200rem * 480 / (1200 * 12);
            }
            @media all and (max-width: 482px) {
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
    button.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-d-arrow-left{
            display: none;
    }
    button.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-d-arrow-left{
            display: none;
    }
    button.el-picker-panel__icon-btn.el-date-picker__next-btn.el-icon-d-arrow-right{
        display: none;
    }
        button.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-arrow-right{
        display: none;
    }
    .el-date-picker__header span:nth-child(3) {
            display:none
    }
    button.el-picker-panel__icon-btn.el-date-picker__prev-btn.el-icon-arrow-left{
        display:none
    }
     .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

    /*响应式*/

</style>
