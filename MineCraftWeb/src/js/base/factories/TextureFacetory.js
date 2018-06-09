
export class TextureFacetory {

    static getInstance() {
        if (!TextureFacetory.instance) {
            TextureFacetory.instance = new TextureFacetory();
        }
        return TextureFacetory.instance;
    }

    constructor() {
        this.Loader  = new THREE.TextureLoader();
    }

    getTexture(name) {
        let img = require('../../../asset/textures/default/blocks/' + name + '.png');
        let texture = new THREE.TextureLoader().load(img);
        return texture;
    }
}