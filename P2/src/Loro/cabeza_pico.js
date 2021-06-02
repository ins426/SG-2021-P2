import * as THREE from '../libs/three.module.js'
import { Cabeza } from './cabeza.js'
import { Pico } from './pico.js'

class CabezaPico extends THREE.Object3D {
    constructor() {
      super();

      var cabeza = new Cabeza();
      var pico = new Pico();
      pico.position.set(0.65,0.4,0);

      this.add(cabeza);
      this.add(pico);

    }


    update(){

    }
}
export { CabezaPico };