import { Anillo } from './Anillo.js'
import * as THREE from "../libs/three.module.js"

class Anillo4 extends Anillo {
    constructor(radio){
        super(radio);
        this.puntuacion = -2;
        this.anillo_mesh.material = new THREE.MeshPhongMaterial({color: 0X000000});
        
        this.add(this.anillo_mesh);
        this.add(this.esfera_mesh)
    }
}


export { Anillo4 }