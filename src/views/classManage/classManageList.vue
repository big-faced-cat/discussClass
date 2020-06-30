<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="s01_cameraList" >
        <ContentTitle>班级管理</ContentTitle>
        <ListCondition>
            <el-select class="s01_search_input"   @change="changeSchoolNo(this)" v-model="schoolId" filterable placeholder="学校" style="width:150px;"
                       size="medium">
                <el-option
                        key=-1
                        label="全部学校"
                        :value='-1'>
                </el-option>
                <el-option
                        v-for="item in schoolList"
                        :key="item.id"
                        :label="item.no"
                        :value="item.id">
                </el-option>
            </el-select>
            <span style=" display: inline-block;">  {{schoolName}}</span>
            <el-select class="s01_search_input" v-model="classId" filterable placeholder="班级" style="width:150px;"
                       size="medium">
                <el-option
                        key=-1
                        label="全部班级"
                        :value='-1'>
                </el-option>
                <el-option
                        v-for="item in classList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
            <el-select class="s01_search_input" v-model="gradeId" filterable placeholder="年级" style="width:150px;"
                       size="medium">
                <el-option
                        key=-1
                        label="全部年级"
                        :value='-1'>
                </el-option>
                <el-option
                        v-for="item in gradeList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
            <el-button type="success" class="s01_compare_btn" size="medium"  @click="refresh()">查询
            </el-button>
            <el-button  v-if="deleteClass" type="success" class="s01_compare_btn" size="medium"  @click="clickDel()">删除
            </el-button>
            <el-button v-if="addClass" type="success" class="s01_compare_btn" size="medium"  @click="openAdd()">添加
            </el-button>
            <el-button  v-if="importClass" type="success" class="s01_compare_btn" size="medium"  @click="classImports()">导入班级
            </el-button>
            <el-button  v-if="importClassStudent" type="success" class="s01_compare_btn" size="medium"  @click="classStudentImports()">导入学生和班级关系
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
                        @selection-change="handleSelectionChange"
                        @current-change="currentPageChange"
                        :currentSelect="multipleSelection"
                        :option="editClass ? 0: 1"
                >

                <!--列表操作-->
                <template v-slot:tableActions="slotProps" v-if="editClass" >
                    <el-button type="primary" plain
                               @click="openEdit(slotProps.scopeT.$index, slotProps.scopeT.row,slotProps.scopeT)"
                               size="mini">编辑
                    </el-button>
                </template>
            </Mytable>
        </div>
        <!--弹出框-->
        <ClassManaAddEdit ref="ClassManaAddEdit" @refresh-list="refresh" ></ClassManaAddEdit>
        <ClassImport ref="ClassImport"   @refresh-list="refresh"></ClassImport>
        <ClassStudentImports ref="ClassStudentImports"   @refresh-list="refresh"></ClassStudentImports>
    </div>

</template>
<script>
    import ContentTitle from "../../components/ContentTitle.vue"
    import ListCondition from "../../components/ListCondition.vue"
    import Mytable from "../../components/Mytable.vue"
    import ClassManaAddEdit from "../../components/classManage/ClassManageAddEdit.vue"
    import DateRanger2 from "../../components/DateRanger2"
    import ClassImport from "../../components/classManage/ClassImport.vue"
    import ClassStudentImports from "../../components/classManage/ClassStudentImports.vue"


    export default {
        name: "s01_classGrade",
        props: ["categoryId"],
        components: {ContentTitle, ListCondition, Mytable, ClassManaAddEdit,DateRanger2, ClassImport, ClassStudentImports},
        data() {
            let getPowerData=  JSON.parse(localStorage.getItem('powerDictionary'));
            return {
                addClass:getPowerData['post-class-null'],
                editClass: getPowerData['put-class-null'],
                deleteClass: getPowerData['delete-class-null'],
                importClass: getPowerData['post-class-import'],
                importClassStudent: getPowerData['post-class-importclassstudent'],
                schoolName: '', //学校名称
                classList: [], //班级列表
                gradeList: [], //年级列表
                schoolId: -1,
                classId: -1,
                gradeId: -1,
                schoolList: [],   //学校列表
                subjectList: [],  //学科列表

                TeacherName: "",
                options1: [],//年级
                value1: null,
                options2: [],//班级
                value2: null,
                tableHead: [
                    {type: "selection", prop: "", label: "序号", width: "50"},
                    {type: "", prop: "no", label: "班级编号", minWidth: "100"},
                    {type: "", prop: "className", label: "班级名称", minWidth: "100"},
                    {type: "", prop: "gradeName", label: "年级", minWidth: "100"},
                    {type: "", prop: "schoolName", label: "学校", minWidth: "100"},
                ],
                tableData: [],
                keyword: "",//模糊搜索
                multipleSelection: [],//勾选框列表选中的行
                pagination:{
                    currentPage:1,
                    pageSize:10,
                    total:0
                }

            }
        },
        methods: {
            // 班级导入
            classImports() {
                this.$refs.ClassImport.openPopup();
            },
            //  班级学生导入
            classStudentImports() {
                this.$refs.ClassStudentImports.openPopup();
            },
            // 改变学校编号
            changeSchoolNo(val) {
                let  name =  this.schoolList.filter(item => item.id == this.schoolId);
                if ( name.length > 0) {
                    this.schoolName=name[0].name;
                } else {
                    this.schoolName= '';
                }
               
            },
            /**
             * 打开 添加的 弹出框
             */
            openAdd() {
                this.$refs.ClassManaAddEdit.openPopup(null);
            },

            /**
             * 刷新页面
             */
            refresh() {
                let  params = {
                    Id: null,
                    No: null,
                     GradeId: parseInt(this.gradeId),
                     ClassId: parseInt(this.classId),
                     SchoolId: parseInt(this.schoolId),
                     PageIndex: this.pagination.currentPage,
                     PageSize: this.pagination.pageSize,
                }
                Ajax.Class.get(params).then((res) => {
                    if (res.status == 200) {
                        var result=res.data.content.pagedData;
                        this.tableData = result;
                        this.pagination.total=res.data.content.totalCount;
                        this.$nextTick(function () {
                            this.$refs.Mytable.toggleSelection(this.multipleSelection, true);
                        })
                    }
                })
            },

            /**
             * 打开 添加的 弹出框
             */
            openNewComparation(){
                this.$refs.ClassGradeAdd.openPopup(null)
            },
            /**
             * 打开 编辑的 弹出框
             */
            openEdit(index, item, rowObj) {
                if (item) {
                    this.$refs.ClassManaAddEdit.openPopup(item)
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
                    Ajax.Class.delete(ids).then((res) => {
                        if (res.status == 200) {
                            this.multipleSelection = [];
                            this.refresh();
                            layer.close(layro);
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

            getDataBase(param) {
                let params = {
                    Category: param,
                    NameOrRemark: '',
                };
                Ajax.EssentialData.get(params).then(function (response) {
                    var res = response.data;
                    if (response.status == 200) {
                        // console.log('获取到的基础数据',  response);
                    }
                })
            },

            // 获取学校
            getSchoolList1(){
                let params ={
                    Id: null,
                    No: null,
                    Name: null,
                    ProvinceId: null,
                    CityId: null,
                    CountyId: null,
                    PageIndex: 1,
                    PageSize: 100000,
                };
                Ajax.School.get().then((res) => {
                    if ( res.status== 200) {
                        this.schoolList = res.data.content.pagedData;
                    }
                })
            },

            // 获取学科 授课类型
            getSubjectAclassType(param){
                let params = {
                    Category: param,
                    NameOrRemark: '',
                };
                Ajax.EssentialData.get(params).then(function (respnnse) {
                        var res = respnnse.data;
                        if (respnnse.status == 200) {
                            // 学科
                            if ( param == 0) {
                                this.subjectList = respnnse.data.content;

                            }
                            // 授课类型
                            if ( param == 1) {
                                this.classTypeList = respnnse.data.content;
                            }
                        }}
                        );
            },

            // 获取老师列表
            getSubject(){
                Ajax.EssentialData.getClassList().then((res)=>{
                    this.options2=res.data.content;
                });
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
        created(){

        },
        mounted() {
            this.getSchoolList1();
            this.getdata(8);
            this.getdata(9);
            // this.getSubjectAclassType(0);
            // this.getSubjectAclassType(1);
            this.refresh();
        }
    }
</script>

<style lang="scss">
    .s01_cameraList {
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
    .s01_cameraList {

        .s01_ketang_table {
            @media all and (max-width: 1108px) {
                top: 200rem * 480 / (1200 * 12);
            }
            @media all and (max-width: 655px) {
                top: 250rem * 480 / (1200 * 12);
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
