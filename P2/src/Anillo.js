import * as THREE from "../libs/three.module.js"

class Anillo extends THREE.Object3D {
    constructor(){
        super();

        let geom = new THREE.TorusBufferGeometry(2, 0.2, 32, 32);
        let mat = new THREE.MeshNormalMaterial();
        this.anillo_mesh = new THREE.Mesh(geom, mat);
        this.add(this.anillo_mesh);
    }
}

export { Anillo }