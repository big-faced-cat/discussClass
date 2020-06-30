<template>
    <MyPopup ref="MyPopup" title="导入班级" @pop-close="closePopup">

        <div class="s01_DataBaseImport">
            <el-button type="primary" size="small" @click="downloadTemplate">下载模板</el-button>
            <br>
            <br>
            <el-upload
                    class="upload-demo"
                    accept=".xls,.xlsx"
                    ref="upload"
                    action=""
                    :auto-upload="false"
                    :before-upload="beforeUpload"
                    :http-request="httpRequest"
                    :multiple="false" :limit="1"
                    :on-change="fileChange"
            >
                <el-button slot="trigger" size="small" :disabled="FILE_LIST.length>=1" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" :disabled="FILE_LIST.length!=1"
                           @click="submitUpload">上传到服务器
                </el-button>
                <div class="el-upload__tip" slot="tip">只能上传xls/xlsx文件，且不超过{{FILE_SIZE}}</div>
            </el-upload>
        </div>
    </MyPopup>

</template>
<script>
    import MyPopup from "../MyPopup.vue"

    export default {
        name: "ClassImport",
        props: [],
        data() {
            return {
                FILE_LIST: [],//是否可以上传了
            };
        },
        components: {MyPopup},
        methods: {
            submitForm(formName) {
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            /**
             * 打开弹出框
             */
            openPopup() {
                this.$refs.MyPopup.openPopup(...arguments);
            },
            /**
             * 关闭自己
             */
            closePopup() {
                this.$refs.MyPopup.closePopup(...arguments);
                this.$refs.upload.clearFiles();
                this.tellParentFresh();
                this.FILE_LIST = [];
            },
            beforeUpload(file) {
                // var contentType;
                // console.log(file);
                // if(file["name"].slice(-4)===".xls"){
                //     file.contentType="application/vnd.ms-excel"
                // }
                // if(file["name"].slice(-5)===".xlsx"){
                //     file.contentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                // }
                return true;
            },
            submitUpload() {
                this.$refs.upload.submit();
            },
            tellParentFresh() {
                this.$emit("refresh-list")
            },
            downloadTemplate() {
                Ajax.Class.downloadTemplateClassStu()
            },
            httpRequest(elUploadObj) {
                var fileList = this.$refs.upload.$refs["upload-inner"].fileList;
                if (fileList.length != 1) {
                    this.$notify.error({
                        message: "请选择 1 个文件上传"
                    });
                    return;
                }
                if (fileList[0].size/1024>FILE_SIZE) {
                    this.$notify.error({
                        message: "请上传"+this.FILE_SIZE+"内的文件"
                    });
                    return;
                }

                var formData = new FormData();
                formData.append("file", fileList[0].raw);
                Ajax.Class.excelImportClassStu(formData, {
                    headers: {
                        // "Content-Type":contentType
                    }
                }).then((res) => {
                    if (res.status == 200) {
                        let content = res.data.content;
                        let notifyMsg = {
                            duration: 5000,
                            message: content.failed ? ("成功" + content.succeed.content + "个,失败" + content.failed + "个") : ("上传成功" + content.succeed.content + "个")
                        };
                        this.$emit("refresh-list");
                        if (content.failed) {
                            this.$notify.error(notifyMsg);
                        } else {
                            this.$notify.success(notifyMsg);
                            this.$refs.MyPopup.closePopup(...arguments);
                        }

                    }
                });


            },
            fileChange(currFile, fileList) {
                this.FILE_LIST = fileList;
            }
        },
        computed: {
            title() {
                return "Excel导入"
            },
            FILE_SIZE() {
                return FILE_SIZE / 1024 + "MB";
            }
        }
    }
</script>

<style scoped lang="scss">
    .s01_DataBaseImport {
        height: 230px;
    }
</style>
