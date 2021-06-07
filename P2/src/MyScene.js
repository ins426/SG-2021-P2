// Clases de la biblioteca
import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'
import * as TWEEN from '../libs/tween.esm.js'
import { Lensflare, LensflareElement } from '../libs/Lensflare.js'

// Clases de mi proyecto
import { Parrot } from './Parrot.js'
import { Recorrido } from './Recorrido.js' 
import { BurbujasGestor } from './BurbujasGestor.js'

class MyScene extends THREE.Scene {
  constructor (myCanvas, jugadores,vueltas) {
    super();

    this.juegoIniciado = false;
    this.renderer = this.createRenderer(myCanvas);
    this.jugadores = jugadores;
    this.n_vueltas = vueltas;
    this.vueltas_recorridas = 0;
    this.personajes = [];

    this.record_puntuacion = 0

    this.createLights ();
    this.createCamera ();
    this.crearCamaraMenu();
    this.camaraJuego = this.camaraJuegoMenu;

    this.addElementosEscena();
    this.addAnimaciones();

    //AUDIOS
    this.audio_anillo = document.getElementById("sonido-anillo");
    this.audio_menu = document.getElementById("sonido-menu");
    this.audio_partida = document.getElementById("sonido-partida");
    this.audio_menu.play();
  }

  addAnimaciones(){
    //  ******* Animación loros/seguimiento cámara ************
    this.t_ini = {t: 0};
    this.t_fin = {t: 1};

    var that = this;
    this.animacion = new TWEEN.Tween(this.t_ini).to(this.t_fin, 35000).repeat(Infinity).onUpdate(
      function(){
        var posicion = that.recorrido.getPointAt(that.t_ini.t);
        var tangente = that.recorrido.getTangentAt(that.t_ini.t);

        that.personajes.forEach((personaje, index) => {
          personaje.movimiento(that.jugadores[index].x_offset, that.jugadores[index].y_offset)
          personaje.position.copy(posicion);
          posicion.add(tangente);
          personaje.lookAt(posicion);
          personaje.update()
        });
      }
    ).onRepeat(function(){
      that.vueltas_recorridas++;
      document.getElementById("vuelta").innerHTML = that.vueltas_recorridas;
    });
  }

  addElementosEscena(){
    //Personajes
    var contador = 0;
    this.jugadores.forEach(element => {
      this.parrot = new Parrot(contador);
      this.parrot.name = element.nombre;
      this.add(this.parrot);
      this.personajes.push(this.parrot);
      contador++;
    });

    //Mundo
    var path = "../imgs/cubemap/";
    var format = ".png";
    var urls = [
      path + 'px' + format, path + 'nx' + format,
      path + 'py' + format, path + 'ny' + format,
      path + 'pz' + format, path + 'nz' + format
    ]

    this.texture = new THREE.CubeTextureLoader().load(urls);
    this.background = this.texture;

    //Recorrido
    this.recorrido = new Recorrido();
    this.add(this.recorrido);

    //  ******* Generación de burbujas ************
    this.burbujas_gestor = new BurbujasGestor(this.texture);

    var n_burbujas = 200;
    this.burbujas = [];
    for(var i = 0; i < n_burbujas;++i){
      this.burbujas.push(this.burbujas_gestor.getBurbuja());
    }
    
    var that = this;
    this.burbujas.forEach(function(item){
      that.add(item);
    })

    //Desplazamientos máximos y mínimo
    const vFOV = (this.camaraJuego.fov * Math.PI) / 180;
    const height = Math.tan(vFOV / 2) * Math.abs(this.camaraJuego.position.z);
    const width = height * this.camaraJuego.aspect;

    this.width = width; //Ancho de la pantalla en coordenadas de mundo
    this.height = height; //Altura de la pantalla en coordenadas de mundo
  }

  crearCamaraMenu(){
    this.camaraObject = new THREE.Object3D();
    this.camaraJuegoMenu = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    var look = new THREE.Vector3 (-10,-3,-10);
    this.camaraJuegoMenu.lookAt(look);
    this.cameraControl.target = look;
    this.camaraJuegoMenu.position.z = 30
    this.camaraJuegoMenu.position.x = 10
    this.camaraJuegoMenu.position.y = 40
    this.camaraObject.add(this.camaraJuegoMenu);

    this.add(this.camaraObject);
  }
  
  createCamera () {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set (0, 50, 0);

    var look = new THREE.Vector3 (0,0,0);
    this.camera.lookAt(look);
    this.add (this.camera);
    
    this.cameraControl = new TrackballControls (this.camera, this.renderer.domElement);

    this.cameraControl.rotateSpeed = 5;
    this.cameraControl.zoomSpeed = -2;
    this.cameraControl.panSpeed = 0.5;

    this.cameraControl.target = look;
  }
  
  createLights () {
    //  Iluminación anterior
    /*var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
    this.add (ambientLight);
    
    this.spotLight = new THREE.SpotLight( 0xffffff, 0.5 );
    this.spotLight.position.set( 0, 200, 0 );
    this.add (this.spotLight);*/

    // Nueva iluminación
    const upColour = 0xdbbf6b;
    const downColour = 0X4040FF;
    const light  = new THREE.HemisphereLight(upColour, downColour, 0.7);
    light.position.set(0, 10, 0);
    this.add(light);

    // var helper = new THREE.HemisphereLightHelper(light, 2);
    // light.add(helper);
    
    let sol = new THREE.DirectionalLight(0xffa70f, 0.8);
    sol.position.set(-60, 20, 200);
    sol.target.position.set(0, 5, 0);
    this.add(sol);
    this.add(sol.target);
    sol.castShadow = true;

    // let sol_helper = new THREE.DirectionalLightHelper(sol, 10);
    // sol.add(sol_helper);

    const textureLoader = new THREE.TextureLoader();
    const textureFlare = textureLoader.load( "../imgs/lensflare/6.png" );
    const lensflare = new Lensflare();
    lensflare.addElement(new LensflareElement( textureFlare, 100, 0));
    lensflare.addElement(new LensflareElement( textureFlare, 60, 0.1));
    lensflare.addElement(new LensflareElement( textureFlare, 30, 0.2));


    sol.add(lensflare);
  }
  
  createRenderer (myCanvas) {
    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.shadowMap.enabled = true;
    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    $(myCanvas).append(renderer.domElement);
    
    return renderer;  
  }
  
  getCamera () {
   //return this.camera;
   return this.camaraJuego;
  }
  
  setCameraAspect (ratio) {
    this.getCamera().aspect = ratio;
    this.getCamera().updateProjectionMatrix();
  }
  
  onWindowResize () {
    this.setCameraAspect (window.innerWidth / window.innerHeight);
    this.renderer.setSize (window.innerWidth, window.innerHeight);
  }

  gestionarColisionesAnillos(ind_jugador){
    var pos = this.personajes[ind_jugador].getPosicionLocal().clone();
    this.personajes[ind_jugador].localToWorld(pos);
  
    var anillo_colisionado;
    var radio_personaje = this.personajes[ind_jugador].radio_colision;
    anillo_colisionado = this.recorrido.comprobarColisionesAnillos(pos, radio_personaje);

    if (anillo_colisionado['indice']  != -1){
      if (anillo_colisionado['indice'] != this.jugadores[ind_jugador].ultima_colision){
        this.audio_anillo.play();
        //Recompensas de la colisión con los anillos
        if(anillo_colisionado['anillo'].bonificacion_velocidad == 0){
          document.getElementById("puntuacion" + ind_jugador).innerHTML = this.jugadores[ind_jugador].sumaPuntuacion(anillo_colisionado['anillo'].puntuacion);
        }
        else{
          if (!this.jugadores[ind_jugador].temporizador_activado == true){
            let bonus = anillo_colisionado['anillo'].bonificacion_velocidad;
            this.jugadores[ind_jugador].setVelocidad(bonus,bonus);
            this.jugadores[ind_jugador].temporizador.init();
            this.jugadores[ind_jugador].temporizador_activado = true;
          }
        }
        this.jugadores[ind_jugador].ultima_colision = anillo_colisionado['indice'];
      }
    }
  }

  comprobarTemporizador(ind_jugador){
    if(this.jugadores[ind_jugador].temporizador_activado){
      let tiempo = this.jugadores[ind_jugador].temporizador.getTiempo()

      //Reseteo del temporizador y de la velocidad del jugador
      if(tiempo >= 3){
        console.log("FIN TIMER");
        clearInterval(this.jugadores[ind_jugador].temporizador.intervaloId);
        this.jugadores[ind_jugador].temporizador.setTiempo(0);
        this.jugadores[ind_jugador].temporizador_activado = false;
        this.jugadores[ind_jugador].setVelocidad(1, 1);
      }
    }
  }

  aplicarMovimiento2d(ind_jugador){
    let factor_reduccion = 8;
    let limite_x = 5;
    let limite_y = 3;

    let jugador = this.jugadores[ind_jugador];
    if(jugador.keysStatus['right'] && jugador.x_offset <= (this.width/2)-limite_x)
      jugador.x_offset += (jugador.vx/factor_reduccion);
    
    if(jugador.keysStatus['left'] && jugador.x_offset >= (-this.width/2)+limite_x)
      jugador.x_offset -= (jugador.vx/factor_reduccion);
    
    if(jugador.keysStatus['down'] && jugador.y_offset >= (-this.height/2)+limite_y)
      jugador.y_offset -= (jugador.vy/factor_reduccion);
    
    if(jugador.keysStatus['up'] && jugador.y_offset <= (this.height/2)-limite_y)
      jugador.y_offset += (jugador.vy/factor_reduccion);
  }

  terminarPartida(){
    this.juegoIniciado = false;
    this.animacion.stop();
    this.camaraJuego = this.camaraJuegoMenu;
    this.audio_partida.pause();
    this.audio_menu.play();

    if(this.jugadores.length == 1){
      if(this.jugadores[0].puntuacion > this.record_puntuacion){
        this.record_puntuacion = this.jugadores[0].puntuacion
        document.getElementById("record").innerHTML = this.record_puntuacion
      }

      document.getElementById("record-puntuacion").style.display = "flex";
    }
    else{
      if(this.jugadores[0].puntuacion > this.jugadores[1].puntuacion ){
        document.getElementById("id-ganador").innerHTML = "Jugador 1"
      }
      else if(this.jugadores[0].puntuacion < this.jugadores[1].puntuacion){
        document.getElementById("id-ganador").innerHTML = "Jugador 2"
      }else{
        document.getElementById("id-ganador").innerHTML = "EMPATE"
      }

        document.getElementById("jugador-ganador").style.display = "flex";
    }

    this.jugadores.forEach((jugador, ind) => {
      document.getElementById("jugador" + ind + "-final").style.display = "block";
      document.getElementById("puntuacion" + ind + "-final").innerHTML = jugador.puntuacion;
    });


    document.getElementById("puntuacion-contenedor").style.display = "none";
    document.getElementById("puntuacion-final").style.display = "flex";
  }

  update () {
    this.cameraControl.update();
    this.renderer.render (this, this.getCamera());

    if(this.juegoIniciado){
      this.jugadores.forEach((jugador, index) => {
        this.gestionarColisionesAnillos(index);
        this.comprobarTemporizador(index);
        this.aplicarMovimiento2d(index);
      });

      if(this.vueltas_recorridas == this.n_vueltas)
        this.terminarPartida();
      
    
    }else{
      this.camaraObject.rotation.y += 0.001;
    }
    TWEEN.update();

    //Gestión de burbujas
    var that = this;
    this.burbujas.forEach(function(item){

      item.animarBurbuja(0,0.1,0);

      if(item.getPosicionLocal().y >= 60 ){
        that.remove(item);

        that.burbujas_gestor.recibirBurbuja(item);

        var i = that.burbujas.indexOf( item );
        if ( i !== -1 ) {
            that.burbujas.splice( i, 1 );
            that.burbujas.push(that.burbujas_gestor.getBurbuja());
            that.add(that.burbujas[that.burbujas.length-1]);
        }
      }
    })

    requestAnimationFrame(() => this.update())
  }

  setUpStatus(status, ind){
    this.jugadores[ind].keysStatus['up'] = status;
  }

  setDownStatus(status, ind){
    this.jugadores[ind].keysStatus['down'] = status;
  }

  setLeftStatus(status, ind){
    this.jugadores[ind].keysStatus['left'] = status;
  }

  setRightStatus(status, ind){
    this.jugadores[ind].keysStatus['right'] = status;
  }

  empezarJuego(){
    this.audio_menu.pause();
    this.audio_partida.play();
    this.juegoIniciado = true;
    this.animacion.start();
    this.camaraJuego = this.personajes[0].camara;
  }
}

export { MyScene };
