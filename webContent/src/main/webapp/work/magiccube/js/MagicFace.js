import {Vertex} from "./Vertex.js";
import {CubeUtil} from "./CubeUtil.js";
import {PriorityQueue} from "../../../common/datastructures/PriorityQueue.js";

export class MagicFace {
    //i 表示第几个面 color这个面的颜色
    constructor(cubes, center, i, color) {
        this.i = i;
        this.color = color;
        this.cubes = cubes;
        this.center = center;
        for (var j = 0; j < cubes.length; j++) {
            cubes[j].setFaceColor(this.i, color);
        }
    }

    /**
     * 绕坐标系原点（0，0，0）center  旋转
     * @param center 空间中的一点
     * @param theta 绕的角度
     */
    rotateFace(center, theta) {
        var len = this.cubes.length;
        for (var i = 0; i < len; i++) {
            this.cubes[i].rotateVector(this.center, theta);
        }
    }

    /**
     * 设置cube属于旋转的面和面渲染的顺序
     * @param falg 标识方块属于旋转的面
     * @param order 设置方块所在面的渲染的顺序
     */
    setDisableCube(falg, order) {
        var len = this.cubes.length;
        let sortarr = [];
        var replaceFace = [];
        this.cubes.forEach(function (val, index) {
            sortarr.push(val.center.y);
        });
        var as = CubeUtil.getInstance().sort(sortarr);
        //一个面旋转的面最多显示6个块
        for (var i = 0; i < 9; i++) {
            this.cubes[i].order = order;
            this.cubes[i].isTopDis = falg;
        }
    }

    isPointInner(vertexs1, vertexs2, refvertex, ctx) {
        var topface = this.getTop3Face(refvertex);
        let cubes = this.cubes;
        var util = CubeUtil.getInstance();

        var que = new PriorityQueue(
            (a, b) => {
                var center = this.center;
                return util.getDistance(a, center) > util.getDistance(b, center);
            }
        );

        var resulr = {};
        for (var m = 0; m < topface.length; m++) {
            var con = false;
            var top3 = this.getTop3Vertex(cubes, topface[m]);
            for (var a = 0; a < 3; a++) {
                if (top3[a].isFaceCenter) {
                    con = true;
                    break;
                }
            }
            if (con) {
                continue;
            }
            for (var a = 0; a < 3; a++) {
                for (var b = 0; b < 8; b++) {
                    que.push(top3[a].vertices[b]);
                }
            }
            resulr[m] = que.arr.slice(0, 4);
            que.clear();
        }

        var vers = [];
        for (var key in resulr) {
            var val = resulr[key];
            var ver = [];
            for (var i = 0; i < 4; i++) {
                var dian = [val[i].x + 400, val[i].z + 400];
                ver.push(dian);
            }
            vers.push(ver);
        }
        // for (var i = 0; i < 4; i++) {
        //     ctx.fillStyle = 'black';
        //     ctx.beginPath();
        //     ctx.arc(vers[0][i][0], vers[0][i][1], 5, 0, 2 * Math.PI);
        //     ctx.stroke();
        //     ctx.fill();
        // }
        // for(var i = 0;i < 4;i++){
        //     ctx.fillStyle = 'black';
        //     ctx.beginPath();
        //     ctx.arc(vers[1][i][0] ,vers[1][i][1] ,5,0,2*Math.PI);
        //     ctx.stroke();
        //     ctx.fill();
        // }
        // ctx.fillStyle = 'black';
        // ctx.beginPath();
        // ctx.arc(vertexs1.x, vertexs1.z, 5, 0, 2 * Math.PI);
        // ctx.stroke();
        // ctx.fill();
        // ctx.fillStyle = 'black';
        // ctx.beginPath();
        // ctx.arc(vertexs2.x, vertexs2.z, 5, 0, 2 * Math.PI);
        // ctx.stroke();
        // ctx.fill();

        var vers2 = [];
        for(var o = 0;o<2;o++){
            var vers21 = [];
            for(var o1 = 0;o1<4;o1++){
                vers21.push(new Vertex(vers[o][o1][0],0,vers[o][o1][1]))
            }
            vers2.push(vers21);
        }

        var result = false;
        if (
            this.isPolygonContainsPoint(vertexs1,vers2[0]) && this.isPolygonContainsPoint(vertexs2,vers2[0])
            //this.insidePolygon(vertexs1.x, vertexs1.z, vers[0]) && this.insidePolygon(vertexs2.x, vertexs2.z, vers[0])
        ) {
            result = true;
        }
        if (
            this.isPolygonContainsPoint(vertexs1,vers2[1]) && this.isPolygonContainsPoint(vertexs2,vers2[1])
            //this.insidePolygon(vertexs1.x, vertexs1.z, vers[1]) && this.insidePolygon(vertexs2.x, vertexs2.z, vers[1])
        ) {
            result = true;
        }
        return result;
    }

    /**
     * 返回优先队列的比较器,如果返回true 则a插在b前面
     */
    foperator(refvertex) {

        var util = CubeUtil.getInstance();
        return (a, b) => {
            return util.getDistance(a.center, refvertex) < util.getDistance(b.center, refvertex);
        };
    }

    getTop3Face(refvertex) {
        var que = new PriorityQueue(
            (a, b) => {
                return a.y > b.y;
            }
        );
        // refvertex.forEach((val, index) => {
        //     que.push(val);
        // })
        for (var key in refvertex) {
            que.push(refvertex[key]);
        }
        return que.arr.slice(0, 3);
    }

    getTop3Vertex(cubes, refvertex) {
        var que = new PriorityQueue(this.foperator(refvertex));
        cubes.forEach((val, index) => {
            que.push(val);
        })
        return que.arr.slice(0, 3);
    }

    insidePolygon(x, y, points) {
        let result = false;
        for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
            if ((points[i][1] > y) != (points[j][1] > y) &&
                (x < (points[j][0] - points[i][0]) * (y - points[i][1]) / (points[j][1] - points[i][1]) + points[i][0])) {
                result = !result;
            }
        }
        return result;
    }

    isPolygonContainsPoint(point, mPoints) {
        var nCross = 0;
        for (var i = 0; i < mPoints.length; i++) {
            var p1 = mPoints[i];
            var p2 = mPoints[(i + 1) % mPoints.length];
            // 取多边形任意一个边,做点point的水平延长线,求解与当前边的交点个数
            // p1p2是水平线段,要么没有交点,要么有无限个交点
            if (p1.z == p2.z)
                continue;
            // point 在p1p2 底部 --> 无交点
            if (point.z < Math.min(p1.z, p2.z))
                continue;
            // point 在p1p2 顶部 --> 无交点
            if (point.z >= Math.max(p1.z, p2.z))
                continue;
            // 求解 point点水平线与当前p1p2边的交点的 X 坐标
            var x = (point.z - p1.z) * (p2.x - p1.x) / (p2.z - p1.z) + p1.x;
            if (x > point.x) // 当x=point.x时,说明point在p1p2线段上
                nCross++; // 只统计单边交点
        }
        // 单边交点为偶数，点在多边形之外 ---
        return (nCross % 2 == 1);
    }
}