import * as THREE from "../libs/three.module.js"
import { MTLLoader } from "../libs/MTLLoader.js"
import { OBJLoader } from "../libs/OBJLoader.js"

class Cat extends THREE.Object3D {
    constructor(){
        super();

        var that = this;
        var materialLoader = new MTLLoader();
        var objectloader = new OBJLoader();

        materialLoader.load('../models/Cat/12221_Cat_v1_l3.mtl',
            function(materials) {
                objectloader.setMaterials(materials);
                objectloader.load ('../models/Cat/12221_Cat_v1_l3.obj',
                    function(object) {
                        var modelo = object;
                        that.add (modelo);
                    }, null, null);
        })

        this.scale.set(0.05, 0.05, 0.05);
        this.rotation.x = -Math.PI/2;
    }

    movimiento(direccion){
        if (direccion == "ArrowUp")
            this.position.y += 0.1
    
        if (direccion == "ArrowLeft")
            this.position.x -= 0.1
    
        if (direccion == "ArrowDown")
            this.position.y -= 0.1
    
        if (direccion == "ArrowRight")
            this.position.x += 0.1
      }
}

export { Cat }