// Clases de la biblioteca
import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'
import * as TWEEN from '../libs/tween.esm.js'

// Clases de mi proyecto
import { Cat } from './Cat.js'
import { Recorrido } from './Recorrido.js' 
import { BurbujasGestor } from './BurbujasGestor.js'
import { Meta } from './Meta.js'

class MyScene extends THREE.Scene {
  constructor (myCanvas) {
    super();

    
    //LLEVAR A NUEVA CLASE JUGADOR
    this.ultima_colision = -1;


    this.juegoIniciado = false;
    this.keysStatus = {up: false, down: false, left: false, right: false};

    this.renderer = this.createRenderer(myCanvas);
    this.gui = this.createGUI ();
    this.createLights ();
    this.createCamera ();
    this.crearCamaraMenu();

    this.addElementosEscena();
    this.addAnimaciones();

  }

  addAnimaciones(){
    //  ******* Animación gato/seguimiento cámara ************
    this.x_offset = 0;
    this.y_offset = 0;

    this.t_ini = {t: 0};
    this.t_fin = {t: 1};

    var that = this;
    this.animacion = new TWEEN.Tween(this.t_ini).to(this.t_fin, 200000).repeat(Infinity).onUpdate(
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

    //  ******* Animación burbujas(zigzag, ascenso y opacidad) ************
    this.burbujas_gestor = new BurbujasGestor(this.texture);

    var n_burbujas = 400;
    this.burbujas = [];
    for(var i = 0; i < n_burbujas;++i){
      this.burbujas.push(this.burbujas_gestor.getBurbuja());
    }

    this.burbujas.forEach(function(item){
      that.add(item);
    })
  }

  addElementosEscena(){
    this.axis = new THREE.AxesHelper (5);
    this.add (this.axis);

    //Gato
    this.cat = new Cat();
    this.cat.position.set(0, 0, 70)
    this.add(this.cat);

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

    //Línea de meta
    this.meta = new Meta();
    this.meta.scale.set(5, 5,5);
    this.add(this.meta);

    //Desplazamientos máximos y mínimo
    const vFOV = (this.camaraJuego.fov * Math.PI) / 180;
    const height = 2 * Math.tan(vFOV / 2) * Math.abs(this.camaraJuego.position.z);
    const width = height * this.camaraJuego.aspect;

    this.width = width/2; //Ancho de la pantalla en coordenadas de mundo
    this.height = height/2; //Altura de la pantalla en coordenadas de mundo
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

  update () {
    this.spotLight.intensity = this.guiControls.lightIntensity;
    this.axis.visible = this.guiControls.axisOnOff;
    this.cameraControl.update();
    this.renderer.render (this, this.getCamera());

    if(this.juegoIniciado){
      var pos = this.cat.getPosicionLocal().clone();
      this.cat.localToWorld(pos);
    
      var anillo_colisionado;
      anillo_colisionado = this.recorrido.comprobarColisiones(pos, 0.5);

      if (anillo_colisionado['indice']  != -1){
        if (anillo_colisionado['indice'] != this.ultima_colision['indice']){
          let puntuacion = parseInt(document.getElementById("puntuacion").innerHTML, 10);
          document.getElementById("puntuacion").innerHTML = puntuacion + anillo_colisionado['anillo'].puntuacion;
          this.ultima_colision = anillo_colisionado;
        }
      }
      this.animacion.start();
      this.camaraJuego = this.cat.camara;

      if(this.keysStatus['right'] && this.x_offset <= (this.width/2)-4)
        this.x_offset += 0.1;
      
      if(this.keysStatus['left'] && this.x_offset >= (-this.width/2)+4)
        this.x_offset -= 0.1
      
      if(this.keysStatus['down'] && this.y_offset >= (-this.height/2)+2)
        this.y_offset -= 0.1
      
      if(this.keysStatus['up'] && this.y_offset <= (this.height/2)-3)
        this.y_offset += 0.1
    
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

  setUpStatus(status){
    this.keysStatus['up'] = status;
  }

  setDownStatus(status){
    this.keysStatus['down'] = status;
  }

  setLeftStatus(status){
    this.keysStatus['left'] = status;
  }

  setRightStatus(status){
    this.keysStatus['right'] = status;
  }
}

export { MyScene };
