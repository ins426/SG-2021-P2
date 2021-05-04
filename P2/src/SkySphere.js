import * as THREE from "../libs/three.module.js"
import { MTLLoader } from "../libs/MTLLoader.js"
import { OBJLoader } from "../libs/OBJLoader.js"

class SkySphere extends THREE.Object3D {
    constructor(){
        super();

       // this.cargarTextura();
       var loader = new THREE.TextureLoader();
       loader.load('../imgs/mar.jpg');
       var material = new THREE.MeshBasicMaterial({map:texture,overdraw:0.5});

        var mundoGeometry = new THREE.SphereBufferGeometry(30,32,32);
        //var mundoMaterial = new THREE.MeshNormalMaterial({map: material, side: THREE.BackSide});

        var texture = new THREE.TextureLoader().load('../imgs/mar.jpg');
        this.materialGround = new THREE.MeshPhongMaterial ({map: texture});

        var mundo = new THREE.Mesh(mundoGeometry,material);

        this.add(mundo);
    }

    cargarTextura(){
        
    }
}
export { SkySphere }