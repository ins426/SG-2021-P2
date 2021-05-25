import { MyScene } from './MyScene.js'
import { Jugador } from './Jugador.js'

class Juego{
    constructor(myCanvas, njugadores){
        this.jugadores = [];
        for (var i = 0; i < njugadores; ++i)
            this.jugadores.push(new Jugador());

        this.escena = new MyScene(myCanvas, this.jugadores);
        this.iniciarKeyLogger();
    }

    empezarJuego(){
        document.getElementById("boton-empezar").style.display = "none";
        document.getElementById("puntuacion-contenedor").style.display = "block"; 
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
          if (event.key == "w") that.escena.setUpStatus(true, 1);
          if (event.key == "a") that.escena.setLeftStatus(true, 1);       
          if (event.key == "s") that.escena.setDownStatus(true, 1);
          if (event.key == "d") that.escena.setRightStatus(true, 1);
        });

        document.addEventListener('keyup', function(event) {
            if (event.key == "ArrowUp") that.escena.setUpStatus(false, 0);
            if (event.key == "ArrowLeft") that.escena.setLeftStatus(false, 0);
            if (event.key == "ArrowDown") that.escena.setDownStatus(false, 0);           
            if (event.key == "ArrowRight")that.escena.setRightStatus(false, 0);

            if (event.key == "w") that.escena.setUpStatus(false, 1);
            if (event.key == "a") that.escena.setLeftStatus(false, 1);
            if (event.key == "s") that.escena.setDownStatus(false, 1);           
            if (event.key == "d")that.escena.setRightStatus(false, 1);
        });
    }

    onWindowResize(){
        this.escena.onWindowResize();
    }
}

$(function () {
    var juego = new Juego("#WebGL-output", 2);
    document.getElementById("boton-empezar").onclick = function Start (){
      juego.empezarJuego();
    }
  
    window.addEventListener ("resize", () => juego.onWindowResize());
    juego.update();
  });