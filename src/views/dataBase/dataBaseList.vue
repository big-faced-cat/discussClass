<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="s01_dataBaseList">
        <ContentTitle>基础数据维护</ContentTitle>
        <div class=" s01_ketang_table">
            <DataBaseLeft :categoryList="categoryList"
                          :currentCategory="categoryId"></DataBaseLeft>
            <div class="s01_stu_table">
<!--                因为是多选，要记住之前的勾选-->
                <Mytable ref="Mytable"
                         @handle-view="handelView"
                         :databaseIdentity="true"
                         :tableHead="tableHead"
                         :tableData="tableData"
                         :highlight-current-row="true"
                         :disable-pagination="true"
                         :currentSelect="multipleSelection"
                         @selection-change="handleSelectionChange">
                    <template  v-slot:tableConditions="">
                        <el-row style="text-align:right;" ref="tableConditions">
                            <el-input v-model="keyword" placeholder="名称或备注" class="s01_list_select" size="medium"
                                      clearable
                                      style="width:140px;"></el-input>
                            <el-button type="primary" size="medium"
                                       style="background:#fdb045;border:none;margin-left:0.33rem;"
                                       @click="refresh">查询
                            </el-button>
                            <el-button type="success" class="s01_compare_btn" size="medium" @click="openAdd()">添加
                            </el-button>
                            <el-button type="success" class="s01_compare_btn" size="medium" @click="clickDel()">删除
                            </el-button>
                            <el-button type="success" class="s01_compare_btn" size="medium" @click="openImport">
                                Excel导入
                            </el-button>
                        </el-row>
                    </template>
                    <!--列表删选条件-->
                    <!--列表操作-->
                    <template v-slot:tableActions="slotProps">
                        <el-button type="primary" plain
                                   @click="openEdit(slotProps.scopeT.$index, slotProps.scopeT.row,slotProps.scopeT)"
                                   size="mini">编辑
                        </el-button>
                    </template>
                    <!--列表操作-->
                </Mytable>
            </div>
        </div>
        <DataBaseAdd ref="DataBaseAdd" :category-id="categoryId"  :title-name="categoryName"   @refresh-list="refresh"></DataBaseAdd>
        <DataBaseImport ref="DataBaseImport"  :title-name="categoryName"    @refresh-list="refresh"></DataBaseImport>
        <!--弹出框-->
    </div>
</template>
<script>
    import ContentTitle from "../../components/ContentTitle.vue"
    import ListCondition from "../../components/ListCondition.vue"
    import DateRanger from "../../components/DateRanger.vue"
    import Mytable from "../../components/Mytable.vue"
    import MyZtree from "../../components/MyZtree.vue"
    import DataBaseLeft from "../../components/DataBaseLeft.vue"
    import DataBaseAdd from "../../components/dataBase/DataBaseAdd.vue"
    import DataBaseImport from "../../components/dataBase/DataBaseImport.vue"

    export default {
        name: "dataBaseList",
        components: {
            ContentTitle,
            ListCondition,
            DateRanger,
            Mytable,
            MyZtree,
            DataBaseLeft,
            DataBaseAdd,
            DataBaseImport
        },
        data() {
            var self = this;
            return {
                options1: [],
                value1: '',
                options2: [],
                value2: '',
                options3: [],
                value3: '',
                tableHead: [
                    {type: "selection", prop: "subject", label: "序号", width: "50"},
                    {
                        type: "", prop: "name", label: "名称", width: "280",
                    },
                    {type: "", prop: "remark", label: "备注", minWidth: "120"},
                ],
                tableData: [],
                keyword: "",//模糊查询
                multipleSelection: [],//勾选框列表选中的行
                categoryId: "",//当前查看的类目id
                categoryList: [],//类目列表npm
                categoryName: '', //名称
                currentSelectss: [],
            }
        },
        methods: {
            refresh() {
                var self = this;
                var multipleSelection = JSON.parse(JSON.stringify(this.multipleSelection));//解决重新请求,勾选框被清空
                let params = {
                    Category: this.categoryId,
                    NameOrRemark: this.removeSpecialCharacter(this.keyword),
                };
                // 没跳转前对页面勾选进行记忆
                Ajax.EssentialData.get(params).then(function (respnnse) {
                    let res = respnnse.data;
                    if (respnnse.status == 200) {
                        var tableData = [];
                        res.content.map(function (item) {
                            tableData.push(item);
                        });
                        self.tableData = tableData;

                        self.$nextTick(function () {
                            self.$refs.Mytable.toggleSelection(multipleSelection, true);
                        })
                    }
                })

            },
            /**
             *列表点击--详情页
             */
            handelView(index, row) {
                this.$router.push({
                    name: "classEvalView"
                })
            },
            /**
             * 树形 点击事件
             */
            treeNodeClick(node) {
                if (!node.children) {
                    this.$message({
                        message: node.label,
                        type: 'warning'
                    });
                }
            },
            /**
             * 打开 添加的 弹出框
             */
            openAdd() {
                this.categoryName = this.categoryList.filter(item => item.id == this.categoryId)[0].displayName;
                this.$refs.DataBaseAdd.openPopup(null)
            },
            /**
             * 打开 编辑的 弹出框
             */
            openEdit(index, item, rowObj) {
                this.categoryName = this.categoryList.filter(item => item.id == this.categoryId)[0].displayName;
                if (item) {
                    this.$refs.DataBaseAdd.openPopup(item)
                } else {
                    layer.msg("请勾选一条记录")
                }
            },

            handleSelectionChange(val, tableData) {
                val =val.filter(temp =>  typeof(temp) != 'undefined');
                this.multipleSelection = [... this.multipleSelection , ...val];
                this.multipleSelection  = this.multipleSelection .filter(temp =>  typeof(temp) != 'undefined');
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
            /**
             * 打开导入
             */
            openImport() {
                this.$refs.DataBaseImport.openPopup();
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
                    Ajax.EssentialData.delete(ids).then((res) => {
                        if (res.status == 200) {
                            this.multipleSelection = [];
                            this.refresh();
                            layer.close(layro)
                        }
                    })
                })
            },
            /**
             * 获取类目
             */
            getCategory() {
                return Ajax.EssentialData.Categories();
            }
        },
        created() {
            //获取url查询参数categoryId
            var queryParams = parseInt(this.$route.query);
            this.getCategory().then((res) => {
                if (res.status == 200) {
                    var result = res.data;
                    this.categoryList = result.content;
                    if (queryParams.categoryId) {
                        //url带了默认id
                        this.categoryId = queryParams.categoryId;
                        this.refresh();
                    } else {//url没有带id,给一个默认的
                        this.$router.push(
                            {
                                name: "dataBaseList",
                                query: {
                                    categoryId:  parseInt(this.categoryList[0].id),
                                }
                            }
                        )

                     }
                }
            });

        },
        mounted() {
            BUS.$on("resize",()=>{
                console.log(this.$refs.tableConditions);
            });
        },
        watch: {
            "$route.query"(to, from) {
                this.categoryId = to.categoryId
                this.refresh()
            }
        }
    }
</script>

<style lang="scss">
    .s01_dataBaseList {

        .s01_ketang_table {
            position: absolute;
            top: 60rem * 480 / (1200 * 12);
            bottom: 0;
            left: 20rem * 480 / (1200 * 12);
            right: 0;
            overflow: auto;
            background: #fff;

            .s01_MyZtree {
                width: 169rem * 480 / (1200 * 12);
                min-height: 300rem * 480 / (1200 * 12);
                // max-height: 50vh;

                border-radius: 2px;
                border: solid 1px #e6e6e6;
                padding: 20rem * 480 / (1200 * 12) 10rem * 480 / (1200 * 12) 20rem * 480 / (1200 * 12) 20rem * 480 / (1200 * 12);
                overflow: auto;
            }

            .s01_stu_table {
                position: absolute;
                left: 179rem * 480 / (1200 * 12);
                right: 0;
                top: 0;
                bottom: 0;

                .s01_Mytable {
                    padding: 10rem * 480 / (1200 * 12);

                    .s01_table_table {
                        position: absolute;
                        top: 55rem * 480 / (1200 * 12);
                        bottom: 146rem * 480 / (1200 * 12);
                        left: 10rem * 480 / (1200 * 12);
                        right: 10rem * 480 / (1200 * 12);
                        overflow: auto;
                    }
                }

                .s01_search_input {
                    width: 140rem * 480 / (1200 * 12);
                    margin-right: 20rem * 480 / (1200 * 12);
                    margin-bottom: 15rem * 480 / (1200 * 12);
                }

                .s01_compare_btn {
                    vertical-align: super;
                    margin-left: 20rem * 480 / (1200 * 12);
                }

            }

        }

    }

    /*响应式*/
    .s01_dataBaseList {
        .s01_ketang_table {
            .s01_stu_table {
                .s01_Mytable {
                    .s01_table_table {
                        @media all and (max-width: 792px) {
                            top: 105rem * 480 / (1200 * 12);
                        }
                        @media all and (max-width: 630px) {
                            top: 255rem * 480 / (1200 * 12);
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

                    @media all and (max-width: 480px) {
                        .s01_paginate_box {
                            position: initial;
                        }
                    }
                }
            }
        }
    }

    @media all and (max-width: 700px) {
        .s01_dataBaseList {
            .s01_ketang_table {
                .s01_MyZtree {
                    width: 100%;

                    .s01_ul {
                        width: initial;

                        // .s01_li {

                        // }
                    }
                }

                .s01_stu_table {
                    position: initial;

                    .s01_Mytable {
                        .s01_table_table {
                            margin-top: 10rem * 480 / (1200 * 12);
                            position: initial;

                            .s01_table_table {
                                position: initial;
                            }

                            .s01_paginate_box {
                                position: initial;
                            }
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
        }
    }

    /*响应式*/
</style>
