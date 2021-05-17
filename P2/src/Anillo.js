import * as THREE from "../libs/three.module.js"

class Anillo extends THREE.Object3D {
    constructor(){
        super();
        this.radio = 2

        let geom = new THREE.TorusBufferGeometry(this.radio, 0.2, 32, 32);
        let mat = new THREE.MeshNormalMaterial();
        this.anillo_mesh = new THREE.Mesh(geom, mat);
        this.add(this.anillo_mesh);

        let esfera_geom = new THREE.SphereBufferGeometry(this.radio/2);
        this.esfera_mesh = new THREE.Mesh(esfera_geom, mat);
        this.add(this.esfera_mesh);
    }
}

export { Anillo }