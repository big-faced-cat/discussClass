<template>
    <div class="S01_login" @keydown.enter="submit">
        <div class="S01_login_box">
            <div class="S01_login_forms">
                <div class="S01_login_title1">小阳教学质量评测系统</div>
                <div class="S01_login_username">
                    <i class="iconfont">&#xe663;</i>
                    <input id="userName" v-model="userName" type="text" placeholder="请输入用户名">
                </div>
                <div class="S01_login_password">
                    <i class="iconfont">&#xe661;</i>
                    <input id="password" v-model="password" type="password" placeholder="请输入密码">
                </div>
                <div class="S01_login_submit" @click="submit">{{TIMEOUT===0?"登录":"登录中..."}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                TIMEOUT: 0,
                userName: "",
                password: ""
            }
        },
        methods: {
            submit() {
                console.log('login');
                        this.$store.commit("userA", 'www');
                        this.$store.commit("tokenA", 'eee');
                this.TIMEOUT = 0;

                if (this.TIMEOUT === 0) {
                    var params = {
                        userName: this.userName,
                        password: this.password
                    };
                    if (params.userName.trim().length === 0) {
                        this.$notify.error({
                            message: "!请输入用户名"
                        })
                        return false;
                    }
                }

                if (params.userName.trim().length <= 1) {
                    this.$notify.error({
                        message: "!用户名至少1位"
                    });
                    return false;
                }
                if (params.password.trim().length === 0) {
                    this.$notify.error({
                        message: "!请输入密码"
                    });
                    return false;
                }
                if (params.password.trim().length <= 5) {
                    this.$notify.error({
                        message: "!密码至少6位"
                    });
                    return false;
                }

                this.TIMEOUT++;
                params = {
                    staffNo: this.userName,
                    password: this.password
                };

                Ajax.User.login(params).then((res) => {
                    var dic = new Object();
                    if (res.status == 200) {
                        var result = res.data;
                        var token = "Bearer " + res.data.content.token;
                        this.$store.commit("userA", result.content);
                        // 对权限进行处理 permissions
                        result.content.permissions.filter(temp => {
                            let keys = temp.method + '-' + temp.controllerName + '-' + temp.actionName;
                            dic[keys] = true;
                        })
                        localStorage.setItem('powerDictionary',JSON.stringify(dic));
                        this.$store.commit("tokenA", token);
                        this.$router.push({
                            name: "courseManList"
                        });
                    } else {
                        this.$notify.error({
                            message: res.data.message ? res.data.message : "用户名或密码错误"
                        });
                    }
                }).finally(() => {
                    this.TIMEOUT = 0;
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .S01_login {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        background: url(../../static/imgs/login_bg.jpg) no-repeat center;
        -webkit-background-size: cover;
        background-size: cover;

        .s01_error_msg {
            color: #ff361c;
            font-size: 24rem*480/(1920*12);
            margin-top: 5rem*480/(1920*12);
            height: 24rem*480/(1920*12);
        }
    }

    .S01_login .S01_login_box {
        align-self: center;
        width: 845rem*480/(1920*12);
        height: 455rem*480/(1920*12);
        border-radius: 12px;
        background: url(../../static/imgs/lg_ch.png) no-repeat 45rem*480/(1920*12) center, linear-gradient(to bottom, rgb(255, 231, 153), rgb(255, 205, 43));
        -webkit-background-size: auto 300*100%/454;
        background-size: auto 300*100%/454;
    }

    .S01_login .S01_login_box .S01_login_forms {
        height: 100%;
        position: relative;
        float: right;
        border-radius: 0 12px 12px 0;
    }

    .S01_login .S01_login_box .S01_login_forms .S01_login_title1 {
        font-size: 21rem*480/(1920*12);
        color: rgb(255, 195, 0);
        letter-spacing: 0.01rem;
        margin-top: 99rem*480/(1920*12);
        margin-bottom: 40rem*480/(1920*12);
    }

    .S01_login {
        .S01_login_box {
            box-shadow: 0px 5px 10px 1px rgba(51, 51, 51, 0.35);

            .S01_login_forms {
                width: 392rem*480/(1920*12);
                padding: 0 39rem*480/(1920*12);
                background: #fff;

                input {
                    background: transparent;
                    border: none;
                    width: 280rem*480/(1920*12);
                    float: right;
                    outline: none;
                    -webkit-appearance: none;
                }

                .S01_login_username, .S01_login_password {
                    height: 40rem*480/(1920*12);
                    border-bottom: 1px solid rgb(220, 224, 234);
                    width: 100%;
                    margin-top: 20rem*480/(1920*12);

                    .iconfont {
                        font-size: 18rem*480/(1920*12);
                        color: #ffc300;
                        vertical-align: super;
                    }
                }

                .S01_login_submit {
                    margin-top: 26rem*480/(1920*12);
                    width: 100%;
                    height: 45rem*480/(1920*12);
                    line-height: 45rem*480/(1920*12);
                    color: #fff;
                    background: rgb(255, 195, 9);
                    font-size: 16rem*480/(1920*12);
                    text-align: center;
                    border-radius: 3px;
                    cursor: pointer;
                }
            }
        }
    }


</style>
