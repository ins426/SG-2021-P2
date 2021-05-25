import { MyScene } from './MyScene.js'
import { Jugador } from './Jugador.js'

class Juego{
    constructor(myCanvas, njugadores){
        this.escena = new MyScene(myCanvas);
        this.jugadores = [];
        for (var i = 0; i < njugadores; ++i)
            this.jugadores.push(new Jugador());

        this.iniciarKeyLogger();
    }

    empezarJuego(){
        document.getElementById("menu").style.display = "none";
        document.getElementById("puntuacion-contenedor").style.display = "block";
        this.escena.juegoIniciado = true;
    }

    update(){
        this.escena.update();
    }

    iniciarKeyLogger(){
        var that = this
    
        document.addEventListener('keydown', function(event) {
          if (event.key == "ArrowUp")
            that.escena.setUpStatus(true);
            
          if (event.key == "ArrowLeft")
            that.escena.setLeftStatus(true);

          
          if (event.key == "ArrowDown")
            that.escena.setDownStatus(true);

            
          if (event.key == "ArrowRight")
            that.escena.setRightStatus(true);
        });
    
        document.addEventListener('keyup', function(event) {
            if (event.key == "ArrowUp")
              that.escena.setUpStatus(false);
              
            if (event.key == "ArrowLeft")
              that.escena.setLeftStatus(false);
  
            
            if (event.key == "ArrowDown")
              that.escena.setDownStatus(false);
  
              
            if (event.key == "ArrowRight")
              that.escena.setRightStatus(false);
          });
    }

    onWindowResize(){
        this.escena.onWindowResize();
    }
}

$(function () {
    var juego = new Juego("#WebGL-output");
    document.getElementById("boton-empezar").onclick = function Start (){
      juego.empezarJuego();
    }

    window.addEventListener ("resize", () => juego.onWindowResize());
    juego.update();
  });