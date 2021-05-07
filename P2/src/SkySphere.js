import * as THREE from "../libs/three.module.js"
import { MTLLoader } from "../libs/MTLLoader.js"
import { OBJLoader } from "../libs/OBJLoader.js"

class SkySphere extends THREE.Object3D {
    constructor(){
        super();

        // this.cargarTextura();
        // var texture = new THREE.TextureLoader().load('../imgs/mar.jpg');
        // this.materialGround = new THREE.MeshPhongMaterial ({map: texture, side: THREE.BackSide});
        var texture = new THREE.TextureLoader().load('../imgs/mar3.jpg');
        var bumps = new THREE.TextureLoader().load('../imgs/marBump.png');

        this.materialSea = new THREE.MeshPhongMaterial ({map: texture, bumpMap: bumps, side: THREE.BackSide});

        var mundoGeometry = new THREE.SphereBufferGeometry(100,32,32);
        

        var mundo = new THREE.Mesh(mundoGeometry,this.materialSea);
        mundo.rotation.set(Math.PI, -Math.PI/2, 0)

        this.add(mundo);
    }

    cargarTextura(){
        
    }
}
export { SkySphere }