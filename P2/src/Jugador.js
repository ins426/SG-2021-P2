import { Temporizador } from './Temporizador.js'

class Jugador {
    constructor(nombre_jugador = "Default"){
        this.nombre = nombre_jugador;
        this.vx = 0.1;
        this.vy = 0.1;
        this.x_offset = 0;
        this.y_offset = 0;
        this.puntuacion = 0;
        this.temporizador = new Temporizador();
        this.ultima_colision = -1;
        this.indice_personaje = -1;
        this.temporizador_activado = false;
        this.keysStatus = {up: false, down: false, left: false, right: false};
    }

    setVelocidad(vx,vy){
        this.vx = vx
        this.vy = vy
    }

    sumaPuntuacion(p){
        this.puntuacion += p

        return this.puntuacion;
    }

    setPuntuacion(p){
        this.puntuacion = p
    }
}

export { Jugador };