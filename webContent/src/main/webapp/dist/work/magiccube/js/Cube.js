"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Cube = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Vertex = require("./Vertex.js");

var _Face = require("./Face.js");

var _CubeUtil = require("./CubeUtil.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cube = exports.Cube = function () {
    function Cube(center, side) {
        _classCallCheck(this, Cube);

        //中心
        this.center = center;

        //边长
        this.side = side;

        //半径
        var d = side / 2;

        //8个点
        this.vertices = [new _Vertex.Vertex(center.x - d, center.y - d, center.z + d), new _Vertex.Vertex(center.x - d, center.y - d, center.z - d), new _Vertex.Vertex(center.x + d, center.y - d, center.z - d), new _Vertex.Vertex(center.x + d, center.y - d, center.z + d), new _Vertex.Vertex(center.x + d, center.y + d, center.z + d), new _Vertex.Vertex(center.x + d, center.y + d, center.z - d), new _Vertex.Vertex(center.x - d, center.y + d, center.z - d), new _Vertex.Vertex(center.x - d, center.y + d, center.z + d)];

        //6个面
        this.faces = [new _Face.Face([this.vertices[7], this.vertices[6], this.vertices[1], this.vertices[0]]), new _Face.Face([this.vertices[3], this.vertices[2], this.vertices[5], this.vertices[4]]), new _Face.Face([this.vertices[0], this.vertices[1], this.vertices[2], this.vertices[3]]), new _Face.Face([this.vertices[4], this.vertices[5], this.vertices[6], this.vertices[7]]), new _Face.Face([this.vertices[1], this.vertices[6], this.vertices[5], this.vertices[2]]), new _Face.Face([this.vertices[7], this.vertices[0], this.vertices[3], this.vertices[4]])];

        //单独旋转一面时，用于标识此方块是否属于旋转的面
        this.isTopDis = false;

        //单独旋转一面时，本方块所属的面在渲染时的排序 初始化时为-1
        this.order = -1;

        //中点与无限远处(本例设置为1000px)的面参考点的距离数据
        this.distance = [];

        //是否是面的中心
        this.isFaceCenter = false;

        //面的方向 123456 初始化时为-1
        this.faceDir = -1;
    }

    /**
     * 将自己立方体渲染在canvas上(Y轴垂直于屏幕).
     * @param ctx canvas对象
     * @param dx canvas起点相对立方体中心的x距离
     * @param dy canvas起点相对立方体中心的y距离
     */


    _createClass(Cube, [{
        key: "render",
        value: function render(ctx, dx, dy, i) {
            var faces = this.faces;

            var sortarr = [];
            var replaceFace = [];
            faces.forEach(function (val, index) {
                replaceFace.push(val);
                sortarr.push(val.getCenter().y);
            });
            var as = _CubeUtil.CubeUtil.getInstance().sort(sortarr);
            //遍历6个面
            for (var j = 0; j < as.length; ++j) {
                var face = replaceFace[as[j]];
                var color = face.color;
                if (!color) {
                    color = 'rgba(236, 236, 236, 1)';
                }
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.lineWidth = 5; //设置线宽
                ctx.lineJoin = "round";
                ctx.strokeStyle = "#333"; //线条的颜色
                //连接4个点
                for (var k = 0, n_vertices = face.vertexs.length; k < n_vertices; ++k) {
                    var P = this.project(face.vertexs[k]);
                    if (k == 0) {
                        ctx.moveTo(P.x + dx, P.y + dy);
                    } else {

                        ctx.lineTo(P.x + dx, P.y + dy);
                    }
                }
                ctx.closePath();
                ctx.stroke();
                ctx.fill();
            }
        }

        /**
         * 已Y轴为垂线将三维平面的点映射到二维平面.
         * @param vertex vertex
         */

    }, {
        key: "project",
        value: function project(vertex) {
            return new _Vertex.Vertex(vertex.x, vertex.z);
        }

        /**
         * 绕center旋转
         * @param center 点
         * @param theta 绕X轴的角度
         * @param phi 绕Z轴的角度
         */

    }, {
        key: "rotate",
        value: function rotate(center, theta, phi) {
            this.vertices.forEach(function (val) {
                val.rotate(center, theta, phi);
            });
            this.center.rotate(center, theta, phi);
        }

        /**
         * 绕坐标系原点（0，0，0）与点rotatecenter连接的矢量  旋转
         * @param rotatecenter 空间中的一点
         * @param theta 绕的角度
         */

    }, {
        key: "rotateVector",
        value: function rotateVector(rotatecenter, theta) {
            this.vertices.forEach(function (val) {
                val.rotateVector(rotatecenter, theta);
            });
            this.center.rotateVector(rotatecenter, theta);
        }

        /**
         * 设置某个面显示的颜色
         * @param i 哪一面
         * @param color 颜色
         */

    }, {
        key: "setFaceColor",
        value: function setFaceColor(i, color) {
            this.faces[i].setColor(color);
        }
    }]);

    return Cube;
}();
//# sourceMappingURL=Cube.js.map