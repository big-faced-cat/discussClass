<template>
    <MyPopup ref="MyPopup" :title="title" @pop-close=closePopup>
        <div class="s01_StudentImport">
            <el-button type="primary" size="small" @click="downloadTemplate">下载模板</el-button>
            <br>
            <br>
<!--            :http-request="httpRequest"-->
            <el-upload
                    class="upload-demo"
                    accept=".xls,.xlsx,.jpg,.png"
                    ref="upload"
                    :action= 'headerUrl+ "/Classroom/Import"'
                    :auto-upload="false"
                    :before-upload="beforeUpload"
                    :multiple="true"
                    :on-success="handleAvatarSuccess"
                    :on-change="fileChange" >
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload"
                           :disabled="FILE_LIST.length==0"
                >上传到服务器
                </el-button>
                <div class="el-upload__tip" slot="tip">
                    ! 只能上传一个xls/xlsx,和多个jpg|png文件，且单个文件不超过{{FILE_SIZE}}<br/>
                </div>
            </el-upload>
        </div>
    </MyPopup>

</template>
<script>
    import MyPopup from "../MyPopup.vue"

    export default {
        name: "ClassRoomImport",
        props: [],
        data() {
            return {
                TIMEOUT: 0,
                FILE_LIST: [],//是否可以上传了
                headerUrl: url_prefix
            };
        },
        components: {MyPopup},
        methods: {
            handleAvatarSuccess(res, file) {
                    var content = res.content;
                    var notifyMsg={
                        duration: 5000,
                        message: content.failed ? ("成功" + content.succeed.content + "个,失败" + content.failed + "个") : ("上传成功" + content.succeed.content + "个")
                    };
                    this.$emit("refresh-list");
                if(content.failed ){
                    this.$notify.error(notifyMsg);
                }else{
                    this.$notify.success(notifyMsg);
                    this.$refs.MyPopup.closePopup(...arguments);
                }

            },
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
                this.FILE_LIST=[];
            },
            beforeUpload(file) {
                return true
            },
            submitUpload() {
                this.$refs.upload.submit();
            },
            tellParentFresh() {
                this.$emit("refresh-list")
            },
            downloadTemplate() {
                Ajax.Classroom.downloadTemplate()
            },
            httpRequest(elUploadObj) {
                if (this.TIMEOUT === 0) {
                    this.TIMEOUT++;
                    //因为el-upload自己是一个一个上传,我们直接读取内部数据
                    var fileList=this.$refs.upload.$refs["upload-inner"].fileList;
                    var formData = new FormData();
                    var bool="";
                    for(var i=0;i<fileList.length;i++){
                        formData.append("files", fileList[i].raw);
                        //判断文件大小
                        if(fileList[i].size/1024>FILE_SIZE){
                            bool+="第"+(i+1)+"个文 "+fileList[i].name+" 件超过大小,<br/>";
                        }
                    }
                    if(bool){
                        this.$notify.error({
                            duration: 10000,
                            message:bool
                        });
                        return;
                    }
                    Ajax.Classroom.excelImport(formData).then((res) => {
                        if (res.data.code == 200) {
                            var content = res.data.content;
                            var notifyMsg={
                                duration: 5000,
                                message: content.failed ? ("成功" + content.succeed + "个,失败" + content.failed + "个") : ("上传成功" + content.succeed + "个")
                            };
                            if(content.failed ){
                                this.$notify.error(notifyMsg);
                            }else{
                                this.$notify.success(notifyMsg);
                            }

                            this.$emit("refresh-list")
                        }
                    }).finally(() => {
                        this.TIMEOUT = 0;
                    });
                }
            },
            fileChange(currFile, fileList) {
                this.FILE_LIST = fileList;
            }
        },
        computed: {
            title() {
                return "Excel导入教室"
            },
            FILE_SIZE(){
                return FILE_SIZE/1024+"MB";
            }
        }
    }
</script>

<style scoped lang="scss">
    .s01_StudentImport {
        height: 230px;
    }
</style>
