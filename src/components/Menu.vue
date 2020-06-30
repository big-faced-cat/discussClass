<template>
    <div class="s01_menu">
        <ul class="s01_menu_items">
            <router-link v-if="item.subMenu.length == 0 && item.ifshow "
                         v-for="(item,index) in list"  :to="item.to" tag="li" class="s01_menu_item" :key ="index-1" >
                <div v-on:click="changeActive(false)">
                <i :class="item.iconfont + ' font-color'" style="font-size: 20px" ></i>
                <div class="s01_menu_title">{{item.Content}}</div>
                </div>
            </router-link>
            <li :class=" lastActive ? 's01_menu_item   router-link-active' : 's01_menu_item'"  >
                <i class="el-icon-s-opportunity   font-color" style="font-size: 20px" ></i>

                <div class="s01_menu_title">系统设置</div>
                                <div class="sub_menu" v-on:click="changeActive(true)" >
                                    <router-link v-if="item1.ifshow"  v-for="(item1,index1) in list[6].subMenu"
                                                  :to="item1.to"  tag="li"  class="s01_menu_item1 " :key ="index1 + 'j'">
                                        <i :class="item1.iconfont"></i>
                                        <div class="s01_menu_title1">{{item1.Content}}</div>
                                    </router-link>
                                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Menu",
        data() {
            let getPowerData=  JSON.parse(localStorage.getItem('powerDictionary'));
            return {
                subMenu: 0,
                lastActive: false,
                list:[
                    {
                        to:'/sys/courseMan',
                        iconfont:'el-icon-s-opportunity',
                        Content:'课堂管理',
                        subMenu:[],
                        ifshow: true,
                    },
                    {
                        to:'/sys/classGrade',
                        iconfont:'el-icon-s-data',
                        Content:'课堂对比',
                        subMenu:[],
                        ifshow: true,
                    },
                    {
                        to:'/sys/patolClass',
                        iconfont:'el-icon-message-solid',
                        Content:'巡课',
                        subMenu:[],
                        ifshow:  true,
                    },
                    {
                        to:'/sys/comprehensiveQuery',
                        iconfont:'el-icon-s-promotion',
                        Content:'综合查询',
                        subMenu:[],
                        ifshow: true,
                    },
                    {
                        to:'/sys/abnormalClass',
                        iconfont:'el-icon-s-management',
                        Content:'课堂异常',
                        subMenu:[],
                        ifshow: getPowerData['get-abnormalClass-null'],
                    },
                    {
                        to:'/sys/myclass',
                        iconfont:'el-icon-s-comment',
                        Content:'我的班级',
                        subMenu:[],
                        ifshow: getPowerData['get-class-my'],
                    },
                    {
                        to:'/sys/school/list',
                        iconfont:'el-icon-s-finance',
                        Content:'系统设置',
                        subMenu:[{
                                to:'/sys/school',
                                iconfont:'el-icon-s-grid',
                                Content:'学校管理',
                                ifshow:  getPowerData['get-school-null'],
                        },
                            {
                                to:'/sys/dataBase',
                                iconfont:'el-icon-share',
                                Content:'基础数据管理',
                                ifshow: getPowerData['get-essentialdata-null'],
                            },
                            {
                                to:'/sys/users',
                                iconfont:'el-icon-s-claim',
                                Content:'用户管理',
                                ifshow: getPowerData['get-user-null'],
                            },
                            {
                                to:'/sys/teachers',
                                iconfont:'el-icon-s-marketing',
                                Content:'教师管理',
                                ifshow:  getPowerData['get-teacher-null'],
                            },
                            {
                                to:'/sys/classroom',
                                iconfont:'el-icon-s-help',
                                Content:'教室管理',
                                ifshow:getPowerData['get-classroom-null'],
                            },
                            {
                                to:'/sys/classManage',
                                iconfont:'el-icon-s-goods',
                                Content:'班级管理',
                                ifshow: getPowerData['get-class-null'],
                            },
                            {
                                to:'/sys/students',
                                iconfont:'el-icon-s-data',
                                Content:'学生管理',
                                ifshow: getPowerData['get-student-null'],
                            },
                            {
                                to:'/sys/camera',
                                iconfont:'el-icon-video-camera-solid',
                                Content:'摄像头管理',
                                ifshow: getPowerData['get-camera-null'],
                            },
                            {
                                to:'/sys/userRole',
                                iconfont:'el-icon-s-grid',
                                Content:'角色权限管理',
                                ifshow:  getPowerData['get-role-null'],
                            },
                        ]
                    }
                ]
            }
        },
        methods:{
            changeActive(params){
                this.lastActive =  params;
            }

        },
        mounted() {
            console.log('ddddddddddddddddd',  JSON.parse(localStorage.getItem('powerDictionary')) );
        }
    }
</script>

<style scoped lang="scss" >

    .s01_menu {
        background: #fff;
        position: absolute;
        top:68rem * 480 / (1200 * 12);
        left:0;
        width:86rem * 480 / (1200 * 12);
        .s01_menu_items {
            height: auto;
            .s01_menu_item {
                padding-top: 18rem*480/(1200*12);
                height: 75rem*480/(1200*12);
                font-size: 12rem*480/(1200*12);
                color: rgb(122, 122, 122);
                cursor: pointer;
                text-align: center;
                transition: font-size .1s linear;
                border-left: 4rem * 480 / (1200 * 12) solid transparent;
                text-indent: -4px;
                .font-color {
                    color: $color-yellow;
                }
                div{
                    .font-color {
                        color: $color-yellow;
                    }
                }
                .sub_menu{
                    display: none;
                }
                &:hover {
                    background: #eee;
                    .sub_menu{
                        display: block;
                        position: absolute;
                        left: 87px;
                        bottom: 0px;
                        z-index: 20000;
                        width: 100px;
                        background: #eee !important;
                        .s01_menu_item1 {
                            padding-top: 18rem*300/(1200*12);
                            height: 75rem*300/(1200*12);
                            font-size: 12rem*480/(1200*12);
                            color: rgb(122, 122, 122);
                            border-bottom: 1px solid #ccc;
                            background: #eee;
                            cursor: pointer;
                            text-align: center;
                            transition: font-size .1s linear;
                            border-left: 4rem * 480 / (1200 * 12) solid transparent;
                            text-indent: -4px;
                            &:hover {
                                background: white;
                            }


                            &.router-link-active {
                                background-color: $color-yellow !important;
                                /*color: #fdb045;*/
                                /*border-left-color: #fdb045;*/
                                div {
                                    .font-color {
                                        color: $color-white ;
                                    }
                                }
                            }
                        }
                        }
                }
                .iconfont {
                    font-size: 16rem*480/(1200*12);
                    display: block;
                }
                .s01_menu_title {
                    height: 25rem*480/(1200*12);
                    line-height: 25rem*480/(1200*12);
                }

                &.router-link-active {
                    background-color: $color-yellow !important;
                    color: $color-white;
                    /*border-left-color: #fdb045;*/
                }
            }
            .router-link-active {
                .font-color {
                    color:  $color-white;
                }
                div {
                    .font-color {
                        color: $color-white;
                    }
                }

            }}
    }
</style>
