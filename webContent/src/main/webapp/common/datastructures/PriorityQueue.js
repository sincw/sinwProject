import {Queue} from "./Queue.js";

export class PriorityQueue extends Queue{

    /**
     * desc 构造函数
     * @param operator 比较器
     */
    constructor(operator){
        super();
        this.foperator = operator;
    }

    /**
     * desc 重写push函数.
     * @param node
     */
    push(node){
        let arrList = this.arr;
        if (!this.foperator) {
            this.foperator = node.operator;
        }
        if (this.empty()) {
            this.arr.push(node);
        } else {
            let len = this.size();
            let added = false;
            //二分待优化
            for (let i = 0; i < len; i++) {
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
}