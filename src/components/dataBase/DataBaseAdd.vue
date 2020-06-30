<template>
    <MyPopup ref="MyPopup" :title="title"  @pop-close="closePopup">
        <div class="s01_DataBaseAdd" style=" padding-right: 50px;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
                <el-form-item  label="名称" prop="name">
                    <el-input autofocus v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" class="s01_database_text" v-model="ruleForm.remark"  style="height:100px;"></el-input>
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
        name: "DataBaseAdd",
        props: ["category-id", "title-name"],
        data() {
            return {
                ruleForm: {
                    name: '',
                    remark: '',
                },
                rules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                        {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
                    ],
                    remark: [
                        {min: 5, max: 300, message: '长度在 5 到 300 个字符', trigger: 'blur'}
                    ],
                },
                currentRow: null,//数据
                TIMEOUT: 0
            };
        },
        components: {MyPopup},
        methods: {
            getDetail() {
                Ajax.EssentialData.get({
                    id: this.currentRow.id,
                    Category:this.currentRow.category
                }).then((res) => {
                    this.ruleForm = res.data.content[0]
                })
            },
            submitForm(formName) {
                if (this.TIMEOUT === 0) {
                    this.$refs[formName].validate((valid,obj) => {
                        if (valid) {
                            this.TIMEOUT++;

                            if (!this.currentRow) {//新增
                                var list = [];
                                list.push({
                                    name: this.removeSpecialCharacter(this.ruleForm.name),
                                    remark: this.removeSpecialCharacter(this.ruleForm.remark),
                                    category: parseInt(this.categoryId)
                                });
                                Ajax.EssentialData.post(list).then((res) => {
                                    if (res.status == 200) {
                                        this.closePopup()
                                    }
                                }).finally(() => {
                                    this.TIMEOUT = 0;
                                })
                            } else {//编辑
                                Ajax.EssentialData.put({
                                    name: this.removeSpecialCharacter(this.ruleForm.name),
                                    remark: this.removeSpecialCharacter(this.ruleForm.remark),
                                    category: parseInt(this.categoryId),
                                    id: this.ruleForm.id
                                }).then((res) => {
                                    if (res.status == 200) {
                                        this.closePopup()
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
            }
        },
        // computed是在HTML DOM加载后马上执行的
        computed: {
            title() {
                return (this.currentRow ? '修改' : '添加') + this.titleName
            }
        },
        mounted() {

        }
    }
</script>

<style lang="scss">
    .layui-layer-page .layui-layer-content {
        position: relative;
        overflow: auto;
        height: auto !important;
    }

    .s01_DataBaseAdd {
        .s01_database_text {
            textarea {
                height: 100%;
            }
        }
    }
</style>
