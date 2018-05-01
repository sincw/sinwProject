//audit类，用于加载，播放音乐
export class Audio {

    //单例
    static getInstance() {
        if (!Audio.instance) {
            Audio.instance = new Audio();
        }
        return Audio.instance;
    }

    //构造函数
    constructor() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }

    //加载资源
    getData() {
        this.analyser = this.ctx.createAnalyser();
        //从元素创建媒体节点 可以直接将audio元素传入后创建，就不用request来请求资源
        //this.source = this.ctx.createMediaElementSource(audio);
        this.source = this.ctx.createBufferSource();
        this.source.loop = true;
        //创建AnalyserNode，用来显示音频时间和频率的数据
        this.source.connect(this.analyser);
        //最后连接到音频渲染设备，发出声音
        this.analyser.connect(this.ctx.destination);

        //获取频率
        this.freqs = new Uint8Array(this.analyser.frequencyBinCount);

        //请求资源
        let request = new XMLHttpRequest();

        request.open('get', 'res/bgm.mp3', true);

        //responseType属性须设置为arraybuffer
        request.responseType = 'arraybuffer';

        //decodeAudioData方法用于解码音频文件
        request.onload = () => {
            let audioData = request.response;
            this.ctx.decodeAudioData(audioData, (buffer) => {
                //将解码后的音频文件作为声音的来源
                this.source.buffer = buffer;
                //立即开始播放声音
                this.source.start(0);
            }, (e) => {
                "Error with decoding audio data" + e.error
            });
        };

        request.send();
    }

}