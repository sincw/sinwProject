//web基础工具类
export class BaseUtil {

     /**
     * 递归判断目标或目标的属性为非空.
     * 将undefined,null,空串,空数组[],空对象{}认为是空,其他则认为非空.
     * 给定条件
     * @example
     * let obj = { "a": "1", "b": "", "c": null, "d": [], "e":{"f": ['a','b',""] } },
     *     s1 = '  ',
     *     s2,
     *     o1 = {},
     *     a1 =[];
     * @example 1
     *   !utils.BaseUtil.notEmpty(s1);	//true
     *   !utils.BaseUtil.notEmpty(s2);	//true
     *   !utils.BaseUtil.notEmpty(o1);	//true
     *   !utils.BaseUtil.notEmpty(a1);	//true
     * @example 2
     * 	 utils.BaseUtil.notEmpty(obj);	//true
     *   utils.BaseUtil.notEmpty(obj,'a');	//true
     *   utils.BaseUtil.notEmpty(obj,'b');	//false
     *   utils.BaseUtil.notEmpty(obj,'c');	//false
     *   utils.BaseUtil.notEmpty(obj,'d');	//false,[]为空
     * @example 3
     *  utils.BaseUtil.notEmpty(obj,'e.f');	//true,{f:['a','b','']}不空
     *  utils.BaseUtil.notEmpty(obj,'e.f.1');	//true,'b'不空
     *  utils.BaseUtil.notEmpty(obj,'e.f.2');	//false, ''为空
     *</p>
     * @param {Object} target 目标
     * @param {String} a 用.分表示的属性
     * @returns {Boolean} 非空true,空false

     */
    static notEmpty(target, a) {
        //当o是undefined或者null或者"" 时返回false,
        if (target == null || target === "") {
            return false;
        }
        let to = typeof target;
        let _this = this;
        switch (to) {
            case "string":
                //当o是字符串时,去首尾空（' ','\r','\n','\t'）后，结果为空串则认为是空
                if (target.replace(/^\s+|\s+$/, "") === "") {
                    return false;
                }
                break;
            case "object":
                //当o是数组/对象,并且有元素
            function __notEmpty(o, a) {
                if (a == null || a === "") {
                    //没有属性参数a,结束判断，并返回true(不空)
                    return true;
                } else {
                    //有属性参数a, 继续递归判断
                    function __cut(src, sep, index, callback) {
                        let ret;
                        //当src为空时返回null
                        if (src == null) {
                            ret = null;
                        } else if (src == "" || (sep == null || sep == "")) {
                            //当src为空串时，或者sep为空时返回[src]
                            ret = [src];
                        } else {
                            let ret = src.split(sep);
                            if (!(index == null || index == 0)) {
                                //非贪婪模式下,只分割到第index个分隔符
                                let aa = ret.splice(index, ret.length);
                                ret = [ret.join(sep), aa.join(sep)];
                            }
                            //贪婪模式下,各个分割
                        }
                        //对返回结果做进一步处理
                        if (!!ret && typeof callback === "function") {
                            ret = callback(ret);
                        }
                        return ret;
                    }
                    let aa = __cut(a, '.', 1),
                        k1 = aa[0],
                        k2 = aa[1],
                        p1 = k1.indexOf("("),
                        p2 = k1.indexOf(")"),
                        _target;

                    if (p1 < 0 && p2 < 0) {
                        _target = o[k1];
                    } else if (p1 >= 0 && p2 >= 0) {//函数
                        let args = k1.substring(p1 + 1, p2);
                        k1 = k1.substring(0, p1);
                        _target = eval('o["' + k1 + '"](' + args + ')');
                    } else {
                        throw new Error("表达式错误：" + a);
                    }
                    return _this.notEmpty(_target, k2);
                }
            };
                if (target instanceof Array) {
                    //当o是数组,但没有元素，认为是空
                    if (target.length == 0) {
                        return false;
                    } else {
                        return __notEmpty(target, a);
                    }
                } else {
                    //当o是对象
                    for (let k in target) {
                        return __notEmpty(target, a);
                    }
                    //没有任何元素，认为是空
                    return false;
                }
                break;
        }
        return true;
    }

    /**
     * 判断字符或数组是否为空.
     * @param ''，[]
     * @return boolean
     */
    static isNullOrEmpty(str) {
        return str == undefined || str == null || str == "" || str.length == 0;
    }

    /**
     * 交换数组位置.
     * @param 目标数组
     * @param 起点
     * @param 目标点
     * @return Array 交换后的数组
     */
    static arrSwap(arr,soruce,target) {
        if (!this.notEmpty(arr)) {
            return;
        }
        arr[soruce] = arr.splice(target, 1, arr[soruce])[0];
    }

    /**
     * 深度克隆.
     * @param target 克隆目标
     * @return obj 克隆对象
     */
    static clone(target){
        let objClone;
        if (target) {
            if (target.constructor == Object || target.constructor == Array) {
                objClone = new target.constructor();
            }
            else {
                objClone = new target.constructor(target.valueOf());
            }
            for (let key in target) {
                if (objClone[key] != target[key]) {
                    if (typeof (target[key]) == 'object') {
                        objClone[key] = arguments.callee(target[key]);
                    }
                    else {
                        objClone[key] = target[key];
                    }
                }
            }
            objClone.toString = target.toString;
            objClone.valueOf = target.valueOf;
        }
        return objClone;
    }

    /**
     * 将数组等份切割.
     * @param arr 目标数组,
     * @param colsize  列数量.
     * @return 切割后的数组.
     */
    static sliceArr(arr,colsize) {
        let result = [], rowlen = Math.ceil(arr.length / colsize), arrlen = arr.length;
        if (rowlen * colsize != arrlen) {
            return [];
        }
        for (let i = 0; i < rowlen; i++) {
            let start = i * colsize;
            let end = start + colsize;
            result.push(arr.slice(start, end));
        }
        return result;
    }
}