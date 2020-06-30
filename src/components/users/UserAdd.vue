<template>
    <MyPopup ref="MyPopup" :title="title" @pop-close="closePopup">
        <div class="s01_DataBaseAdd">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
                <el-form-item label="员工编号" prop="staffNo" style="color:gray" v-if="!currentRow">
                    <el-input autofocus v-model="ruleForm.staffNo"  value='Admin' >
                        </el-input>
                </el-form-item>
                <el-form-item label="员工编号"  style="color:gray" v-if="currentRow">
                        <span>{{currentRow.staffNo}}</span>
                </el-form-item>
                 <el-form-item label="昵称" prop="nickname">
                    <el-input type="text" class="" v-model="ruleForm.nickname"> </el-input>
                </el-form-item>


                <el-form-item label="密码" prop="passWord" v-if="!currentRow">
                    <el-input   type='passWord'  class="" v-model="ruleForm.passWord"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPassword" v-if="!currentRow">
                    <el-input type='passWord' class="" v-model="ruleForm.confirmPassword"></el-input>
                </el-form-item>
                <el-form-item size="large">
                    <el-button type="primary" @click="submitForm('ruleForm')">{{TIMEOUT===0?(currentRow?"立即更新":"立即创建"):"提交中..."}}</el-button>
                    <el-button @click="closePopup">取消</el-button>
                </el-form-item>
            </el-form>

        </div>
    </MyPopup>

</template>
<script>
    import MyPopup from "../MyPopup.vue"
    export default {
        name: "UserAdd",
        props: [],
        data() {
                let dataAjax = this;
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.passWord) {
                    callback(new Error('两次输入密码不一致!'));
                }else{
                     callback()
                }
            };

            var   novails = (rule, value, callback) => {
                if (this.ruleForm.staffNo != '' && value != '' && /^[(A-Za-z) | (0-9)]*$/i.test(this.ruleForm.staffNo)) {
                    callback();
                } else {
                    callback(new Error('员工编号必须由数字或者字母组成且必填'));
                }
            };
            return {
                staffNoShow:[],
                ruleForm: {
                    staffNo: '',
                    nickname: '',
                    passWord:"",
                    confirmPassword:'',
                    role:""
                },
                rules: {
                    staffNo: [
                        {required: true, validator: novails,  trigger: 'change'},
                    ],
                    passWord: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6,  message: '长度在 6 个字符以上', trigger: 'blur'}
                    ],
                    nickname:[
                        {required: true, message: '请输入昵称', trigger: 'blur'},
                    ],
                    confirmPassword:[
                        {required: true, message: '请输入确认密码', trigger: 'blur'},
                    ],
                     role: [
                        {required: true, message: '角色不能为空', trigger: 'blur'},
                    ],
                },
                       options: [{}],
                        value1: [],
                currentRow: null,//数据id
                TIMEOUT:0
            };
        },
        components: {MyPopup},
        methods: {
            getDetail() {
                this.ruleForm = this.currentRow;
            },
            submitForm(formName) {
                if(this.TIMEOUT===0){
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            this.TIMEOUT++;
                            if (!this.currentRow) {//新增
                                let list = [];
                                list.push({
                                    staffNo: this.ruleForm.staffNo,
                                    nickname: this.ruleForm.nickname,
                                    passWord: this.ruleForm.passWord,
                                    confirmPassword: this.ruleForm.confirmPassword,
                                    role:this.ruleForm.role
                                });
                                Ajax.User.post(list).then((res) => {
                                        this.closePopup()
                                }).finally(()=>{
                                    this.TIMEOUT=0;
                                })
                            } else {//编辑
                                Ajax.User.put({
                                    staffNo: this.ruleForm.staffNo,
                                    nickname: this.ruleForm.nickname,
                                    id:this.ruleForm.id
                                }).then((res) => {
                                    if (res.status == 200) {
                                        this.closePopup()
                                    }
                                }).finally(()=>{
                                    this.TIMEOUT=0;
                                })
                            }
                        } else {
                            return false;
                        }
                    });
                }else{
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
                } else {
                    this.ruleForm.staffNo = '';
                    this.ruleForm.nickname = '';
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
                // this.resetForm("ruleForm");
                this.tellParentFresh();

                this.TIMEOUT = 0;
            },
            tellParentFresh() {
                this.$emit("refresh-list")
            }
        },
        computed: {
            title() {
                return this.currentRow ? ('编辑用户') : '添加用户'
            }
        },
        mounted() {

        }
    }
</script>

<style lang="scss">
    .s01_DataBaseAdd {
        .s01_database_text {
            textarea {
                height: 100%;
            }
        }
    }
</style>
