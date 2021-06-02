import * as THREE from '../libs/three.module.js'
import {ThreeBSP} from "../libs/ThreeBSP.js"

class Pie extends THREE.Object3D {
  constructor() {
    super();

    var pie = this.crearPie();
    pie.position.set(0,-0.4,0);
    this.add(pie);
  }

  crearPie(){
    var box1Geom = new THREE.BoxGeometry(0.3,0.8,0.1);
    var box2Geom = new THREE.BoxGeometry(0.1,1,0.1);
    box2Geom.translate(0.1,0.4,0);

    var mat = new THREE.MeshPhongMaterial({color: 0xfdddca});

    var pie_cubo = new ThreeBSP(box1Geom);
    var hueco_pie = new ThreeBSP(box2Geom);

    var resultado_final = pie_cubo.subtract( hueco_pie);
    
    var geometry_resultado = resultado_final.toGeometry();
    var bufferGeometry_resultado = new THREE.BufferGeometry().fromGeometry(geometry_resultado);

    var pie = new THREE.Mesh(bufferGeometry_resultado,mat);

    return pie;
  }

  update(){

  }
}
export { Pie };