<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="s01_courseMan" >
        <ContentTitle>考勤系统
            <el-button type="success"  style="float: right; margin-right: 30px" size="medium" @click="backPage">
            返回
            </el-button>
        </ContentTitle>
        <el-row>
            <el-col :span="7">
                <div class="card">
                    <div>

                    <p style="color:blue;font-size:30px;float:left;margin-top:-45px;"><i class="el-icon-time"></i></p>
                    <p style=" font-size: 65px ; font-weight: bolder"> 13:45</p>
                    <p style=" font-size: 30px ; color:#f3a8aa">2020年4月14日 星期二</p>
                    </div>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="card">
                <div>
                    <img src="../../../static/imgs/04e5aa3d3ae639920d04122dedc4f4d.png" alt="" id="src" style="float:left">
                    <div style="float:left">
                        <div >教工号：k1021087</div>
                        <div style="float:left"> 姓名：张三</div><br />
                        <div style="float:left"> 职称：管理员</div>
                    </div>
                    
                 </div>
                </div>

            </el-col>
            <el-col :span="10"><div class="cardd">
                <div class="card">
                    <div>
                    <img src="../../../static/imgs/04e5aa3d3ae639920d04122dedc4f4d.png" alt="" id="srcs" style="float:left">
                    <div>
                        <div style="float:left"> 课程名称：英语</div>
                        <div style="float:left"> 课程内容：完成时态教学</div><br /> 
                        <div style="float:left"> 上课状态：未上课</div><br /><br /><br />
                        <div style="float:left">上课时间：4月15日09：00</div>
                    </div>
                    
                 </div>
                </div>

            </div></el-col>
        </el-row>
        <el-row>
            <el-col :span="7"><div class="card"> 
             <div>
                    <p style="color:red;font-size:40px;float:left;margin:-65px 0 0 -45px;"><i class="el-icon-sunny"></i></p><br/><br/>
                    <p style=" float:left ; font-size:14px;"> 应到 : &nbsp;<span style="color:blue;float:right;font-size:18px;">4人</span></p> 
                    <p style=" float:left ;font-size:14px;margin-left:2rem"> &nbsp;实到 : <span style="color:lightgreen;float:right;font-size:18px;">&nbsp;3人</span></p><br/>
                    <p style=" float:left ;font-size:14px"> &nbsp;缺勤 : <span style="color:red;float:right;font-size:18px;">&nbsp;1人</span></p>
                    <p style=" float:left ;font-size:14px; margin-left:2rem"> 缺勤率 : <span style="font-size:18px;color:red">25%</span></p>
                </div>
             </div>
            </el-col>

            <el-col :span="17"><div class="card1">
                <div style=" height:40px; background-color: #C0C4CC; display: block; line-height: 40px; color: white; font-size: 18px; padding-left: 20px;"> <span>学生</span> </div>
                <div style=" padding: 20px;">
                    <span style="padding-right: 20px">
                        <i class="el-icon-s-custom" style="font-size: larger; color: #ffa10e;"> 杨园园</i>
                    </span>
                    <span style="padding-right: 20px">
                        <i class="el-icon-s-custom" style="font-size: larger; color: #ffa10e;"> 宋海贝</i>
                    </span>
                    <span style="padding-right: 20px">
                        <i class="el-icon-s-custom" style="font-size: larger; color: #ffa10e;"> 张新成</i>
                    </span>

                </div>

            </div></el-col>
        </el-row>
    </div>
</template>
<script>
    import ContentTitle from "../../components/ContentTitle.vue"
    import ListCondition from "../../components/ListCondition.vue"
    import Mytable from "../../components/Mytable.vue"
    import ClassGradeAdd from "../../components/classGrade/ClassGradeAdd.vue"
    import DateRanger2 from "../../components/DateRanger2"

    export default {
        name: "attendenceList",
        props: ["categoryId"],
        components: {ContentTitle, ListCondition, Mytable, ClassGradeAdd,DateRanger2},
        data() {
            return {

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
                    PageIndex: this.pagination.currentPage,
                    PageSize: this.pagination.pageSize,
                };
                if( this.value1!==null&&this.value1!==''){
                    params["GradeId"]=this.value1;
                }
                if( this.value2!==null&&this.value2!==''){
                    params["ClassId"]=this.value2;
                }
                Ajax.ClassGrade.get(params).then((res) => {
                    if (res.data.code == 200) {
                        var result=res.data.content;
                        this.tableData = result.data;
                        this.pagination.total=result.total;
                    }
                })
            },
            /**
             * 打开 添加的 弹出框
             */
            openAdd() {
                this.$refs.ClassGradeAdd.openPopup(null)
            },
            /**
             * 打开 编辑的 弹出框
             */
            openEdit(index, item, rowObj) {
                if (item) {
                    this.$refs.ClassGradeAdd.openPopup(item)
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
                    Ajax.ClassGrade.delete(ids).then((res) => {
                        if (res.data.code == 200) {
                            this.refresh()
                            layer.close(layro)
                        }
                    })
                })
            },
            /**
             * currentPage 改变时会触发
             */
            currentPageChange(arg){
                this.pagination.currentPage=arg;
                this.refresh();
            },
            /**
             * 获取年级
             */
            getGradeList(){
                Ajax.EssentialData.getGradeList().then((res)=>{
                    this.options1=res.data.content;
                })
            },
            /**
             * 获取年级
             */
            getClassList(){
                Ajax.EssentialData.getClassList().then((res)=>{
                    this.options2=res.data.content;

                })
            }
        },
        created(){
            // this.getGradeList();
            // this.getClassList();

        },
        mounted() {
            // this.refresh();
        }
    }
</script>

<style lang="scss">
    p{font-weight: normal !important}
    .card {
        padding: 10px;
        overflow: hidden;
        background-color: #fff;
        text-align:center;
        border-radius: 10px;
        margin: 4px;
        height: 240px;
        font-size: 18px;
        font-weight: normal;
        display: flex;
        align-items: center;
        justify-content: center;
        div {
            div {
                text-align: center;
                padding: 5px;
            }
            p {
                text-align: center;
                padding: 5px;
            }
        }
     }
     

    .card1 {

        overflow: hidden;
        background-color: #fff;
        border-radius: 10px;
        margin: 4px;
        height: 240px;
        font-size: 18px;

        div {
            div {
                text-align: center;
                padding: 5px;
            }
            p {
                text-align: center;
                padding: 5px;
            }
        }
    }
    .s01_classGrade {
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
    .s01_classGrade {
        .s01_ketang_table {
            @media all and (max-width: 730px) {
                top: 200rem * 480 / (1200 * 12);
            }
            @media all and (max-width: 482px) {
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

    .cardd{
            padding: 10px;
            overflow: hidden;
            background-color: #fff;
            text-align:center;
            border-radius: 10px;
            margin: 4px;
            height: 240px;
            font-size: 18px;
            font-weight: normal;
            display: flex;
            align-items: center;
            justify-content: center;
        div {
            div {
                text-align: center;
                padding: 5px;
            }
            p {
                text-align: center;
                padding: 5px;
            }
        }
    }

    /*响应式*/

</style>
