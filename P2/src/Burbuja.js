import * as THREE from "../libs/three.module.js"

class Burbuja extends THREE.Object3D {
    constructor(textureCube){
        super();

        var material = new THREE.MeshBasicMaterial({color: 0xffffff, envMap: textureCube, transparent: true});
        material.envMap.mapping = THREE.CubeRefractionMapping;
        material.refractionRatio = 0.85;

        this.radio = Math.floor(Math.random()*(10-3+1)+3)
        this.burbuja = new THREE.Mesh(
            new THREE.SphereBufferGeometry(0.1,32,32), material);

        this.burbuja.position.set(Math.floor(Math.random()*(80-(-80)+1)-80),
                            Math.floor(Math.random()*(50-5+1)-5),
                            Math.floor(Math.random()*(80-(-80)+1)-80));

        this.burbuja.scale.set(this.radio, this.radio, this.radio);
        this.add(this.burbuja)
    }

    modificarOpacidad(opacidad){
        this.burbuja.material.opacity = opacidad;
    }

    getPosicion(){
        return this.burbuja.position;
    }

    animarBurbuja(x,y,z){
        this.burbuja.position.x += x
        this.burbuja.position.y += y
        this.burbuja.position.z += z
    }

    setPosicion(x,y,z){
        this.burbuja.position.x = x
        this.burbuja.position.y = y
        this.burbuja.position.z = z
    }

    getRadio(){
        return this.radio;
    }
}
export { Burbuja }