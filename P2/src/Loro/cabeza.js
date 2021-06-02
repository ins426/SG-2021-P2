import * as THREE from '../../libs/three.module.js'
import { Craneo } from './craneo.js'
import { Cara } from './cara.js'

class Cabeza extends THREE.Object3D {
    constructor() {
      super();

      var craneo = new Craneo()
      var cara =  new Cara()
      cara.position.set(0.05,0.4,0);


      this.add(craneo)
      this.add(cara)
    }

    update(){

    }
}
export { Cabeza };