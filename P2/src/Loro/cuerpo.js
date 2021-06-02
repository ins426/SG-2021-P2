import * as THREE from '../libs/three.module.js'
import { ParteSuperior } from './parte_superior.js'
import { Torso } from './torso.js'

class Cuerpo extends THREE.Object3D {
    constructor() {
      super();
        var parte_superior = new ParteSuperior();
        var torso = new Torso();

        this.add(parte_superior);
        this.add(torso);
    }

    update(){

    }
}
export { Cuerpo };