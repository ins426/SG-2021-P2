import * as THREE from "../libs/three.module.js"
import { Burbuja } from './Burbuja.js'

class BurbujasGestor extends THREE.Object3D {
    constructor(textureCube){
        super();
        this.textureCube = textureCube;
        this.buffer = [];
    }

    getBurbuja(){
        if(this.buffer.length){
            return this.buffer.pop();
        }else{
            return new Burbuja(this.textureCube);
        }
    }

    recibirBurbuja(burbuja){
        this.buffer.push(burbuja);
    }
}
export { BurbujasGestor }