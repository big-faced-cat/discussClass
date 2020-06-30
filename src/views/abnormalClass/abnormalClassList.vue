<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="s01_courseMan" >
        <ContentTitle>课程异常</ContentTitle>
        <ListCondition>
            <el-select class="s01_search_input" v-model="value5" filterable placeholder="学校" style="width:150px;"
                       clearable
                       size="medium">
                <el-option
                        v-for="item in options5"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
            <el-select class="s01_search_input" v-model="value5" filterable placeholder="学科" style="width:150px;"
                       clearable
                       size="medium">
                <el-option
                        v-for="item in options5"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
            <el-select class="s01_search_input" v-model="value6" filterable placeholder="授课类型" style="width:150px;"
                       clearable
                       size="medium">
                <el-option
                        v-for="item in options6"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
            <el-select class="s01_search_input" v-model="value6" filterable placeholder="老师" style="width:150px;"
                       clearable
                       size="medium">
                <el-option
                        v-for="item in options6"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
            <el-input class="s01_search_input" v-model="TeacherName" filterable placeholder="课堂内容"
                      style="width:150px;" clearable
                      size="medium">
            </el-input>
            <DateRanger2 v-model="startEndTime"></DateRanger2>
<!--            @click="openAdd()"-->
            <el-button type="success" class="s01_compare_btn" size="medium" >查询
            </el-button>
        </ListCondition>
        <div class="s01_stu_table">
            <Mytable ref="Mytable"
                     @handle-view="handelView"
                     :tableHead="tableHead"
                     :tableData="tableData"
                     :highlight-current-row="true"
                     :disable-pagination="true"
                     @selection-change="handleSelectionChange"
            >

                 <template v-slot:tableActions="slotProps" >
                    <el-button type="primary" plain
                               @click="toPage"
                               size="mini">异常分析
                    </el-button>
                </template>
            </Mytable>
        </div>
        <!--弹出框-->
        <CourseManAdd ref="CourseManAdd" @refresh-list="refresh"></CourseManAdd>
        <!--弹出框-->

    </div>
</template>
<script>
    import ContentTitle from "../../components/ContentTitle.vue"
    import ListCondition from "../../components/ListCondition.vue"
    import Mytable from "../../components/Mytable.vue"
    import ClassGradeAdd from "../../components/classGrade/ClassGradeAdd.vue"
    import DateRanger2 from "../../components/DateRanger2"

    export default {
        name: "abnormalClassList",
        props: ["categoryId"],
        components: {ContentTitle, ListCondition, Mytable, ClassGradeAdd,DateRanger2},
        data() {
            return {
                TeacherName: "",
                options1: [],//年级
                value1: null,
                options2: [],//班级
                value2: null,
                tableHead: [
                    {type: "selection", prop: "", label: "序号", width: "50"},
                    {type: "", prop: "gradeName", label: "日期", minWidth: "180"},
                    {type: "", prop: "classType", label: "授课类型", minWidth: "180"},
                    {type: "", prop: "classStudent", label: "授课对象", minWidth: "180"},
                    {type: "", prop: "classMovation", label: "授课行为", minWidth: "180"},
                    {type: "", prop: "classDetails", label: "详情", minWidth: "180"},
                ],
                tableData: [{gradeName:'2020年4月13日',classTeacher:'李艳红',Subjects:'English',classType:'讲授型',classStudent:'学生',classMovation:'讲授',classDetails:'教授指点'},
                {gradeName:'2020年4月14日',classTeacher:'李艳红',Subjects:'English',classType:'讲授型',classStudent:'学生',classMovation:'讲授',classDetails:'教授指点'}],
                keyword: "",//模糊搜索
                multipleSelection: [],//勾选框列表选中的行
                pagination:{
                    currentPage:1,
                    pageSize:15,
                    total:0
                }

            }
        },
        methods: {
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
    .s01_classGrade {
        .s01_ketang_table {
            // width: 100%;
            position: absolute;
           // top: 140rem * 480 / (1200 * 12);
            bottom: 0;
            overflow: auto;
            left: 20rem * 480 / (1200 * 12);
            right: 0;

            .s01_table_table {
                position: absolute;
               // top: 10rem * 480 / (1200 * 12);
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

    /*响应式*/

</style>
