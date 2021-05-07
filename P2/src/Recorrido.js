import * as THREE from "../libs/three.module.js"
import { MTLLoader } from "../libs/MTLLoader.js"
import { OBJLoader } from "../libs/OBJLoader.js"

// 0 0 10
// 0 0 5
// 0 2 1
// 0 0 0
// 3 3 3

class Recorrido extends THREE.Object3D {
    constructor(){
        super();

        this.recorrido = [new THREE.Vector3(0,0,10),new THREE.Vector3(0,0,5),new THREE.Vector3(0,2,1),new THREE.Vector3(0,0,0),
                        new THREE.Vector3(3,3,3)];

        let factor = 7
        this.recorrido.forEach(function(item){
            item.x = item.x * factor;
            item.y = item.y * factor;
            item.z = item.z * factor;
        })

        this.curva = new THREE.CatmullRomCurve3(this.recorrido, true);
        var puntos = this.curva.getPoints( 50 ); 
        var geometria = new THREE.BufferGeometry().setFromPoints( puntos );
        
        var camino = new THREE.Line(geometria, new THREE.LineBasicMaterial);

        this.add(camino);
    }

    getPointAt(t){
       var r = this.curva.getPointAt(t);
       return r;
    }

    getTangentAt(t){
        return this.curva.getTangentAt(t);
    }
}

export { Recorrido }