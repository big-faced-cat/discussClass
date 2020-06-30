<template>
    <MyPopup ref="MyPopup" :title="title" @pop-close="closePopup">
        <div class="s01_CourseManAdd">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="课堂编号" prop="no" >
                    <el-input  style="width: auto !important;" class="s01_search_input" v-model="ruleForm.no"  filterable  placeholder=""
                               clearable>
                    </el-input>
                </el-form-item>

                <el-form-item label="学校编号" prop="schoolId">
                    <el-select v-model="ruleForm.schoolId"  v-on:change="changeSchoolName"  filterable placeholder="学校编号" >
                        <el-option
                                v-for="item in schoolList"
                                :key="item.id"
                                :label="item.no"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    {{schoolname}}
                </el-form-item>

                <el-form-item label="班级编号" prop="classId">
                    <el-select v-model="ruleForm.classId" filterable placeholder="班级编号" >
                        <el-option
                                v-for="item in classList"
                                :key="item.id"
                                :label="item.no"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="教室" prop="classroomId">
                    <el-select v-model="ruleForm.classroomId " filterable placeholder="教室" >
                        <el-option
                                v-for="item in classroomList"
                                :key="item.id"
                                :label="item.no"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="教师" prop="teacherId">
                    <el-select v-model="ruleForm.teacherId" filterable placeholder="请选择教师">
                        <el-option
                                v-for="item in teacherList"
                                :key="item.id"
                                :label="item.staffNo"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学科" prop="subjectIdsss">
                    <el-input  style="width: auto !important;" v-model="ruleForm.subjectName"
                               filterable  placeholder="学科名称"
                               clearable>
                    </el-input>
                    <el-option :value="0" label="" selected></el-option>
                    <el-select v-model="ruleForm.subjectId" filterable placeholder="请选择学科">
                        <el-option
                                v-for="item in subjectList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="课程类型" prop="courseTypeId">
<!--                    subjectName-->
                    <el-select v-model="ruleForm.courseTypeId" filterable placeholder="请选择课程类型"
                    >
                        <el-option
                                v-for="item in courseList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上课时间" prop="startTime">
                    <el-date-picker
                            popper-class="birthData_css"
                            v-model="ruleForm.planStartTime"
                            type="datetime"
                            placeholder="选择开始时间">
                    </el-date-picker>
                    <el-date-picker
                            popper-class="birthData_css"
                            v-model="ruleForm.planEndTime"
                            type="datetime"
                            placeholder="选择结束时间" >
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="是否评优" prop="excellent">
                    <el-switch
                            v-model="ruleForm.excellent"
                            active-text="是" :active-value="true"
                            inactive-text="否" :inactive-value="false">
                    </el-switch>
                </el-form-item>
                <el-form-item size="large">
                    <el-button type="primary" @click="submitForm('ruleForm')">
                        {{TIMEOUT===0?(currentRow?"立即更新":"立即创建"):"提交中..."}}
                    </el-button>
                    <el-button @click="closePopup">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </MyPopup>

</template>
<script>
    import MyPopup from "../MyPopup.vue"
    import moment from "moment"

    export default {
        name: "CourseManAdd",
        props: [],
        data() {
            var kepingTypesVali = (rule, value, callback) => {
                if (this.ruleForm.evaluationNeeded == 1 && value === '') {
                    callback(new Error('请选择课评方式'));
                } else {
                    callback();
                }
            };
            var   novails = (rule, value, callback) => {
                if (this.ruleForm.no != '' && value != '' && /^[(A-Za-z) | (0-9)]*$/i.test(this.ruleForm.no)) {
                    callback();
                } else {
                    callback(new Error('课程编号必须由数字或者字母组成且必填'));
                }
            };

            let noVali = (rule, value, callback) => {
                if (this.ruleForm.planEndTime == '' || this.ruleForm.planStartTime == '') {
                    callback(new Error('请选择上课时间'));
                } else {
                    callback();
                }
            };
            let subjectVal = (rule, value, callback) => {
                if (this.ruleForm.subjectId == null && this.ruleForm.subjectName == '') {
                    callback(new Error('请选择学科或填入学科名称'));
                } else {
                    callback();
                }
            };
            return {
                schoolname: '', // 学校名称
                schoolList: [], // 学校列表
                teacherList: [], // 教师列表
                gradeList: [],//年级
                classList: [],//班级
                options4: [],//老师
                subjectList: [],//学科
                courseList: [],//课程
                options7: [],//课评方式
                options8: [],//课时
                ruleForm: {
                    "schoolId": null,
                "teacherId": null,  //教师id
                    "gradeId": null,
                "classId": null,     //班级id
                "classroomId": null,   //教室id
                "subjectId": null,      // 学科id
                "subjectName": "",      //  学科姓名
                "planStartTime": "",        //计划开始时间
                "planEndTime": "",          //计划结束时间
                "courseTypeId": null,     //课程类型id
                // "statusId": null,     // 课程状态id
                "content": "",
                // "attendanceRate": null,   //出勤率
                "excellent": false,   //是否评优
                "remark": "",
                "no": "" , //课堂编号
            },

                rules: {
                    no: [
                        {required: true, validator: novails, message: '课程编号必须由数字或者字母组成', trigger: 'change'},
                    ],
                    gradeId: [
                        {required: true, message: '请选择年级', trigger: 'change'},
                    ],
                    classId: [
                        {required: true, message: '请选择班级', trigger: 'change'},
                    ],
                    classroomId: [
                        {required: true, message: '请选择教室', trigger: 'change'},
                    ],
                    teacherId: [
                        {required: true, message: '请选择教师', trigger: 'change'},
                    ],
                    subjectIdsss: [
                        {required: true, validator: subjectVal, message: '请选择学科或填入学科名称', trigger: 'change'},
                    ],
                    courseTypeId: [
                        {required: true, message: '请选择课程类型', trigger: 'change'},
                    ],
                    startTime: [
                        {required: true, validator: noVali, message: '请选择上课时间',  trigger: 'blur'},
                    ],
                    schoolId: [
                        {required: true, message: '请选择学校编号', trigger: 'change'},
                    ],
                },
                currentRow: null,//数据id
                TIMEOUT: 0,
                classroomList: [], //教室列表
            };
        },
        components: {MyPopup},
        methods: {
            // 学校名称变化
            changeSchoolName() {
                this.schoolname = this.schoolList.filter( item => item.id == this.ruleForm.schoolId)[0].name;
                this.getClassList();
            },
            getDetail() {
                Ajax.CourseMan.get({
                    id: this.currentRow.id
                }).then((res) => {
                    if (res.data.code == 200 && res.data.content.data.length > 0) {
                        this.ruleForm = res.data.content.data[0];
                        this.ruleForm .gradeId=this.ruleForm.classGrade.gradeId;
                        this.ruleForm.startTime= utc_local(this.ruleForm.startTime);
                        //服务器utc时间
                        if(this.ruleForm.evaluationMethodId===0){
                            this.ruleForm.evaluationMethodId=null
                        }
                        if(this.ruleForm .gradeId){
                            this.getClassGradeList(this.ruleForm .gradeId);
                        }
                    }
                })
            },
            submitForm(formName) {
                if (this.TIMEOUT === 0) {
                    this.$refs[formName].validate((valid, obj) => {
                        if (valid) {
                            this.TIMEOUT++;

                            if (!this.currentRow) {//新增
                                var list = [];
                                this.ruleForm.classId= parseInt(this.ruleForm.classId);
                                this.ruleForm.teacherId= parseInt(this.ruleForm.teacherId);
                                this.ruleForm.gradeId= parseInt(this.ruleForm.gradeId);
                                this.ruleForm.classroomId= parseInt(this.ruleForm.classroomId);
                                this.ruleForm.subjectId=this.ruleForm.subjectId !=null ? parseInt(this.ruleForm.subjectId) : 0;
                                this.ruleForm.courseTypeId= parseInt(this.ruleForm.courseTypeId);
                                var params=this.ruleForm;
                                list.push(params);
                                Ajax.CourseMan.post(list).then((res) => {
                                    if (res.status == 200) {
                                        if (res.data.content != 0) {
                                            this.closePopup()
                                        } else {
                                            this.$notify.error({
                                                title: "错误",
                                                message: "添加失败! 请检查是否已经存在"
                                            })
                                        }
                                    }
                                }).finally(() => {
                                    this.TIMEOUT = 0;
                                })
                            } else {//编辑
                                var params={
                                    "subjectId": this.ruleForm.subjectId,
                                    "courseTypeId": this.ruleForm.courseTypeId,
                                    "classGradeId": this.ruleForm.classGradeId,
                                    "startTime": local_utc(this.ruleForm.startTime),
                                    "classDurationId": this.ruleForm.classDurationId,
                                    "teacherId": this.ruleForm.teacherId,
                                    "evaluationNeeded": !!this.ruleForm.evaluationNeeded,
                                    id: this.currentRow.id
                                };
                                if(this.ruleForm.evaluationMethodId){
                                    params["evaluationMethodId"]=this.ruleForm.evaluationMethodId;
                                }
                                Ajax.CourseMan.put(params).then((res) => {
                                    if (res.data.code == 200) {
                                        this.closePopup()
                                    }
                                }).finally(() => {
                                    this.TIMEOUT = 0;
                                })
                            }
                        } else {
                            return false;
                        }
                    });
                } else {
                    this.$notify.info({
                        title: '消息',
                        message: '请勿重复提交'
                    });
                }


            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            /**
             * 打开弹出框
             */
            openPopup(currentRow) {
                this.currentRow = currentRow;
                if (this.currentRow) {
                    this.getDetail()
                }
                this.$refs.MyPopup.openPopup(...arguments);
            },
            // 获取学校列表
            getSchoolList() {
                let params = {
                    PageIndex: 1,
                    PageSize: 10000,
                };
                Ajax.School.get(params).then((res) => {
                    if (res.status == 200) {
                        if (res.data.content) {
                            this.schoolList = res.data.content.pagedData;
                        }
                    }
                })
            },
            /**
             * 关闭自己
             */
            closePopup() {
                //关闭弹窗框
                this.$refs.MyPopup.closePopup(...arguments);
                //触发列表刷新
                this.tellParentFresh();
                this.ruleForm.classRoomId = null;
                this.ruleForm.planStartTime = null;
                this.ruleForm.planEndTime = null;
                this.schoolname = '';
                this.ruleForm.subjectName = '';
                this.ruleForm.subjectId = null;
                this.resetForm("ruleForm")
                this.TIMEOUT = 0;
            },
            tellParentFresh() {
                this.$emit("refresh-list")
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
                    this.teacherList = res.data.content.pagedData;
                })
            },

            /**
             * 获取课时
             */
            getClassDuration() {
                Ajax.EssentialData.getClassDuration().then((res) => {
                    this.options8 = res.data.content;
                })
            },
            // 获取教室列表
            getClassroomList(){
                let params = {
                    PageIndex: 1,
                    PageSize: 100000,
                };
                Ajax.Classroom.get(params).then((res) => {
                    console.log('教室列表', res);
                    this.classroomList = res.data.content.pagedData;
                })

            },

            // 获取班级列表
            getClassList(){
                let params = {
                    PageIndex: 1,
                    PageSize: 100000,
                };
                this.ruleForm.classId = null;
                Ajax.Class.get(params).then((res) => {
                    if (this.ruleForm.schoolId == null) {
                        this.classList = res.data.content.pagedData;
                    } else {
                        this.classList = res.data.content.pagedData.filter( temp => temp.schoolId  == this.ruleForm.schoolId);
                    }

                })

            },
            // 获取基础数据的内容
            getdata(params) {
                Ajax.EssentialData.getLists(params).then((res)=>{
                    if (res.status == 200) {
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
        computed: {
            title() {
                return this.currentRow ? ('修改课堂') : '添加课堂'
            }
        },
        created() {},
        mounted() {
            this.getSchoolList();
            this.getClassList();
            this.getTeachers();
            this.getClassroomList();
            this.getdata(0);
            this.getdata(4);

        }
    }
</script>

<style lang="scss">
    .s01_CourseManAdd {
        .s01_database_text {
            textarea {
                height: 100%;
            }
        }
    }
</style>
