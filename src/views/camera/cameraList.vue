<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="s01_cameraList">
        <ContentTitle>摄像头管理</ContentTitle>
        <ListCondition>
            <el-input v-model="StartIp" placeholder="起始IP" class="s01_list_select" size="medium" clearable
                      style="width:160px;"></el-input>
            <el-input v-model="EndIp" placeholder="结束IP" class="s01_list_select" size="medium" clearable
                      style="width:160px;"></el-input>
            <el-select class="s01_search_input" v-model="ClassRoomId"  v-on:change="changeClassRoom"  filterable placeholder="教室" style="width:150px;"
                       size="medium">
                <el-option :value="-1" label="全部教室" selected></el-option>
                <el-option
                        v-for="item in classRoomList"
                        :key="item.id"
                        :label="item.no"
                        :value="item.id">
                </el-option>
            </el-select>
            <span style="display: inline-block;"> {{this.schoolName}}</span>
            <el-button type="primary" size="medium" style="background:#fdb045;border:none;margin-left:0.33rem;"
                       @click="search">查询
            </el-button>
            <el-button v-if="addCamera" type="success" class="s01_compare_btn" size="medium" @click="openAdd()">添加
            </el-button>
            <el-button v-if="deleteCamera" type="success" class="s01_compare_btn" size="medium" @click="clickDel()">删除
            </el-button>
            <el-button  v-if="importCamera"   type="success" class="s01_compare_btn" size="medium" @click="openImport">
                Excel导入
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
                    :options="editCamera ?  0: 1"
            >
                <!--列表操作-->
                <template v-slot:tableActions="slotProps" v-if="editCamera">
                    <el-button type="primary" plain
                               @click="openEdit(slotProps.scopeT.$index, slotProps.scopeT.row,slotProps.scopeT)"
                               size="mini">编辑
                    </el-button>
                </template>
                <!--列表操作-->
            </Mytable>
        </div>
        <!--弹出框  -->
        <CameraAdd ref="CameraAdd" @refresh-list="refresh" ></CameraAdd>
        <CameraImport ref="CameraImport"   @refresh-list="refresh"></CameraImport>
        <!--弹出框-->
    </div>
</template>
<script>
    import ContentTitle from "../../components/ContentTitle.vue"
    import ListCondition from "../../components/ListCondition.vue"
    import Mytable from "../../components/Mytable.vue"
    import CameraAdd from "../../components/camera/CameraAdd.vue"
    import CameraImport from "../../components/camera/CameraImport.vue"
    export default {
        name: "s01_cameraList",
        props: ["categoryId"],
        components: {ContentTitle, ListCondition, Mytable, CameraAdd, CameraImport},
        data() {
            let getPowerData=  JSON.parse(localStorage.getItem('powerDictionary'));
            return {
                addCamera:getPowerData['post-camera-null'],
                editCamera: getPowerData['put-camera-null'],
                deleteCamera: getPowerData['delete-camera-null'],
                importCamera: getPowerData['post-camera-import'],
                classRoomList: [],  //教室列表
                schoolName: '', // 教室名称
                options3: [],//教室
                tableHead: [
                    {type: "selection", prop: "", label: "序号", width: "50"},
                    {type: "", prop: "classroomNo", label: "教室编号", minWidth: "180"},
                    {type: "", prop: "ip", label: "IP", minWidth: "180"},
                    {type: "", prop: "localId", label: "本地映射地址", minWidth: "180"},
                    {type: "", prop: "maxFace", label: "最大面部识别数", minWidth: "180"},
                ],
                tableData: [],
                keyword: "",//模糊搜索最大
                multipleSelection: [],//勾选框列表选中的行
                pagination: {
                    currentPage: 1,
                    pageSize: 10,
                    total: 0
                },
                StartIp: "",
                EndIp: "",
                ClassRoomId: -1,
                conditionParams:{
                    StartIp: "",
                    EndIp: "",
                    ClassRoomId: -1,
                },
                rowsData: [],
            }
        },
        methods: {

            //教室切换
            changeClassRoom() {
                if ( this.ClassRoomId == -1) {
                    this.schoolName= "";
                } else {
                    this.schoolName = this.classRoomList.filter(temp => temp.id ==  this.ClassRoomId)[0].schoolName;
                }
            },
            // 查询按钮
            search(params) {
                if(params != 1) {
                    this.conditionParams.ClassRoomId = this.ClassRoomId;
                    this.conditionParams.EndIp = this.EndIp;
                    this.conditionParams.StartIp = this.StartIp;
                }
                var params = {
                    PageIndex: this.pagination.currentPage,
                    PageSize: this.pagination.pageSize,
                    StartIp: this.conditionParams.StartIp,
                    EndIp: this.conditionParams.EndIp,
                    ClassroomId: this.conditionParams.ClassRoomId,
                };
                if (this.StartIp !== null && this.StartIp !== '') {
                    if (!isValidIP(this.StartIp)) {
                        this.$notify.error({
                            title: "错误",
                            msessage: "请输入合法起始ip"
                        })
                        return;
                    }
                    params.StartIp = this.StartIp;
                }
                if (this.EndIp !== null && this.EndIp !== '') {
                    if (!isValidIP(this.EndIp)) {
                        this.$notify.error({
                            title: "错误",
                            msessage: "请输入合法结束ip"
                        });
                        return;
                    }
                    params.EndIp = this.EndIp;
                }
                if (this.ClassRoomId !== null && this.ClassRoomId !== '') {
                    params["ClassRoomId"] = this.ClassRoomId;
                }
                Ajax.Camera.get(params).then((res) => {
                    if (res.status == 200) {
                        this.tableData = res.data.content.pagedData;
                        this.pagination.total =  res.data.content.totalCount;
                        this.$nextTick(function () {
                            this.$refs.Mytable.toggleSelection(this.multipleSelection, true);
                        })
                    }
                })
            },

            //刷新页面
            refresh() {
                this.StartIp= "";
                this.EndIp = "";
                this.ClassRoomId = -1;
                this.schoolName = '';
                var params = {
                    PageIndex: this.pagination.currentPage,
                    PageSize: this.pagination.pageSize,
                    StartIp: this.StartIp,
                    EndIp: this.EndIp,
                    ClassroomId: this.ClassRoomId,
                };
                if (this.StartIp !== null && this.StartIp !== '') {
                    if (!isValidIP(this.StartIp)) {
                        this.$notify.error({
                            title: "错误",
                            msessage: "请输入合法起始ip"
                        })
                        return;
                    }
                    params.StartIp = this.StartIp;
                }
                if (this.EndIp !== null && this.EndIp !== '') {
                    if (!isValidIP(this.EndIp)) {
                        this.$notify.error({
                            title: "错误",
                            msessage: "请输入合法结束ip"
                        });
                        return;
                    }
                    params.EndIp = this.EndIp;
                }
                if (this.ClassRoomId !== null && this.ClassRoomId !== '') {
                    params["ClassRoomId"] = this.ClassRoomId;
                }
                Ajax.Camera.get(params).then((res) => {
                    if (res.status == 200) {
                        this.tableData = res.data.content.pagedData;
                        this.pagination.total =  res.data.content.totalCount;
                        this.$nextTick(function () {
                            this.$refs.Mytable.toggleSelection(this.multipleSelection, true);
                        })
                    }
                })
            },
            /**
             * 打开 添加的 弹出框
             */
            openAdd() {
                this.$refs.CameraAdd.openPopup(null)
            },
            /**
             * 打开 编辑的 弹出框
             */
            openEdit(index, item, rowObj) {
                if (item) {
                    this.$refs.CameraAdd.openPopup(item)
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
                    Ajax.Camera.delete(ids).then((res) => {
                        if (res.status == 200) {
                            this.multipleSelection = [];
                            this.refresh()
                            layer.close(layro)
                        }
                    })
                })
            },
            /**
             * currentPage 改变时会触发
             */
            currentPageChange(arg, val, tableData) {
                this.pagination.currentPage = arg;
                this.$nextTick(function () {
                    this.handleSelectionChange(val, tableData);
                    this.search(1);
                });



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
             * Excel导入
             */
            openImport() {
                this.$refs.CameraImport.openPopup();
            },
            /**
             * 获取年级
             */
            getClassList() {
                Ajax.EssentialData.getClassList().then((res) => {
                    this.options2 = res.data.content;
                })
            },

            //获取教室列表
            getClassRoomList() {
                let params = {
                    Id: null,
                    No: null,
                    SchoolId: null,
                    PageIndex: 1,
                    PageSize: 100000,
                };
                Ajax.Classroom.get(params).then((res) => {
                    if(res.status == 200) {
                        if(res.data.content) {
                            this.classRoomList =res.data.content.pagedData;

                        }
                    }
                });
            },
        },
        created() {
        },
        mounted() {
            // this.toggleSelection();
            this.getClassRoomList();
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
