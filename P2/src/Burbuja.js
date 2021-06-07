import * as THREE from "../libs/three.module.js"

class Burbuja extends THREE.Object3D {
    constructor(textureCube){
        super();

        var material = new THREE.MeshLambertMaterial({color: 0xffffff, envMap: textureCube, transparent: true,
            emissive: 0xffffff, emissiveIntensity: 0.8});
        material.envMap.mapping = THREE.CubeRefractionMapping;
        material.refractionRatio = 0.85;

        this.factor_escalado = Math.floor(Math.random()*(10-3+1)+3)
        this.burbuja = new THREE.Mesh(
            new THREE.SphereBufferGeometry(0.1,32,32), material);

        this.burbuja.position.set(Math.floor(Math.random()*(80-(-80)+1)-80),
                            Math.floor(Math.random()*(50-5+1)-5),
                            Math.floor(Math.random()*(80-(-80)+1)-80));

        this.burbuja.scale.set(this.factor_escalado, this.factor_escalado, this.factor_escalado);
        this.add(this.burbuja)
    }

    modificarOpacidad(opacidad){
        this.burbuja.material.opacity = opacidad;
    }

    getPosicionLocal(){
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
}
export { Burbuja }