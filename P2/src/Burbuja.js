import * as THREE from "../libs/three.module.js"

class Burbuja extends THREE.Object3D {
    constructor(){
        super();

        // var n_burbujas = 600;
        // for(var i = 0; i < n_burbujas; i++){
            let radio = Math.floor(Math.random()*(0.01-0.0001+1)+0.0001)
            this.burbuja = new THREE.Mesh(
                new THREE.SphereBufferGeometry(radio,32,32),
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