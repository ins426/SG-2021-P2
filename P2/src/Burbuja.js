import * as THREE from "../libs/three.module.js"

class Burbuja extends THREE.Object3D {
    constructor(){
        super();

        // var n_burbujas = 600;
        // for(var i = 0; i < n_burbujas; i++){
            this.burbuja = new THREE.Mesh(
                new THREE.SphereBufferGeometry(0.5,32,32),
                new THREE.MeshPhongMaterial({transparent: true,opacity:0.4})
            )
            this.burbuja.position.set(Math.floor(Math.random()*(100-(-100)+1)-100),
                                Math.floor(Math.random()*(100-5+1)-5),
                                Math.floor(Math.random()*(100-(-100)+1)-100));

             this.add(this.burbuja)
        // }
    }

    modificarOpacidad(opacidad){
        this.burbuja.material.opacity = opacidad;
    }
}
export { Burbuja }