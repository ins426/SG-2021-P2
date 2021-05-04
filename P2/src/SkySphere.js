import * as THREE from "../libs/three.module.js"
import { MTLLoader } from "../libs/MTLLoader.js"
import { OBJLoader } from "../libs/OBJLoader.js"

class SkySphere extends THREE.Object3D {
    constructor(){
        super();

       // this.cargarTextura();
       var texture = new THREE.TextureLoader().load('../imgs/mar.jpg');
       this.materialGround = new THREE.MeshPhongMaterial ({map: texture, side: THREE.BackSide});

        var mundoGeometry = new THREE.SphereBufferGeometry(40,32,32);
        //var mundoMaterial = new THREE.MeshNormalMaterial({map: material, side: THREE.BackSide});

        

        var mundo = new THREE.Mesh(mundoGeometry,this.materialGround);

        this.add(mundo);
    }

    cargarTextura(){
        
    }
}
export { SkySphere }