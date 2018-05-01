import {Vertex} from "./js/Vertex.js";
import {Cube} from "./js/Cube.js";

export class Main {
    constructor() {
        this.initCanvas();
        this.initCube();
        this.addEvent();
    }

    /**
     * 初始化画布.
     */
    initCanvas() {
        var canvas = document.getElementById('cnv');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        this.dx = canvas.width / 2;
        this.dy = canvas.height / 2;
        var ctx = canvas.getContext('2d');
        //画笔颜色
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        //填充颜色
        ctx.fillStyle = 'rgba(0, 150, 255, 0.3)';

        this.ctx = ctx;
        this.canvas = canvas;
    }

    /**
     * 初始化立方体.
     */
    initCube() {
        var cube_center = new Vertex(0, 11 * this.dy / 10, 0);
        var cube = new Cube(cube_center, this.dy);
        cube.render(this.ctx, this.dx, this.dy);
        this.cube = cube;
        this.mousedown = false;
        this.cube_center = cube_center;
    }

    /**
     * 添加鼠标事件.
     */
    addEvent() {
        this.canvas.addEventListener('mousedown', (evt) => {
            this.initMove(evt)
        });
        document.addEventListener('mousemove', (evt) => {
            this.move(evt)
        });
        document.addEventListener('mouseup', () => {
            this.stopMove()
        });
    }

    initMove(evt) {
        this.mousedown = true;
        this.mx = evt.clientX;
        this.my = evt.clientY;
    }

    move(evt) {
        var mousedown = this.mousedown;
        var mx = this.mx;
        var my = this.my;

        if (mousedown) {
            var theta = (evt.clientX - mx) * Math.PI / 360;
            var phi = (evt.clientY - my) * Math.PI / 180;
            this.rotate(theta, phi);
            this.mx = evt.clientX;
            this.my = evt.clientY;
            this.cube.render(this.ctx, this.dx, this.dy);
        }
    }

    stopMove() {
        this.mousedown = false;
    }

    rotate(theta, phi) {
        var center = this.cube_center;
        for(let i = 0;i<8;i++){
            var M = this.cube.vertices[i];
            // 旋转角的正余弦值
            var ct = Math.cos(theta);
            var st = Math.sin(theta);
            var cp = Math.cos(phi);
            var sp = Math.sin(phi);

            // 旋转后的值
            var x = M.x - center.x;
            var y = M.y - center.y;
            var z = M.z - center.z;
            M.x = ct * x - st * cp * y + st * sp * z + center.x;
            M.y = st * x + ct * cp * y - ct * sp * z + center.y;
            M.z = sp * y + cp * z + center.z;
        }
    }
}

new Main();