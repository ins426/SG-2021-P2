import { Temporizador } from './Temporizador.js'

class Jugador {
    constructor(nombre_jugador = "Default"){
        this.nombre = nombre_jugador;
        this.vx = 0.1;
        this.vy = 0.1;
        this.puntuacion = 0;
        this.temporizador = new Temporizador();
        this.ultima_colision = -1;
    }

    setVelocidad(vx,vy){
        this.vx = vx
        this.vy = vy
    }

    sumaPuntuacion(p){
        this.puntuacion += p

        return this.puntuacion;
    }
}

export { Jugador };