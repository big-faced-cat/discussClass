<template>
    <MyPopup ref="MyPopup" :title="title"  :popSize="popSize"  @pop-close="closePopup">
        <div class="s01_ClassGradeAdd">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="教室编号" prop="no">
                    <el-input  v-if="!currentRow" class="s01_search_input" v-model="ruleForm.no" filterable placeholder=""
                              clearable
                              maxlength="20"
                              size="medium">
                    </el-input>
                    <span v-if="currentRow"> {{ruleForm.no}} </span>
                </el-form-item>
                <el-form-item label="学校编号" prop="schoolId" >
                    <el-select v-model="ruleForm.schoolId"    @change="changeSchoolNo(this)" filterable placeholder="" clearable >
                        <el-option
                                v-for="item in schoolList"
                                :key="item.no"
                                :label="item.no"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <span style="min-width: 100px;"> {{this.ruleForm.schoolName}}</span>
                </el-form-item>

                <el-form-item label="功能" prop="checks">
                        <el-checkbox label="课堂考勤" v-model="ruleForm.checkIn" ></el-checkbox>
                        <el-checkbox label="表情分析" v-model="ruleForm.classAnalyze"></el-checkbox>
                </el-form-item>
                <el-form-item v-if="ruleForm.cameraDtos && ruleForm.cameraDtos.length > 0 ? true : false" label="摄像头" prop="subjectId">
                    <div class="cameraList">
                        <span class="camera_inner"  v-for=" (item, index) in ruleForm.cameraDtos"  :key="index">
                            <i class="el-icon-video-camera-solid"></i>
                            <span>ip:{{item.ip}} </span>
                        </span>
                    </div>
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
    import { regionData } from 'element-china-area-data'
    export default {
        name: "classroomAddEdit",
        props: [],
        data() {
            var photoVali = (rule, value, callback) => {
                if (this.ruleForm.checkIn == false && this.ruleForm.classAnalyze == false) {
                    callback(new Error('请选择功能'));
                } else {
                    callback();
                }
            };
            let noVali = (rule, value, callback) => {
                if (this.removeSpecialCharacter(this.ruleForm.no) == '') {
                    callback(new Error('请输入教室编号'));
                } else {
                    callback();
                }
            };

            var   novails = (rule, value, callback) => {
                if (this.ruleForm.no != '' && value != '' && /^[(A-Za-z) | (0-9)]*$/i.test(this.ruleForm.no)) {
                    callback();
                } else {
                    callback(new Error('教室编号必须由数字或者字母组成且必填'));
                }
            };
            return {
                popSize: '',
                // 表单数据
                ruleForm: {
                    no: "",
                    schoolId: "",
                    remark: "",
                    types: "",
                    checkIn: false,
                    classAnalyze: false,
                    schoolName: '',
                },
                schoolList: [],
                value: [],
                options: regionData,
                selectedOptions: [],
                rules: {
                    no: [
                        {required: true,validator: novails, trigger: 'blur'},
                    ],
                    schoolId: [
                        {required: true, message: '请选择学校', trigger: 'blur'},
                    ],
                },
                currentRow: null,   //数据id
                TIMEOUT: 0
            };
        },
        components: {MyPopup},
        methods: {
            // 改变学校编号
            changeSchoolNo(val) {
                this.ruleForm.schoolName= this.schoolList.filter(item => item.id == this.ruleForm.schoolId)[0].name;
            },
            submitForm(formName) {
                if (this.TIMEOUT === 0) {
                    this.$refs[formName].validate((valid, obj) => {
                        if (valid) {
                            this.TIMEOUT++;
                            if (!this.currentRow) {//新增
                                var list = [];
                                this.ruleForm.no = this.removeSpecialCharacter(this.ruleForm.no);
                                list.push(
                                    this.ruleForm
                                );
                                Ajax.Classroom.post(list).then((res) => {
                                    if (res.status == 200) {
                                        if(res.data.content!=0){
                                            this.closePopup()
                                        }else{
                                            this.$notify.error({
                                                title:"错误",
                                                message:"添加失败! 请检查是否已经存在"
                                            })
                                        }
                                    }
                                }).finally(() => {
                                    this.TIMEOUT = 0;
                                })
                            } else {//编辑
                                let that = this;
                                Ajax.Classroom.put(
                                    that.ruleForm
                                ).then((res) => {
                                    if (res.status== 200) {
                                        if(!res.data.content){
                                            this.$notify.error({
                                                title:"错误",
                                                message:"更新失败! 请检查是否已经存在"
                                            })
                                        }else{
                                            this.closePopup()
                                        }
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
                this.ruleForm.classAnalyze = false;
                this.ruleForm.schoolName = null;
                this.ruleForm.checkIn = false;
                this.ruleForm.cameraDtos = [];
            },
            getDetail() {
                let params = {id: this.currentRow.id};
                Ajax.Classroom.getDetail(params).then((res) => {
                    if (res.status == 200) {
                        if (res.data.content) {
                            this.schoolList = res.data.content.schoolDtos;
                            this.ruleForm = res.data.content;
                        }
                    }
                })
            },
            /**
             * 打开弹出框
             */
            openPopup(currentRow) {
                this.$refs.MyPopup.openPopup(...arguments);
                this.currentRow = currentRow;
                this.popSize= "middle";
                if (this.currentRow) {
                    this.getDetail();
                } else {
                    this.ruleForm.schoolName = '';
                }
            },
            /**
             * 关闭自己
             */
            closePopup() {
                //关闭弹窗框
                this.$refs.MyPopup.closePopup(...arguments);
                //触发列表刷新
                this.tellParentFresh();
                this.resetForm("ruleForm");
                this.ruleForm.classAnalyze = false;
                this.ruleForm.schoolName = '';
                this.ruleForm.checkIn = false;
                this.TIMEOUT = 0;
                this.getSchoolList();
            },
            tellParentFresh() {
                this.$emit("refresh-list")
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
        },
        computed: {
            title() {
                return this.currentRow ? ('修改教室') : '添加教室'
            }
        },
        created() {
        },
        mounted() {
            this.popSize = 'middle';
            if(!this.currentRow) {
                this.getSchoolList();
            }
        }
    }
</script>

<style lang="scss">
    .cameraList{
        display: flex;
        flex-direction: row;
        flex-wrap:  wrap ;
        width: 300px;
        .camera_inner {
            border: 1px solid #dcdcdc;
            padding: 2px 4px;
            margin: 2px 2px;
            border-radius: 4px;
        }
    }
    p
    {
        .cameraTitle{
            float: left;
        }
        .cameraClose{
            float: right;
        }
    }
    .camera{
        border: 1px solid #ccc;
        margin: 5px;
        padding: 10px;
    }
    .tranferStyle{
        width: 300px;
        height: 200px;
    }
    .s01_ClassGradeAdd {
        .s01_database_text {
            textarea {
                height: 100%;
            }
        }
    }
</style>
