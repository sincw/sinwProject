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
        //var cube_center = new Vertex(0, 100, 0);
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
            this.rotate2(theta, phi);
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
        //var center = new Vertex(0, this.dy*11/10, 0);
        for (let i = 0; i < 8; i++) {
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

    rotate1(theta, phi) {
        var acenter = this.cube_center;
        var center = new Vertex(0, 1, 0);
        for (let i = 0; i < 8; i++) {
            var M = this.cube.vertices[i];

            var sa = Math.sqrt((Math.pow(center.x, 2) + Math.pow(center.y, 2)) /
                (Math.pow(center.x, 2) + Math.pow(center.y, 2) + Math.pow(center.z, 2)));
            var ca = Math.sqrt((Math.pow(center.z, 2)) /
                (Math.pow(center.x, 2) + Math.pow(center.y, 2) + Math.pow(center.z, 2)));
            var sb = Math.sqrt((Math.pow(center.y, 2)) /
                (Math.pow(center.x, 2) + Math.pow(center.y, 2)));
            var cb = Math.sqrt((Math.pow(center.x, 2)) /
                (Math.pow(center.x, 2) + Math.pow(center.y, 2)));


            var xx = sa * cb;
            var yy = sa * sb;
            var zz = ca;

            var xx_2 = Math.pow(xx, 2);
            var yy_2 = Math.pow(yy, 2);
            var zz_2 = Math.pow(zz, 2);

            // 旋转角的正余弦值
            var ct = Math.cos(theta);
            var st = Math.sin(theta);

            // 旋转后的值
            var x = M.x - acenter.x;
            var y = M.y - acenter.y;
            var z = M.z - acenter.z;

            M.x = (xx * yy * (1 - ct) - zz * st) * x
                + (ct + yy_2 * (1 - ct)) * y
                + (zz * yy * (1 - ct) + xx * st) * z + acenter.x;
            M.y = (ct + xx_2 * (1 - ct)) * x
                + (yy * xx * (1 - ct) + zz * st) * y
                + (zz * xx * (1 - ct) - yy * st) * z + acenter.y;
            M.z = (xx * zz * (1 - ct) + yy * st) * x
                + (yy * zz * (1 - ct) - xx * st) * y
                + (ct + zz_2 * (1 - ct)) * z + acenter.z;
        }
    }

    rotate2(theta, phi) {
        var acenter = this.cube_center;
        var center = new Vertex(0, 0, 10);

        for (let i = 0; i < 8; i++) {
            var M = this.cube.vertices[i];

            var a = -center.x;
            var b = -center.y;
            var c = center.z;
            var a2 = Math.pow(a, 2);
            var b2 = Math.pow(b, 2);
            var c2 = Math.pow(c, 2);
            var unitlen2 = a2 + b2 + c2;
            var unitlen = Math.sqrt(a2 + b2 + c2);
            // 旋转角的正余弦值
            var ct = Math.cos(theta);
            var st = Math.sin(theta);

            // 旋转后的值
            var x = M.x - acenter.x;
            var y = M.y - acenter.y;
            var z = M.z - acenter.z;

            M.x = (a2 + (b2 + c2) * ct) / unitlen2 * x
                + (a * b * (1 - ct) - c * unitlen * st) / unitlen2 * y
                + (a * c * (1 - ct) + b * unitlen * st) / unitlen2 * z + acenter.x;
            M.y = (a * b * (1 - ct) + c * unitlen * st) / unitlen2 * x
                + (b2 + (a2 + c2) * ct) / unitlen2 * y
                + (b * c * (1 - ct) - a * unitlen * st) / unitlen2 * z + acenter.y;
            M.z = (a * c * (1 - ct) - b * unitlen * st) / unitlen2 * x
                + (b * c * (1 - ct) + a * unitlen * st) / unitlen2 * y
                + (c2 + (a2 + b2) * ct) / unitlen2 * z + acenter.z;
        }
    }


}

new Main();