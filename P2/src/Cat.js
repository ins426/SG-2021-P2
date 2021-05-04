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

    transformaciones() {
        this.scale.set(5, 5, 5);
        this.rotation.set(0, Math.PI, 0);
        this.position.set(-15, 0, 0);
    }
}

export { Cat }