<template >
    <div>
        <ContentTitle>教室管理</ContentTitle>
        <ListCondition>
            <el-button type="success" class="s01_compare_btn" size="medium" @click="openImport">
                Excel导入
            </el-button>
            <div style="height: 400px;">
        <el-row :gutter="24"   class="schoolGrid" style="margin-left: 0rem !important; margin-right: 0rem !important;" >
            <el-col :span="6"
                    v-for="(item,index) in classroomList" :key="index" >
                <div class="shchool_o1">
                    <span class="shcholDelete">
                        <i class="el-icon-error"   @click="schoolDeleteConfirm(item)"></i>
                    </span>
                    <div  @click="openAddEdit(item)" style="width: 100%; text-align: center;" >
                        <p class="schoolIconTop"><i class="iconfont">&#xe607;</i></p>
                        <el-tooltip placement="top"  effect="light">
                            <div slot="content">教室编号：{{item.no}}<br/>学校：{{item.schoolName}}</div>
                            <div>
                                <p class="overMethod">教室编号：{{item.no}}</p>
                                <p  class="overMethod">学校：{{item.schoolName}}</p>
                            </div>
                        </el-tooltip>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="shchool_o1  shchool_add "  @click="openAddEdit(null)">
                    <div style=" padding-top: 9px;">
                        <p class="schoolAddTop" style="padding-bottom: 3px;"><i class="el-icon-circle-plus-outline" ></i></p>
                        <p >创建教室</p>
                    </div>
                </div>
            </el-col>
        </el-row>
            </div>
            <div   class="s01_paginate_box1" style="background-color: white;" >

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

        <classroomAddEdit ref="classroomAddEdit" @refresh-list="refresh"></classroomAddEdit>
        <ClassRoomImport ref="ClassRoomImport" @refresh-list="refresh"></ClassRoomImport>
    </div>
</template>

<script>
    import ListCondition from "../../components/ListCondition.vue"
    import ContentTitle from "../../components/ContentTitle.vue"
    import classroomAddEdit from "../../components/classroom/classroomAddEdit.vue"
    import ClassRoomImport from "../../components/classroom/ClassRoomImport"

    export default {
        name: "classroomList",
        components: { classroomAddEdit, ContentTitle, ListCondition, ClassRoomImport},
        data() {
            return {
                noMore: false,
                currentClassroomList: [], //总的列表
                loading: false,
                classroomList: [],  // 每个分页的暂存
                // 分页参数
                pagination: {
                    pageIndex: 1,
                    pageSize: 11,
                    total: 0
                },
            }
        },
        methods: {
            /**
             * currentPage 改变时会触发
             */
            currentPageChange(arg) {
                this.pagination.pageIndex = arg;
                this.getClassRoomList();
            },
            /**
             * 打开导入
             */
            openImport() {
                this.$refs.ClassRoomImport.openPopup()
            },
            openAddEdit(parm1) {
                this.$refs.classroomAddEdit.openPopup(parm1);
            },
            schoolDeleteConfirm(item) {
                layer.confirm("确认删除?", (layro) => {
                    let ids = [ item.id] ;
                    Ajax.Classroom.delete(ids).then((res) => {
                        if (res.status == 200) {
                            this.getClassRoomList();
                            layer.close(layro);
                        }
                    })
                })
            },
            // 获取教室列表
            getClassRoomList() {
                let params = {
                    Id: null,
                    No: null,
                    SchoolId: null,
                    PageIndex: this.pagination.pageIndex,
                    PageSize:  this.pagination.pageSize,
                };
                Ajax.Classroom.get(params).then((res) => {
                    if (res.status == 200) {
                        if ( res.data.content) {
                            this.classroomList = res.data.content.pagedData;
                            this.pagination.total = res.data.content.totalCount;
                        }
                    }
                })
            },
            refresh() {
                this.currentClassroomList= [];
                this.getClassRoomList();
            },
        },
        created() {
        },
        computed: {
        },
        mounted() {
            this.currentClassroomList = [];
            this.getClassRoomList();
        }
    }
</script>
<style lang="scss">
    .s01_paginate_box {
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
    .s01_table_ck {
        cursor: pointer;
        color: #fdb045;
        font-size: 18rem * 480 / (1200 * 12);
    }
    ContentTitle{
        height: 0.66667rem;
        font-size: 0.66667rem;
        line-height: 0.66667rem;
        margin-bottom: 0.66667rem;
        color: #333333;
    }
    .schoolGrid {
        div {
            .shchool_o1 {
                background: #fff;
                border-radius: 10px;
                padding: 5px 5px 30px;
                display: flex;
                flex-direction: column;
                align-content: center;
                color: rgb(18, 150, 219);
                font-weight: bold;
                font-size: 15px;
                cursor: pointer;
                border: 1px solid rgba(0, 0, 0, 0.1);
                margin: 5px;
                align-items: center;
                p {
                    align-content: center;
                    width: 100%;
                }
                .schoolAddTop {
                    padding-top: 25px;
                    text-align: center;
                }

                .schoolIconTop {
                    /*padding-top: 20px;*/
                    text-align: center;
                }

                .shcholDelete {
                    width: 100%;
                    display: inline-flex;
                    color: red;
                    float: right;
                    justify-content: flex-end;
                }
            }

        }

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

</style>

