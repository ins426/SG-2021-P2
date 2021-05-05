import * as THREE from '../libs/three.module.js'
 
class Suelo extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    var w = 180;
    var h = 10;
    var d = 180;

    var boxGeom = new THREE.BoxGeometry (w,h,d);
    boxGeom.translate(0, -1.5*(h/2), 0)
    
    var texture = new THREE.TextureLoader().load('../imgs/sand2.jpg');
    var bumps = new THREE.TextureLoader().load('../imgs/sandBump.jpg');
    var normals = new THREE.TextureLoader().load('../imgs/sandNormal.jpg');
    var roughness = new THREE.TextureLoader().load('../imgs/sandRough.jpg');
    var displacement = new THREE.TextureLoader().load('../imgs/sandDisplacement.jpg');
    var ao = new THREE.TextureLoader().load('../imgs/sandAO.jpg');


    this.materialGround = new THREE.MeshStandardMaterial ({map: texture, bumpMap: bumps,
    normalMap: normals, roughnessMap: roughness, displacementMap: displacement, aoMap: ao});

    var box = new THREE.Mesh (boxGeom, this.materialGround);
    this.add (box);
  }
}

export { Suelo }