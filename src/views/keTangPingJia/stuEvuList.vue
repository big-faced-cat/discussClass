<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="s01_stuEvuList">
        <ContentTitle>一年级一班 物理 李老师</ContentTitle>
        <ListCondition>
            <router-link :to="{name:'classEvalView'}" class="s01_content_link">课堂评价</router-link>
            <router-link :to="{name:'stuEvuList'}" class="s01_content_link">学生评价</router-link>
            <el-button type="success"  style="float: right; margin-right: 30px" size="medium" @click="backPage">
                返回
            </el-button>
        </ListCondition>
        <div class="s01_ketang_table">
            <Mytable     :tableHead="tableHead" :tableData="tableData">
                <!--列表删选条件-->
                <template v-slot:tableConditions="slotProps">
                    <el-row>
                        <el-input class="s01_search_input"
                                  placeholder="请输入内容"
                                  v-model="keyword" size="medium" suffix-icon="el-icon-search"
                                  clearable>
                        </el-input>
                        <el-button type="success" size="medium" class="s01_compare_btn" @click="studentsCompare">对比</el-button>
                    </el-row>
                </template>

                <!--列表删选条件-->

                <!--列表操作-->
                <template v-slot:tableActions="slotProps">
                    <i class="iconfont s01_table_ck"
                       @click="handleView(slotProps.scopeT.$index, slotProps.scopeT.row,slotProps.scopeT)">&#xe62d;</i>
                </template>
                <!--列表操作-->
            </Mytable>
        </div>
    </div>
</template>
<script>
    import ContentTitle from "../../components/ContentTitle.vue"
    import ListCondition from "../../components/ListCondition.vue"
    import DateRanger from "../../components/DateRanger.vue"
    import Mytable from "../../components/Mytable.vue"

    export default {
        name: "stuEvuList",
        components: {ContentTitle, ListCondition, DateRanger, Mytable},
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
                keyword: "",//模糊查询
                tableHead: [
                    {type: "index", prop: "", label: "序号", minWidth: "800"},
                    {type: "", prop: "date", label: "头像", minWidth: "180"},
                    {type: "", prop: "name", label: "学号", minWidth: "80"},
                    {type: "", prop: "name", label: "姓名", minWidth: "100"},
                    {type: "", prop: "name", label: "活跃时间占比", minWidth: "140"},
                    {type: "", prop: "name", label: "倾听时间占比", minWidth: "140"},
                    {type: "", prop: "name", label: "思考时间占比", minWidth: "140"},
                    {type: "", prop: "name", label: "注意力集中时间占比", minWidth: "200"},
                    {type: "", prop: "name", label: "注意力分散时间时间占比", minWidth: "210"},
                ],
                tableData: [
                    {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-08',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-06',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-07',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-07',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-07',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-07',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-07',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-07',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }],

            }
        },
        methods: {
            // 返回
            backPage() {
                this.$router.push({
                    name: "courseManList"
                });
            },
            /**
             * 详情页
             * @param index
             * @param row
             */
            handleView(index, row) {
                this.$router.push({
                    name: "stuEvuView"
                })
            },
            /**
             * 学生对比
             */
            studentsCompare(){
                this.$router.push({name:"StudentsDuiBi"})
            }
        }
    }
</script>

<style lang="scss">
    .s01_stuEvuList {
        .s01_ketang_table {
            position: absolute;
            top: 137rem * 480 / (1200 * 12);
            bottom: 0;
            left: 20rem * 480 / (1200 * 12);
            right: 0;
            overflow: auto;

            .s01_table_table {
                position: absolute;
                top: 60rem * 480 / (1200 * 12);
                bottom: 146rem * 480 / (1200 * 12);
                left: 10rem * 480 / (1200 * 12);
                right: 0rem * 480 / (1200 * 12);
                overflow: auto;
            }
        }

        .s01_search_input {
            width: 200rem * 480 / (1200 * 12);
            margin-right: 20rem * 480 / (1200 * 12);
            margin-bottom: 15rem * 480 / (1200 * 12);
        }

        .s01_compare_btn {
            vertical-align: super;
        }
    }

    /*响应式*/
    .s01_stuEvuList {
        .s01_ketang_table {
            @media all and (max-width: 480px) {
                position: initial;
                margin-top: 10rem * 480 / (1200 * 12);
                .s01_table_table {
                    position: initial;
                }

                .s01_paginate_box {
                    position: initial;
                    -webkit-transform: translate(0);
                    -moz-transform: translate(0);
                    -ms-transform: translate(0);
                    -o-transform: translate(0);
                    transform: translate(0);
                }
            }

        }

    }

    /*响应式*/
</style>