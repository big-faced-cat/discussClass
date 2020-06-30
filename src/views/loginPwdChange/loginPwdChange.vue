<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="s01_loginPwd">
        <ContentTitle>登录密码修改</ContentTitle>
        <ListCondition>
            <br>
            <br>
            <div class="contents">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="原密码" prop="oldPassword" style="width: 12.4rem" >
                        <el-input type="text" class="" v-model="ruleForm.oldPassword"
                                  placeholder="原密码"></el-input>
                    </el-form-item>
                    <el-form-item class="s01_search_input" label="密码" prop="newPassWord" style="width: 12.4rem">
                        <el-input   type='passWord'  class="" placeholder="新密码" v-model="ruleForm.newPassWord"></el-input>
                    </el-form-item>
                    <el-form-item class="s01_search_input" label="确认密码" prop="confirmPassword" style="width: 12.4rem">
                        <el-input   type='passWord'  class="" placeholder="确认密码" v-model="ruleForm.confirmPassword"></el-input>
                    </el-form-item>

                </el-form>
            </div>
            <el-button type="success" class="s01_compare_btn" size="medium" @click="submitForm('ruleForm')">更新密码
            </el-button>
        </ListCondition>
    </div>
</template>
<script>
    import ContentTitle from "../../components/ContentTitle.vue"
    import ListCondition from "../../components/ListCondition.vue"
    import Mytable from "../../components/Mytable.vue"
    import UserAdd from "../../components/users/UserAdd.vue"
    import UserEditPd from "../../components/users/UserEditPd.vue"
    import MyPopup from "../../components/MyPopup";


    export default {
        name: "loginPwdChange",
        components: {ContentTitle, ListCondition, Mytable, UserAdd, UserEditPd},
        data() {
            let dataAjax = this;
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.newPassWord) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback()
                }
            };
            return {
                ruleForm: {
                    oldPassword: "",
                    newPassWord: "",
                    confirmPassword: ""
                },
                rules:{
                    oldPassword:[
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ],
                    newPassWord: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6,  message: '长度在 6 个字符以上', trigger: 'blur'}
                    ],
                    confirmPassword:[
                        {required: true, message: '请输入确认密码', trigger: 'blur'},
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                },
                currentRow: null,//数据id
                TIMEOUT:0
            }
        },
        // components: {MyPopup},
        methods: {
            submitForm(formName) {
                if (this.TIMEOUT === 0) {
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            this.TIMEOUT++;
                            Ajax.User.ModifyPassword({
                                "oldPassword": this.ruleForm.oldPassword,
                                "newPassWord": this.ruleForm.newPassWord,
                                "confirmPassword": this.ruleForm.confirmPassword,
                                // id: this.currentRow.id
                            }).then((res) => {
                                console.log(res)
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
        },
        computed: {
            }
        ,
        mounted() {

        }
    }
</script>

<style lang="scss" scoped>
    .contents {
        padding-left: 30px;
        padding-bottom: 10px;
        /*border-bottom:  1px solid #ccc;*/
        p {
            margin-bottom: 10px;
            display: flex;
            align-items: center;

            span {
                display: block;
                width: 100px;
                text-align: right;
                padding-right: 10px;
            }
        }
    }
    .titless {

        /*font-size: larger;*/
        padding-top: 20px;
    }
    .s01_loginPwd {
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
    .s01_loginPwd {
        .s01_ketang_table {
            @media all and (max-width: 546px) {
                position: initial;
                .s01_table_table {
                    position: initial;
                }
                .s01_paginate_box {
                    position: initial;
                }
            }

        }
    }

    /*响应式*/

</style >
<style scoped>
    .s01_compare_btn{
        width: 272px !important;
        margin-left:140px !important;
    }

</style>