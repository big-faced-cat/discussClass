<template>
    <div>
        <ContentTitle>角色权限管理</ContentTitle>
        <ListCondition >
            <div style="height: 400px;">
        <el-row :gutter="24" class="schoolGrid" style="background:  white !important; padding: 12px;">
            <el-col :span="6" v-for="(item,index) in schools" :key="index"  >
                <div class="shchool_o1">
                    <span class="shcholDelete"><i class="el-icon-error"  @click="schoolDeleteConfirm(item)" ></i></span>
                    <div  class="tags" @click="openAddEdit(item)">
                        <p class="schoolIconTop"><i class="iconfont">&#xe607;</i></p>
                        <el-tooltip placement="top"  effect="light">
                            <div slot="content">角色名称: {{item.displayName}}<br/> 角色编号：{{item.no}}</div>
                            <div>
                            <p class="overMethod">角色名称：{{item.displayName}}</p>
                            <p  class="overMethod" style=" margin-top: 5px;">角色编号：{{item.no}}</p>
                            </div>
                        </el-tooltip>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="shchool_o1   shchool_add ">
                    <div  @click="openAddEdit(null)" style="padding-bottom: 16px">
                        <p class="schoolAddTop"><i class="el-icon-circle-plus-outline"></i></p>
                        <p style="margin-top: 5px;">创建角色</p>
                    </div>
                </div>
            </el-col>

        </el-row>
            </div>
            <div   class="s01_paginate_box1" style=" background-color: white;" >
                <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="pagination.total"
                        :current-page="pagination.pageIndex"
                        :page-size="pagination.pageSize"
                        @current-change="currentPageChange">
                </el-pagination>
            </div>

        </ListCondition>
        <schoolAddEdit ref="schoolAddEdit" @refresh-list="refresh"></schoolAddEdit>
    </div>
</template>

<script>
    import schoolAddEdit from "../../components/userRole/userRoleAddEdit.vue"
    import ListCondition from "../../components/ListCondition.vue"
    import ContentTitle from "../../components/ContentTitle.vue"
    export default {
        name: "userRoleList",
        components: { schoolAddEdit , ListCondition,  ContentTitle},
        data() {
            return {
                schools: [
                ],
                // 分页参数
                pagination: {
                    pageIndex: 1,
                    pageSize: 11,
                    total: 0
                },
            }
        },
        methods: {
            currentPageChange(arg) {
                this.pagination.pageIndex = arg;
               this.refresh();
            },
            refresh() {
                let params = {
                    PageIndex: this.pagination.pageIndex,
                    PageSize:  this.pagination.pageSize,
                };
                Ajax.Role.get(params).then((res) => {
                    if (res.status == 200) {
                        if ( res.data.content) {
                            this.schools = res.data.content.pagedData;
                            this.pagination.total = res.data.content.totalCount;
                        }
                    }
                })
            },
            openAddEdit(param) {
                this.$refs.schoolAddEdit.openPopup(param);
            },
            schoolDeleteConfirm(item) {
                layer.confirm("确认删除?", (layro) => {
                    var ids = [];
                        ids.push(item.id)
                    Ajax.Role.delete(ids).then((res) => {
                        if (res.status == 200) {
                            this.refresh()
                            layer.close(layro)
                        }
                    })
                })
            },

        },
        mounted() {
            this.refresh();
        }
    }
</script>
<style   lang="scss"  >
    .shchool_add {
        background-color: $list-ui-bg-add  !important;
    }
    .overMethod{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
    }
    .s01_paginate_box1 {
        padding: 1.66667rem 0;
        bottom: 0;
        left: 50%;
        -ms-transform: translateX(-50%);
        .el-pagination {
            text-align: center;
        }
        .el-pagination.is-background .el-pager li:not(.disabled).active {
            background-color: #fdb045 !important;
        }
    }
    ContentTitle{
        height: 0.66667rem;
        font-size: 0.66667rem;
        line-height: 0.66667rem;
        margin-bottom: 0.66667rem;
        color: #333333;
    }
    .tags {
        width: 100%;
        p {
            padding: 3px;
            text-align: center;
        }
    }
    .schoolGrid {
        div {
            .shchool_o1 {
                background: $list-ui-bg;
                border-radius: 10px;
                padding: 5px 5px 30px;
                display: flex;
                flex-direction: column;
                align-content: center;
                color: $list-ui-color;
                font-weight: bold;
                font-size: 15px;
                cursor: pointer;
                /*border: 1px solid rgba(0, 0, 0, 0.1);*/
                margin: 5px;
                align-items: center;

                p {
                    align-content: center;
                    width: 100%;
                }

                .schoolAddTop {
                    padding-top: 30px;
                    text-align: center;

                }

                .schoolIconTop {
                    padding-top: 10px;
                    text-align: center;
                }

                .shcholDelete {
                    width: 100%;
                    display: inline-flex;
                    color:  $delete-outer;
                    float: right;
                    justify-content: flex-end;
                }
            }

        }

    }

</style>
