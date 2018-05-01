'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MathUtil = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //数学工具类,用于数学操作


var _BaseUtil = require('./BaseUtil.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MathUtil = exports.MathUtil = function () {
    function MathUtil() {
        _classCallCheck(this, MathUtil);
    }

    _createClass(MathUtil, null, [{
        key: 'cantor',


        //将数组进行康托展开
        value: function cantor(arr) {
            if (typeof arr != 'array' || arr.length == 0) {
                return -1;
            }
            var fconst = this.getfactorialArr(arr.length);
            var x = 0;
            var n = arr.length;
            for (var i = 0; i < n; i++) {
                var smaller = 0; // 在当前位之后小于其的个数
                for (var j = i + 1; j < n; j++) {
                    if (arr[j] < arr[i]) smaller++;
                }
                x += fconst[n - i - 1] * smaller; // 康托展开累加
            }
            return x; // 康托展开值
        }

        //返回num的阶乘数组

    }, {
        key: 'getfactorialArr',
        value: function getfactorialArr(num) {
            var f = [],
                sum = 1;
            if (typeof num != 'number' || num < 0 || num > 100) {
                return f;
            }
            f[0] = 1;
            for (var i = 1; i <= num; i++) {
                sum *= i;
                f[i] = sum;
            }
            return f;
        }

        //返回num的阶乘

    }, {
        key: 'getfactorial',
        value: function getfactorial(num) {
            var sum = 1;
            if (typeof num != 'number' || num < 0 || num > 1000) {
                return -1;
            }
            for (var i = 1; i <= num; i++) {
                sum *= i;
            }
            return sum;
        }

        /**
         * 返回矩形数组的曼哈顿距离
        * @exapmle
            * utils.squaArrMDistance([[1,2,3],[4,5,6],[7,8,0]);
        * @param squaArr 矩阵数组
        * @return 曼哈顿距离 num
        */

    }, {
        key: 'squaArrMDistance',
        value: function squaArrMDistance(squaArr) {
            if (!_BaseUtil.BaseUtil.notEmpty(squaArr)) {
                return -1;
            }
            var row = squaArr.length,
                sum = 0,
                i = void 0,
                k = void 0,
                targetRow = void 0,
                targetcol = void 0;
            var col = squaArr[0].length,
                j = void 0;
            for (i = 0; i < row; i++) {
                for (j = 0; j < col; j++) {
                    if (squaArr[i][j] == 0) continue;
                    k = squaArr[i][j] - 1;
                    targetRow = Math.floor(k / col);
                    targetcol = k % row;
                    sum += Math.abs(targetRow - i) + Math.abs(targetcol - j);
                }
            }
            return sum;
        }

        /**
         * 返回矩形的曼哈顿距离.
         * @param arr 目标数组
         * @param col 列数量
         * @return num
         */

    }, {
        key: 'ArrMDistance',
        value: function ArrMDistance(arr, colsize) {
            var newarr = _BaseUtil.BaseUtil.sliceArr(arr, colsize);
            return this.squaArrMDistance(newarr);
        }
    }]);

    return MathUtil;
}();
//# sourceMappingURL=MathUtil.js.map