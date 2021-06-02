import * as THREE from '../../libs/three.module.js'
import {ThreeBSP} from "../../libs/ThreeBSP.js"

class Craneo extends THREE.Object3D {
  constructor() {
    super();

    var craneo = this.crearCraneo();
    craneo.position.set(0,0.8,0)
    this.add(craneo)
  }

  crearCraneo(){
    var box1Geom = new THREE.BoxGeometry(2,1.7,0.6);
    var box2Geom = new THREE.BoxGeometry(2.5,0.8,0.6);
    box2Geom.translate(1.1,0,0);
    var box3Geom = new THREE.BoxGeometry(1,2,0.6)
    box3Geom.translate(0.75,-1,0)
    var boxMat = new THREE.MeshPhongMaterial({color: 0xCF0000});

    var craneo_cubo = new ThreeBSP(box1Geom);
    var hueco_craneo = new ThreeBSP(box2Geom);
    var hueco_barbilla = new ThreeBSP(box3Geom);

    var resultado1 = craneo_cubo.subtract(hueco_craneo);
    var resultado_final = resultado1.subtract(hueco_barbilla);

    var geometry_resultado = resultado_final.toGeometry();
    var bufferGeometry_resultado = new THREE.BufferGeometry().fromGeometry(geometry_resultado);

    var craneo = new THREE.Mesh(bufferGeometry_resultado,boxMat);

    return craneo
  }

  update(){

  }
}

export { Craneo };