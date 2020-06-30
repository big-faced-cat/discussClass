<template>
    <div class="s01_head">
        <div class="s01_head_title">小阳教学质量评测系统</div>
        <div class="s01_head_coms">
            <el-menu
                    class="el-menu-demo hederCss"
                    mode="horizontal"
                    background-color="#ffc309"
                    text-color="#fff"
                    active-text-color="#ffd04b"
            >
                <el-submenu index="2" >
                    <template slot="title">
                        <i class="iconfont" style="color:#ffffff">&#xe61f;</i>
                        <span style="color:#fff;height:200px; !important;">{{user}}</span>
<!--                        <span class="s01_wh_l">{{user}}</span>-->
                    </template>
                    <el-menu-item index="2-1"  @click="loginOut" >
                        <i class="iconfont s01_loginout" style="color:#fff;padding:0">&#xe672;</i>
                        注销
                    </el-menu-item>
                    <el-menu-item index="2-2"  @click="openChangePwd()">
                        <i class="iconfont" style="color:#fff">&#xe61f;</i>
                        修改密码
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
    </div>
</template>

<script>

    export default {
        name: "Head",
        data() {
            return {
              user:'',
            }
        },
        currentRow:null,
        methods: {
            loginOut() {
                this.$confirm('确认退出吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(arguments,this);
                    this.$store.commit("userA", null)
                    this.$store.commit("tokenA", null)

                    this.$notify.success({
                        message: '退出成功!'
                    });

                    this.$router.push({
                        name:"Login"
                    })
                }).catch(() => {
                });
            },
            openChangePwd() {
                    this.$router.push({
                        name: "loginPwdChange"
                    });
            },
        },
        mounted() {
            this.user =  this.$store.state.user.nickname
            console.log('4444444444444444444444',  this.$store.state.user.nickname);
        },
        computed:{
        }
    }
</script>

<style scoped lang="scss" >
    .s01_head {
        flex-basis: 100%;
        height: 68rem*480/(1200*12);
        background-color: $color-yellow;
        border-bottom: 1px solid  $color-orange;
        .s01_head_title {
            float: left;
            padding-left: 50rem*480/(1200*12);
            height: 68rem*480/(1200*12);
            line-height: 68rem*480/(1200*12);
            font-size: 18rem*480/(1200*12);
            color: #fff;
            background: url(../../static/imgs/logo.png) no-repeat 12rem*480/(1200*12) center;
            background-size: auto 27*100%/68;
        }
        .s01_head_coms {
            float: right;
            height: 100%;
            padding-top: 25rem*480/(1200*12);
            * {
                font-size: 14rem*480/(1200*12);
                vertical-align: baseline;

            }
            ul.el-menu-demo.el-menu--horizontal.el-menu{
                .s01_wh_l {
                    /*border-right: 1px solid rgb(250, 216, 160);*/
                    padding-right: 11rem*480/(1200*12);
                }
                .s01_loginout {
                      padding-right: 11rem*480/(1200*12);
                      cursor: pointer;
                  }
            }
            color: #fff;
            line-height: 0;
        }

    }
    el-menu el-menu--popup el-menu--popup-bottom-start{
        background: red !important;
    }
    .el-submenu{
        width: 130px !important;
        margin-top:-17px !important;
    }
    .el-menu-item{
        height:45px !important;
    }

</style>
<style>
    .el-submenu__title{
        height:68px !important;
        margin-top:-8px !important;
        line-height: 68px !important;
    }
</style>


