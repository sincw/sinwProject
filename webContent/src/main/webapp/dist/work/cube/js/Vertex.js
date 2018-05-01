'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vertex = exports.Vertex = function Vertex() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '0';
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0';
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '0';

    _classCallCheck(this, Vertex);

    this.x = parseFloat(x);
    this.y = parseFloat(y);
    this.z = parseFloat(z);
};
//# sourceMappingURL=Vertex.js.map