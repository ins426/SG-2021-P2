import { Anillo } from './Anillo.js'
import * as THREE from "../libs/three.module.js"

class Anillo3 extends Anillo {
    constructor(radio){
        super(radio);

        this.bonificacion_velocidad = 1.5;
        this.anillo_mesh.material = new THREE.MeshPhongMaterial({color: 0x00a600});
        
        this.add(this.anillo_mesh);
        this.add(this.esfera_mesh)
    }
}

export { Anillo3 }