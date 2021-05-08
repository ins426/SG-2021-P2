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
                        modelo.scale.set(0.05, 0.05, 0.05);
                        modelo.rotateX(-Math.PI/2);
                        that.add (modelo);
                    }, null, null);
        })

        this.camaraGatuna = this.crearCamara();
        this.add(this.camaraGatuna);
    }

    crearCamara(){
        var camara = new THREE.Object3D();
        this.camara = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        
        this.camara.position.z = 10
        camara.rotateY(Math.PI)
        camara.add(this.camara);

        return camara;
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