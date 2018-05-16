"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *@desc 队列
 *@author sincw
 *@date 2018-04-18
 */
var Queue = exports.Queue = function () {
    function Queue() {
        _classCallCheck(this, Queue);

        this.arr = [];
    }

    /**
     * desc 将数据压入队列
     * @param data
     */


    _createClass(Queue, [{
        key: "push",
        value: function push(data) {
            this.arr.push(data);
        }
        /**
         * desc 弹出队顶元素
         * @return r
         */

    }, {
        key: "pop",
        value: function pop() {
            this.arr.shift();
        }

        /**
         * desc 获取队顶元素
         * @return r
         */

    }, {
        key: "front",
        value: function front() {
            return this.arr[0];
        }

        /**
         * desc 获取尾巴元素.
         * @param a
         * @return r
         */

    }, {
        key: "rear",
        value: function rear() {
            return this.arr[this.arr.length - 1];
        }
        /**
         * desc 队列是否为空
         * @param a
         * @return r
         */

    }, {
        key: "empty",
        value: function empty() {
            return this.arr.length == 0;
        }
        /**
         * desc 队列长度
         * @param a
         * @return r
         */

    }, {
        key: "size",
        value: function size() {
            return this.arr.length;
        }
    }, {
        key: "clear",
        value: function clear() {
            this.arr = [];
        }
    }]);

    return Queue;
}();
//# sourceMappingURL=Queue.js.map