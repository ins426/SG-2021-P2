import { Burbuja } from './Burbuja.js'

class BurbujasGestor{
    constructor(textureCube){
        this.textureCube = textureCube;
        this.buffer = [];
    }

    getBurbuja(){
        if(this.buffer.length > 0){
            return this.buffer.pop();
        }else{
            return new Burbuja(this.textureCube);
        }
    }

    recibirBurbuja(burbuja){
        burbuja.setPosicion(burbuja.getPosicionLocal().x,Math.floor(Math.random()*((-10)-20+1)-20),
        burbuja.getPosicionLocal().z);

        this.buffer.push(burbuja);
    }

    getTamanioBuffer(){
        return this.buffer.length;
    }
}
export { BurbujasGestor }