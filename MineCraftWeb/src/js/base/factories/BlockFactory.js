import {Factory} from '../Factory.js';
import {TextureFacetory} from './TextureFacetory.js';

export class BlockFactory extends Factory {
    static getInstance() {
        if (!BlockFactory.instance) {
            BlockFactory.instance = new BlockFactory();
        }
        return BlockFactory.instance;
    }

    constructor() {
        super();
        this.cubeGeometry = new THREE.CubeGeometry(100, 100, 100);
        this.textureFacetory = TextureFacetory.getInstance();
    }

    create(block) {
        switch (block.structure) {
            case 1:
                return this.createBasicsBlock(block);
            default:
                return this.createSpecialBlock(block);
        }
    }

    createBlock(block) {
        switch (block.structure) {
            case 1: return this.createBasicsBlock(block);
            default: return this.createSpecialBlock(block);
        }
    }


    //构建基础方块
    createBasicsBlock(block) {
        let tf = this.textureFacetory;
        let cubeGeometry = this.getCubeGeometry();
        let texture = tf.getTexture(block.face[0]);
        texture.generateMipmaps = false;
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        let crateMaterial = new THREE.MeshLambertMaterial({map: texture, fog: false});

        let crate = new THREE.Mesh(cubeGeometry.clone(), crateMaterial);
        return crate;
    }

    //构建特殊方块
    createSpecialBlock(block) {
        let i = null;
        let DiceBlueGeom = this.getCubeGeometry();
        let materialArray = [];
        let tf = this.textureFacetory;
        let face = this.getFaceOrder(block);
        for (i = 0; i < face.length; i++) {
            let texture = tf.getTexture(face[i]);
            texture.generateMipmaps = false;
            texture.magFilter = THREE.NearestFilter;
            texture.minFilter = THREE.NearestFilter;
            materialArray.push(new THREE.MeshLambertMaterial({map: texture, fog: false}));
            //MeshBasicMaterial
        }
        let DiceBlue = new THREE.Mesh(DiceBlueGeom, materialArray);
        return DiceBlue;
    }

    //返回方块6个面
    getFaceOrder(block) {
        switch (block.structure) {
            case 2:
                return [block.face[1], block.face[1], block.face[0], block.face[1], block.face[1], block.face[1]];
            case 3:
                return [block.face[2], block.face[2], block.face[0], block.face[1], block.face[2], block.face[2]];
            default:
                break;
        }
    }


    //返回一个新的基础块
    getCubeGeometry() {
        return this.cubeGeometry.clone();
    }


}