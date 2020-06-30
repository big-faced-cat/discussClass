<template>
    <MyPopup ref="MyPopup" :title="title" @pop-close="closePopup">
        <div class="s01_ClassGradeAdd">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="员工编号" v-if="currentRow" prop="staffNo">
                    <span>{{currentRow.staffNo}} </span>
                </el-form-item>
                <el-form-item label="昵称" v-if="currentRow" prop="nickname">
                    <span style="display: inline-block;"> {{currentRow.nickname}}</span>
                </el-form-item>
                <el-form-item label="角色分配" prop="values">
                    <el-transfer
                            filterable
                            :filter-method="filterMethod"
                            filter-placeholder="请输入角色"
                            v-model="value"
                            :titles="['可分配角色', '已分配角色']"
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
        name: "AssignRole",
        props: [],
        data() {
            let positionVal = (rule, value, callback) => {
                if (this.value.length != 0) {
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
                ruleForm: {
                    staffNo: "",
                    nickname: "",
                    values: "",
                },
                rules: {
                    values: [
                        { required: true,validator: positionVal, message: '请选择对应的权限', trigger: 'blur'},
                    ],
                },
                currentRow: null,
                TIMEOUT: 0
            };
        },
        components: {MyPopup},
        computed: {
            title() {
                return '分配角色'
            }
        },
        methods: {
            getDetail() {
                Ajax.User.getDetail({
                    id: this.currentRow.id
                }).then((res) => {
                    if (res.status == 200) {
                        if (res.data.content) {
                            this.ruleForm = res.data.content;
                            let subjectAll = [];
                            res.data.content.roleAbleDtos.filter(temp => {
                                subjectAll.push({
                                    label: temp.displayName,
                                    key: temp.id,
                                    pinyin: temp.displayName
                                });
                            });
                            this.data =  subjectAll;
                            // 右侧数据
                            if (res.data.content.roleOriginDtos.length > 0) {
                                this.value = res.data.content.roleOriginDtos.map(temp => temp.id);
                            } else {
                                this.value = [];
                            }
                        }
                    }
                })
            },
            submitForm(formName) {
                if (this.TIMEOUT === 0) {
                    this.ruleForm.schoolId= "3333";
                    this.ruleForm.values = this.value;
                    this.$refs[formName].validate((valid, obj) => {
                        if (valid) {
                            this.TIMEOUT++;
                            if (!this.currentRow) {//新增
                            } else {//编辑
                                let params = {
                                    "userId":  this.currentRow.id,
                                    "roleIds": this.value
                                };
                                Ajax.User.putRoleArrange(params).then((res) => {
                                    if (res.status == 200) {
                                        if(!res.data.content){
                                            this.$notify.error({
                                                title:"错误",
                                                message:"更新失败! 请检查是否已经存在"
                                            })
                                        }else{
                                            this.closePopup();
                                        }
                                    }
                                }).finally(() => {
                                    this.TIMEOUT = 0;
                                });
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
                this.$refs.MyPopup.openPopup(...arguments);
                if (this.currentRow) {
                    this.getDetail();
                }
            },
            closePopup() {
                //关闭弹窗框
                this.$refs.MyPopup.closePopup(...arguments);
                this.tellParentFresh();
                this.resetForm("ruleForm")
                this.TIMEOUT = 0;
            },
            tellParentFresh() {
                this.$emit("refresh-list")
            },
            // getClassList() {
            //     Ajax.EssentialData.getClassList().then((res) => {
            //         this.options2 = res.data.content;
            //     })
            // },
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
