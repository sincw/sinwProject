"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MagicCube = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Vertex = require("./Vertex.js");

var _Cube = require("./Cube.js");

var _MagicFace = require("./MagicFace.js");

var _PriorityQueue = require("../../../common/datastructures/PriorityQueue.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MagicCube = exports.MagicCube = function () {
    function MagicCube(center, side, factorial) {
        _classCallCheck(this, MagicCube);

        //中心
        this.center = center;

        //单位立方体的边长
        this.side = side;

        //阶乘
        this.factorial = factorial;

        //初始化颜色 白 蓝 红 绿 黄  橙色
        this.facecolor = ['rgba(227, 236, 236, 1)', 'rgba(0, 150, 255, 1)', 'rgba(158, 63, 34, 1)', 'rgba(41, 222, 80, 1)', 'rgba(231, 234, 32, 1)', 'rgba(226, 131, 14, 1)'];

        //6个面无穷远处的参考点，本例使用1000作为无穷远
        this.refVertex = {
            0: new _Vertex.Vertex(-1000, 0, 0),
            1: new _Vertex.Vertex(1000, 0, 0),
            2: new _Vertex.Vertex(0, -1000, 0),
            3: new _Vertex.Vertex(0, 1000, 0),
            4: new _Vertex.Vertex(0, 0, -1000),
            5: new _Vertex.Vertex(0, 0, 1000)
        };
    }
    /**
     * 已center为中心初始化魔方 6个方向（012345）的6个面 26个方块.
     */


    _createClass(MagicCube, [{
        key: "initCube",
        value: function initCube() {
            var center = this.center;
            var allCube = [];
            var magicfaces = [];
            var closelist = {};
            //6个面的中心点
            for (var i = 0; i < 6; i++) {
                var face = [];
                var centervertex = null;
                var axis = Math.floor(i / 2) + 1; // 1X轴 2Y轴 3Z轴
                var axisDistance = (this.factorial - 1) * this.side / 2;
                var fb = i % 2 == 1 ? 1 : -1;
                switch (axis) {
                    case 1:
                        centervertex = new _Vertex.Vertex(center.x + axisDistance * fb, center.y, center.z);
                        break;
                    case 2:
                        centervertex = new _Vertex.Vertex(center.x, center.y + axisDistance * fb, center.z);
                        break;
                    case 3:
                        centervertex = new _Vertex.Vertex(center.x, center.y, center.z + axisDistance * fb);
                        break;
                    default:
                        break;
                }
                //其中一个面的N*N个立方体
                for (var n = this.factorial; n + this.factorial != 0; n = n - 2) {
                    var distance1 = (n - 1) * this.side / 2;
                    var vertex = null;
                    for (var m = this.factorial; m + this.factorial != 0; m = m - 2) {
                        var distance2 = (m - 1) * this.side / 2;
                        switch (axis) {
                            case 3:
                                vertex = new _Vertex.Vertex(centervertex.x + distance1, centervertex.y + distance2, centervertex.z);
                                break;
                            case 2:
                                vertex = new _Vertex.Vertex(centervertex.x + distance1, centervertex.y, centervertex.z + distance2);
                                break;
                            case 1:
                                vertex = new _Vertex.Vertex(centervertex.x, centervertex.y + distance1, centervertex.z + distance2);
                                break;
                            default:
                                break;
                        }
                        var cube = null;
                        if (closelist[vertex.getId()]) {
                            cube = closelist[vertex.getId()];
                        } else {
                            cube = new _Cube.Cube(vertex, this.side - 6);
                            if (distance1 == 0 && distance2 == 0) {
                                cube.isFaceCenter = true;
                                cube.faceDir = i;
                            }
                            allCube.push(cube);
                            closelist[vertex.getId()] = cube;
                        }
                        face.push(cube);
                    }
                }
                var magicface = new _MagicFace.MagicFace(face, centervertex, i, this.facecolor[i]);
                magicfaces.push(magicface);
            }
            this.magicfaces = magicfaces;
            this.allCube = allCube;
        }

        /**
         * 渲染所有立方体，按Y从小到大渲染
         */

    }, {
        key: "renderAll",
        value: function renderAll(ctx, dx, dy) {
            ctx.clearRect(0, 0, 2 * dx, 2 * dy);
            var cubes = this.allCube;
            cubes.sort(function (a, b) {
                if (a.center.y - b.center.y > 0) {
                    return 1;
                } else {
                    return -1;
                }
            });

            for (var i = 0; i < this.allCube.length; i++) {
                cubes[i].render(ctx, dx, dy);
            }
        }

        /**
         * 渲染所有立方体，根据旋转面所处的排序做特殊处理
         */

    }, {
        key: "renderFaceAll",
        value: function renderFaceAll(ctx, dx, dy) {
            ctx.clearRect(0, 0, 2 * dx, 2 * dy);
            var cubes = this.allCube;
            var sortarr = [];
            cubes.sort(function (a, b) {
                if (a.center.y - b.center.y > 0) {
                    return 1;
                } else {
                    return -1;
                }
            });

            //找出旋转面的cube
            cubes.forEach(function (val, index) {
                if (val.isTopDis) {
                    sortarr.push(val);
                }
            });

            //当旋转面处于后方的3面时，先渲染
            if (sortarr[0].order != -1 && sortarr[0].order <= 2) {
                for (var i = 0; i < sortarr.length; i++) {
                    sortarr[i].render(ctx, dx, dy);
                }
            }
            for (var _i = 0; _i < this.allCube.length; _i++) {
                if (this.allCube[_i].isTopDis) {
                    continue;
                }
                cubes[_i].render(ctx, dx, dy);
            }
            //当旋转面处于前方的3面时，后渲染
            if (sortarr[0].order != -1 && sortarr[0].order > 2) {
                for (var _i2 = 0; _i2 < sortarr.length; _i2++) {
                    sortarr[_i2].render(ctx, dx, dy);
                }
            }
        }

        /**
         * 旋转所有立方体，旋转参考点
         */

    }, {
        key: "rotate",
        value: function rotate(center, theta, phi) {
            for (var i = 0; i < this.allCube.length; i++) {
                this.allCube[i].rotate(center, theta, phi);
                //更新面的中心
                if (this.allCube[i].isFaceCenter) {
                    this.magicfaces[this.allCube[i].faceDir].center = this.allCube[i].center;
                }
            }
            //更新参考点
            for (var j = 0; j < 6; j++) {
                this.refVertex[j].rotate(center, theta, phi);
            }
        }

        /**
         * 旋转某个面
         */

    }, {
        key: "rotateFace",
        value: function rotateFace(theta, phi, i) {
            // let magicfaces = this.magicfaces;
            // magicfaces[i].rotateFace(this.center, theta, phi);
            i.rotateFace(this.center, theta, phi);
        }

        /**
         * 单一面旋转后交换面的成员.
         */

    }, {
        key: "swapFaceCube",
        value: function swapFaceCube() {
            var _this = this;

            this.allCube.forEach(function (val, index) {
                for (var i = 0; i < 6; i++) {
                    val.distance[i] = _this.getDistance(val.center, _this.refVertex[i]);
                }
            });
            for (var j = 0; j < 6; j++) {
                this.magicfaces[j].cubes = this.getTop9(j);
                this.magicfaces[j].center = this.getFaceCenter(this.magicfaces[j].cubes).center;
            }
        }

        /**
         * 获取两个点之间的直线距离.
         * @param vertex
         * @param vertex2
         */

    }, {
        key: "getDistance",
        value: function getDistance(vertex, vertex2) {
            var x2 = Math.pow(vertex.x - vertex2.x, 2);
            var y2 = Math.pow(vertex.y - vertex2.y, 2);
            var z2 = Math.pow(vertex.z - vertex2.z, 2);
            return Math.sqrt(x2 + y2 + z2);
        }

        /**
         * 获取i面的成员 即距离i面参考点最近的9个方块.
         * @param vertex
         * @param vertex2
         */

    }, {
        key: "getTop9",
        value: function getTop9(i) {
            var que = new _PriorityQueue.PriorityQueue(this.foperator(i));
            this.allCube.forEach(function (val, index) {
                que.push(val);
            });
            return que.arr.slice(0, 9);
        }

        /**
         * 获取面的中点 即 这个面距离原点（0，0，0）最近的点
         * @param cubes
         */

    }, {
        key: "getFaceCenter",
        value: function getFaceCenter(cubes) {
            var zbCenter = new _Vertex.Vertex();
            var center;
            var dis = 100000;
            for (var i = 0; i < cubes.length; i++) {
                var dis2 = this.getDistance(cubes[i].center, zbCenter);
                if (dis2 < dis) {
                    dis = dis2;
                    center = cubes[i];
                }
            }
            return center;
        }

        /**
         * 返回优先队列的比较器
         */

    }, {
        key: "foperator",
        value: function foperator(i) {
            return function (a, b) {
                return a.distance[i] < b.distance[i];
            };
        }
    }]);

    return MagicCube;
}();
//# sourceMappingURL=MagicCube.js.map