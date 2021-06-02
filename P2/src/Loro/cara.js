import * as THREE from '../../libs/three.module.js'

class Cara extends THREE.Object3D {
    constructor() {
      super();

      var retina = this.crearRetina();
      retina.position.set(0,0.6,0);
      var pupila1 = this.crearPupila();
      pupila1.position.set(0,0.6,0.30)
      var pupila2 = this.crearPupila();
      pupila2.position.set(0,0.6,-0.30)
      var mejilla = this.crearMejilla();
      mejilla.position.set(0,0.2,0);

      this.add(retina);
      this.add(mejilla);
      this.add(pupila1)
      this.add(pupila2)

    }

    crearRetina(){
        var box = new THREE.BoxBufferGeometry(0.4,0.4,0.6);
        var boxMat =  new THREE.MeshPhongMaterial({color: 0xFFFFFF});
        
        var retina = new THREE.Mesh(box,boxMat);

        return retina;
    }

    crearPupila(){
        var cylinder = new THREE.CylinderBufferGeometry(0.1,0.1,0.01,24);
        var cylinderMat =  new THREE.MeshPhongMaterial({color: 0x000000});
        
        var pupila = new THREE.Mesh(cylinder,cylinderMat);

        pupila.rotateX(Math.PI/2);

        return pupila;
    }
    
    crearMejilla(){
        var box = new THREE.BoxBufferGeometry(0.4,0.4,0.6);
        var boxMat =  new THREE.MeshPhongMaterial({color: 0xfdddca});
        
        var mejilla = new THREE.Mesh(box,boxMat);

        return mejilla; 
    }

    update(){

    }
}

export { Cara };