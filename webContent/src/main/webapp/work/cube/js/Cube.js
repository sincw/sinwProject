import {Vertex} from './Vertex.js';
export class Cube {

    constructor(center, side){
        //中心
        this.center = center;

        //边长
        this.side = side;

        //半径
        var d = side/2;

        //8个点
        this.vertices = [
            new Vertex(center.x - d, center.y - d, center.z + d),
            new Vertex(center.x - d, center.y - d, center.z - d),
            new Vertex(center.x + d, center.y - d, center.z - d),
            new Vertex(center.x + d, center.y - d, center.z + d),
            new Vertex(center.x + d, center.y + d, center.z + d),
            new Vertex(center.x + d, center.y + d, center.z - d),
            new Vertex(center.x - d, center.y + d, center.z - d),
            new Vertex(center.x - d, center.y + d, center.z + d)
        ];

        //6个面
        this.faces = [
            [this.vertices[0], this.vertices[1], this.vertices[2], this.vertices[3]],
            [this.vertices[3], this.vertices[2], this.vertices[5], this.vertices[4]],
            [this.vertices[4], this.vertices[5], this.vertices[6], this.vertices[7]],
            [this.vertices[7], this.vertices[6], this.vertices[1], this.vertices[0]],
            [this.vertices[7], this.vertices[0], this.vertices[3], this.vertices[4]],
            [this.vertices[1], this.vertices[6], this.vertices[5], this.vertices[2]]
        ];
    }

    /**
     * 将自己立方体渲染在canvas上(Y轴垂直于屏幕).
     * @param ctx canvas对象
     * @param dx canvas起点相对立方体中心的x距离
     * @param dy canvas起点相对立方体中心的y距离
     */
    render(ctx, dx, dy){
        ctx.clearRect(0, 0, 2*dx, 2*dy);
        var faces = this.faces,len = this.faces.length;
        //遍历6个面
        for (var j = 0; j < len; ++j) {
            var face = faces[j];
            var P = this.project(face[0]);
            ctx.beginPath();
            ctx.moveTo(P.x + dx, P.y + dy);
            //连接4个点
            for (var k = 1, n_vertices = face.length; k < n_vertices; ++k) {
                P = this.project(face[k]);
                ctx.lineTo(P.x + dx, P.y + dy);
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
    project(vertex) {
        return new Vertex(vertex.x, vertex.z);
    }
}