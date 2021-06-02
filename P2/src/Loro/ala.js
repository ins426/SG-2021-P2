import * as THREE from '../../libs/three.module.js'

class Ala extends THREE.Object3D {
    constructor(skin) {
      super();

      this.materiales = {0: 0x00FF00, 1:0xCF0000}
      this.skin = skin;
      var ala = this.crearAla();

      this.add(ala);
    }

    crearAla(){
        var boxGeom = new THREE.BoxBufferGeometry(1.3,2,0.2);
        boxGeom.translate(0,-1,0)
        var boxMat = new THREE.MeshPhongMaterial({color:this.materiales[this.skin]});

        var ala =  new THREE.Mesh(boxGeom,boxMat);

        return ala;
    }
}

export { Ala };