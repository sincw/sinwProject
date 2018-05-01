"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Main = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Vertex = require("./js/Vertex.js");

var _Cube = require("./js/Cube.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Main = exports.Main = function () {
    function Main() {
        _classCallCheck(this, Main);

        this.initCanvas();
        this.initCube();
        this.addEvent();
    }

    /**
     * 初始化画布.
     */


    _createClass(Main, [{
        key: "initCanvas",
        value: function initCanvas() {
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

    }, {
        key: "initCube",
        value: function initCube() {
            var cube_center = new _Vertex.Vertex(0, 11 * this.dy / 10, 0);
            var cube = new _Cube.Cube(cube_center, this.dy);
            cube.render(this.ctx, this.dx, this.dy);
            this.cube = cube;
            this.mousedown = false;
            this.cube_center = cube_center;
        }

        /**
         * 添加鼠标事件.
         */

    }, {
        key: "addEvent",
        value: function addEvent() {
            var _this = this;

            this.canvas.addEventListener('mousedown', function (evt) {
                _this.initMove(evt);
            });
            document.addEventListener('mousemove', function (evt) {
                _this.move(evt);
            });
            document.addEventListener('mouseup', function () {
                _this.stopMove();
            });
        }
    }, {
        key: "initMove",
        value: function initMove(evt) {
            this.mousedown = true;
            this.mx = evt.clientX;
            this.my = evt.clientY;
        }
    }, {
        key: "move",
        value: function move(evt) {
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
    }, {
        key: "stopMove",
        value: function stopMove() {
            this.mousedown = false;
        }
    }, {
        key: "rotate",
        value: function rotate(theta, phi) {
            var center = this.cube_center;
            for (var i = 0; i < 8; i++) {
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
    }]);

    return Main;
}();

new Main();
//# sourceMappingURL=Main.js.map