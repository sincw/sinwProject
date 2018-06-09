import Scene from './Scene.js';
import {FactoryProducer} from './base/FactoryProducer.js';
import {Resources} from './base/Resources.js';
import {BlockResources} from './base/factories/BlockResources.js';
import {Lord} from './scene/Lord.js';


export class Director {

    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    constructor() {
        this.blockfactory = FactoryProducer.getInstance().getFactory(Resources.Factory.BLOCK);
        this.init();
    }

    init() {
        let scene = Scene.getInstance();
        this.scene = scene;
    }

    run() {
        let bf = this.blockfactory;
        let scene = this.scene;

        let brick1 = bf.createBlock(BlockResources.cactus);
        brick1.position.set(-60, 50, -100);


        let brick = bf.createBlock(BlockResources.brick);
        brick.position.set(60, 50, -100);


        let lord = Lord.getInstance().getLord();

        scene.initControl(lord);
        scene.addGeometry(brick1);
        scene.addGeometry(brick);
        scene.addGeometry(lord);

        //this.test();

        scene.animate();
    }

    test() {
        let scene = this.scene;
        let light = new THREE.Color( 0xffffff );
        let shadow = new THREE.Color( 0x505050 );
        let pxGeometry = new THREE.PlaneGeometry(100, 100);
        pxGeometry.faces[0].vertexColors = [light, shadow, light];
        pxGeometry.faces[1].vertexColors = [shadow, shadow, light];
        pxGeometry.faceVertexUvs[0][0][0].y = 0.5;
        pxGeometry.faceVertexUvs[0][0][2].y = 0.5;
        pxGeometry.faceVertexUvs[0][1][2].y = 0.5;
        pxGeometry.rotateX( - Math.PI / 2 );
        //pxGeometry.rotateY( Math.PI / 2 );
        pxGeometry.translate( 0, 50, 0 );

        let material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
        let plane = new THREE.Mesh( pxGeometry, material );
        scene.addGeometry(plane);
    }

}