import * as THREE from "../libs/three.module.js"
import { MTLLoader } from "../libs/MTLLoader.js"
import { OBJLoader } from "../libs/OBJLoader.js"
import { Loro } from './Loro/loro.js'
class Parrot extends THREE.Object3D {
    constructor(skin){
        super();

        this.radio_colision = 0.7;
        // var that = this;
        // var materialLoader = new MTLLoader();
        // var objectloader = new OBJLoader();

        // materialLoader.load('../models/Cat/12221_Cat_v1_l3.mtl',
        //     function(materials) {
        //         objectloader.setMaterials(materials);
        //         objectloader.load ('../models/Cat/12221_Cat_v1_l3.obj',
        //             function(object) {
        //                 that.modelo = object;
        //                 that.modelo.scale.set(0.05, 0.05, 0.05);
        //                 that.modelo.rotateX(-Math.PI/2);
        //                 that.modelo.receiveShadow = true;
        //                 that.add (that.modelo);
        //             }, null, null);
        // });

        this.loro = new Loro(skin);
        this.loro.rotation.z = Math.PI/2;
        this.loro.rotation.x = Math.PI/1.2;
        this.loro.rotation.y = -Math.PI/2;
        this.loro.scale.set(0.5, 0.5, 0.5);
        this.add(this.loro);

        this.camaraGatuna = this.crearCamara();
        this.add(this.camaraGatuna);

        let esfera_colisiones = new THREE.SphereBufferGeometry(this.radio_colision);
        this.esfera_colisiones_mesh = new THREE.Mesh(esfera_colisiones, new THREE.MeshPhongMaterial({transparent: true, opacity: 0}));
        this.add(this.esfera_colisiones_mesh);
    }

    crearCamara(){
        var camara = new THREE.Object3D();
        this.camara = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

        this.camara.position.z = 10
        camara.rotateY(Math.PI)
        camara.add(this.camara);

        return camara;
    }

    movimiento(x,y){
        this.esfera_colisiones_mesh.position.x = -x
        this.esfera_colisiones_mesh.position.y = y
        this.loro.position.x = -x
        this.loro.position.y = y
    }

    getPosicionLocal(){
        return this.loro.position;
    }

    update(){
       this.loro.update(); 
    }
}

export { Parrot }