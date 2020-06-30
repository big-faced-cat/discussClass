<template>
    <MyPopup ref="MyPopup" :title="title" @pop-close="closePopup">
        <div class="s01_StudentAdd">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="学 号" prop="no">
                    <el-input autofocus v-model="ruleForm.no" style="width:217px;"
                    placeholder=""
                    ></el-input>
                </el-form-item>
                <el-form-item label="姓 名" prop="name">
                    <el-input autofocus v-model="ruleForm.name" style="width:217px;"
                              placeholder=""
                    ></el-input>
                </el-form-item>
                <el-form-item label="性 别" prop="gender">
                    <el-radio-group v-model="ruleForm.gender">
                        <el-radio :label="true">男</el-radio>
                        <el-radio :label="false">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="出生日期" prop="birthdate">
                    <el-date-picker
                            popper-class="birthData_css"
                            align="right"
                            v-model="ruleForm.birthdate"
                            format="yyyy-MM-dd"
                            type="date"
                            placeholder="">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="头 像" prop="AvatarImage">
                <!-- 、、、、、、、、、、 头像设置、、、、、、、、、、、、、、-->
                    <PicutTest   :filess="null"  :add="ifAdd"  :imgUrl="imgUrl"  @refresh-picData="refreshPic"/>
                </el-form-item>
                <el-form-item size="large">
                    <el-button type="primary" @click="submitForm('ruleForm')" style="margin-left:15%">
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
    import Picut from "../teacher/picCutComponent"
    import PicutTest from "../../components/picCut"
    import moment from "moment";
    export default {
        name: "StudentAdd",
        props: [],
        data() {

            var   novails = (rule, value, callback) => {
                if (this.ruleForm.no != '' && value != '' && /^[(A-Za-z) | (0-9)]*$/i.test(this.ruleForm.no)) {
                    callback();
                } else {
                    callback(new Error('学号必须由数字或者字母组成且必填'));
                }
            };
            var photoVali = (rule, value, callback) => {
                if (this.imagesUrl=="") {
                    callback(new Error('请上传供人脸识别的头像'));
                } else {
                    callback();
                }
            };

            return {
                imagesUrl: null,
                imgUrl: '',
                ifAdd: true,
                ruleForm: {
                    "name": "",
                    "gender": true,
                    "birthdate": "",
                    "avatarName": null,
                    "avatarExtension": null,
                    "recognition": null,
                    "remark": "",
                    "no": "",
                    "AvatarImage": '',
                },
                rules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                    ],
                    no: [
                        {required: true,  validator:  novails, trigger: 'blur'},
                    ],
                    birthdate: [
                        {required: true, message: '请选择出生日期', trigger: 'blur'},
                    ],
                    gender: [
                        {required: true, message: '请选择性别', trigger: 'blur'},
                    ],
                    AvatarImage: [
                        {required: true,validator: photoVali, trigger: 'blur'},
                    ]
                },
                currentRow: null,//数据id
                TIMEOUT: 0,
                imageUrl: null,
                imageObj: null
            };
        },
        components: {MyPopup,Picut, PicutTest},
        methods: {
            refreshPic(para) {
                this.imagesUrl = para;
            },
            getDetail() {
                Ajax.Student.get({
                    id: this.currentRow.id
                }).then((res) => {
                    console.log('获取到的数据000000000000', res );
                    if (res.status == 200 && res.data.content.pagedData.length > 0) {
                        this.ruleForm = res.data.content.pagedData[0];
                    }
                })
            },
            submitForm(formName) {
                if (this.TIMEOUT === 0) {
                    this.$refs[formName].validate((valid, obj) => {
                        if (valid) {
                            this.TIMEOUT++;
                            if (!this.currentRow) {//新增
                                var formData = new FormData();
                                formData.append("name", this.ruleForm.name);
                                formData.append("no", this.ruleForm.no);
                                formData.append("gender", this.ruleForm.gender);
                                formData.append("birthdate", moment.utc( this.ruleForm.birthdate).format("YYYY-MM-DD HH:mm:ss"));
                                formData.append("avatarName", this.ruleForm.avatarName);
                                formData.append("avatarExtension", this.ruleForm.avatarExtension);
                                formData.append("recognition", this.ruleForm.recognition);
                                formData.append("AvatarImage", this.imagesUrl );
                                Ajax.Student.post(formData).then((res) => {
                                    if (res.status == 200) {
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
                                console.log('编辑form数据', this.ruleForm);
                                var formData = new FormData();
                                formData.append("id", this.ruleForm.id);
                                formData.append("name", this.ruleForm.name);
                                formData.append("no", this.ruleForm.no);
                                formData.append("gender", this.ruleForm.gender);
                                formData.append("birthdate", moment.utc( this.ruleForm.birthdate).format("YYYY-MM-DD HH:mm:ss"));
                                formData.append("avatarName", this.ruleForm.avatarName);
                                formData.append("avatarExtension", this.ruleForm.avatarExtension);
                                formData.append("recognition", this.ruleForm.recognition);
                                formData.append("AvatarImage", this.imagesUrl );
                                if(this.ruleForm.avatarImage){
                                    formData.append("AvatarImage", this.ruleForm.avatarImage);
                                }
                                Ajax.Student.put(formData).then((res) => {
                                    if (res.status == 200) {
                                        if (res.data.content != 0) {
                                            this.closePopup()
                                        } else {
                                            this.$notify.error({
                                                title: "错误",
                                                message: "更新失败! 请检查数据是否正确"
                                            })
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
                    this.getDetail();
                    this.imgUrl =this.currentRow.avatarPath;
                    this.ifAdd = false;
                } else {
                    this.ifAdd = true;
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
                this.imageUrl = URL.createObjectURL(file.raw);
                console.log('8888888',    this.imageUrl);

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
                console.log('fffffffffffffff', this.imageUrl)
                this.ruleForm.AvatarImage = file;
                return false;
            }
        },
        computed: {
            title() {
                return (this.currentRow ? ('修改') : '添加') + "学生"
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
    .birthData_css{
        z-index: 100000000000 !important;
    }
    .s01_StudentAdd {
        height:600px;
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
