<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="s01_courseMan" >
        <ContentTitle>评教

            <el-button type="success"  style="float: right; margin-right: 30px" size="medium" @click="backPage">
                返回
            </el-button>

        </ContentTitle>
        <ListCondition>
            <div style="padding: 20px 60px 20px 0; border-bottom: 1px solid #ccc;">
                <el-input placeholder="请输入评论内容" v-model="contents">
                    <el-button slot="append" v-on:click="addDiscuss" > 评论</el-button>
            </el-input> </div>
            <div v-for="(item,i) in discussList" :key="i" class="discuss_lists">
                   <el-row>
                       <el-col :span="3">
                           <div class="left_people">
                         <div style="width: 42px; height: 42px; text-align: center; background-color: #ccc;">
<!--                                <img :src="item.img" width="42" height="42">-->
                               <div   class="discuss_name" > {{item.userName}}</div>
                         </div>

                           </div>
                       </el-col>
                       <el-col :span="19">
                           <div class="discuss_content">
                               <span> {{item.review}}</span>
                               <span class="discuss_time"> 评论时间： {{item.lastUpdateTime}}</span>
                           </div>
                       </el-col>

                       <el-col :span="2">
                           <div>
                           <span>
                               <img style="cursor: pointer;" src="../../../static/imgs/good.png" v-on:click="excellentClick(item.id)" width="20" height="20">
                               <span class="discuss_good">{{item.excellentNum}} </span>
                           </span>
                           </div>
                       </el-col>

                   </el-row>


            </div>
            <!-- 分页-->
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

    </div>

</template>
<script>
    import ContentTitle from "../../components/ContentTitle.vue"
    import ListCondition from "../../components/ListCondition.vue"
    export default {
        name: "courseManDiscuss",
        components: {ContentTitle, ListCondition},
        data() {
            return {
                contents: "",
                discussList: [],
                // 分页参数
                pagination: {
                    pageIndex: 1,
                    pageSize: 15,
                    total: 0
                },
            }
        },
        methods: {
            // 优秀
            excellentClick(paramsss) {
                // 对接接口
                let params= {
                    id: parseInt(paramsss) ,
                };
                Ajax.Comment.put(params).then((res) => {
                    if (res.status == 200) {
                    this.getDiscussList();
                    }
                })

            },
            // 返回
            backPage() {
                this.$router.push({
                    name: "courseManList"
                });
            },
            // 获取评教列表
            getDiscussList() {
                // 对接接口
                let params= {
                    Review:  this.contents,
                    CourseId:  this.$route.params.id,
                    PageIndex: this.pagination.pageIndex,
                    PageSize:  this.pagination.pageSize,
                   };
                Ajax.Comment.get(params).then((res) => {
                    if (res.status == 200) {
                        if (res.data.content == null) {
                            this.tableData= [];
                            this.pagination.total= 0;
                        } else {
                            console.log('rrrrrrrrrr评教内容rrrrrrrrr', res.data);
                            this.discussList=res.data.content.pagedData;
                            this.pagination.total=res.data.content.totalCount;
                        }
                    }
                })

            },

            // 添加
            addDiscuss() {
                // 对接接口
                let params= [{
                    review:  this.contents,
                    courseId: parseInt(this.$route.params.id) ,
                }];
                Ajax.Comment.post(params).then((res) => {
                    if (res.status == 200) {
                        this.contents = '';
                        this.getDiscussList();
                    }
                })


            },

        },
        created() {

        },
        mounted() {
            this.getDiscussList();

        }
    }
</script>

<style lang="scss">
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
    .discuss_lists {
        border-bottom: 1px solid #ccc;
        padding: 10px;
        .discuss_good{
            color: #f9ab3d;
        }
        .left_people {
            display: flex;
            flex-direction: column ;
            align-items: center;
            height: 60px;
            .discuss_name{
               color: #000;
                padding-top: 5px;

            }
        }
        .discuss_content{
            display: flex;
            flex-direction: column ;
            justify-content: center;
            height: 60px;
            .discuss_time{
                padding-top: 15px;
                color: #ccc ;
                font-size: smaller;
            }
        }
    }

    .s01_courseMan {
        .s01_ketang_table {
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
    .s01_courseMan {
        .s01_ketang_table {
            @media all and (max-width: 1780px) {
                top: 200rem * 480 / (1200 * 12);
            }
            @media all and (max-width: 975px) {
                top: 250rem * 480 / (1200 * 12);
            }
            @media all and (max-width: 801px) {
                top: 300rem * 480 / (1200 * 12);
            }
            @media all and (max-width: 625px) {
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
