import * as THREE from "../libs/three.module.js"
import { MTLLoader } from "../libs/MTLLoader.js"
import { OBJLoader } from "../libs/OBJLoader.js"

class Burbujas extends THREE.Object3D {
    constructor(){
        super();

        var n_burbujas = 600;
        for(var i = 0; i < n_burbujas; i++){
            var burbuja = new THREE.Mesh(
                new THREE.SphereBufferGeometry(0.5,32,32),
                new THREE.MeshPhongMaterial({transparent: true,opacity:0.4})
            )
            burbuja.position.set(Math.floor(Math.random()*(100-(-100)+1)-100),
                                Math.floor(Math.random()*(100-5+1)-5),
                                Math.floor(Math.random()*(100-(-100)+1)-100));

            this.add(burbuja)
        }
    }
}
export { Burbujas }