import * as THREE from '../../libs/three.module.js'

import { Cuello } from './cuello.js'
import { CabezaPico } from './cabeza_pico.js'

class ParteSuperior extends THREE.Object3D {
    constructor() {
        super();

        var cuello = new Cuello();
        var cabeza = new CabezaPico();
        cabeza.position.set(0.4,0,0);

        this.add(cuello);
        this.add(cabeza);
    }


    update(){

    }
}
export { ParteSuperior };