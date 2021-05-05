
// Clases de la biblioteca

import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'

// Clases de mi proyecto
import { Cat } from './Cat.js'
import { SkySphere } from './SkySphere.js'
import { Suelo } from './Suelo.js'

class MyScene extends THREE.Scene {
  constructor (myCanvas) {
    super();
    
    this.iniciarKeyLogger();
    this.tiempo_anterior = Date.now();

    this.renderer = this.createRenderer(myCanvas);
    
    this.gui = this.createGUI ();
    
    this.createLights ();
    
    this.createCamera ();
    
    this.axis = new THREE.AxesHelper (5);
    this.add (this.axis);

    this.cat = new Cat();
    this.add(this.cat);

    this.skySphere = new SkySphere();
    this.add(this.skySphere);

    this.suelo = new Suelo;
    this.add(this.suelo);
  }
  
  createCamera () {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    this.camera.position.set (0, 0, 1);

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
    this.spotLight.position.set( 20, 30, 50 );
    this.add (this.spotLight);
  }
  
  createRenderer (myCanvas) {

    var renderer = new THREE.WebGLRenderer();
    
    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    $(myCanvas).append(renderer.domElement);
    
    return renderer;  
  }
  
  getCamera () {
    return this.camera;
  }
  
  setCameraAspect (ratio) {
    this.camera.aspect = ratio;
    this.camera.updateProjectionMatrix();
  }
  
  onWindowResize () {
    this.setCameraAspect (window.innerWidth / window.innerHeight);
    this.renderer.setSize (window.innerWidth, window.innerHeight);
  }

  iniciarKeyLogger(){
    var that = this
    document.addEventListener('keydown', function(event) {
      that.cat.movimiento(event.key)

      if (event.key == "ArrowUp")
      console.log("Arriba")

     if (event.key == "ArrowLeft")
     console.log("izq")

      if (event.key == "ArrowDown")
      console.log("abajo")

      if (event.key == "ArrowRight")
      console.log("derecha")
    });
  }

  update () {
    this.spotLight.intensity = this.guiControls.lightIntensity;
    
    this.axis.visible = this.guiControls.axisOnOff;
    
    this.cameraControl.update();
    
    this.renderer.render (this, this.getCamera());

    var tiempo_actual = Date.now()
    var delta = (tiempo_actual - this.tiempo_anterior)/1000;
    this.tiempo_anterior = tiempo_actual;
    //this.skySphere.position.z += 5 * delta;
    //this.suelo.position.z += 5 * delta;

    requestAnimationFrame(() => this.update())
  }
}

$(function () {
  
  var scene = new MyScene("#WebGL-output");

  window.addEventListener ("resize", () => scene.onWindowResize());
  
  scene.update();
});
