"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PriorityQueue = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Queue2 = require("./Queue.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PriorityQueue = exports.PriorityQueue = function (_Queue) {
    _inherits(PriorityQueue, _Queue);

    /**
     * desc 构造函数
     * @param operator 比较器
     */
    function PriorityQueue(operator) {
        _classCallCheck(this, PriorityQueue);

        var _this = _possibleConstructorReturn(this, (PriorityQueue.__proto__ || Object.getPrototypeOf(PriorityQueue)).call(this));

        _this.foperator = operator;
        return _this;
    }

    /**
     * desc 重写push函数.
     * @param node
     */


    _createClass(PriorityQueue, [{
        key: "push",
        value: function push(node) {
            var arrList = this.arr;
            if (!this.foperator) {
                this.foperator = node.operator;
            }
            if (this.empty()) {
                this.arr.push(node);
            } else {
                var len = this.size();
                var added = false;
                //二分待优化
                for (var i = 0; i < len; i++) {
                    if (this.foperator(node, this.arr[i])) {
                        arrList.splice(i, 0, node);
                        added = true;
                        break;
                    }
                }
                if (!added) {
                    arrList.push(node);
                }
            }
        }
    }]);

    return PriorityQueue;
}(_Queue2.Queue);
//# sourceMappingURL=PriorityQueue.js.map