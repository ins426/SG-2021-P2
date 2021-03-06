import * as THREE from "../libs/three.module.js"
import { Anillo1 } from './Anillo1.js'
import { Anillo2 } from './Anillo2.js'
import { Anillo3 } from './Anillo3.js'
import { Anillo4 } from './Anillo4.js'
import { Anillo5 } from './Anillo5.js'
import { Meta } from './Meta.js'

class Recorrido extends THREE.Object3D {
    constructor(){
        super();

        /*this.recorrido = [new THREE.Vector3(0,0,10),new THREE.Vector3(0,0,5),new THREE.Vector3(0,2,1),new THREE.Vector3(0,0,0),
                        new THREE.Vector3(3,3,3)];*/

        this.recorrido = []
        let i;
        let n_puntos = 10;
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
        
        //var camino = new THREE.Line(geometria, new THREE.LineBasicMaterial);

        this.generarAnillos();
        //this.add(camino);

        //Línea de meta
        this.meta = new Meta();
        this.meta.position.copy(this.curva.getPointAt(0.01));   // Meta posicionada ligeramente por delante del inicio del juego
        this.add(this.meta);
    }

    getPointAt(t){
       var r = this.curva.getPointAt(t);
       return r;
    }

    getTangentAt(t){
        return this.curva.getTangentAt(t);
    }

    generarAnillos(){
        this.anillos = [];
        var n_anillos = 20;

        for(var i = 0; i < n_anillos; ++i){
            let t = Math.random();
            let posicion = this.curva.getPointAt(t);

            let pos_offset = new THREE.Vector3(Math.floor(
                Math.random() * (5-(-5)+1)-5,
                Math.random() * (5-(5)+1)+5,
                Math.random() * (5-(-5)+1)-5
            ));

            posicion.add(pos_offset);

            var tipo = Math.floor(Math.random() * (5-1+1)+1);
            let radio1 = 4;
            let radio2 = 2;
            let radio3 = 1;
            let radio4 = 2.5;
            let radio5 = 1.5;

            switch (tipo) {
                case 1:
                    var anillo = new Anillo1(radio1);
                    break;
            
                case 2:
                    var anillo = new Anillo2(radio2);
                    break;

                case 3:
                    var anillo = new Anillo3(radio3); 
                    break;

                case 4:
                    var anillo = new Anillo4(radio4); 
                    break;

                case 5:
                    var anillo = new Anillo5(radio5); 
                    break;
            }

            anillo.position.copy(posicion);
            this.anillos.push(anillo);
            this.add(anillo);
        }
    }

    comprobarColisionesAnillos(posicionB, radioB){
        var res = {indice:-1, anillo:null};

        var i;
        for (i = 0; i < this.anillos.length && res['indice'] == -1; ++i){
            
            if(this.anillos[i].position.distanceTo(posicionB) <= (radioB + this.anillos[i].radio_colision)){
                res['indice'] = i
                res['anillo'] = this.anillos[i]
            }
        }      
        return res;
    }
}

export { Recorrido }