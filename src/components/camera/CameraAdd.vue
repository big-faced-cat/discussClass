<template>
    <MyPopup ref="MyPopup" :title="title" @pop-close="closePopup">
        <div class="s01_CameraAdd" style="padding-right: 60px;">
            <el-form :model="ruleForm"  label-position="right" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
                <el-form-item label="教室" prop="classroomId">
                    <el-select v-model="ruleForm.classroomId"  v-on:change="changeClassRoom"  placeholder="教室"  >
                        <el-option
                                v-for="item in classRoomList"
                                :key="item.id"
                                :label="item.no"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <span style="display: inline-block;"> {{this.ruleForm.schoolName}}</span>
                </el-form-item>

                <el-form-item label="IP" prop="ip">
                    <el-input autofocus v-model="ruleForm.ip"></el-input>
                </el-form-item>

                <el-form-item label="用户名" prop="username">
                    <el-input autofocus v-model="ruleForm.username"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input autofocus v-model="ruleForm.password"></el-input>
                </el-form-item>

                <el-form-item label="RTSP地址" prop="rtsp">
                    <el-input autofocus v-model="ruleForm.rtsp"></el-input>
                </el-form-item>
                <el-form-item label="最大面部识别数" prop="maxFace">
                    <el-input type="number" min="1" max="20"  v-model="ruleForm.maxFace" placeholder="1到20"></el-input>
                </el-form-item>
                <el-form-item label="网络摄像头本地映射地址" prop="localId">
                    <el-input autofocus v-model="ruleForm.localId"></el-input>
                </el-form-item>


                <el-form-item label="记录对象" prop="recordObject">
                    <el-select v-model="ruleForm.recordObject"  placeholder=""  >
                        <el-option
                                v-for="item in  recordObjectList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="品牌" prop="brand">
                    <el-select v-model="ruleForm.brand"  placeholder=""  >
                        <el-option
                                v-for="item in brandList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item size="large">
                    <el-button type="primary" @click="submitForm('ruleForm')">
                        {{TIMEOUT===0?(currentRow?"立即更新":"立即创建"):"提交中..."}}
                    </el-button>
                    <el-button @click="closePopup">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </MyPopup>
</template>
<script>
    import MyPopup from "../MyPopup.vue"

    export default {
        name: "CameraAdd",
        props: [],
        data() {
            let ipVali = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入ip'));
                } else if (!isValidIP(value)) {
                    callback(new Error('请输入合法ip!'));
                } else {
                    callback();
                }
            };
           let inputVali = (rule, value, callback) => {
                if (this.removeSpecialCharacter(this.ruleForm.username) == '') {
                    callback(new Error('请输入用户名'));
                } else {
                    callback();
                }
            };
            let  rtspVali= (rule, value, callback) => {
                console.log('3333', value.substring(0,7));
                if (value.substring(0,7)!="rtsp://") {
                    callback(new Error('请输入合法rtsp!'));
                } else {
                    callback();
                }
            };
            return {
                classRoomList: [],
                recordObjectList: [], //记录对象列表
                brandList: [],   //品牌列表
                ruleForm: {
                    "name": "",
                    "ip": "",
                    "rtsp": "",
                    "localId": "",
                    "classroomId": "",
                    "maxFace": null,
                    "username": "",
                    "password": "",
                    "recordObject": null,  //记录对象
                    "brand": null,  //品牌
                    "schoolName": '', //学校名称
                 },

                rules: {
                    name: [
                        {required: true, message: '请输入摄像头名称', trigger: 'blur'},
                        {min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur'}
                    ],
                    ip: [
                        {required: true, message: '请输入ip', trigger: 'blur'},
                        { validator: ipVali, trigger: 'blur' }
                    ],
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        { validator: inputVali, trigger: 'blur' }
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ],
                    maxFace:[
                       {required: true, message: '请输入最大面部识别数', trigger: 'blur'},
                ],
                    rtsp: [
                        {required: true, message: '请输入rtsp地址', trigger: 'blur'},
                        { validator: rtspVali, trigger: 'blur' }
                    ],
                    localId: [
                        {required: true, message: '请输入网络摄像头本地映射地址', },
                    ],
                    classroomId: [
                        {required: true, message: '请选择教室', trigger: 'blur'},
                    ],

                    recordObject: [
                        {required: true, message: '请选择记录对象', trigger: 'blur'},
                    ],
                    brand: [
                        {required: true, message: '请选择摄像头品牌', trigger: 'blur'},
                    ],
                },
                currentRow: null,//数据id
                TIMEOUT: 0
            };
        },
        components: {MyPopup},
        methods: {
            //教室切换
            changeClassRoom() {
                    this.ruleForm.schoolName = this.classRoomList.filter(temp => temp.id ==  this.ruleForm.classroomId)[0].schoolName;
            },
            getDetail() {
                // this.ruleForm =  this.currentRow;
                let params = {id: this.currentRow.id};
                Ajax.Camera.getDetail(params).then((res) => {
                    if (res.status == 200) {
                        if (res.data.content) {
                            // this.schoolList = res.data.content.schoolDtos;
                            this.classRoomList =  res.data.content.classrooms;
                            this.recordObjectList = res.data.content.recordObjects;
                            this.brandList =  res.data.content.brands;
                            this.ruleForm = res.data.content;
                        }
                    }
                })
            },
            submitForm(formName) {
                if (this.TIMEOUT === 0) {
                    this.$refs[formName].validate((valid, obj) => {
                        if (valid) {
                            this.TIMEOUT++;
                            if (!this.currentRow) {//新增
                                var list = [];
                                list.push({
                                    "name": this.ruleForm.name,
                                    "ip": this.ruleForm.ip,
                                    "rtsp": this.ruleForm.rtsp,
                                    "localId": parseInt(this.ruleForm.localId),
                                    "classRoomId":parseInt(this.ruleForm.classroomId),
                                    "maxFace": parseInt(this.ruleForm.maxFace),
                                    "username": this.ruleForm.username,
                                    "password": this.ruleForm.password,
                                    "recordObject": this.ruleForm.recordObject,  //记录对象
                                    "brand": this.ruleForm.brand,  //品牌
                                });
                                Ajax.Camera.post(list).then((res) => {
                                    if (res.status == 200) {
                                        if(res.data.content!=0){
                                            this.closePopup()
                                        }else{
                                            this.$notify.error({
                                                title:"错误",
                                                message:"添加失败! 请检查数据是否正确"
                                            })
                                        }
                                    }
                                }).finally(() => {
                                    this.TIMEOUT = 0;
                                })
                            } else {//编辑
                                Ajax.Camera.put({
                                    "name": this.ruleForm.name,
                                    "ip": this.ruleForm.ip,
                                    "rtsp": this.ruleForm.rtsp,
                                    "localId": parseInt(this.ruleForm.localId),
                                    "classRoomId":parseInt(this.ruleForm.classroomId),
                                    "maxFace": parseInt(this.ruleForm.maxFace),
                                     id: this.currentRow.id,
                                    "username": this.ruleForm.username,
                                    "password": this.ruleForm.password,
                                    "recordObject": this.ruleForm.recordObject,  //记录对象
                                    "brand": this.ruleForm.brand,  //品牌
                                }).then((res) => {
                                    if (res.status == 200) {
                                        if(res.data.content!=0){
                                            this.closePopup()
                                        }else{
                                            this.$notify.error({
                                                title:"错误",
                                                message:"添加失败! 请检查数据是否正确"
                                            })
                                        }
                                    }
                                }).finally(() => {
                                    this.TIMEOUT = 0;
                                })
                            }
                        } else {
                            return false;
                        }
                    });
                } else {
                    this.$notify.info({
                        title: '消息',
                        message: '请勿重复提交'
                    });
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            /**
             * 打开弹出框
             */
            openPopup(currentRow) {
                this.currentRow = currentRow;
                if (this.currentRow) {
                    this.getDetail()
                } else {
                    this.getdata(6);
                    this.getdata(7);
                    this.getClassRoomList();
                }
                this.$refs.MyPopup.openPopup(...arguments);
            },
            /**
             * 关闭自己
             */
            closePopup() {
                //关闭弹窗框
                this.$refs.MyPopup.closePopup(...arguments);
                //触发列表刷新
                this.tellParentFresh();
                this.resetForm("ruleForm")
                this.TIMEOUT = 0;
            },
            tellParentFresh() {
                this.$emit("refresh-list")
            },

            getdata(params) {
                Ajax.EssentialData.getLists(params).then((res)=>{
                    if (res.status == 200) {
                        // 记录对象
                        if (params == 6) {
                            this.recordObjectList = res.data.content;
                            console.log('记录对象列表',  this.recordObjectList);
                        }
                        // 摄像头品牌
                        if (params == 7) {
                            this.brandList = res.data.content;
                            console.log('s摄像头品牌列表',  this.brandList);
                        }
                    }
                });
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
        computed: {
            title() {
                return this.currentRow ? ('修改摄像头') : '添加摄像头'
            }
        },
        created() {
        },
        mounted() {}
    }
</script>

<style lang="scss">
    .s01_CameraAdd {
        .el-form-item__label{
       }
        .s01_database_text {
            textarea {
                height: 100%;
            }
        }
    }
</style>
