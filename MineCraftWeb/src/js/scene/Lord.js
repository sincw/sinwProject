import {ImprovedNoise} from '../../lib/ImprovedNoise.js';
import {TextureFacetory} from '../base/factories/TextureFacetory.js';
import {TextureResources} from '../base/factories/TextureResources.js';

export class Lord {
    static getInstance() {
        if (!Lord.instance) {
            Lord.instance = new Lord();
        }
        return Lord.instance;
    }

    constructor() {
        this.textureFacetory = TextureFacetory.getInstance();
        let worldWidth = 200, worldDepth = 200;
        this.worldWidth = worldWidth;
        this.worldDepth = worldDepth;
        this.data = this.generateHeight(worldWidth, worldDepth);
        this.texture = this.textureFacetory.getTexture(TextureResources.atlas);
        this.initLord();
    }

    getLord() {
        return this.LORD;
    }

    initLord() {
        let tf = this.textureFacetory;
        let worldWidth = this.worldWidth, worldDepth = this.worldDepth;
        let worldHalfWidth = worldWidth / 2, worldHalfDepth = worldWidth / 2;

        let light = new THREE.Color(0xffffff);
        let shadow = new THREE.Color(0x505050);
        let matrix = new THREE.Matrix4();
        let side = 0.5;

        let pxGeometry = new THREE.PlaneGeometry(100, 100);
        pxGeometry.faces[0].vertexColors = [light, shadow, light];
        pxGeometry.faces[1].vertexColors = [shadow, shadow, light];
        pxGeometry.faceVertexUvs[0][0][0].y = side;
        pxGeometry.faceVertexUvs[0][0][2].y = side;
        pxGeometry.faceVertexUvs[0][1][2].y = side;
        pxGeometry.rotateY(Math.PI / 2);
        pxGeometry.translate(50, 0, 0);

        let nxGeometry = new THREE.PlaneGeometry(100, 100);
        nxGeometry.faces[0].vertexColors = [light, shadow, light];
        nxGeometry.faces[1].vertexColors = [shadow, shadow, light];
        nxGeometry.faceVertexUvs[0][0][0].y = side;
        nxGeometry.faceVertexUvs[0][0][2].y = side;
        nxGeometry.faceVertexUvs[0][1][2].y = side;
        nxGeometry.rotateY(-Math.PI / 2);
        nxGeometry.translate(-50, 0, 0);

        let pyGeometry = new THREE.PlaneGeometry(100, 100);
        pyGeometry.faces[0].vertexColors = [light, light, light];
        pyGeometry.faces[1].vertexColors = [light, light, light];
        pyGeometry.faceVertexUvs[0][0][1].y = side;
        pyGeometry.faceVertexUvs[0][1][0].y = side;
        pyGeometry.faceVertexUvs[0][1][1].y = side;
        pyGeometry.rotateX(-Math.PI / 2);
        pyGeometry.translate(0, 50, 0);

        let py2Geometry = new THREE.PlaneGeometry(100, 100);
        py2Geometry.faces[0].vertexColors = [light, light, light];
        py2Geometry.faces[1].vertexColors = [light, light, light];
        py2Geometry.faceVertexUvs[0][0][1].y = side;
        py2Geometry.faceVertexUvs[0][1][0].y = side;
        py2Geometry.faceVertexUvs[0][1][1].y = side;
        py2Geometry.rotateX(-Math.PI / 2);
        py2Geometry.rotateY(Math.PI / 2);
        py2Geometry.translate(0, 50, 0);

        let pzGeometry = new THREE.PlaneGeometry(100, 100);
        pzGeometry.faces[0].vertexColors = [light, shadow, light];
        pzGeometry.faces[1].vertexColors = [shadow, shadow, light];
        pzGeometry.faceVertexUvs[0][0][0].y = side;
        pzGeometry.faceVertexUvs[0][0][2].y = side;
        pzGeometry.faceVertexUvs[0][1][2].y = side;
        pzGeometry.translate(0, 0, 50);

        let nzGeometry = new THREE.PlaneGeometry(100, 100);
        nzGeometry.faces[0].vertexColors = [light, shadow, light];
        nzGeometry.faces[1].vertexColors = [shadow, shadow, light];
        nzGeometry.faceVertexUvs[0][0][0].y = side;
        nzGeometry.faceVertexUvs[0][0][2].y = side;
        nzGeometry.faceVertexUvs[0][1][2].y = side;
        nzGeometry.rotateY(Math.PI);
        nzGeometry.translate(0, 0, -50);

        let lordgeometry = new THREE.Geometry();

        for (let z = 0; z < this.worldDepth; z++) {

            for (let x = 0; x < this.worldWidth; x++) {

                let h = this.getY(x, z);

                matrix.makeTranslation(
                    x * 100 - worldHalfWidth * 100,
                    h * 100,
                    z * 100 - worldHalfDepth * 100
                );

                let px = this.getY(x + 1, z);//正右边的方块的高
                let nx = this.getY(x - 1, z);//正左
                let pz = this.getY(x, z + 1);//前
                let nz = this.getY(x, z - 1);//后

                let pxpz = this.getY(x + 1, z + 1);//右下
                let nxpz = this.getY(x - 1, z + 1);//左下
                let pxnz = this.getY(x + 1, z - 1);//右上
                let nxnz = this.getY(x - 1, z - 1);//左上

                let a = nx > h || nz > h || nxnz > h ? 0 : 1;
                let b = nx > h || pz > h || nxpz > h ? 0 : 1;
                let c = px > h || pz > h || pxpz > h ? 0 : 1;
                let d = px > h || nz > h || pxnz > h ? 0 : 1;

                if (a + c > b + d) {

                    let colors = py2Geometry.faces[0].vertexColors;
                    colors[0] = b === 0 ? shadow : light;
                    colors[1] = c === 0 ? shadow : light;
                    colors[2] = a === 0 ? shadow : light;

                    let colors2 = py2Geometry.faces[1].vertexColors;
                    colors2[0] = c === 0 ? shadow : light;
                    colors2[1] = d === 0 ? shadow : light;
                    colors2[2] = a === 0 ? shadow : light;

                    lordgeometry.merge(py2Geometry, matrix);

                } else {

                    let colors = pyGeometry.faces[0].vertexColors;
                    colors[0] = a === 0 ? shadow : light;
                    colors[1] = b === 0 ? shadow : light;
                    colors[2] = d === 0 ? shadow : light;

                    let colors2 = pyGeometry.faces[1].vertexColors;
                    colors2[0] = b === 0 ? shadow : light;
                    colors2[1] = c === 0 ? shadow : light;
                    colors2[2] = d === 0 ? shadow : light;

                    lordgeometry.merge(pyGeometry, matrix);

                }

                if ((px != h && px != h + 1) || x == 0) {

                    let colors = pxGeometry.faces[0].vertexColors;
                    colors[0] = pxpz > px && x > 0 ? shadow : light;
                    colors[2] = pxnz > px && x > 0 ? shadow : light;

                    let colors2 = pxGeometry.faces[1].vertexColors;
                    colors2[2] = pxnz > px && x > 0 ? shadow : light;

                    lordgeometry.merge(pxGeometry, matrix);

                }

                if ((nx != h && nx != h + 1) || x == worldWidth - 1) {

                    let colors = nxGeometry.faces[0].vertexColors;
                    colors[0] = nxnz > nx && x < worldWidth - 1 ? shadow : light;
                    colors[2] = nxpz > nx && x < worldWidth - 1 ? shadow : light;

                    let colors2 = nxGeometry.faces[1].vertexColors;
                    colors2[2] = nxpz > nx && x < worldWidth - 1 ? shadow : light;

                    lordgeometry.merge(nxGeometry, matrix);

                }

                if ((pz != h && pz != h + 1) || z == worldDepth - 1) {

                    let colors = pzGeometry.faces[0].vertexColors;
                    colors[0] = nxpz > pz && z < worldDepth - 1 ? shadow : light;
                    colors[2] = pxpz > pz && z < worldDepth - 1 ? shadow : light;

                    let colors2 = pzGeometry.faces[1].vertexColors;
                    colors2[2] = pxpz > pz && z < worldDepth - 1 ? shadow : light;

                    lordgeometry.merge(pzGeometry, matrix);

                }

                if ((nz != h && nz != h + 1) || z == 0) {

                    let colors = nzGeometry.faces[0].vertexColors;
                    colors[0] = pxnz > nz && z > 0 ? shadow : light;
                    colors[2] = nxnz > nz && z > 0 ? shadow : light;

                    let colors2 = nzGeometry.faces[1].vertexColors;
                    colors2[2] = nxnz > nz && z > 0 ? shadow : light;

                    lordgeometry.merge(nzGeometry, matrix);

                }

            }

        }

        let texture = this.texture;
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.LinearMipMapLinearFilter;

        let mesh = new THREE.Mesh(lordgeometry, new THREE.MeshLambertMaterial(
            {map: texture, vertexColors: THREE.VertexColors}));

        this.LORD = mesh;
    }

    initLord2() {
        //let tf = this.textureFacetory;
        this.object = [];
        let worldWidth = this.worldWidth, worldDepth = this.worldDepth;
        let worldHalfWidth = worldWidth / 2, worldHalfDepth = worldWidth / 2;

        // let light = new THREE.Color(0xffffff);
        // let shadow = new THREE.Color(0x505050);
        // let matrix = new THREE.Matrix4();
        // let side = 0.5;

        let matrix = new THREE.Matrix4();

        let pxGeometry = new THREE.PlaneBufferGeometry(100, 100);
        pxGeometry.attributes.uv.array[1] = 0.5;
        pxGeometry.attributes.uv.array[3] = 0.5;
        pxGeometry.rotateY(Math.PI / 2);
        pxGeometry.translate(50, 0, 0);

        let nxGeometry = new THREE.PlaneBufferGeometry(100, 100);
        nxGeometry.attributes.uv.array[1] = 0.5;
        nxGeometry.attributes.uv.array[3] = 0.5;
        nxGeometry.rotateY(-Math.PI / 2);
        nxGeometry.translate(-50, 0, 0);

        let pyGeometry = new THREE.PlaneBufferGeometry(100, 100);
        pyGeometry.attributes.uv.array[5] = 0.5;
        pyGeometry.attributes.uv.array[7] = 0.5;
        pyGeometry.rotateX(-Math.PI / 2);
        pyGeometry.translate(0, 50, 0);

        let pzGeometry = new THREE.PlaneBufferGeometry(100, 100);
        pzGeometry.attributes.uv.array[1] = 0.5;
        pzGeometry.attributes.uv.array[3] = 0.5;
        pzGeometry.translate(0, 0, 50);

        let nzGeometry = new THREE.PlaneBufferGeometry(100, 100);
        nzGeometry.attributes.uv.array[1] = 0.5;
        nzGeometry.attributes.uv.array[3] = 0.5;
        nzGeometry.rotateY(Math.PI);
        nzGeometry.translate(0, 0, -50);

        //

        // BufferGeometry cannot be merged yet.
        let tmpGeometry = new THREE.Geometry();
        let pxTmpGeometry = new THREE.Geometry().fromBufferGeometry(pxGeometry);
        let nxTmpGeometry = new THREE.Geometry().fromBufferGeometry(nxGeometry);
        let pyTmpGeometry = new THREE.Geometry().fromBufferGeometry(pyGeometry);
        let pzTmpGeometry = new THREE.Geometry().fromBufferGeometry(pzGeometry);
        let nzTmpGeometry = new THREE.Geometry().fromBufferGeometry(nzGeometry);

        for (let z = 0; z < worldDepth; z++) {

            for (let x = 0; x < worldWidth; x++) {

                let h = this.getY(x, z);

                matrix.makeTranslation(
                    x * 100 - worldHalfWidth * 100,
                    h * 100,
                    z * 100 - worldHalfDepth * 100
                );

                let px = this.getY(x + 1, z);
                let nx = this.getY(x - 1, z);
                let pz = this.getY(x, z + 1);
                let nz = this.getY(x, z - 1);

                tmpGeometry.merge(pyTmpGeometry, matrix);

                if ((px !== h && px !== h + 1) || x === 0) {

                    tmpGeometry.merge(pxTmpGeometry, matrix);

                }

                if ((nx !== h && nx !== h + 1) || x === worldWidth - 1) {

                    tmpGeometry.merge(nxTmpGeometry, matrix);

                }

                if ((pz !== h && pz !== h + 1) || z === worldDepth - 1) {

                    tmpGeometry.merge(pzTmpGeometry, matrix);

                }

                if ((nz !== h && nz !== h + 1) || z === 0) {

                    tmpGeometry.merge(nzTmpGeometry, matrix);

                }

            }

        }

        let geometry = new THREE.BufferGeometry().fromGeometry(tmpGeometry);
        geometry.computeBoundingSphere();

        let texture = this.texture;
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.LinearMipMapLinearFilter;
        let mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({map: texture}));
        this.LORD = mesh;
    }

    generateHeight(width, height) {

        let data = [], perlin = new ImprovedNoise(),
            size = width * height, quality = 2, z = -500;

        for (let j = 0; j < 4; j++) {

            if (j == 0) for (let i = 0; i < size; i++) data[i] = 0;

            for (let i = 0; i < size; i++) {

                let x = i % width, y = (i / width) | 0;
                data[i] += perlin.noise(x / quality, y / quality, z) * quality;

            }

            quality *= 4;

        }

        return data;

    }

    getY(x, z) {
        //return 0 ;
        return (this.data[x + z * this.worldWidth] * 0.1) | 0;

    }
}