<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="s01_keTangPingJiaList">
        <ContentTitle>已评价课堂列表</ContentTitle>
        <ListCondition>
            <el-select v-model="value1" placeholder="请选择老师" class="s01_list_select" size="medium"
                       style="width:120px;">
                <el-option
                        v-for="item in options1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="value2" placeholder="请选择课程" class="s01_list_select" style="width:85px;" size="medium">
                <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="value2" placeholder="理论课" class="s01_list_select" style="width:85px;" size="medium">
                <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="value2" placeholder="一年级" class="s01_list_select" style="width:105px;" size="medium">
                <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="value2" placeholder="一班" class="s01_list_select" style="width:105px;" size="medium">
                <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <DateRanger></DateRanger>
            <el-button type="primary" size="medium" style="background:#fdb045;border:none;margin-left:0.33rem;">查询
            </el-button>
            <el-button type="primary"
                       size="medium"
                       @click="compare2Class"
                       style="background:#77c176;border:none;margin-left:0.33rem;">对比
            </el-button>
        </ListCondition>
        <div class="s01_ketang_table">
            <Mytable   :tableHead="tableHead"
                     :tableData="tableData"
                       :total="pagination.total"
                       :current-page="pagination.currentPage"
                       :page-size="pagination.pageSize">
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
        name: "keTangPingJiaList",
        components: {ContentTitle, ListCondition, DateRanger, Mytable},
        data() {
            return {
                pagination: {
                    currentPage: 1,
                    pageSize: 15,
                    total: 0
                },
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
                    {type: "index", prop: "", label: "序号", width: "50"},
                    {type: "", prop: "date", label: "上课时间", minWidth: "180"},
                    {type: "", prop: "name", label: "教师", minWidth: "80"},
                    {type: "", prop: "name", label: "学科", minWidth: "100"},
                    {type: "", prop: "name", label: "课时", minWidth: "80"},
                    {type: "", prop: "name", label: "课程类型", minWidth: "80"},
                    {type: "", prop: "name", label: "学年", minWidth: "80"},
                    {type: "", prop: "name", label: "班级", minWidth: "80"},
                    {type: "", prop: "name", label: "课评方式", minWidth: "100"},
                    {type: "", prop: "name", label: "活跃度", minWidth: "80"},
                    {type: "", prop: "name", label: "参与度", minWidth: "80"},
                    {type: "", prop: "name", label: "授课类型", minWidth: "80"},
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
            /**
             * 详情页
             * @param index
             * @param row
             */
            handleView(index, item, row) {
                this.$router.push({
                    name: "classEvalView"
                })
            },
            /**
             * 对比课堂
             */
            compare2Class(){
                this.$router.push({name:"keTangDuiBi"})
            }
        }
    }
</script>

<style lang="scss">
    .s01_keTangPingJiaList {
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
    .s01_keTangPingJiaList {
        .s01_ketang_table {
            @media all and (max-width: 1207px) {
                top: 200rem * 480 / (1200 * 12);
            }
            @media all and (max-width: 715px) {
                top: 250rem * 480 / (1200 * 12);
            }
            @media all and (max-width: 586px) {
                top: 300rem * 480 / (1200 * 12);
            }
            @media all and (max-width: 480px) {
                margin-top: 10rem * 480 / (1200 * 12);
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