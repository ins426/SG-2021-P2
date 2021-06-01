import { Anillo } from './Anillo.js'
import * as THREE from "../libs/three.module.js"

class Anillo1 extends Anillo {
    constructor(radio){
        super(radio);
        this.puntuacion = 1;
        this.anillo_mesh.material = new THREE.MeshPhongMaterial({color: 0X750000});
        
        this.add(this.anillo_mesh);
        this.add(this.esfera_mesh)
    }
}


export { Anillo1 }