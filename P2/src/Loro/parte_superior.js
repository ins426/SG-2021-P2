import * as THREE from '../../libs/three.module.js'

import { Cuello } from './cuello.js'
import { CabezaPico } from './cabeza_pico.js'

class ParteSuperior extends THREE.Object3D {
    constructor(skin) {
        super();

        var cuello = new Cuello(skin);
        var cabeza = new CabezaPico(skin);
        cabeza.position.set(0.4,0,0);

        this.add(cuello);
        this.add(cabeza);
    }


    update(){

    }
}
export { ParteSuperior };