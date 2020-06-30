<template>
    <div class="s01_ketang_video" :id="RANDOM_ID">

        <!-- swiper -->
        <swiper :options="swiperOption" class="s01_swiper" @slideChangeTransitionEnd="slideChangeTransitionEnd"
                @sliderMove="sliderMove">
                     <swiper-slide v-for="(item,index) in videoUrl" :key="index" class="s01_swiper_slide"  >
<!--        222222222222   控制canvas显示   22222222222-->
                <canvas  :id="videoss + index"  width="620" height="303" style="position: absolute; "> </canvas>
                <video ref="s01_video1" style="object-fit: fill; height: 170%" :id="videoObj[index].id"   class="s01_video"
                       :src="item"
                       @loadedmetadata="loadedmetadata(index,$event)" @dblclick="videoDoubleClick($event)"></video>
            </swiper-slide>

        </swiper>
        <div class="swiper-button-prev"></div><!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
        <div class="swiper-button-next"></div><!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
        <i class="s01_video_slide_right"></i>

        <!--视频控制-->
        <VideoControls :isPlayed="isPlayed" :isFaceAnalysis="isFaceAnalysis" :isFullScreen="isFullScreen"
                       :currentTime="currentTime" :maxDuration="maxDuration"
                       @play="doPlay" @faceAnalysis="doFaceAnalysis" @fullScreen="doFullScreen"></VideoControls>
        <!--视频控制-->

        <!--影藏全屏-->
        <div class="s01_full_screen" ref="s01_full_screen" :style="{width:windowWidth*0.9+'px'}">
            <div  v-for="(item,index) in videoObj"   :class="'s01_video s01_video0'+(index+1)">
                <canvas  :id="currentVideo + index + '0'"  width="100%" height="303" style="position: absolute; "> </canvas>
                <video style="height:100%;"     :src="videoUrl[index]"  ref="s01_video2">
                </video>
            </div>

<!--            <video v-for="(item,index) in videoObj"   :src="videoUrl[index]" ref="s01_video2"-->
<!--                   :class="'s01_video s01_video0'+(index+1)">-->
<!--            </video>-->

            <!--视频控制-->
            <VideoControls :isPlayed="isPlayed" :isFaceAnalysis="isFaceAnalysis" :isFullScreen="isFullScreen"
                           :currentTime="currentTime" :maxDuration="maxDuration"
                           @play="doPlay" @faceAnalysis="doFaceAnalysis" @fullScreen="doFullScreen"></VideoControls>
            <!--视频控制-->
        </div>
        <!--影藏全屏-->

    </div>
</template>

<script>
    import VideoControls from "./VideoControls.vue"

    export default {
        name: "SlideVideo",
        components: {VideoControls},
        props: ["slidesPerViewProp","videoss"],
        data() {
            return {

                layerIndex: null,
                isPlayed: false,//视频是否正在播放
                isFaceAnalysis: false,//是否开启人脸识别
                isFullScreen: false,//是否全屏
                swiperOption: {
                    slidesPerView: this.slidesPerViewProp ? this.slidesPerViewProp : 2,
                    spaceBetween: 4,
                    loop: false,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                },
                // 视频start
                maxDuration: null,//最长播放时长
                currentTime: 0,//视频已播放时间
                currentVideo: this.videoss, //当前播放的视频
                videoUrl: ["./static/videos/student1.mp4", "./static/videos/student1.mp4", "./static/videos/student1.mp4","./static/videos/student1.mp4"],
                videoObj: [
                    {id: "s01_video01"},
                    {id: "s01_video02"},
                    {id: "s01_video03"},
                    {id: "s01_video04"},
                ],
            }
        },
        mounted() {
            this.getCurrentTime();
            /**
             * 全局监听事件
             */
            this.$bus.$on("playTimeEvent", (arg) => {
                if (arg) {
                    this.playTime(arg);
                }
            })
        },
        methods: {
            // 人脸识别开启的时候 实施检测
            // faceDisable() {
            //     console.log('dddddddd', document.getElementsByTagName("canvas"));
            //     let context = document.getElementById("id0").getContext("2d");
            //     // context.drawImage(video1, 0, 0, 10, 10);
            //     context.fillStyle="#FF0000";
            //     context.fillRect(300,50,50,50);
            //     // context.fillRect(3,0,50,50);
            // },
            /**
             * 播放
             */
            doPlay() {
                this.isPlayed = !this.isPlayed;
                if (this.isPlayed) {
                    // console.log(this.$refs.s01_video01,this.$refs.s01_video01.duration);
                    // this.$refs.s01_video01.currentTime=1000
                    // console.log(this.$refs);
                    for (var i = 0; i < this.videoUrl.length; i++) {
                        this.$refs[!this.isFullScreen ? "s01_video1" : "s01_video2"][i].play();
                    }
                } else {
                    for (var i = 0; i < this.videoUrl.length; i++) {
                        this.$refs[!this.isFullScreen ? "s01_video1" : "s01_video2"][i].pause();
                    }
                }
            },
            /**暂停
             */
            doPause(){
                this.isPlayed=false;
                for (var i = 0; i < this.videoUrl.length; i++) {
                    this.$refs[!this.isFullScreen ? "s01_video1" : "s01_video2"][i].pause();
                }
            },
            /**
             * 开启人脸识别
             */
            doFaceAnalysis() {
                console.log('当前的button', this);
                this.isFaceAnalysis = !this.isFaceAnalysis;
                console.log('4444444444', document.getElementsByTagName('video'));

                for(var i = 0; i < document.getElementsByTagName('video').length; i++) {
                    console.log(i);
                    console.log('33333333', document.getElementsByTagName('video')[i].videoWidth, document.getElementsByTagName('video')[i].videoHeight);
                    // if ( document.getElementsByTagName('video')[i].width > 0) {
                    //
                    //     console.log('33333333', document.getElementsByTagName('video')[i].width);
                    // }

                }
                // 判断是否开启人脸识别
                if(this.isFaceAnalysis) {
                    for (var i = 0; i < this.videoUrl.length; i++) {

                            let newIdall = this.currentVideo + i +'0';
                            if( document.getElementById(newIdall)) {
                                let cxt1=document.getElementById(newIdall).getContext("2d");
                                console.log('fffffffffffff',document.getElementById(newIdall).width);
                                cxt1.strokeStyle="#FF0000";

                                cxt1.strokeRect(60,100,40,40);

                        }
                            let newId = this.videoss + i;
                            if( document.getElementById(newId)) {
                                let cxt=document.getElementById(newId).getContext("2d");
                                cxt.strokeStyle="#FF0000";
                                cxt.strokeRect(150,50,200,150);
                            }
                    }
                } else{
                    for (var i = 0; i < this.videoUrl.length; i++) {
                        let newIdall = this.currentVideo + i +'0';
                            if( document.getElementById(newIdall)) {
                                let cxtall=document.getElementById(newIdall).getContext("2d");
                                cxtall.clearRect(0,0,500,500);
                            }
                            let newId = this.videoss + i;
                            if(document.getElementById(newId)) {
                                let cxt=document.getElementById(newId).getContext("2d");
                                cxt.clearRect(0,0,500,500);
                            }
                    }
                }


                // if (this.isPlayed) {
                //     // console.log(this.$refs.s01_video01,this.$refs.s01_video01.duration);
                //     // this.$refs.s01_video01.currentTime=1000
                //     // console.log(this.$refs);
                //     for (var i = 0; i < this.videoUrl.length; i++) {
                //         this.$refs[!this.isFullScreen ? "s01_video1" : "s01_video2"][i].play();
                //     }
                // } else {
                //     for (var i = 0; i < this.videoUrl.length; i++) {
                //         this.$refs[!this.isFullScreen ? "s01_video1" : "s01_video2"][i].pause();
                //     }
                // }

            },
            /**
             * 全屏
             * 切换全屏的时候保持currentTime同步
             */
            doFullScreen() {
                var _self = this;
                this.isFullScreen = !this.isFullScreen;
                //全屏
                if (this.isFullScreen) {
                    var $s01_full_screen = $("#"+this.RANDOM_ID+" .s01_full_screen");
                    this.layerIndex = layer.open({
                        type: 1,
                        title: false,
                        content: $s01_full_screen, //这里content是一个普通的String
                        closeBtn: false,
                        area: [$s01_full_screen.css("width"), $s01_full_screen.css("height")],
                        scrollbar: false,
                        shadeClose: true,
                        end: function () {
                            this.isFullScreen = false;
                            //把当前的currentTime付给即将打开的video
                            for (var i = 0; i < _self.videoUrl.length; i++) {
                                _self.$refs["s01_video2"][i].pause();
                                _self.isPlayed ? _self.$refs["s01_video1"][i].play() : "";
                                _self.$refs["s01_video1"][i].currentTime =
                                    _self.$refs["s01_video2"][0].currentTime
                            }
                        }
                    });
                    //把当前的currentTime付给即将打开的video
                    console.log(this.$refs);
                    for (var i = 0; i < this.videoUrl.length; i++) {
                        this.$refs["s01_video1"][i].pause();
                        this.isPlayed ? this.$refs["s01_video2"][i].play() : "";
                        this.$refs["s01_video2"][i].currentTime = this.$refs["s01_video1"][0].currentTime
                    }
                } else {
                    //关闭全屏
                    layer.close(this.layerIndex);
                }

            },
            /**
             * 成功获取资源长度
             * 并且设置最长播放时长
             */
            loadedmetadata(index, event) {
                let duration = event.target.duration;
                console.log('数据的长度', duration);
                if (this.maxDuration < duration) {
                    this.maxDuration = duration;
                }
            },
            /**
             * 定时刷新播放时间点
             */
            getCurrentTime() {
                //该组件可能已经销毁
                if (this) {
                    this.currentTime = this.$refs[this.isFullScreen ? "s01_video2" : "s01_video1"][0].currentTime;
                    setTimeout(this.getCurrentTime, 1000)
                }

            },
            /**
             * 解决bug
             * slide时候,2边的视频因为是新的video标签,所以没有播放
             */
            slideChangeTransitionEnd() {
                var _self = this;
                $("#"+this.RANDOM_ID+"[class=s01_video]").each(function (index, dom) {
                    /**
                     * 当前在播放,而这个slide多余的video状态确不正确
                     */
                    dom.currentTime = _self.$refs["s01_video1"][0].currentTime;

                    if (_self.isPlayed) {
                        if (dom.paused) {
                            dom.play();
                        }
                    } else {
                        if (!dom.paused) {
                            dom.pause();
                        }
                    }

                })
            },
            sliderMove() {

            },
            /**
             * 跳至指定时间播放
             * @param cTime
             */
            playTime(cTime) {
                if (cTime !== undefined && cTime !== null) {
                    if (this.maxDuration < cTime) {//输入的时间超过了视频最大值
                        cTime = this.maxDuration;
                    }
                    for (var i = 0; i < this.videoUrl.length; i++) {
                        this.$refs[!this.isFullScreen ? "s01_video1" : "s01_video2"][i].currentTime = cTime;
                    }
                }

            },
            /**
             * 双击视频,全屏播放
             */
            videoDoubleClick(e) {
                var self = this;
                fullScreenFun(e.target).then(()=>{
                    setTimeout(()=>{
                        function resizeCK(){
                            console.log("全屏状态:" + isFullScreen());
                            //退出全屏时候,同步所有视频状态
                            if(!isFullScreen()){
                                self.playTime(e.target.currentTime);
                                if(e.target.paused){
                                    self.doPause();
                                }else{
                                    self.doPlay();
                                }
                                $(window).unbind("resize",resizeCK)
                            }
                        }
                        $(window).bind("resize",resizeCK)

                    },300);

                });
                //退出全屏时候,需要对视频播放状态同步

            }
        }
        ,
        computed: {
            windowWidth() {
                return this.$store.state.windowWidth
            },
            RANDOM_ID(){
                return "video"+(new Date()).getTime() + "_" + Math.floor(Math.random() * 1000)
            }
        }
    }
</script>

<style scoped lang="scss">
    .s01_ketang_video {
        position: relative;
        width: 802*100%/1093;
        height: 100%;
        display: inline-block;

        /*.s01_carousel {*/
        /*width: 100%;*/
        /*height: 100%;*/
        /*z-index: 99;*/

        /*.s01_carousel_item {*/
        /*width: 100%;*/
        /*height: 100%;*/
        /*background-color: #fff;*/

        /*.s01_video {*/
        /*width: 49.75%;*/
        /*height: 100%;*/
        /*background-color: #000;*/

        /*&:nth-child(2n+1) {*/
        /*float: left;*/
        /*}*/

        /*&:nth-child(2n) {*/
        /*float: right;*/
        /*}*/
        /*}*/
        /*}*/
        /*}*/

        .s01_swiper {
            width: 100%;
            height: 100%;
            background-color: #fff;

            .s01_video {
                width: 100%;
                height: 100%;
                background-color: #000;
            }
        }

        .s01_full_screen {
            background-color: #fff;
            width: 1135rem * 480 / (1200 * 12);
            height: 90vh;
            position: relative;
            display: none;

            .s01_video {
                width: 49.95%;
                height: 49.95%;
                background-color: #000;
                position: absolute;
            }

            .s01_video01 {
                top: 0;
                left: 0;
            }

            .s01_video02 {
                top: 0;
                right: 0;
            }

            .s01_video03 {
                bottom: 0;
                left: 0;
            }

            .s01_video04 {
                bottom: 0;
                right: 0;
            }
        }
    }

</style>