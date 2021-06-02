import * as THREE from '../libs/three.module.js'
import { Pie } from './pie.js'
import { Cuerpo } from './cuerpo.js'

class CuerpoPies extends THREE.Object3D {
    constructor() {
      super();

      var cuerpo = new Cuerpo();
      var pie1 = new Pie();
      var pie2 = new Pie();

      pie1.position.set(0,-2,0.15);
      pie2.position.set(0,-2,-0.15);

      this.add(cuerpo);
      this.add(pie1)
      this.add(pie2)
    }

    update(){

    }
}
export { CuerpoPies };