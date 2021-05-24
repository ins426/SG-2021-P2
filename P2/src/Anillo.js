import * as THREE from "../libs/three.module.js"

class Anillo extends THREE.Object3D {
    constructor(radio){
        super();
        
        this.puntuacion = 0;
        this.radio = radio;
        this.mat = new THREE.MeshNormalMaterial();

        this.geom = new THREE.TorusBufferGeometry(this.radio, 0.2, 32, 32);
        this.anillo_mesh = new THREE.Mesh(this.geom, this.mat);

        this.esfera_geom = new THREE.SphereBufferGeometry(this.radio/2);
        this.esfera_mesh = new THREE.Mesh(this.esfera_geom, this.mat);
    }
}

export { Anillo }