"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CubeUtil = exports.CubeUtil = function () {
    function CubeUtil() {
        _classCallCheck(this, CubeUtil);
    }

    _createClass(CubeUtil, [{
        key: "sort",

        //将数组传入后由小到大排序，并返回原数组在整个数组中排名的数组
        //例子:arr[3,1,2] 将arr排序为[1，2，3]  返回 as[1,2,0]（1在原数组中排名第1，2排名第2，3排名第0）
        value: function sort(arr) {
            var as = [];
            for (var i = 0; i < arr.length; i++) {
                as.push(i);
            }
            for (var j = 0; j < arr.length - 1; j++) {
                //两两比较，如果前一个比后一个大，则交换位置。
                for (var i = 0; i < arr.length - 1 - j; i++) {
                    if (arr[i] > arr[i + 1]) {
                        var temp = arr[i];
                        arr[i] = arr[i + 1];
                        arr[i + 1] = temp;
                        var temp2 = as[i];
                        as[i] = as[i + 1];
                        as[i + 1] = temp2;
                    }
                }
            }
            return as;
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
    }], [{
        key: "getInstance",

        //单例
        value: function getInstance() {
            if (!CubeUtil.instance) {
                CubeUtil.instance = new CubeUtil();
            }
            return CubeUtil.instance;
        }
    }]);

    return CubeUtil;
}();
//# sourceMappingURL=CubeUtil.js.map