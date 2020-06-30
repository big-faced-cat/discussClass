<template>
    <div class="s01_Mytable">
        <div class="s01_table_box">
            <!--列表删选条件-->
            <div class="s01_table_conditions">
                <slot name="tableConditions" :scopeA="tableData" :scopeb="SB" :multipleSelection="multipleSelection"></slot>
            </div>
            <div class="s01_table_table">
                <el-table size="small" :data="tableData" border
                          :highlight-current-row="highlightCurrentRow"
                          ref="singleTable"
                          @current-change="handleCurrentChange"
                          @selection-change="handleSelectionChange"
                          :show-overflow-tooltip="true"
                          min-width="280">
                    <!--列表删选条件-->
                    <el-table-column v-for="(item,index) in tableHead" :type="item.type" :key="index" :prop="item.prop"
                                     :label="item.label" :width="item.width" :min-width="item.minWidth"
                                     :formatter="item.formatter"
                                     :render-header="item.renderHeader"
                    ></el-table-column>
                    <!--自定义的数据模板-->
                    <slot name="tableTrDom"></slot>
                    <!--自定义模板-->
                    <el-table-column label="操作" :width="option"  v-if="options == 1 ? false : true">
                        <template slot-scope="scopeF"  >
                            <!--优点复杂  外面的slot再传给子组件-->
                                <slot name="tableActions" :scopeT="scopeF"></slot>
                            <!--优点复杂  外面的slot再传给子组件-->
                        </template>
                    </el-table-column>
                </el-table>
            </div>

        </div>

        <div class="s01_paginate_box" v-if="!disablePagination">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    @current-change="currentPageChange"
                    @size-change="sizeChange"
            >
            </el-pagination>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Mytable",
        props: [
            'databaseIdentity',
            'selectData',
            "tableHead",
            "tableData",
            "Actions",//表的基础操作 分为4个 add delete edit view
            "highlight-current-row",
            "disable-pagination",
            "current-page",
            "page-size",
            "total",
            "option",
            "currentSelect",
            "options",

        ],
        data() {
            return {
                SB: 123,
                currentRow:null,//列表选中的行
                multipleSelection: [],//勾选框列表选中的行
                allSelecttions: [],  //所有的东西
            }
        },
        methods: {
            /**
             * 高亮选中的行
             * @param val
             */
            handleCurrentChange(val) {
                this.currentRow = val;
            },

            toggleSelection(rows,bool) {
                this.allSelecttions = rows;
                if (rows) {
                    rows.forEach(row => {
                        if(bool){
                            let indexes= null;

                            this.tableData.filter((temp, index) => {
                                if ( typeof(row) != "undefined" && temp.id == row.id){
                                indexes = index;}
                            } )
                            this.$refs.singleTable.toggleRowSelection(this.tableData[indexes],bool);
                        }else{
                            this.$refs.singleTable.toggleRowSelection(row);
                        }
                    });
                } else {
                    this.$refs.singleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                this.$nextTick(function () {
                    this.$emit("selection-change",val, this.tableData);
                } );
            },
            // handleSelectionChange(val, tableData) {
            //     val =val.filter(temp =>  typeof(temp) != 'undefined');
            //     this.multipleSelection = [... this.multipleSelection , ...val];
            //     this.multipleSelection  = this.multipleSelection.filter(temp =>  typeof(temp) != 'undefined');
            //     let tableIds = [];
            //
            //     tableData.filter(temp => {
            //         if ( ( this.multipleSelection.map(tempss => tempss.id)).indexOf(temp.id) > -1) {
            //             tableIds.push(temp.id);
            //         }
            //     } );
            //
            //     let notExistId = [];
            //     tableIds.filter( temp =>{
            //         if ( (val.map(tempss => tempss.id)).indexOf(temp) < 0){
            //             notExistId.push(temp);
            //         }
            //     });
            //
            //     // 合成部分去重
            //     let tempMultipSelection = [];
            //     this.multipleSelection.filter(temp => {
            //         if (tempMultipSelection.length >= 0 &&    this.multipleSelection.length > 0) {
            //             let ids =  tempMultipSelection.map(tempss => tempss.id);
            //             if ( ids.indexOf(temp.id) < 0 && notExistId.indexOf(temp.id) < 0 ) {
            //                 tempMultipSelection.push(temp);
            //             }
            //         }
            //     });
            //     this.multipleSelection = tempMultipSelection;
            // },
            /**
             * 	pageSize 改变时会触发
             */
            sizeChange(arg){
                this.$emit("size-change",arg)
            },
            /**
             * 切换页码 currentPage 改变时会触发
             * @param arg
             */
            currentPageChange(arg){
                this.$emit("current-change",arg, this.multipleSelection, this.tableData)
            }
        },

        watch: {
        },
        updated() {
        },
        mounted() {
        }

    }
</script>

<style lang="scss">
    .s01_Mytable {
        background-color: #fff;
        width: 100%;
        height: 100%;
       // padding: 15rem * 480 / (1200 * 12);
        .el-pagination.is-background .el-pager li:not(.disabled).active {
            background-color: #fdb045;
        }

        .el-pagination.is-background .el-pager li {
            background-color: #f5f5f5;

        }

        .el-table thead {
            th {
                background-color: #f5f5f5;
            }
        }
        .el-table td, .el-table th {
            text-align: center;
            font-size: 14rem * 480 / (1200 * 12);
            height: 50rem * 480 / (1200 * 12);
        }

        .s01_paginate_box {
            padding: 50rem * 480 / (1200 * 12) 0;
            position: absolute;
            bottom: 0;
            left: 50%;
            -webkit-transform: translateX(-50%);
            -moz-transform: translateX(-50%);
            -ms-transform: translateX(-50%);
            -o-transform: translateX(-50%);
            transform: translateX(-50%);
            .el-pagination {
                text-align: center;
            }
        }

        .s01_table_ck {
            cursor: pointer;
            color: #fdb045;
            font-size: 18rem * 480 / (1200 * 12);
        }


      .el-table--border {
            border: none;
          /*  height: 400px;*/
          /*  overflow: auto;*/
          /*background: transparent;*/
        }

        .s01_table_box {
            .s01_table_conditions {
                color: #4d4d4d;
                font-size:14rem * 480 / (1200 * 12);
                position: relative;
                z-index: 999;
                .el-row>*{
                    vertical-align: super;  margin-right:20rem * 480 / (1200 * 12);
                    margin-bottom:10rem * 480 / (1200 * 12);
                }
            }
            .s01_table_table{
                .el-button--primary{
                    padding:4rem * 480 / (1200 * 12) 6rem * 480 / (1200 * 12);
                }
            }
        }

    }
</style>
