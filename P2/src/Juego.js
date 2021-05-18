import { MyScene } from './MyScene.js'

class Juego{
    constructor(myCanvas){
        this.escena = new MyScene(myCanvas);
    }

    empezarJuego(){
        document.getElementById("boton-empezar").style.display = "none";
        document.getElementById("puntuacion-contenedor").style.display = "block"; 
        this.escena.juegoIniciado = true;
    }

    update(){
        this.escena.update();
    }
}

$(function () {
    var juego = new Juego("#WebGL-output");
  
    document.getElementById("boton-empezar").onclick = function Start (){
      juego.empezarJuego();
    }
  
    window.addEventListener ("resize", () => scene.onWindowResize());
    
    juego.update();
  });