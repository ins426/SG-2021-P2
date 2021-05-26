import { MyScene } from './MyScene.js'
import { Jugador } from './Jugador.js'

class Juego{
    constructor(myCanvas){
        this.jugadores = [];
        this.n_jugadores = 2;
        for (var i = 0; i < this.n_jugadores; ++i)
            this.jugadores.push(new Jugador());

        this.escena = new MyScene(myCanvas, this.jugadores);

        //AUDIO
        this.audio_menu = document.getElementById("sonido-menu");
        this.audio_menu.play();
    }

    empezarJuego(){
        document.getElementById("menu").style.display = "none";
        for (let i = 0; i < this.n_jugadores; i++)
            document.getElementsByClassName("puntuacion-contenedor")[i].style.display = "block";

        this.audio_menu.pause();
        this.escena.juegoIniciado = true;
    }

    update(){
        this.escena.update();
    }

    iniciarKeyLogger(){
        var that = this
    
        document.addEventListener('keydown', function(event) {
          //  Controles jugador 0
          if (event.key == "ArrowUp") that.escena.setUpStatus(true, 0);
          if (event.key == "ArrowLeft") that.escena.setLeftStatus(true, 0);       
          if (event.key == "ArrowDown") that.escena.setDownStatus(true, 0);
          if (event.key == "ArrowRight") that.escena.setRightStatus(true, 0);

          //  Controles jugador 1
          if (that.n_jugadores == 2){
            if (event.key == "w") that.escena.setUpStatus(true, 1);
            if (event.key == "a") that.escena.setLeftStatus(true, 1);       
            if (event.key == "s") that.escena.setDownStatus(true, 1);
            if (event.key == "d") that.escena.setRightStatus(true, 1);
          }
        });

        document.addEventListener('keyup', function(event) {
            if (event.key == "ArrowUp") that.escena.setUpStatus(false, 0);
            if (event.key == "ArrowLeft") that.escena.setLeftStatus(false, 0);
            if (event.key == "ArrowDown") that.escena.setDownStatus(false, 0);           
            if (event.key == "ArrowRight")that.escena.setRightStatus(false, 0);

            if (that.n_jugadores == 2){
                if (event.key == "w") that.escena.setUpStatus(false, 1);
                if (event.key == "a") that.escena.setLeftStatus(false, 1);
                if (event.key == "s") that.escena.setDownStatus(false, 1);           
                if (event.key == "d")that.escena.setRightStatus(false, 1);
            }
        });
    }

    onWindowResize(){
        this.escena.onWindowResize();
    }

    removePlayer(){
        if (this.n_jugadores > 0){
            this.jugadores.pop();
            this.escena.remove(this.escena.personajes[this.escena.personajes.length - 1]);
            this.escena.personajes.pop();
            this.n_jugadores--;
        }
    }

    colocarJugadores(){
        let separacion = 1;
        this.jugadores[0].x_offset = separacion;
        this.jugadores[1].x_offset = -separacion;
    }
}

$(function () {
    var juego = new Juego("#WebGL-output", 2);
    document.getElementById("singleplayer_btn").onclick = function Start (){
        juego.removePlayer();
        juego.iniciarKeyLogger();
        juego.empezarJuego();
    }

    document.getElementById("multiplayer_btn").onclick = function Start (){
        juego.colocarJugadores();
        juego.iniciarKeyLogger();
        juego.empezarJuego();
    }

    window.addEventListener ("resize", () => juego.onWindowResize());
    juego.update();
  });