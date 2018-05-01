//数学工具类,用于数学操作
import {BaseUtil} from "./BaseUtil.js";

export class MathUtil {

    //将数组进行康托展开
    static cantor(arr){
        if(typeof arr != 'array' || arr.length == 0){
            return -1;
        }
        let fconst = this.getfactorialArr(arr.length);
        let x = 0;
        let n = arr.length;
        for (let i = 0; i < n; i++) {
            let smaller = 0;  // 在当前位之后小于其的个数
            for (let j = i + 1; j < n; j++) {
                if (arr[j] < arr[i])
                    smaller++;
            }
            x += fconst[n - i - 1] * smaller; // 康托展开累加
        }
        return x;  // 康托展开值
    }

    //返回num的阶乘数组
    static getfactorialArr(num){
        let f = [], sum = 1;
        if (typeof num != 'number' || num < 0 || num > 100) {
            return f;
        }
        f[0] = 1;
        for (let i = 1; i <= num; i++) {
            sum *= i;
            f[i] = sum;
        }
        return f;
    }

    //返回num的阶乘
    static getfactorial(num){
        let  sum = 1;
        if (typeof num != 'number' || num < 0 || num > 1000) {
            return -1;
        }
        for (let i = 1; i <= num; i++) {
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
    static squaArrMDistance(squaArr){
        if (!BaseUtil.notEmpty(squaArr)) {
            return -1;
        }
        let row = squaArr.length, sum = 0, i, k, targetRow, targetcol;
        let col = squaArr[0].length,j;
        for (i = 0; i < row; i++) {
            for (j = 0; j < col; j++){
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
    static ArrMDistance(arr, colsize) {
        let newarr = BaseUtil.sliceArr(arr, colsize);
         return this.squaArrMDistance(newarr);
    }
}