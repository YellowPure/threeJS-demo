'use strict';
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// var geometry = new THREE.BoxGeometry(1, 1, 1);
// var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
// var cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

camera.position.z = 5;
camera.position.y = 1;

var orbit = new THREE.OrbitControls( camera, renderer.domElement );
orbit.enableZoom = false;
// var texture = new THREE.TextureLoader().load('texture1.jpg');
// var material2 = new THREE.SpriteMaterial({map: texture, color: 0xffffff, fog: true});
// var sprite = new THREE.Sprite(material2);
// sprite.position.x = 1.5;

var data = [
    {
        url: 'img/1.jpg',
        w: 170,
        h: 236,
        x: 1,
        y: 0,
        z: 0,
        s: 0.01,
        r: 30,
        t: .5,
        n: 4
    },
    {
        url: 'img/2.jpg',
        w: 170,
        h: 236,
        x: -1,
        y: 0,
        z: 10,
        s: 0.01
    },
    {
        url: 'img/3.jpg',
        w: 170,
        h: 236,
        x: 1,
        y: 0,
        z: 20,
        s: 0.01
    },
    {
        url: 'img/4.jpg',
        w: 170,
        h: 236,
        x: -1,
        y: 0,
        z: 90,
        s: 0.01
    },
    {
        url: 'img/5.jpg',
        w: 170,
        h: 236,
        x: 1,
        y: 0,
        z: 30,
        s: 0.01
    },
    {
        url: 'img/6.jpg',
        w: 170,
        h: 236,
        x: -1,
        y: 0,
        z: 40,
        s: 0.01
    },
    {
        url: 'img/7.jpg',
        w: 170,
        h: 236,
        x: 1,
        y: 0,
        z: 50,
        s: 0.01
    },
    {
        url: 'img/8.jpg',
        w: 170,
        h: 236,
        x: -1,
        y: 0,
        z: 60,
        s: 0.01
    },
    {
        url: 'img/9.jpg',
        w: 170,
        h: 236,
        x: 1,
        y: 0,
        z: 70,
        s: 0.01
    },
    {
        url: 'img/10.jpg',
        w: 170,
        h: 236,
        x: -1,
        y: 0,
        z: 80,
        s: 0.01
    },
]
var sp;
for(var i =0 ;i<data.length; i++) {
    sp = createSprite(data[i]);
    scene.add(sp);
}

render();

function createSprite(obj) {
    var texture = new THREE.TextureLoader().load(obj.url);
    texture.minFilter = THREE.LinearFilter;
    var mt = new THREE.SpriteMaterial({
        map: texture,
        fog: true
    });
    var t = new THREE.Sprite(mt);
    return  t.position.set(obj.x, obj.y, obj.z),
            t.scale.set(obj.w * (obj.s || 1), obj.h * (obj.s || 1), 1),
            t
}

function render() {
    requestAnimationFrame(render);
    camera.position.z += 0.05;
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
