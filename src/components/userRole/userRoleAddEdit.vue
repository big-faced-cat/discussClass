<template>
    <MyPopup ref="MyPopup" :title="title" @pop-close="closePopup">
        <div class="s01_ClassGradeAdd">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="角色名称" prop="displayName">
                    <el-input class="s01_search_input" v-model="ruleForm.displayName" filterable placeholder=""
                              clearable
                              size="medium">
                    </el-input>
                </el-form-item>
                <el-form-item label="角色编号" prop="no">
                    <el-input class="s01_search_input" v-model="ruleForm.no" filterable placeholder=""
                              clearable
                              size="medium">
                    </el-input>
                </el-form-item>
                <el-form-item label="只显示该角色相关数据" prop="onlyShowCurrentData">
                     <el-radio v-model="ruleForm.onlyShowCurrentData" :label="true">是</el-radio>
                        <el-radio v-model="ruleForm.onlyShowCurrentData" :label="false">否</el-radio>
                </el-form-item>
                <el-form-item label="访问权限分配" prop="permissionIds">
                    <el-transfer
                            filterable
                            :filter-method="filterMethod"
                            filter-placeholder="请输入权限"
                            v-model="value"
                            :titles="['可选权限', '已选权限']"
                            :data="data">
                    </el-transfer>
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
        name: "userRoleAddEdit",
        props: [],
        data() {
            let  novailses = (rule, value, callback) => {
                if (this.ruleForm.no != '' && value != '' && /^[(A-Za-z) | (0-9)]*$/i.test(this.ruleForm.no)) {
                    callback();
                } else {
                    callback(new Error('角色编号必须由数字或者字母组成且必填'));
                }
            };
            let positionVal = (rule, value, callback) => {
                if (this.value.length > 0) {
                    callback();
                } else{
                    callback(new Error('请选择对应的权限'));
                }
            };
            return {
                data: [],
                value: [],
                filterMethod(query, item) {
                    return item.pinyin.indexOf(query) > -1;
                },
                selectedOptions: [],
                options1: [],//年级
                options2: [],//班级
                options3: [],//教室
                ruleForm: {
                    "displayName": "",
                    "onlyShowCurrentData": true,
                    "remark": "",
                    "permissionIds": [],
                    "no": []
                },
                rules: {
                    displayName: [
                        {required: true, message: '请输入角色', trigger: 'blur'},
                    ],
                    no: [
                        {required: true, validator: novailses, trigger: 'blur'},
                    ],
                    onlyShowCurrentData: [
                        {required: true, message: '请选择是否显示该角色响应角色', trigger: 'blur'},
                    ],
                    permissionIds: [
                        {required: true, validator: positionVal, trigger: 'blur'},
                    ],
                },
                currentRow: null,//数据id
                TIMEOUT: 0
            };
        },
        components: {MyPopup},
        methods: {
            getPermissions() {
                Ajax.Permission.get({}).then((res)=>{
                    if (res.status == 200) {
                            let allTransferData = [];
                            res.data.content.filter (temp =>{
                                allTransferData.push(
                                    {
                                        label: temp.displayName,
                                        key: temp.id,
                                        pinyin: temp.displayName
                                    }
                                );
                            });
                            this.data = allTransferData;
                    }
                });
            },
            getDetail() {
                let params = {id: this.currentRow.id};
                Ajax.Role.getDetail(params).then((res) => {
                    console.log('!!!!!获取到详情信息!!!!!!!9999999999999999999', res);
                    if (res.status == 200) {
                        if (res.data.content) {
                            console.log('111111111获取到的学校的详情11111111111',  res.data.content);
                            this.ruleForm = res.data.content;
                            let subjectAll = [];
                            res.data.content.permissionAbleDtos.filter(temp => {
                                subjectAll.push({
                                    label: temp.displayName,
                                    key: parseInt(temp.id) ,
                                    pinyin: temp.displayName
                                });
                            });
                            this.data =  subjectAll;
                            // 右侧数据
                            if (res.data.content.permissionOriginDtos.length > 0) {
                                this.value = res.data.content.permissionOriginDtos.map(temp => temp.id);
                            } else {
                                this.value = [];

                            }
                        }
                    }
                })
            },
            submitForm(formName) {
                if (this.TIMEOUT === 0) {
                    this.$refs[formName].validate((valid, obj) => {
                        if (valid) {
                            this.TIMEOUT++;
                            console.log('右侧的数据', this.value);

                            if (!this.currentRow) {//新增
                                let list = [];
                                list.push({
                                    "displayName": this.ruleForm.displayName,
                                    "onlyShowCurrentData": this.ruleForm.onlyShowCurrentData,
                                    'no': this.ruleForm.no,
                                    "permissionIds": this.value,
                                });
                                Ajax.Role.post(list).then((res) => {
                                    if (res.status == 200) {
                                        if(res.data.content!=0){
                                            this.closePopup()
                                        }else{
                                            this.$notify.error({
                                                title:"错误",
                                                message:"添加失败! 请检查是否已经存在"
                                            })
                                        }
                                    }
                                }).finally(() => {
                                    this.TIMEOUT = 0;
                                })
                            } else {//编辑
                                Ajax.Role.put({
                                    "displayName": this.ruleForm.displayName,
                                    "onlyShowCurrentData": this.ruleForm.onlyShowCurrentData,
                                    "permissionIds": this.value,
                                    id: this.currentRow.id
                                }).then((res) => {
                                    if (res.status == 200) {
                                        if(res.data.content=0){
                                            this.$notify.error({
                                                title:"错误",
                                                message:"更新失败! 请检查是否已经存在"
                                            })
                                        }else{
                                            this.closePopup()
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
                    this.getDetail();
                } else {
                    this.getPermissions();
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
                this.resetForm("ruleForm");
                this.value= [];
                this.ruleForm.permissionIds = [];
                this.TIMEOUT = 0;
            },
            tellParentFresh() {
                this.$emit("refresh-list")
            },

            /**
             * 获取年级
             */
            getClassList() {
                Ajax.EssentialData.getClassList().then((res) => {
                    this.options2 = res.data.content;

                })
            },

        },
        computed: {
            title() {
                return this.currentRow ? ('修改角色权限') : '添加角色权限'
            }
        },
        created() {
        },
        mounted() {

        }
    }
</script>

<style lang="scss">
    .tranferStyle{
        width: 300px;
        height: 200px;
    }
    .s01_ClassGradeAdd {
        .s01_database_text {
            textarea {
                height: 100%;
            }
        }
    }
</style>
