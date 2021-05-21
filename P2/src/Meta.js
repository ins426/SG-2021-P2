import * as THREE from '../libs/three.module.js'

class Meta extends THREE.Object3D {
    constructor(){
        super();
        this.altura = 5;

        //  Patas //
        var pata_geom = new THREE.CylinderBufferGeometry(0.1, 0.1, this.altura, 32, 32);
        this.pataIzq_mesh = new THREE.Mesh(pata_geom, new THREE.MeshPhongMaterial({color: 0xffffff}));
        this.pataDcha_mesh = new THREE.Mesh(pata_geom, new THREE.MeshPhongMaterial({color: 0xffffff}));

        this.pataIzq_mesh.position.x = -2;
        this.pataDcha_mesh.position.x = 2;
        this.patas = new THREE.Object3D();
        this.patas.add(this.pataDcha_mesh);
        this.patas.add(this.pataIzq_mesh);
        this.add(this.patas);

        //  Bandera //
        var texture = new THREE.TextureLoader().load('../imgs/meta.jpg');
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 1, 0.3 );
        var bandera_geom = new THREE.BoxBufferGeometry(4, 1, 0.2);
        bandera_geom.translate(0, this.altura/2, 0);
        this.bandera_mesh = new THREE.Mesh(bandera_geom, new THREE.MeshPhongMaterial({map: texture}));
        this.add(this.bandera_mesh);

        //  Texto   //
        const loader = new THREE.FontLoader();

        var that = this;
        loader.load( '/fonts/noto_sans.json', function ( font ) {
            var texto_geom = new THREE.TextBufferGeometry('META', {size: 0.8, height: 0.1, font: font, bevelEnabled: true,
            bevelThickness: 0.05, bevelSize: 0.05});
            texto_geom.translate(-1.6, that.altura/2 - 0.4, 0.1);
            that.texto_mesh = new THREE.Mesh(texto_geom, new THREE.MeshPhongMaterial({color: 0xffd814}));
            that.add(that.texto_mesh);
        } );
    }
}

export { Meta };