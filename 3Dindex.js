import * as THREE from './three.js-master/src/Three.js';
const width = window.innerWidth, height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 1000);
const goalcamera = new THREE.PerspectiveCamera(70, width / height, 0.01, 1000);
camera.position.z = 1;
// 创建场景
const scene = new THREE.Scene();
// 创建网格对象，参数分别为几何体和材质


const Player = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('./3D/texture/PlayerTexture.jpg'),
}));
const Floor = new THREE.Mesh(new THREE.BoxGeometry(1000, 0.01, 1000, 50, 1, 50), new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true }));
const BiliBox = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5), new THREE.MeshMatcapMaterial({ color: 0xffffff }));
// 将网格对象添加到场景中
scene.add(Player);
scene.add(Floor);
scene.add(BiliBox);
BiliBox.position.z = -10;
BiliBox.position.x = -10;
BiliBox.position.y = 2.5;
Floor.position.y = 0;
camera.position.y = Player.position.y + 5;
camera.position.z = Player.position.z + 5;
Player.position.y = 0.5;
camera.lookAt(Player.position);
// 创建WebGL渲染器，参数为抗锯齿选项
const renderer = new THREE.WebGLRenderer({ antialias: true });
// 设置渲染器大小
renderer.setSize(width, height);
// 设置渲染循环
renderer.setAnimationLoop(animate);
// 将渲染器的DOM元素添加到页面中
document.body.appendChild(renderer.domElement);


const moon = new THREE.Mesh(new THREE.SphereGeometry(0.15, 32, 32), new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('./3D/texture/MoonTexture.png'),
}));

moon.position.set(0, 0.5, 1);

scene.add(moon);
//获取鼠标xy
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', function (event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
})

let moonArg = 0;

function animate() {
    // 根据按键更新移动向量
    let forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0; // 保持在水平面上
    forward.normalize();

    let right = new THREE.Vector3();
    right.crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();
    let speed = 0.05;
    // 更新移动向量
    if (keyboard['w']) {
        zspeed += speed; // 前进
    }
    if (keyboard['s']) {
        zspeed -= speed; // 后退
    }
    if (keyboard['a']) {
        xspeed -= speed; // 左移
    }
    if (keyboard['d']) {
        xspeed += speed; // 右移
    }

    // 根据相机方向更新位置
    Player.position.z += zspeed * forward.z + xspeed * right.z;
    Player.position.x += zspeed * forward.x + xspeed * right.x;
    Player.rotation.z += xspeed;
    Player.rotation.x += zspeed;
    zspeed *= 0.9;
    xspeed *= 0.9;
    let mousex = mouseX;
    let mousey = mouseY;
    goalcamera.position.y = Math.sin((1 - mousey) * Math.PI + Math.PI / 2) * 10 + Player.position.y;
    goalcamera.position.x = Math.cos((1 - mousey) * Math.PI + Math.PI / 2) * Math.sin(2 * (1 - mousex) * Math.PI) * 10 + Player.position.x;
    goalcamera.position.z = Math.cos((1 - mousey) * Math.PI + Math.PI / 2) * Math.cos(2 * (1 - mousex) * Math.PI) * 10 + Player.position.z;
    camera.lookAt(Player.position);
    easing();
    moonArg = moonArg + Math.PI / 120;
    moon.position.set(Math.cos(moonArg)+Player.position.x, 0.5, Math.sin(moonArg)+Player.position.z);
    renderer.render(scene, camera);
}


function easing() {
    camera.position.x += (goalcamera.position.x - camera.position.x) * 0.1;
    camera.position.y += (goalcamera.position.y - camera.position.y) * 0.1;
    camera.position.z += (goalcamera.position.z - camera.position.z) * 0.1;
    if (Math.abs(camera.position.x - goalcamera.position.x) < 0.01 && Math.abs(camera.position.y - goalcamera.position.y) < 0.01 && Math.abs(camera.position.z - goalcamera.position.z) < 0.01) {
        camera.position.x = goalcamera.position.x;
        camera.position.y = goalcamera.position.y;
        camera.position.z = goalcamera.position.z;
    }
}

let keyboard = {
    w: false,
    s: false,
    a: false,
    d: false
}
let xspeed = 0;
let zspeed = 0;
window.addEventListener('keydown', function (event) {
    keyboard[event.key] = true;
})
window.addEventListener('keyup', function (event) {
    keyboard[event.key] = false;
})

//监听窗口大小变化
window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})
