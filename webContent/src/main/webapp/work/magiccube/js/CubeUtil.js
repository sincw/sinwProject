
export class CubeUtil{
    //单例
    static getInstance() {
        if (!CubeUtil.instance) {
            CubeUtil.instance = new CubeUtil();
        }
        return CubeUtil.instance;
    }
    //将数组传入后由小到大排序，并返回原数组在整个数组中排名的数组
    //例子:arr[3,1,2] 将arr排序为[1，2，3]  返回 as[1,2,0]（1在原数组中排名第1，2排名第2，3排名第0）
    sort(arr) {
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
    getDistance(vertex,vertex2){
        var x2 = Math.pow(vertex.x - vertex2.x,2);
        var y2 = Math.pow(vertex.y - vertex2.y,2);
        var z2 = Math.pow(vertex.z - vertex2.z,2);
        return Math.sqrt(x2 + y2 + z2);
    }
}