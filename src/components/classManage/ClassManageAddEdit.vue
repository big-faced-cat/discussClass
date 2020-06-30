<template>
    <MyPopup ref="MyPopup" :title="title" @pop-close="closePopup">
        <div class="s01_ClassGradeAdd">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="班级编号" prop="no">
                    <el-input  v-if="!currentRow" class="s01_search_input" v-model="ruleForm.no" filterable placeholder=""
                               clearable
                               maxlength="20"
                               size="medium">
                    </el-input>
                    <span v-if="currentRow"> {{ruleForm.no}} </span>
                </el-form-item>

                <el-form-item label="年级/班级" prop="glassAclass" >
                    <el-select v-model="ruleForm.gradeId" filterable placeholder="请选择年级"  >
                        <el-option
                                v-for="item in gradeList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="ruleForm.classId" filterable placeholder="请选择班级"  >
                        <el-option
                                v-for="item in classList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学校编号" prop="schoolId" >
                    <el-select v-model="ruleForm.schoolId"    @change="changeSchoolNo" filterable placeholder=""  >
                        <el-option
                                v-for="item in schoolList"
                                :key="item.no"
                                :label="item.no"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <span> {{ruleForm.schoolName}}</span>
                </el-form-item>
                <el-form-item label="班级成员" prop="schoolNo" >
                    <el-transfer
                            filterable
                            :filter-method="filterMethod"
                            filter-placeholder="请输入学科项拼音"
                            v-model="value"
                            :titles="['可选择成员', '已选择成员']"
                            :data="data">
                    </el-transfer>

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
        name: "ClassManageAddEdit",
        props: [],
        data() {
            let noVali = (rule, value, callback) => {
                if (this.ruleForm.gradeId == '' || this.ruleForm.classId == '') {
                    callback(new Error('请选择年级和班级'));
                } else {
                    callback();
                }
            };
            var   novails = (rule, value, callback) => {
                if (this.ruleForm.no != '' && value != '' && /^[(A-Za-z) | (0-9)]*$/i.test(this.ruleForm.no)) {
                    callback();
                } else {
                    callback(new Error('班级编号必须由数字或者字母组成且必填'));
                }
            };

            return {
                data: [],
                value: [],
                classList: [],
                gradeList: [],
                schoolName: '',

                ruleForm: {
                    no: "",
                    classId: "",
                    gradeId: "",
                    schoolId:"",
                    schoolName: '',
                    studentIds: [],
                    teacherIds: [],
                    remark: ''
                },
                schoolList: [],
                filterMethod(query, item) {
                    return item.pinyin.indexOf(query) > -1;
                },

                options: regionData,

                selectedOptions: [],

                rules: {
                    no: [
                        {required: true, validator: novails ,  trigger: 'blur'},
                    ],
                    schoolId: [
                        {required: true, message: '请选择学校编号', trigger: 'blur'},
                    ],
                    glassAclass: [
                        {required: true, validator: noVali, message: '请选择年级和班级',  trigger: 'blur'},
                    ],
                },
                currentRow: null,   //数据id
                TIMEOUT: 0
            };
        },
        components: {MyPopup},
        methods: {
            // 改变学校编号
            changeSchoolNo() {
                this.ruleForm.schoolName= this.schoolList.filter(item => item.id == this.ruleForm.schoolId)[0].name;
            },
            // 获取详情
            getDetail() {
                let params = {id: this.currentRow.id};
                Ajax.Class.getDetail(params).then((res) => {
                    if (res.status == 200) {
                        if (res.data.content) {
                            this.ruleForm = res.data.content;
                            this.schoolList = res.data.content.schoolDtos;
                            this.gradeList = res.data.content.gradeTypes;
                            this.classList = res.data.content.classTypes;
                            let subjectAll = [];

                            res.data.content.studentAbleDtos.filter(temp => {
                                subjectAll.push({
                                    label: temp.name + '(' + temp.no + ')',
                                    key: temp.id,
                                    pinyin: temp.name
                                });
                            });
                            this.data =  subjectAll;
                            // 右侧数据
                            if (res.data.content.studentOriginDtos.length > 0) {
                                this.value = res.data.content.studentOriginDtos.map(temp => temp.id);
                            } else {
                                this.value = [];

                            }
                        }
                    }
                });
            },
            submitForm(formName) {
                if (this.TIMEOUT === 0) {
                    this.$refs[formName].validate((valid, obj) => {
                        if (valid) {
                            this.TIMEOUT++;
                            if (!this.currentRow) {//新增
                                var list = [];
                                this.ruleForm.no = this.removeSpecialCharacter(this.ruleForm.no);
                                this.ruleForm.schoolId = parseInt(this.ruleForm.schoolId);
                                this.ruleForm.classId = parseInt(this.ruleForm.classId);
                                this.ruleForm.gradeId = parseInt(this.ruleForm.gradeId);
                                this.ruleForm.studentIds = this.value;
                                list.push(
                                    this.ruleForm
                                );
                                Ajax.Class.post(list).then((res) => {
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
                                this.ruleForm.no = this.removeSpecialCharacter(this.ruleForm.no);
                                this.ruleForm.schoolId = parseInt(this.ruleForm.schoolId);
                                this.ruleForm.classId = parseInt(this.ruleForm.classId);
                                this.ruleForm.gradeId = parseInt(this.ruleForm.gradeId);
                                this.ruleForm.studentIds = this.value;
                                this.ruleForm.teacherIds = [];
                                Ajax.Class.put(
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
            },
            /**
             * 打开弹出框
             */
            openPopup(currentRow) {
                this.$refs.MyPopup.openPopup(...arguments);
                this.currentRow = currentRow;
                if (this.currentRow) {
                    // 编辑
                    // this.ruleForm= this.currentRow;
                    this.getDetail();
                } else {
                    //新增
                    this.getStudentList();
                    this.getSchoolList();
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
                this.ruleForm.classId = "";
                this.ruleForm.gradeId = "";
                this.ruleForm.studentIds = [];
                this.value= [];
                this.data = [];
                this.TIMEOUT = 0;
            },
            tellParentFresh() {
                this.$emit("refresh-list")
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

            // 获取学校
            getSchoolList() {
                let params ={
                    Id: null,
                    No: null,
                    Name: null,
                    ProvinceId: null,
                    CityId: null,
                    CountyId: null,
                    PageIndex: 1,
                    PageSize: 100000,
                };
                Ajax.School.get(params).then((res) => {
                    if ( res.status== 200) {
                        this.schoolList = res.data.content.pagedData;
                    }
                })
            },


            // 获取学生列表
            getStudentList() {
                let params ={
                    Id: null,
                    No: null,
                    Name: null,
                    ProvinceId: null,
                    CityId: null,
                    CountyId: null,
                    PageIndex: 1,
                    PageSize: 100000,
                };
                Ajax.Student.get(params).then((res) => {
                    if ( res.status== 200) {
                        let allTransferData = [];
                        if (   res.data.content.pagedData.length > 0) {
                            res.data.content.pagedData.filter (temp =>{
                                allTransferData.push(
                                    {
                                        label: temp.name + '(' + temp.no + ')',
                                        key: temp.id,
                                        pinyin: temp.name
                                    }
                                );
                            });
                        }
                        this.data = allTransferData;
                    }
                })
            },
        },
        computed: {
            title() {
                return this.currentRow ? ('修改班级') : '添加班级'
            }
        },
        created() {
        },
        mounted() {

            this.getdata(8);
            this.getdata(9);
        }
    }
</script>

<style lang="scss">
    .cameraList{
        display: flex;
        flex-direction: row;
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
