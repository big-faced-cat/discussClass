<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="s01_usersList">
        <ContentTitle>开课
            <el-button type="success"  style="float: right; margin-right: 30px" size="medium" @click="backPage">
                返回
            </el-button>

        </ContentTitle>
        <ListCondition>

            <p class="titless"> 场所信息</p>
            <div class="contents">
            <p>
            <span>学校 </span>

            <el-select class="s01_search_input" v-model="value5" filterable placeholder="学校名称" style="width:400px;"  clearable size="medium">
            <el-option
                    v-for="item in options5"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
            </el-option>
            </el-select>

            </p>

            <p>
                <span>教师 </span>

                <el-select class="s01_search_input" v-model="value5" filterable placeholder="学科" style="width:400px;"
                           clearable
                           size="medium">
                    <el-option
                            v-for="item in options5"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>

            </p>
            </div>

            <p class="titless"> 人员信息</p>
            <div class="contents">
                <p>
                    <span>教师名称 </span>

                    <el-select class="s01_search_input" v-model="value5" filterable placeholder="教师名称" style="width:400px;"
                               clearable
                               size="medium">
                        <el-option
                                v-for="item in options5"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>

                </p>

                <p>
                    <span>班级 </span>

                    <el-select class="s01_search_input" v-model="value5" filterable placeholder="班级" style="width:400px;"
                               clearable
                               size="medium">
                        <el-option
                                v-for="item in options5"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>

                </p>
            </div>



            <p class="titless"> 课程信息</p>
            <div class="contents">
                <p>
                    <span>课堂信息 </span>

                    <el-select class="s01_search_input" v-model="value5" filterable placeholder="课" style="width:100px; padding-right: 5px;"
                               clearable
                               size="medium">
                        <el-option
                                v-for="item in options5"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>

                    <el-select class="s01_search_input" v-model="value5" filterable placeholder="学科" style="width:100px; padding-right: 5px;"
                               clearable
                               size="medium">
                        <el-option
                                v-for="item in options5"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>

                    <el-select class="s01_search_input" v-model="value5" filterable placeholder="授课类型" style="width:100px; padding-right: 5px;"
                               clearable
                               size="medium">
                        <el-option
                                v-for="item in options5"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </p>

                <p>
                    <span>课堂内容 </span>

                    <el-select class="s01_search_input" v-model="value5" filterable placeholder="课堂内容" style="width:400px;"
                               clearable
                               size="medium">
                        <el-option
                                v-for="item in options5"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>

                </p>
                <p>
                    <span>备注 </span>

                    <el-select class="s01_search_input" v-model="value5" filterable placeholder="备注" style="width:400px;"
                               clearable
                               size="medium">
                        <el-option
                                v-for="item in options5"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>

                </p>
            </div>



            <el-button type="success" class="s01_compare_btn" size="medium" @click="openAdd()">开始上课
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

    export default {
        name: "openClassList",
        components: {ContentTitle, ListCondition, Mytable, UserAdd, UserEditPd},
        data() {
            return {
                options1: [
                    {
                        value: '选项1',
                        label: '黄金糕'
                    }, {
                        value: '选项2',
                        label: '双皮奶'
                    }, {
                        value: '选项3',
                        label: '蚵仔煎'
                    }, {
                        value: '选项4',
                        label: '龙须面'
                    }, {
                        value: '选项5',
                        label: '北京烤鸭'
                    }],
                value1: '',
                options2: [
                    {
                        value: '选项1',
                        label: '黄金糕'
                    }, {
                        value: '选项2',
                        label: '双皮奶'
                    }, {
                        value: '选项3',
                        label: '蚵仔煎'
                    }, {
                        value: '选项4',
                        label: '龙须面'
                    }, {
                        value: '选项5',
                        label: '北京烤鸭'
                    }],
                value2: '',
                tableHead: [
                    {type: "selection", prop: "", label: "序号", width: "50"},
                    {type: "", prop: "username", label: "员工编号", minWidth: "180"},
                    {type: "", prop: "nickname", label: "昵称", minWidth: "180"},
                ],
                tableData: [],
                keyword: "",//模糊搜索
                multipleSelection: [],//勾选框列表选中的行

            }
        },
        methods: {
            // 返回
            backPage() {
                this.$router.push({
                    name: "courseManList"
                });
            },
            refresh() {
                var params = {
                    id: null,
                    UsernameOrNickname: this.keyword,
                };
                Ajax.User.get(params).then((res) => {
                    if (res.data.code == 200) {
                        this.tableData = res.data.content
                    }
                })
            },
            /**
             * 打开 添加的 弹出框
             */
            openAdd() {
                this.$refs.UserAdd.openPopup(null)
            },
            /**
             * 打开 编辑的 弹出框
             */
            openEdit(index,item,rowObj) {
                if (item) {
                    this.$refs.UserAdd.openPopup(item)
                } else {
                    layer.msg("请勾选一条记录")
                }
            },
            /**
             * 打开 编辑的 弹出框
             */
            openEditPd(index,item,rowObj) {
                if (item) {
                    this.$refs.UserEditPd.openPopup(item)
                } else {
                    layer.msg("请勾选一条记录")
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            clickDel() {
                if (this.multipleSelection.length === 0) {
                    this.$notify({
                        title: "注意",
                        message: "至少勾选一条记录"
                    });
                    return;
                }
                layer.confirm("确认删除" + this.multipleSelection.length + "项", (layro) => {
                    var ids = [];
                    this.multipleSelection.map((item) => {
                        ids.push(item.id)
                    });
                    Ajax.User.delete(ids).then((res) => {
                        if (res.data.code == 200) {
                            this.refresh()
                            layer.close(layro)
                        }
                    })
                })
            }
        },
        mounted() {
            // this.refresh();
        }
    }
</script>

<style lang="scss">
    .contents {
        padding-left: 30px;
        padding-bottom: 10px;
        border-bottom:  1px solid #ccc;
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
    .s01_usersList {
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
    .s01_usersList {
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

</style>
