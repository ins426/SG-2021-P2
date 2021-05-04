import * as THREE from '../libs/three.module.js'
 
class Suelo extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    var w = 80;
    var h = 10;
    var d = 80;

    var boxGeom = new THREE.BoxGeometry (w,h,d);
    boxGeom.translate(0, -1.5*(h/2), 0)
    
    var texture = new THREE.TextureLoader().load('../imgs/sand.jpg');
    this.materialGround = new THREE.MeshPhongMaterial ({map: texture});

    var box = new THREE.Mesh (boxGeom, this.materialGround);
    this.add (box);
  }
}

export { Suelo }