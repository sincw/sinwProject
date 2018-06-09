import {Resources} from './Resources.js';
import {BlockFactory} from './factories/BlockFactory.js';

export class FactoryProducer {

    static getInstance() {
        if (!FactoryProducer.instance) {
            FactoryProducer.instance = new FactoryProducer();
        }
        return FactoryProducer.instance;
    }

    constructor() {

    }

    getFactory(factoty) {
        switch (factoty) {
            case Resources.Factory.BLOCK: return BlockFactory.getInstance();
            default : return null;
        }
    }
}