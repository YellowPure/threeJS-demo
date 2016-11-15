var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, 500 / 400, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('webGL-page').appendChild(renderer.domElement);

var skyGeo = new THREE.SphereGeometry(10000, 25,25);

// var texture = THREE.TextureLoader().('img/sky.png');


// var material = new THREE.MeshPhongMaterial({
//     map: texture
// });
// var sky = new THREE.Mesh(skyGeo, material);
// sky.material.side = THREE.BackSide;
// scene.add(sky);

var geometry = new THREE.SphereGeometry(5, 16, 12, 0, Math.PI * 2, 0, Math.PI * 2);

var pos = geometry.vertices;
console.log(pos);
var texture = new THREE.TextureLoader().load('img/10.jpg');
texture.minFilter = THREE.LinearFilter;
var mt = new THREE.SpriteMaterial({
        map: texture,
        fog: true
    });
var group = new THREE.Object3D();

for(var i = 17; i< 102;i+=2) {
    var o = getMT();
    var t = new THREE.Sprite(o.instance);
    t._self_index = 'define_'+i;
    t._url_ = o.url;
    t.position.set(pos[i].x, pos[i].y, pos[i].z);
    // groups.push(t);
    // scene.add(t);
    group.add(t);
}

function getMT() {
    var url = 'img/1'+ Math.floor(Math.random()*5) + '.jpg';
    var t = new THREE.TextureLoader().load(url);
    return {
        instance: new THREE.SpriteMaterial({
            map: t,
            fog: true
        }),
        url: url
    }
}

scene.add(group);
// function createSprite(obj) {
//     var mt = new THREE.SpriteMaterial({
//         map: texture,
//         fog: true
//     });
//     var t = new THREE.Sprite(mt);
//     return  t.position.set(obj.x, obj.y, obj.z),
//             t.scale.set(obj.w * (obj.s || 1), obj.h * (obj.s || 1), 1),
//             t
// }

var material = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh(geometry, material);
// var b = new THREE.Mesh(geometry, new THREE.LineBasicMaterial({
//     color: 0xff0000
// }));
// scene.add(cube);
// scene.add(b);


camera.position.z = 100;
// z放心的加速度
var cameraZ = 0.1;

var MOVE_Y = 10, MOVE_Z = 5;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onMouseDown(event) {
    if(enableTouch) {
        console.log('xxx');
        mouse.x = (event.clientX / window.innerWidth) *2 -1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    } else {
        console.log('yyy');
        mouse.x = -1000;
        mouse.y = -1000;
    }
    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(group.children);

    if( intersects.length >0) {
        if(lastInObj != intersects[0].object) {
            if(lastInObj) lastInObj.scale.set(1, 1, 1);

            lastInObj = intersects[0].object;
            // lastInObj.scale.set(2, 2, 2);
            console.log(lastInObj._self_index);
            isRun = false;

            remPos.y = camera.position.y;
            remPos.z = camera.position.z;
            var tempUrl = lastInObj._url_;
            tween = new TWEEN.Tween({z: camera.position.z, y: camera.position.y})
            .to({z: MOVE_Z, y: MOVE_Y}, 1000)
            .onUpdate(function() {
                camera.position.z = this.z;
                camera.position.y = this.y;
            })
            .onComplete(function() {
                self.showDetail(lastInObj._url_);
                console.log('do here');
            })
            .start();
        }
    } else {
        if(lastInObj) lastInObj.scale.set(1, 1, 1);
        lastInObj = null;
        isRun = true;
    }
}

window.addEventListener('mousedown', onMouseDown, false);

var isRun = true;
// 记录的上一个放大的对象
var lastInObj, tween, tween1;
// 记录的动作之前的坐标
var remPos = {};
var self = this;
var enableTouch = true;

var article = document.getElementById('detail');

function showDetail(url) {
    article.style.display = 'flex';
    article.querySelector('img').setAttribute('src', url);
    enableTouch = false;
}

document.querySelector('.close').addEventListener('click', closeDetail);

function closeDetail() {
    article.style.display = 'none';

    tween = new TWEEN.Tween({z: MOVE_Z, y: MOVE_Y})
    .to({z: remPos.z, y: remPos.y}, 1000)
    .onUpdate(function() {
        camera.position.z = this.z;
        camera.position.y = this.y;
    })
    .onComplete(function() {
        enableTouch = true;
    })
    .start();
}

var render = function () {
    renderer.render(scene, camera);
    if(camera.position.z > 15) {
        camera.position.z -= cameraZ;
        cameraZ += 0.01;
    }

    

    if(isRun) {
        cube.rotation.y += 0.005;
        group.rotation.y += 0.005;
    }
    requestAnimationFrame(render);
    TWEEN.update();
};



render();