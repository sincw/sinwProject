/**
 *@desc 队列
 *@author sincw
 *@date 2018-04-18
 */   
export class Queue {
    constructor() {
        this.arr = [];
    }

    /**
     * desc 将数据压入队列
     * @param data
     */
    push(data)  {
        this.arr.push(data);
    }
    /**
     * desc 弹出队顶元素
     * @return r
     */
    pop(){
        this.arr.shift();
    }

    /**
     * desc 获取队顶元素
     * @return r
     */
    front(){
        return this.arr[0];
    }

    /**
     * desc 获取尾巴元素.
     * @param a
     * @return r
     */
    rear(){
        return this.arr[this.arr.length - 1];
    }
    /**
     * desc 队列是否为空
     * @param a
     * @return r
     */
    empty(){
        return this.arr.length == 0;
    }
    /**
     * desc 队列长度
     * @param a
     * @return r
     */
    size(){
        return this.arr.length;
    }

    clear(){
        this.arr = [];
    }
}