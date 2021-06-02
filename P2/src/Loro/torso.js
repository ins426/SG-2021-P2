import * as THREE from '../../libs/three.module.js'

class Torso extends THREE.Object3D {
    constructor(skin) {
      super();

      this.materiales = {0: 0x00FF00, 1:0xCF0000}
      this.skin = skin;

      var torso = this.crearTorso();

      this.add(torso);
    }

    crearTorso(){
        var boxGeom = new THREE.BoxBufferGeometry(1.3,2,0.6);
        boxGeom.translate(0,-1,0)
        var boxMat = new THREE.MeshPhongMaterial({color:this.materiales[this.skin]});

        var torso =  new THREE.Mesh(boxGeom,boxMat);

        return torso;
    }
}

export { Torso };