/* eslint-disable */
export const BlockResources = {

    //structure:1代表方块所有面都相同 羊毛 石头
    //structure:2代表方块 拥有top side  2个面 南瓜 树
    //structure:3代表方块 拥有top bottom side 3个面 仙人掌

    //url的排序按照 上 下 前 后 左 右 排序
    'brick': {
        name:'brick',
        structure: 1,
        face: ['brick']
    },
    'pumpkin': {
        name:'pumpkin',
        structure: 2,
        face: ['pumpkin_top',
            'pumpkin_side']
    },
    'cactus': {
        name:'cactus',
        structure: 3,
        face: ['cactus_top',
            'cactus_bottom',
            'cactus_side']
    },


};