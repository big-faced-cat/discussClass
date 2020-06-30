<template>
    <MyPopup ref="MyPopup" title="班级分配" @pop-close="closePopup">
        <div class="s01_StudentAdd">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="工 号" prop="StaffNo">
                    <label> {{ruleForm.StaffNo}}</label>
                </el-form-item>

                <el-form-item label="姓 名" prop="Name">
                    <label> {{ruleForm.Name}}</label>
                </el-form-item>
                <el-form-item label="班 级" prop="Classes">
                    <el-transfer
                            filterable
                            :filter-method="filterMethod"
                            filter-placeholder="请输入班级名称"
                            v-model="value"
                            :titles="['可选班级', '已选班级']"
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
    import Picut from "./picCutComponent"
    export default {
        name: "StudentAdd",
        props: [],
        data() {
            var photoVali = (rule, value, callback) => {
                if (this.currentRow==""&&value=="") {
                    callback(new Error('请上传供人脸识别的头像'));
                } else {
                    callback();
                }
            };
            return {
                data: [],
                value: [],
                filterMethod(query, item) {
                    return item.pinyin.indexOf(query) > -1;
                },
                ruleForm: {
                    Name: "",
                    Avatar: "",
                    Gender: null,
                    DegreeId: 0,
                    Birthdate: null,
                    TakeJobDate: null,
                    StaffNo: ""
                },
                rules: {
                    // Name: [
                    //     {required: true, message: '请输入姓名', trigger: 'blur'},
                    //     {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
                    // ],
                    Avatar: [
                        {required: true, message: '请选择照片', trigger: 'blur'},
                    ],
                },
                currentRow: null,//数据id
                TIMEOUT: 0,
                imageUrl: '',
                imageObj: null
            };
        },
        components: {MyPopup,Picut},
        methods: {
            getDetail() {
                Ajax.Teacher.getDetail({
                    id: this.currentRow.id
                }).then((res) => {
                    console.log('获取到的详情', res)
                    if (res.status == 200 && res.data.content) {
                        let content = res.data.content;
                        console.log('res.data.contentres.data.content',res.data.content)
                        this.ruleForm.Name = content.name;
                        this.ruleForm.Gender = content.gender;
                        this.ruleForm.DegreeId = content.degreeId;
                        this.ruleForm.Birthdate = content.birthdate;
                        this.ruleForm.TakeJobDate = content.takeJobDate;
                        this.ruleForm.StaffNo = content.staffNo;

                        let subjectAll = [];

                        res.data.content.classAbleDtos.filter(temp => {
                            subjectAll.push({
                                label: temp.no + '(' + temp.schoolName + ')',
                                key: temp.id,
                                pinyin: temp.no
                            });
                        });
                        this.data =  subjectAll;
                        // 右侧数据
                        if (res.data.content.classOriginDtos.length > 0) {
                            this.value = res.data.content.classOriginDtos.map(temp => temp.id);
                        } else {
                            this.value = [];

                        }

                    }
                })
            },
            submitForm(formName) {
                console.log('4444444444444', this.imageUrl);
                if (this.TIMEOUT === 0) {
                    this.$refs[formName].validate((valid, obj) => {
                        if (valid) {
                            this.TIMEOUT++;
                            if (!this.currentRow) {//新增
                                var formData = new FormData();
                                formData.append("Name", this.ruleForm.Name);
                                formData.append("Number", this.ruleForm.Number);
                                formData.append("ClassGradeId", this.ruleForm.ClassGradeId);
                                formData.append("AvatarImage", this.ruleForm.AvatarImage);
                                Ajax.Student.post(formData).then((res) => {
                                    if (res.data.code == 200) {
                                        if (res.data.content != 0) {
                                            this.closePopup()
                                        } else {
                                            this.$notify.error({
                                                title: "错误",
                                                message: "添加失败! 请检查数据是否正确"
                                            })
                                        }
                                    }else{
                                        if(res.data.message=="failed to upload photo."){
                                            this.$notify.error({
                                                title: "错误",
                                                message: "添加失败! 照片上传失败!"
                                            })
                                        }else{
                                            this.$notify.error({
                                                title: "错误",
                                                message: "添加失败! 请检查数据是否正确"
                                            })
                                        }

                                    }
                                }).finally(() => {
                                    this.TIMEOUT = 0;
                                })
                            } else {//编辑
                                let that = this;
                                let params = {
                                    teacherId: this.currentRow.id,
                                    classIds: this.value,
                                }
                                Ajax.Teacher.assignClass(
                                    params
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
                this.currentRow = currentRow;
                if (this.currentRow) {
                    this.getDetail()
                }
                this.$refs.MyPopup.openPopup(...arguments);
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
                this.imageUrl="";
                this.imageObj=null;
                this.TIMEOUT = 0;
            },
            tellParentFresh() {
                this.$emit("refresh-list")
            },
            /**
             * 获取年级
             */
            getGradeList() {
                Ajax.EssentialData.getGradeList().then((res) => {
                    this.options1 = res.data.content;
                })
            },
            /**
             * 获取班级(注意!classGrade中关联过的班级)
             */
            getClassGradeList(gradeId) {
                if (gradeId != '') {
                    var params = {
                        GradeId: gradeId
                    };
                    Ajax.ClassGrade.get(params).then((res) => {
                        this.options2 = res.data.content.data;
                    })
                } else {
                    this.options2 = [];
                    this.ruleForm.classGradeId = "";
                }

            },
            handleAvatarSuccess(res, file) {
                console.log('图片成功后的', file);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
                const isLt2M = file.size / 1024  < FILE_SIZE;
                if (!isJPG) {
                    this.$notify.error('上传头像图片只能是 JPG|PNG 格式!');
                    return false;
                }
                if (!isLt2M) {
                    this.$notify.error('上传头像图片大小不能超过 2MB!');
                    return false;
                }
                this.imageUrl = URL.createObjectURL(file);
                console.log('this.imageUrlthis.imageUrlthis.imageUrl', this.imageUrl);
                this.ruleForm.Avatar = file;
                return false;
            }
        },
        computed: {
            title() {
                return (this.currentRow ? ('修改') : '添加') + "教师"
            },
            FILE_SIZE(){
                return FILE_SIZE/1024+"MB";
            }
        },
        created() {
            // this.getGradeList();
        },
        mounted() {

        }
    }
</script>

<style lang="scss">
    .datatimeCss{
        z-index: 100000000000 !important;
    }
    .s01_StudentAdd {
        .s01_database_text {
            textarea {
                height: 100%;
            }
        }
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        max-width: 178px;
        max-height: 178px;
        display: block;
    }
</style>
