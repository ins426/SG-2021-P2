import { MyScene } from './MyScene.js'
import { Jugador } from './Jugador.js'

class Juego{
    constructor(myCanvas){
        this.jugadores = [];
        this.n_jugadores = 2;
        this.jugador1 = new Jugador();
        this.jugador2 = new Jugador();
        
        this.jugadores.push(this.jugador1);
        this.jugadores.push(this.jugador2);
        this.n_vueltas = 1;

        this.escena = new MyScene(myCanvas, this.jugadores, this.n_vueltas);
    }

    setVueltas(n_vueltas){
        this.n_vueltas = parseInt(n_vueltas);
        this.escena.n_vueltas = parseInt(n_vueltas);
    }

    empezarJuego(){
        this.resetJuegoStart();
        this.escena.empezarJuego();
    }

    resetJuegoStart(){
        this.escena.vueltas_recorridas = 0;
        document.getElementById("vuelta").innerHTML = "0";

        document.getElementById("contenedor_vueltas").style.display = "none";
        document.getElementById("menu").style.display = "none";
        document.getElementById("contenedor_logo").style.display = "none";
        document.getElementById("puntuacion-final").style.display = "none";

        //Modificar diseño del contenedor de puntuaciones
        document.getElementById("puntuacion-contenedor").style.display = "block";

        //Reseteo de las puntuaciones
        document.getElementById("puntuacion0").innerHTML = "0";
        document.getElementById("puntuacion1").innerHTML = "0";

        if(this.n_jugadores == 1){
            this.escena.jugadores[0].setPuntuacion(0);
            document.getElementById("jugador1").style.display = "none";
            document.getElementById("jugador1-final").style.display = "none";
            document.getElementById("jugador-ganador").style.display = "none";
        }
        else{
            this.escena.jugadores[0].setPuntuacion(0);
            this.escena.jugadores[1].setPuntuacion(0);
            document.getElementById("jugador-ganador").style.display = "block";
        }
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
            this.personaje = this.escena.personajes.pop();
            this.n_jugadores--;
        }
    }

    colocarJugadores(){
        let separacion = 1;
        if (this.jugadores.length == 2){
            this.jugadores[0].x_offset = separacion;
            this.jugadores[1].x_offset = -separacion;
        }
    }
}

$(function () {
    var juego = new Juego("#WebGL-output");

    /*************************************Botones del menú*********************************************/
    document.getElementById("singleplayer_btn").onclick = function Start (){
        let n_vueltas = document.getElementById("f_vueltas").value;

        if (n_vueltas && n_vueltas > 0){
            juego.setVueltas(n_vueltas);
            juego.removePlayer();
            juego.iniciarKeyLogger();
            juego.empezarJuego();
        }
    }

    document.getElementById("multiplayer_btn").onclick = function Start (){
        let n_vueltas = document.getElementById("f_vueltas").value;

        if (n_vueltas && n_vueltas > 0){
            juego.setVueltas(n_vueltas);
            document.getElementById("jugador1").style.display= "block";
            juego.colocarJugadores();
            juego.iniciarKeyLogger();
            juego.empezarJuego();
        }
    }

     /*************************************Botón del menú de puntuaciones*********************************************/
    document.getElementById("return_btn").onclick = function volverMenu(){
        //Si se ha jugado anteriormente una partida de 1 jugador se vuelve a añadir el jugador 2 al volver al menú 
        if(juego.n_jugadores < 2){
            juego.n_jugadores++;
            juego.escena.jugadores.push(juego.jugador2);
            juego.escena.personajes.push(juego.personaje);
            juego.escena.add(juego.escena.personajes[1])
        }
        document.getElementById("menu").style.display= "block";
        document.getElementById("contenedor_logo").style.display = "flex";
        document.getElementById("puntuacion-contenedor").style.display= "none";
        document.getElementById("contenedor_vueltas").style.display = "flex";
        document.getElementById("puntuacion-final").style.display = "none";
        document.getElementById("record-puntuacion").style.display = "none";
    }

    window.addEventListener ("resize", () => juego.onWindowResize());
    juego.update();
  });