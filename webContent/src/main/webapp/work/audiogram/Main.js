import {Audio} from "./js/Audio.js";

//用于控制整个页面的流程
 class Main {
    constructor() {
        //获取audio实例
        this.audio = Audio.getInstance();
        this.init();
    }

    //初始化
    init() {
        //初始化按钮
        this.play = document.querySelector('.play');
        this.stop = document.querySelector('.stop');

        //确保加载完资源后开始输出
        let promise = new Promise((resolve) => {
            this.audio.getData();
            resolve();
        });
        promise.then(() => {
            this.initCanvas();
            this.outPut()
        });

        //播放按钮
        this.play.onclick = () => {
            this.audio.ctx.resume();
            this.outPut();
            this.play.setAttribute('disabled', 'disabled');
        }

        //停止按钮
        this.stop.onclick = () => {
            this.audio.ctx.suspend();
            //this.audio.source.stop(0);使用stop停止时无法恢复，需要重载资源
            cancelAnimationFrame(this.timer);
            this.play.removeAttribute('disabled');
        }
    }

    //初始化canvas
    initCanvas() {
        let cv = document.querySelector('#canvas');
        this.canvasWidth = cv.width;
        this.canvasHeight = cv.height;
        this.canvas = cv.getContext("2d");
        this.canvas.translate(0.5, 0.5);
        this.outPutData = this.audio.freqs;
    }

    //输出图像
    outPut() {
        let height = this.canvasHeight;
        let width = this.canvasWidth;
        let outPutData = this.outPutData;
        let length = outPutData.length;
        this.audio.analyser.getByteFrequencyData(outPutData);
        //将缓冲区的数据绘制到Canvas上
        this.canvas.clearRect(-0.5, -0.5, width, height);
        this.canvas.beginPath(), this.canvas.moveTo(0, height);
        for (let i = 0; i < width; i++)
            this.canvas.lineTo(i, height - height * outPutData[Math.round(length * i / width)] / 255);
        this.canvas.lineTo(i, height), this.canvas.fill();
        //请求下一帧
        this.timer = requestAnimationFrame(() => {
            this.outPut()
        });
    }
}
new Main();

