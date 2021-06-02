import * as THREE from '../libs/three.module.js'

class Ala extends THREE.Object3D {
    constructor() {
      super();

      var ala = this.crearAla();

      this.add(ala);
    }

    crearAla(){
        var boxGeom = new THREE.BoxBufferGeometry(1.3,2,0.2);
        boxGeom.translate(0,-1,0)
        var boxMat = new THREE.MeshPhongMaterial({color: 0xCF0000});

        var ala =  new THREE.Mesh(boxGeom,boxMat);

        return ala;
    }
}

export { Ala };