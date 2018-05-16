'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vertex = exports.Vertex = function () {
    function Vertex() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '0';
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0';
        var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '0';

        _classCallCheck(this, Vertex);

        this.x = parseFloat(x);
        this.y = parseFloat(y);
        this.z = parseFloat(z);
    }

    _createClass(Vertex, [{
        key: 'getId',
        value: function getId() {
            return this.x.toString() + " " + this.y.toString() + " " + this.z.toString();
        }

        /**
         * 绕center旋转
         * @param center 点
         * @param theta 绕X轴的角度
         * @param phi 绕Z轴的角度
         */

    }, {
        key: 'rotate',
        value: function rotate(center, theta, phi) {
            var M = this;
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
    }, {
        key: 'rotateVector',
        value: function rotateVector(rotatecenter, theta) {
            var origin = new Vertex(0, 0, 0);
            var M = this;
            var a = rotatecenter.x;
            var b = rotatecenter.y;
            var c = rotatecenter.z;
            var a2 = Math.pow(a, 2);
            var b2 = Math.pow(b, 2);
            var c2 = Math.pow(c, 2);
            var unitlen2 = a2 + b2 + c2;
            var unitlen = Math.sqrt(a2 + b2 + c2);
            // 旋转角的正余弦值
            var ct = Math.cos(theta);
            var st = Math.sin(theta);

            // 旋转后的值
            var x = M.x - origin.x;
            var y = M.y - origin.y;
            var z = M.z - origin.z;

            M.x = (a2 + (b2 + c2) * ct) / unitlen2 * x + (a * b * (1 - ct) - c * unitlen * st) / unitlen2 * y + (a * c * (1 - ct) + b * unitlen * st) / unitlen2 * z + origin.x;
            M.y = (a * b * (1 - ct) + c * unitlen * st) / unitlen2 * x + (b2 + (a2 + c2) * ct) / unitlen2 * y + (b * c * (1 - ct) - a * unitlen * st) / unitlen2 * z + origin.y;
            M.z = (a * c * (1 - ct) - b * unitlen * st) / unitlen2 * x + (b * c * (1 - ct) + a * unitlen * st) / unitlen2 * y + (c2 + (a2 + b2) * ct) / unitlen2 * z + origin.z;
        }
    }]);

    return Vertex;
}();
//# sourceMappingURL=Vertex.js.map