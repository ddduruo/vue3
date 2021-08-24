<template>
    <!-- video 显示 -->
    <div class="wrap">
        <div class="video_player">
            <video class="video" ref="video" controls></video>
        </div>
        <div class="canvas_player">
            <canvas class="canvas" ref="canvas"></canvas>
        </div>
    </div>
</template>

<script>
import { getCutSize } from "@/utils/index";
export default {
    name: "Cut",
    data() {
        return {
            width: window.innerWidth, //  获取屏幕的宽度和高度
            height:  window.innerHeight,
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        async init() {
            // 获取video dom
            this.video = this.$refs["video"];
            //获取canvas dom
            this.canvas = this.$refs["canvas"];
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight; //设置canvas 画布的宽高
            this.ctx = this.canvas.getContext('2d') //canvas 2d  //TODO 查一下 
            // 获取视频 和视频流群
            this.video.srcObject = await navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    width: this.width,
                    height: this.height
                }
            })
            this.pos = getCutSize({
                winWidth: this.width,
                winHeight: this.height,
                oldPos: this.pos,
                time: 0
            })
             this.pos2 = getCutSize({
                winWidth: this.width,
                winHeight: this.height,
                oldPos: this.pos,
                time: 0
            })
             this.video.onloadedmetadata = () => {
                 this.video.play()
                 this.playCanvas()
             }
        },
        playCanvas() {
            this.ctx.clearRect(0,0,this.width, this.height)
            this.ctx.drawImage(this.video, 0, 0, this.width, this.height)
            console.log(this.ctx)
            this.drawMoveCut()
        },
        drawMoveCut() {
            let { x, y, w, h } = this.pos;
            // 画遮罩
            this.ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
            this.ctx.fillRect(0, 0, this.winWidth, y);
            this.ctx.fillRect(0, y, x, h);
            this.ctx.fillRect(x + w, y, this.winWidth - x - w, h);
            this.ctx.fillRect(0, y + h, this.winWidth, this.winHeight - y - h);
            this.ctx.strokeStyle = "rgba(255, 255, 255, 1)";
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(x, y, w, h);
            // 裁剪边框
            this.ctx.beginPath();
            this.ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
            this.ctx.moveTo(x, y + h / 3);
            this.ctx.lineTo(x + w, y + h / 3);
            this.ctx.moveTo(x, y + (h / 3) * 2);
            this.ctx.lineTo(x + w, y + (h / 3) * 2);
            this.ctx.moveTo(x + w / 3, y);
            this.ctx.lineTo(x + w / 3, y + h);
            this.ctx.moveTo(x + (w / 3) * 2, y);
            this.ctx.lineTo(x + (w / 3) * 2, y + h);
            this.ctx.stroke();
            this.ctx.closePath();
            // 四个白角
            this.ctx.beginPath();
            this.ctx.strokeStyle = "rgba(255, 255, 255,1)";
            this.ctx.lineWidth = 4;
            // 左上
            this.ctx.moveTo(x - 2, y + 15 - 2);
            this.ctx.lineTo(x - 2, y - 2);
            this.ctx.lineTo(x - 2 + 15, y - 2);
            // 右上
            // this.ctx.stroke();
            this.ctx.moveTo(x + w - 15 + 2, y - 2);
            this.ctx.lineTo(x + w + 2, y - 2);
            this.ctx.lineTo(x + w + 2, y + 15 - 2);
            // this.ctx.stroke();
            // 左下
            this.ctx.moveTo(x - 2, y + h - 15 + 2);
            this.ctx.lineTo(x - 2, y + h + 2);
            this.ctx.lineTo(x + 15 - 2, y + h + 2);
            // 右下
            this.ctx.moveTo(x + w - 15 + 2, y + h + 2);
            this.ctx.lineTo(x + w + 2, y + h + 2);
            this.ctx.lineTo(x + w + 2, y + h - 15 + 2);
            this.ctx.stroke();
            this.ctx.closePath();
    },
    }
}
</script>

<style>

</style>
