import * as THREE from '../../libs/three.module.js'

class Cuello extends THREE.Object3D {
    constructor() {
        super();

        var cuello = this.crearCuello();

        this.add(cuello);
    }

    update(){

    }

    crearCuello(){
        var mat = new THREE.MeshPhongMaterial({color: 0xCF0000});

        var box1Geom = new THREE.BoxBufferGeometry(1,0.2,0.3)
        var box2Geom = new THREE.BoxBufferGeometry(1,0.2,0.3)
        box1Geom.translate(0,0.1,0.3);
        box2Geom.translate(0,0.1,-0.3);
        var box1 = new THREE.Mesh(box1Geom,mat)
        var box2 = new THREE.Mesh(box2Geom,mat)

        var box3Geom = new THREE.BoxBufferGeometry(0.4,0.2,0.6)
        box3Geom.translate(0.6,0.1,0)
        var box4Geom = new THREE.BoxBufferGeometry(0.4,0.2,0.6)
        box4Geom.translate(-0.6,0.1,0)

        var box3 = new THREE.Mesh(box3Geom,mat)
        var box4 = new THREE.Mesh(box4Geom,mat)

        var cuello = new THREE.Object3D()
        cuello.add(box1);
        cuello.add(box2);
        cuello.add(box3);
        cuello.add(box4)

        return cuello;
    }
}
export { Cuello };