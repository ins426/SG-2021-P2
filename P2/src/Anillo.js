import * as THREE from "../libs/three.module.js"

class Anillo extends THREE.Object3D {
    constructor(radio){
        super();
        
        this.bonificacion_velocidad = 0;
        this.puntuacion = 0;
        this.radio = radio;
        this.radio_colision = this.radio/1.5;
        this.mat = new THREE.MeshNormalMaterial();
        this.matSphere = new THREE.MeshPhongMaterial({transparent: true,opacity:0});

        this.geom = new THREE.TorusBufferGeometry(this.radio, 0.2, 32, 32);
        this.anillo_mesh = new THREE.Mesh(this.geom, this.mat);
        this.anillo_mesh.receiveShadow = true;

        this.esfera_geom = new THREE.SphereBufferGeometry(this.radio_colision);
        this.esfera_mesh = new THREE.Mesh(this.esfera_geom, this.matSphere);
    }
}

export { Anillo }