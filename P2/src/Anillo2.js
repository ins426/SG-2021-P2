import { Anillo } from './Anillo.js'
import * as THREE from "../libs/three.module.js"

class Anillo2 extends Anillo {
    constructor(radio){
        super(radio);
        this.puntuacion = 3;
        this.anillo_mesh.material = new THREE.MeshPhongMaterial({color: 0xffff00});
        
        this.add(this.anillo_mesh);
        this.add(this.esfera_mesh)
    }
}

export { Anillo2 }