import {Vertex} from "./js/Vertex.js";
import {MagicCube} from "./js/MagicCube.js";
import {CubeUtil} from "./js/CubeUtil.js";

export class Main {
    constructor() {
        this.initCanvas();
        var magicCube = new MagicCube(new Vertex(0, 0, 0), 120, 3);
        magicCube.initCube();
        this.magicCube = magicCube;
        magicCube.renderAll(this.ctx, this.dx, this.dy);
        this.addEvent();

        //初始化旋转的面
        this.mian = 0;

        //是否在单面旋转
        this.isRotate = false;

        //空格按下标识
        this.spacedown = true;
        this.xdown = false;

        //用于配置旋转速度，修改timespace即可
        this.timespace = 50;
        this.rotateCount = 0;
        this.rotateN = Math.PI / 2 / this.timespace;
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
     * 添加鼠标事件.
     */
    addEvent() {
        this.canvas.addEventListener('mousedown', (evt) => {
            this.initMove(evt);
        });
        document.addEventListener('mousemove', (evt) => {

            if (this.xdown) {
                this.getRotateFace(evt);
            } else {
                this.move(evt);
            }

        });
        document.addEventListener('mouseup', () => {
            this.stopMove();
        });
        document.onkeydown = (evt) => {
            if (evt.keyCode == 32) {
                this.spacedown = !this.spacedown;
                if (this.mian >= 5) {
                    this.mian = 0;
                }
                this.mian++;
            }
            // if (evt.keyCode == 88) {
            //     this.xdown = true;
            // }
        };
    }

    initMove(evt) {
        this.mousedown = true;
        this.mx = evt.clientX;
        this.my = evt.clientY;
        this.mouseStartX = evt.clientX;
        this.mouseStartY = evt.clientY;
    }

    move(evt) {
        var mousedown = this.mousedown;
        var mx = this.mx;
        var my = this.my;

        if (mousedown && !this.isRotate) {
            var theta = (evt.clientX - mx) * Math.PI / 360;
            var phi = (evt.clientY - my) * Math.PI / 180;
            this.mx = evt.clientX;
            this.my = evt.clientY;
            this.rotate(theta, phi, evt);
        }
    }

    getRotateFace(evt) {
        var mousedown = this.mousedown;
        var mx = evt.clientX;
        var my = evt.clientY;
        if (mousedown && !this.isRotate) {
            if (Math.sqrt((mx - this.mouseStartX) * (mx - this.mouseStartX) + (my - this.mouseStartY) * (my - this.mouseStartY)) > 100) {

                for (var i = 0; i < 6; i++) {
                    var refv = this.magicCube.refVertex;
                    var flag = this.magicCube.magicfaces[i].isPointInner(
                        new Vertex(this.mouseStartX, 0, this.mouseStartY ),new Vertex(mx, 0, my ), refv,this.ctx);
                    if (flag) {
                        console.log(i + "面");
                        return this.magicCube.magicfaces[i];
                    }
                }
            }
        }
    }

    stopMove() {
        this.mousedown = false;
    }

    rotate(theta, phi, evt) {
        var center = new Vertex(0, 0, 0);
        var mx = evt.clientX;
        var my = evt.clientY;
        //if (this.spacedown && !this.isRotate && Math.abs(theta) > 0.2) {
        if (this.spacedown && !this.isRotate && Math.sqrt((mx - this.mouseStartX) * (mx - this.mouseStartX) + (my - this.mouseStartY) * (my - this.mouseStartY)) > 120) {
            var toward = theta > 0 ? 1 : -1;
            var face = this.getRotateFace(evt);

            if(!face){
                return;
            }
            this.rotateFace(toward,evt,face);
            this.isRotate = true;
        }
        else if (!this.spacedown) {
            this.magicCube.rotate(center, theta, phi);
            this.magicCube.renderAll(this.ctx, this.dx, this.dy);
        }

    }

    rotateFace(toward,evt,face) {
        this.rotateCount += 1;
        if (this.rotateCount > this.timespace) {
            cancelAnimationFrame(this.timer);
            this.isRotate = false;
            this.rotateCount = 0;
            this.magicCube.swapFaceCube();
        } else {
            this.magicCube.rotateFace(toward * this.rotateN, null, face);
            face.setDisableCube(true, this.getFaceOrder(face));
            this.magicCube.renderFaceAll(this.ctx, this.dx, this.dy);
            face.setDisableCube(false, -1);
            this.timer = requestAnimationFrame(() => this.rotateFace(toward,evt,face));
            // var mian = this.mian;
            // this.magicCube.rotateFace(toward * this.rotateN, null, mian);
            // this.magicCube.magicfaces[mian].setDisableCube(true, this.getFaceOrder(mian));
            // this.magicCube.renderFaceAll(this.ctx, this.dx, this.dy);
            // this.magicCube.magicfaces[mian].setDisableCube(false, -1);
            // this.timer = requestAnimationFrame(() => this.rotateFace(toward));
        }
    }

    getFaceOrder(face) {
        var len = this.magicCube.magicfaces.length;
        let sortarr = [];
        this.magicCube.magicfaces.forEach(function (val, index) {
            sortarr.push(val.center.y);
        });
        var as = CubeUtil.getInstance().sort(sortarr);
        for (var a = 0; a < len; a++) {
            if (sortarr[a] - face.center.y == 0) {
                return a;
            }
        }
        // var len = this.magicCube.magicfaces.length;
        // let sortarr = [];
        // this.magicCube.magicfaces.forEach(function (val, index) {
        //     sortarr.push(val.center.y);
        // });
        // var as = CubeUtil.getInstance().sort(sortarr);
        // for (var a = 0; a < len; a++) {
        //     if (as[a] == i) {
        //         return a;
        //     }
        //
        // }
    }
}

new Main();