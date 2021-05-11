import * as THREE from "../libs/three.module.js"
import { Anillo } from './Anillo.js'

class Recorrido extends THREE.Object3D {
    constructor(){
        super();

        /*this.recorrido = [new THREE.Vector3(0,0,10),new THREE.Vector3(0,0,5),new THREE.Vector3(0,2,1),new THREE.Vector3(0,0,0),
                        new THREE.Vector3(3,3,3)];*/

        this.recorrido = []
        let i;
        let n_puntos = 50;
        for(i = 0; i < n_puntos; ++i){
            let x = Math.floor(Math.random() * (60-(-60)+1)-60);
            let y = Math.floor(Math.random() * (30-(10)+1)+10);
            let z = Math.floor(Math.random() * (60-(-60)+1)-60);
            let vector = new THREE.Vector3(x,y,z);
            this.recorrido.push(vector);
        }

        /*let factor = 7
        this.recorrido.forEach(function(item){
            item.x = item.x * factor;
            item.y = item.y * factor;
            item.z = item.z * factor;
        })*/

        this.curva = new THREE.CatmullRomCurve3(this.recorrido, true);
        var puntos = this.curva.getPoints( 600 ); 
        var geometria = new THREE.BufferGeometry().setFromPoints( puntos );
        
        var camino = new THREE.Line(geometria, new THREE.LineBasicMaterial);

        this.generarAnillos();

        this.add(camino);
    }

    getPointAt(t){
       var r = this.curva.getPointAt(t);
       return r;
    }

    getTangentAt(t){
        return this.curva.getTangentAt(t);
    }

    generarAnillos(){
        for(var i = 0; i < 20; ++i){
            let t = Math.random();
            let posicion = this.curva.getPointAt(t);

            let pos_offset = new THREE.Vector3(Math.floor(
                Math.random() * (5-(-5)+1)-5,
                Math.random() * (5-(5)+1)+5,
                Math.random() * (5-(-5)+1)-5
            ));

            posicion.add(pos_offset);
            let anillo = new Anillo();
            anillo.position.copy(posicion);


            this.add(anillo);
        }

    }
}

export { Recorrido }