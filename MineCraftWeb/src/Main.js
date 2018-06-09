//初始化操作
import {Director} from './js/Director.js';
import {THREEx} from './lib/THREEx.js';

export class Main {
    constructor() {
        require('./css/style.css');
        window.THREEx = THREEx;
        window.THREE = require('three');
        require('./lib/OrbitControls.js');
        require('./lib/PointerLockControls.js');
        require('./lib/Sky.js');
        this.run();
    }

    run() {
        this.director = Director.getInstance();
        this.director.run();
    }
}

new Main();