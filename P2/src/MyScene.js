// Clases de la biblioteca

import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'
import * as TWEEN from '../libs/tween.esm.js'

// Clases de mi proyecto
import { Cat } from './Cat.js'
import { SkySphere } from './SkySphere.js'
import { Suelo } from './Suelo.js'
import { Recorrido } from './Recorrido.js' 
import { Burbuja } from './Burbuja.js'
import { BurbujasGestor } from './BurbujasGestor.js'
import { Anillo } from './Anillo.js'

class MyScene extends THREE.Scene {
  constructor (myCanvas) {
    super();

    this.startJuego = false;
    //LLEVAR A NUEVA CLASE JUGADOR
    this.ultima_colision = -1;



    this.iniciarKeyLogger();
    this.renderer = this.createRenderer(myCanvas);
    this.gui = this.createGUI ();
    this.createLights ();
    this.createCamera ();
    this.crearCamaraMenu()

    this.addElementosEscena();

    //Animación gato/seguimiento cámara
    this.x_offset = 0;
    this.y_offset = 0;

    this.t_ini = {t: 0};
    this.t_fin = {t: 1};

    var that = this;
    this.animacion = new TWEEN.Tween(this.t_ini).to(this.t_fin, 800000).repeat(Infinity).onUpdate(
      function(){
        var posicion = that.recorrido.getPointAt(that.t_ini.t);
        var tangente = that.recorrido.getTangentAt(that.t_ini.t);
        that.cat.movimiento(that.x_offset,that.y_offset)
        that.cat.position.copy(posicion);
        that.camera.position.copy(that.cat.position);
        that.cameraControl.target = that.cat.position;
        posicion.add(tangente);
        that.cat.lookAt(posicion);
        that.camera.lookAt(posicion);
      }
    )

    //Burbujas y animacion
    this.burbujas_gestor = new BurbujasGestor();

    this.posini_burb = {y:-10}
    this.posfin_burb = {y:30}

    this.opacidad_ini = {o: 0};
    this.opacidad_fin = {o: 0.6};

    this.animacion_opacidad = 
      new TWEEN.Tween(this.opacidad_ini).to(this.opacidad_fin, 3000)
      .repeat(Infinity).yoyo(true).easing(TWEEN.Easing.Quadratic.InOut).start()

  
    this.poszigzag_ini = {x:0}
    this.poszigzag_fin = {x:2}
    this.animacion_zigzag = new TWEEN.Tween(this.poszigzag_ini).to(this.poszigzag_fin, 1500)
    .repeat(Infinity).yoyo(true).easing(TWEEN.Easing.Quadratic.InOut).start().easing(TWEEN.Easing.Quadratic.InOut);

    var n_burbujas = 400;
    this.burbujas = [];
    for(var i = 0; i < n_burbujas;++i){
      this.burbujas.push(this.burbujas_gestor.getBurbuja());
    }

    this.burbujas.forEach(function(item){
      that.add(item);
    })

    var that = this
    this.animacion_burbujas = new TWEEN.Tween(this.posini_burb).to(this.posfin_burb, 6000).onUpdate(
      function(){
        
        that.burbujas.forEach(function(item){
          item.modificarOpacidad(that.opacidad_ini.o);
          item.position.x = that.poszigzag_ini.x;
          item.position.y = that.posini_burb.y;
        })
  
      }
    ).start().repeat(Infinity)
  }

  addElementosEscena(){
    this.axis = new THREE.AxesHelper (5);
    this.add (this.axis);

    //Gato
    this.cat = new Cat();
    this.cat.position.set(0, 0, 70)
    this.add(this.cat);

    //Cielo
    this.skySphere = new SkySphere();
    this.add(this.skySphere);

    //Suelo
    this.suelo = new Suelo;
    this.add(this.suelo);

    //Recorrido
    this.recorrido = new Recorrido();
    this.add(this.recorrido);
  }

  crearCamaraMenu(){
    this.camaraObject = new THREE.Object3D();
    this.camaraJuego = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    var look = new THREE.Vector3 (-10,-3,-10);
    this.camaraJuego.lookAt(look);
    this.cameraControl.target = look;
    this.camaraJuego.position.z = 30
    this.camaraJuego.position.x = 10
    this.camaraJuego.position.y = 40
    this.camaraObject.add(this.camaraJuego);

    this.add(this.camaraObject);

  }
  
  createCamera () {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set (0, 0, 80);

    var look = new THREE.Vector3 (0,0,0);
    this.camera.lookAt(look);
    this.add (this.camera);
    
    this.cameraControl = new TrackballControls (this.camera, this.renderer.domElement);

    this.cameraControl.rotateSpeed = 5;
    this.cameraControl.zoomSpeed = -2;
    this.cameraControl.panSpeed = 0.5;

    this.cameraControl.target = look;
  }
  
  createGUI () {
    var gui = new GUI();
    this.guiControls = new function() {
      
      this.lightIntensity = 0.5;
      this.axisOnOff = true;
    }

    var folder = gui.addFolder ('Luz y Ejes');
    folder.add (this.guiControls, 'lightIntensity', 0, 1, 0.1).name('Intensidad de la Luz : ');
    folder.add (this.guiControls, 'axisOnOff').name ('Mostrar ejes : ');
    
    return gui;
  }
  
  createLights () {
    var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
    this.add (ambientLight);
    
    this.spotLight = new THREE.SpotLight( 0xffffff, this.guiControls.lightIntensity );
    this.spotLight.position.set( 0, 200, 0 );
    this.add (this.spotLight);
  }
  
  createRenderer (myCanvas) {
    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    $(myCanvas).append(renderer.domElement);
    
    return renderer;  
  }
  
  getCamera () {
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

  iniciarKeyLogger(){
    var that = this

    this.rigthPressed = false;
    this.leftPressed = false;
    this.upPressed = false;
    this.downPressed = false;

    document.addEventListener('keydown', function(event) {
      if (event.key == "ArrowUp")
        that.upPressed = true
        
     if (event.key == "ArrowLeft")
      that.leftPressed = true
      
      if (event.key == "ArrowDown")
        that.downPressed = true
        
      if (event.key == "ArrowRight")
        that.rigthPressed = true
      
    });

    document.addEventListener('keyup', function(event) {
      if (event.key == "ArrowUp")
        that.upPressed = false
        
     if (event.key == "ArrowLeft")
        that.leftPressed = false
     

      if (event.key == "ArrowDown")
        that.downPressed = false
        
      if (event.key == "ArrowRight")
        that.rigthPressed = false
      
    });
  }

  update () {
    this.spotLight.intensity = this.guiControls.lightIntensity;
    
    this.axis.visible = this.guiControls.axisOnOff;
    
    this.cameraControl.update();
    
    this.renderer.render (this, this.getCamera());

    if(this.startJuego){
      var anillo_colisionado;
      if ((anillo_colisionado = this.recorrido.comprobarColisiones(this.cat.position, 0.5)) != -1){
        if (anillo_colisionado != this.ultima_colision){
          let puntuacion = parseInt(document.getElementById("puntuacion").innerHTML, 10);
          document.getElementById("puntuacion").innerHTML = puntuacion + 1;
          this.ultima_colision = anillo_colisionado;
        }
      }
      this.animacion.start();
      this.camaraJuego = this.cat.camara;

      if(this.rigthPressed)
        this.x_offset += 0.5
      
      if(this.leftPressed)
        this.x_offset -= 0.5
      
      if(this.downPressed)
        this.y_offset -= 0.1
      
      if(this.upPressed)
        this.y_offset += 0.1
    
    }else{
      this.camaraObject.rotation.y += 0.001;
    }
    TWEEN.update();

    requestAnimationFrame(() => this.update())
  }

  empezarJuego(){
    document.getElementById("boton-empezar").style.display = "none";
    document.getElementById("puntuacion-contenedor").style.display = "block"; 
    this.startJuego = true;
  }
}

$(function () {
  var scene = new MyScene("#WebGL-output");

  document.getElementById("boton-empezar").onclick = function Start (){
    scene.empezarJuego();
  }

  window.addEventListener ("resize", () => scene.onWindowResize());
  
  scene.update();
});
