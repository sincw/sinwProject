'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Face = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Vertex = require('./Vertex.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Face = exports.Face = function () {
    function Face(vertexs, color) {
        _classCallCheck(this, Face);

        this.vertexs = vertexs;
        this.color = color;
    }

    /**
     * 设置面该显示的颜色
     * @param color 颜色
     * @param i 绕的角度
     */


    _createClass(Face, [{
        key: 'setColor',
        value: function setColor(color) {
            this.color = color;
        }

        /**
         * 获取面的中心点
         */

    }, {
        key: 'getCenter',
        value: function getCenter() {
            var x = 0,
                y = 0,
                z = 0;
            var len = this.vertexs.length;
            for (var i = 0; i < len; i++) {
                x += this.vertexs[i].x;
                y += this.vertexs[i].y;
                z += this.vertexs[i].z;
            }
            return new _Vertex.Vertex(x / len, y / len, z / len);
        }
    }]);

    return Face;
}();
//# sourceMappingURL=Face.js.map