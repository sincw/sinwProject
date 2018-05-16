import {Vertex} from './Vertex.js';

export class Face {
    constructor(vertexs, color) {
        this.vertexs = vertexs;
        this.color = color;
    }

    /**
     * 设置面该显示的颜色
     * @param color 颜色
     * @param i 绕的角度
     */
    setColor(color) {
        this.color = color;
    }

    /**
     * 获取面的中心点
     */
    getCenter() {
        var x = 0, y = 0, z = 0;
        var len = this.vertexs.length;
        for (var i = 0; i < len; i++) {
            x += this.vertexs[i].x;
            y += this.vertexs[i].y;
            z += this.vertexs[i].z;
        }
        return new Vertex(x / len, y / len, z / len);
    }
}