<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="s01_usersList">
        <ContentTitle>用户列表</ContentTitle>
        <ListCondition>
            <el-input v-model="StaffNoOrNickname" placeholder="用户账号或昵称" class="s01_list_select" size="medium" clearable
                      style="width:150px;"></el-input>
            <el-button type="primary" size="medium" style="background:#fdb045;border:none;margin-left:0.33rem;"
                       @click="refresh()">查询
            </el-button>
            <el-button type="success" class="s01_compare_btn" size="medium" @click="openAdd()">添加
            </el-button>
            <el-button type="success" class="s01_compare_btn" size="medium" @click="clickDel()">删除
            </el-button>
        </ListCondition>
        <div class="s01_ketang_table">
            <Mytable
                    ref="Mytable"
                     :tableHead = "tableHead"
                     :tableData = "tableData"
                     :disable-pagination="false"
                     :option="400"
                     :total="pagination.total"
                     :current-page="pagination.currentPage"
                     :page-size="pagination.pageSize"
                     :currentSelect="multipleSelection"
                     @current-change="currentPageChange"
                     @selection-change="handleSelectionChange">
                <!--列表操作-->
                <template v-slot:tableActions="slotProps">
                    <el-button type="primary" plain @click="openAssignRole( slotProps.scopeT.row)" size="mini" style="margin:5px 0 5px 27px;float:left;width:80px;height:30px;">分配角色</el-button>
                    <el-button type="primary" plain @click="openEdit(slotProps.scopeT.row)" size="mini" style="margin:5px 0 5px 27px;float:left;width:80px;height:30px;">编 辑</el-button>
                    <el-button type="primary" plain @click="openEditPassword(slotProps.scopeT.row)" size="mini"  style="margin:5px 0 5px 27px;float:left;width:80px;height:30px;">重置密码</el-button>
                </template>
                <!--列表操作-->
            </Mytable>
        </div>
        <!--弹出框-->
        <AssignRole ref="AssignRole" @refresh-list="refresh"></AssignRole>
        <UserAdd ref="UserAdd" @refresh-list="refresh"></UserAdd>
        <UserEditPd ref="UserEditPd" @refresh-list="refresh" ></UserEditPd>
        <!--弹出框-->
    </div>
</template>
<script>
    import ContentTitle from "../../components/ContentTitle.vue"
    import ListCondition from "../../components/ListCondition.vue"
    import Mytable from "../../components/Mytable.vue"
    import UserAdd from "../../components/users/UserAdd.vue"
    import AssignRole from "../../components/users/AssignRole.vue"
    import UserEditPd from "../../components/users/UserEditPd.vue"

    export default {
        name: "s01_usersList",
        components: {ContentTitle, ListCondition, Mytable, UserAdd, UserEditPd, AssignRole},
        data() {
            return {
                StaffNoOrNickname: "",//模糊搜索
                    pagination: {
                        currentPage: 1,
                        pageSize: 15,
                        total: 0
                    },
                tableHead: [
                    {type: "selection", prop: "", label: "", width: "50"},
                    {type: "", prop: "staffNo", label: "员工编号", minWidth: "180"},
                    {type: "", prop: "nickname", label: "昵称", minWidth: "180"},
                    {type: "", prop: "creatorName", label: "创建人", minWidth: "180"},
                    {type: "", prop: "createdTime", label: "创建时间", minWidth: "180",
                        formatter(row, column, cellValue, index) {
                            if (row.createdTime) {
                                return utc_local(row.createdTime)
                            }
                        }},
                ],
                tableData: [],
                multipleSelection: [],//勾选框列表选中的行
            }
        },
        methods: {
            refresh() {
                let multipleSelection = JSON.parse(JSON.stringify(this.multipleSelection));//解决重新请求,勾选框被清空
                let params = {
                        Category: this.categoryId,
                        StaffNoOrNickname: this.removeSpecialCharacter(this.StaffNoOrNickname),
                        PageIndex: this.pagination.currentPage,
                        PageSize: this.pagination.pageSize,
                };
                Ajax.User.get(params).then((res) => {
                    if ( res.status == 200 ) {
                        let result = res.data.content;
                        this.pagination.total = result.totalCount;
                        this.tableData = res.data.content.pagedData;
                        this.$nextTick(function () {
                            this.$refs.Mytable.toggleSelection(multipleSelection, true);
                        });
                    }

                });
            },
            currentPageChange(arg) {
                this.pagination.currentPage = arg;
                this.refresh();
            },
            openAdd() {
                this.$refs.UserAdd.openPopup(null);
            },
            openEdit(item) {
                this.$refs.UserAdd.openPopup(item);
            },

            openAssignRole(item) {
                    this.$refs.AssignRole.openPopup(item);
            },

            openEditPassword(item) {
                    this.$refs.UserEditPd.openPopup(item);
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
                    if (tempMultipSelection.length >= 0 && this.multipleSelection.length > 0) {
                        let ids =  tempMultipSelection.map(tempss => tempss.id);
                        if ( ids.indexOf(temp.id) < 0 && notExistId.indexOf(temp.id) < 0 ) {
                            tempMultipSelection.push(temp);
                        }
                    }
                });
                this.multipleSelection = tempMultipSelection;
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
                        if (res.status == 200) {
                            this.multipleSelection= [];
                            this.refresh();
                            layer.close(layro);
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

<style lang="scss">
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
