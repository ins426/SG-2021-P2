import { Anillo } from './Anillo.js'
import * as THREE from "../libs/three.module.js"

class Anillo5 extends Anillo {
    constructor(radio){
        super(radio);
        
        this.bonificacion_velocidad = 0.5;
        this.anillo_mesh.material = new THREE.MeshPhongMaterial({color: 0X572364 });
        
        this.add(this.anillo_mesh);
        this.add(this.esfera_mesh)
    }
}


export { Anillo5 }