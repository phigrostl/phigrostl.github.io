import * as THREE from './three.js-master/src/Three.js';
const width = window.innerWidth, height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 1000);
camera.position.z = 1;
// 创建场景
const scene = new THREE.Scene();
// 创建网格对象，参数分别为几何体和材质
const Player = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), new THREE.MeshNormalMaterial());
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
// 设置相机位置
const cameraOffset = new THREE.Vector3(0, 2, -5); // 相机相对玩家的位置

//获取鼠标xy
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', function (event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
})

window.addEventListener('mousemove', function (event) {
    // 可以使用 event.clientX 和 event.clientY 来控制视角
    // 例如，调整相机的旋转
    const deltaX = event.movementX * 0.1; // 调整灵敏度
    const deltaY = event.movementY * 0.1;

    // 更新相机的旋转
    camera.rotation.y -= deltaX * 0.01;
    camera.rotation.x -= deltaY * 0.01;
});

function animate() {
    if(keyboard['w'] && zspeed<0.2){
        zspeed += 0.1;
    }
    if(keyboard['s'] && zspeed>-0.2){   
        zspeed -= 0.1;
    }
    if(keyboard['a'] && xspeed>-0.2){
        xspeed += 0.1;
    }
    if(keyboard['d'] && xspeed<0.2){
        xspeed -= 0.1;
    }
    Player.position.z += zspeed;
    Player.position.x += xspeed;
    zspeed *= 0.9;
    xspeed *= 0.9;
    camera.position.copy(Player.position).add(cameraOffset);
    camera.lookAt(Player.position);
    renderer.render(scene, camera);
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

//监听窗口大小变化，更新渲染器大小和相机比例，防抖
window.addEventListener('resize', function () {
    width = window.innerWidth;
    height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
})
let resizeTimeout;
window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
        width = window.innerWidth;
        height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }, 1000);
});
