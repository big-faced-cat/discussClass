<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="s01_studentsList">
        <ContentTitle>教师管理</ContentTitle>
        <ListCondition>
            <el-input v-model="keyword" placeholder="名称或工号" class="s01_list_select" size="medium" clearable
                      style="width:160px;"></el-input>
            <el-select class="s01_search_input" v-model="GradeTypeId" filterable placeholder="年级" style="width:150px;"
                       size="medium">

                <el-option :value="-1" label="全部年级" selected></el-option>
                <el-option
                        v-for="item in gradeList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
            <el-select class="s01_search_input" v-model="ClassTypeId" filterable placeholder="班级" style="width:150px;"
                       size="medium">
                <el-option :value="-1" label="全部班级" selected></el-option>
                <el-option
                        v-for="item in classList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
            <el-button type="primary" size="medium" style="background:#fdb045;border:none;margin-left:0.33rem;"
                       @click="refresh">查询
            </el-button>
            <el-button type="success" class="s01_compare_btn" size="medium" @click="openAdd()">添加
            </el-button>
            <el-button type="success" class="s01_compare_btn" size="medium" @click="clickDel()">删除
            </el-button>
            <el-button type="success" class="s01_compare_btn" size="medium" @click="openImport">
                导入教师
            </el-button>
            <el-button type="success" class="s01_compare_btn" size="medium" @click="openTeacherClassImport">
                导入教师和班级关系
            </el-button>
        </ListCondition>
        <div class="s01_ketang_table">
            <Mytable
                    ref="Mytable"
                    :tableHead="tableHead"
                    :tableData="tableData"
                    :total="pagination.total"
                    :current-page="pagination.currentPage"
                    :page-size="pagination.pageSize"
                    :currentSelect="multipleSelection"
                    :option="200"
                    @selection-change="handleSelectionChange"
                    @current-change="currentPageChange">
                <!--自定义表模板-->
                <template v-slot:tableTrDom>
                    <el-table-column
                            label="工号"
                            min-width="180">
                        <template slot-scope="scope">
                            {{scope.row.staffNo}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="头像"
                            min-width="180">
                        <template slot-scope="scope">
                            <el-image :src="scope.row.avatarPath" lazy style="max-width:2rem;max-height:2rem;"></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="姓名"
                            min-width="180">
                        <template slot-scope="scope">
                            {{scope.row.name}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="学历"
                            min-width="100">
                        <template slot-scope="scope">
                            {{scope.row.degreeName}}
                        </template>
                    </el-table-column>
<!--                    <el-table-column-->
<!--                            label="工龄"-->
<!--                            min-width="100">-->
<!--                        <template slot-scope="scope">-->
<!--                            {{scope.row.old}}-->
<!--                        </template>-->
<!--                    </el-table-column>-->
<!--                    <el-table-column-->
<!--                            label="班级"-->
<!--                            min-width="100">-->
<!--                        <template slot-scope="scope">-->
<!--                            {{scope.row.classGrade.className}}-->
<!--                        </template>-->
<!--                    </el-table-column>-->
                </template>
                <!--自定义表模板-->
                <!--列表操作-->
                <template v-slot:tableActions="slotProps">
                    <el-button type="primary" plain
                               @click="openEdit(slotProps.scopeT.$index, slotProps.scopeT.row,slotProps.scopeT)"
                               size="mini">编辑
                    </el-button>
                    <el-button type="primary" plain
                               size="mini"
                               @click="assignClass(slotProps.scopeT.$index, slotProps.scopeT.row,slotProps.scopeT)">分配班级
                    </el-button>
                </template>
                <!--列表操作-->
            </Mytable>
        </div>
        <!--弹出框-->
        <TeacherAdd ref="TeacherAdd" @refresh-list="refresh"></TeacherAdd>
        <AssignAdd ref="AssignAdd" @refresh-list="refresh"></AssignAdd>
        <TeacherImport ref="TeacherImport" @refresh-list="refresh"></TeacherImport>
        <TeacherClassImport ref="TeacherClassImport" @refresh-list="refresh"></TeacherClassImport>

        <!--弹出框-->
    </div>
</template>
<script>
    import ContentTitle from "../../components/ContentTitle.vue"
    import ListCondition from "../../components/ListCondition.vue"
    import Mytable from "../../components/Mytable.vue"
    import TeacherAdd from "../../components/teacher/TeacherAdd.vue"
    import AssignAdd from "../../components/teacher/AssignAdd.vue"
    import TeacherImport from "../../components/teacher/TeacherImport.vue"
    import TeacherClassImport from "../../components/teacher/TeacherClassImport.vue"

    // AssignAdd
    export default {
        name: "s01_studentsList",
        props: ["categoryId"],
        components: {ContentTitle, ListCondition, Mytable, TeacherAdd,TeacherImport, AssignAdd , TeacherClassImport},
        data() {
            return {
                ClassTypeId: -1,
                GradeTypeId: -1,
                gradeList: [],
                classList: [],
                options1: [],//年级
                value1: null,
                options2: [],//班级
                value2: null,
                tableHead: [
                    {type: "selection", prop: "", label: "序号", width: "50"},
                ],
                tableData: [],
                keyword: "",//模糊搜索
                multipleSelection: [],//勾选框列表选中的行
                pagination: {
                    currentPage: 1,
                    pageSize: 15,
                    total: 0
                },
            }
        },
        methods: {
            refresh() {
                var params = {
                    PageIndex: this.pagination.currentPage,
                    PageSize: this.pagination.pageSize,
                };
                if (this.keyword !== null && this.keyword !== '') {
                    params["Name"] = this.keyword;
                }
                if (this.value1 !== null && this.value1 !== '') {
                    params["GradeId"] = this.value1;
                }
                if (this.value2 !== null && this.value2 !== '') {
                    params["ClassId"] = this.value2;
                }
                Ajax.Teacher.get(params).then((res) => {
                    if (res.status == 200) {
                        this.tableData = res.data.content.pagedData;
                        this.pagination.total = res.data.content.totalCount;
                        this.$nextTick(function () {
                            this.$refs.Mytable.toggleSelection(this.multipleSelection, true);
                        });
                    }
                })
            },
            /**
             * 打开 添加的 弹出框
             */
            openAdd() {
                this.$refs.TeacherAdd.openPopup(null)
            },
            /**
             * 打开 编辑的 弹出框
             */
            openEdit(index, item, rowObj) {
                if (item) {
                    this.$refs.TeacherAdd.openPopup(item)
                } else {
                    layer.msg("请勾选一条记录")
                }
            },
            // 打开分配班级窗口
            assignClass(index, item, rowObj) {
                if (item) {
                    this.$refs.AssignAdd.openPopup(item)
                } else {
                    layer.msg("请勾选一条记录")
                }
            },

            handleSelectionChange(val, tableData) {
                val =val.filter(temp =>  typeof(temp) != 'undefined');
                this.multipleSelection = [... this.multipleSelection , ...val];
                this.multipleSelection  = this.multipleSelection.filter(temp =>  typeof(temp) != 'undefined');
                let tableIds = [];

                tableData.filter(temp => {
                    if ( ( this.multipleSelection.map(tempss => tempss.id)).indexOf(temp.id) > -1) {
                        tableIds.push(temp.id);
                    }
                } );


                let notExistId = [];
                tableIds.filter( temp =>{
                    if ( (val.map(tempss => tempss.id)).indexOf(temp) < 0){
                        notExistId.push(temp);
                    }
                });

                // 合成部分去重
                let tempMultipSelection = [];
                this.multipleSelection.filter(temp => {
                    if (tempMultipSelection.length >= 0 &&    this.multipleSelection.length > 0) {
                        let ids =  tempMultipSelection.map(tempss => tempss.id);
                        if ( ids.indexOf(temp.id) < 0 && notExistId.indexOf(temp.id) < 0 ) {
                            tempMultipSelection.push(temp);
                        }
                    }
                });
                this.multipleSelection = tempMultipSelection;
            },
            openImport() {
                this.$refs.TeacherImport.openPopup();
            },
            openTeacherClassImport() {
                this.$refs.TeacherClassImport.openPopup();
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
                    Ajax.Teacher.delete(ids).then((res) => {
                        if (res.status == 200) {
                            this.multipleSelection= [];
                            this.refresh();
                            layer.close(layro);
                        }
                    })
                })
            },
            /**
             * currentPage 改变时会触发
             */
            currentPageChange(arg) {
                this.pagination.currentPage = arg;
                this.refresh();
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
             * 获取年级
             */
            getClassList() {
                Ajax.EssentialData.getClassList().then((res) => {
                    this.options2 = res.data.content;
                })
            },
            /**
             * 获取教室
             */
            getClassRoomList() {
                Ajax.EssentialData.getClassRoomList().then((res) => {
                    this.options3 = res.data.content;

                })
            },
            // 获取基础数据的内容
            getdata(params) {
                Ajax.EssentialData.getLists(params).then((res)=>{
                    if (res.status == 200) {
                        if (params == 8) {
                            this.gradeList = res.data.content;
                        }
                        if (params == 9) {
                            this.classList = res.data.content;
                        }
                    }
                });
            },
        },
        created() {
        },
        mounted() {
            this.getdata(8);
            this.getdata(9);
            this.refresh();
        }
    }
</script>

<style lang="scss">
    .s01_studentsList {
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
    .s01_studentsList {

        .s01_ketang_table {
            @media all and (max-width: 1042px) {
                top: 200rem * 480 / (1200 * 12);
            }
            @media all and (max-width: 635px) {
                margin-top: 10rem * 480 / (1200 * 12);
                position: initial;
                .s01_table_table {
                    position: initial;
                }
                .s01_paginate_box {
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
