<template>
    <MyPopup ref="MyPopup" :title="title" @pop-close="closePopup">
        <div class="s01_DataBaseAdd">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="昵称" prop="nickname" v-if="currentRow" style="color:gray">
                    <span>{{currentRow.nickname}}</span>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                    <el-input type="text" class="" v-model="ruleForm.newPassword"
                    ></el-input>
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
    export default {
        name: "UserEditPd",
        props: [],
        data() {
            return {
                ruleForm: {
                    nickname:"",
                    newPassword: "",
                },
                rules: {
                    newPassword: [
                        {required: true, message: '请输入新密码', trigger: 'blur'},
                        {min: 6, message: '长度在 6 个字符以上', trigger: 'blur'}
                    ],
                },
                currentRow: null,//数据id
                TIMEOUT: 0
            };
        },
        components: {MyPopup},
        methods: {
            submitForm(formName) {
                if (this.TIMEOUT === 0) {
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            this.TIMEOUT++;
                            Ajax.User.ResetPassword({
                                "newPassword": this.ruleForm.newPassword,
                                id: this.currentRow.id
                            }).then((res) => {
                                if (res.data.content !== false) {
                                    this.closePopup()
                                } else {
                                    this.$notify.error({
                                        title: '错误',
                                        message: res.data.message ? res.data.message : "修改密码失败"
                                    });
                                }
                            }).finally(() => {
                                this.TIMEOUT = 0;
                            })
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
                this.$refs.MyPopup.openPopup(...arguments);
            },
            /**
             * 关闭自己
             */
            closePopup() {
                //关闭弹窗框
                this.$refs.MyPopup.closePopup(...arguments);
                this.resetForm("ruleForm");
            },
        },
        computed: {
            title() {
                return '重置密码'
            }
        }
        ,
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