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

        //白 蓝 红 绿 黄  橙色
        this.facecolor = ['rgba(227, 236, 236, 1)','rgba(0, 150, 255, 1)','rgba(158, 63, 34, 1)','rgba(41, 222, 80, 1)',
            'rgba(231, 234, 32, 1)','rgba(226, 131, 14, 1)'];

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
        faces.sort(function(a, b) {
            let aIndex = a[0].y + a[1].y + a[2].y +a[3].y;
            let bIndex = b[0].y + b[1].y + b[2].y +b[3].y;
            return aIndex - bIndex;
        });
        //遍历6个面
        for (var j = 0; j < len; ++j) {
            var face = faces[j];
            //ctx.fillStyle = this.facecolor[1];
            ctx.beginPath();

            //连接4个点
            for (var k = 0, n_vertices = face.length; k < n_vertices; ++k) {
                var P = this.project(face[k]);
                if(k == 0){
                    ctx.moveTo(P.x + dx, P.y + dy);
                }else{
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
    project(vertex) {
        return new Vertex(vertex.x, vertex.z);
    }
}