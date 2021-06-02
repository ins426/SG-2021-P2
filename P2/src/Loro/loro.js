import * as THREE from '../libs/three.module.js'

import { Ala } from './ala.js'
import { CuerpoPies } from './cuerpo_pies.js'

class Loro extends THREE.Object3D {
    constructor() {
        super();

        this.ala1 = new Ala();
        this.ala2 = new Ala();
        this.ala1.position.set(0,0,0.4);
        this.ala2.position.set(0,0,-0.4);

        var cuerpoPies = new CuerpoPies();

        this.add(cuerpoPies)
        this.add(this.ala1)
        this.add(this.ala2)

        this.incremento_ala1 = -0.05
        this.incremento_ala2 = 0.05
    }

    update(){

        if(this.ala1.rotation.x <= -Math.PI/2){
            this.incremento_ala1 = 0.05
        }
        else{
            if(this.ala1.rotation.x >= 0){
                this.incremento_ala1 = -0.05
            }
        }

        if(this.ala2.rotation.x >= Math.PI/2){
            this.incremento_ala2 = -0.05
        }
        else{
            if(this.ala2.rotation.x <= 0){
                this.incremento_ala2 = 0.05
            }
        }

        this.ala1.rotation.x += this.incremento_ala1;
        this.ala2.rotation.x += this.incremento_ala2;
    }
}
export { Loro };