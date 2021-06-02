import * as THREE from '../libs/three.module.js'

class Pico extends THREE.Object3D {
    constructor() {
      super();

        var pico = this.crearPico();
        pico.position.set(0,0.4,0);

        this.add(pico)
    }

    crearPico(){
        var boxGeom = new THREE.BoxBufferGeometry(0.8,0.8,0.6);
        var boxMat =  new THREE.MeshPhongMaterial({color: 0x000000});

        var pico = new THREE.Mesh(boxGeom,boxMat);

        return pico
    }
}
export { Pico };