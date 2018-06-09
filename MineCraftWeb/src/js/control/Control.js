export class Control {
    static getInstance() {
        if (!Control.instance) {
            Control.instance = new Control();
        }
        return Control.instance;
    }

    constructor() {
        this.controlsEnabled = false;

        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.canJump = false;

        this.prevTime = performance.now();
        this.velocity = new THREE.Vector3();
        this.direction = new THREE.Vector3();
        this.directionY = new THREE.Vector3(0, -1, 0);
        this.trendZ = 0;
        this.trendX = 0;

        this.height = 250;
        this.baseHeight = 0;
        this.cameradir = new THREE.Vector3();

        this.downSpeed = 300.0;
        this.upSpeed = 1050.0;
        this.moveSpeed = 9600.0;
    }

    registControlEvent() {
        let blocker = document.getElementById('blocker');
        let instructions = document.getElementById('instructions');
        let havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
        if (havePointerLock) {
            let element = document.body;
            //输入锁定改变事件
            let pointerlockchange = () => {
                if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {
                    this.controlsEnabled = true;
                    this.controls.enabled = true;
                    blocker.style.display = 'none';
                } else {
                    this.controls.enabled = false;
                    blocker.style.display = 'block';
                    instructions.style.display = '';
                }
            };
            //输入锁定改变错误
            let pointerlockerror = () => {
                instructions.style.display = '';

            };
            document.addEventListener('mousemove', (e) => {
                let movementX = e.movementX ||
                    e.mozMovementX ||
                    e.webkitMovementX ||
                    0,
                    movementY = e.movementY ||
                    e.mozMovementY ||
                    e.webkitMovementY ||
                    0;
                this.movementX = movementX;
                this.movementY = movementY;
            }, false);

            // Hook pointer lock state change events
            document.addEventListener('pointerlockchange', pointerlockchange, false);
            document.addEventListener('mozpointerlockchange', pointerlockchange, false);
            document.addEventListener('webkitpointerlockchange', pointerlockchange, false);

            document.addEventListener('pointerlockerror', pointerlockerror, false);
            document.addEventListener('mozpointerlockerror', pointerlockerror, false);
            document.addEventListener('webkitpointerlockerror', pointerlockerror, false);

            document.addEventListener('keydown', (event) => this.onKeyDown(event), false);
            document.addEventListener('keyup', (event) => this.onKeyUp(event), false);

            //遮罩层事件
            instructions.addEventListener('click', function () {

                instructions.style.display = 'none';
                // Ask the browser to lock the pointer
                element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
                element.requestPointerLock();
            }, false);

        } else {
            instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
        }
    }

    init(camera, scene, load) {
        this.registControlEvent();
        let controls = new THREE.PointerLockControls(camera);
        controls.getObject().position.y = this.height;
        this.camera = camera;
        this.load = load;
        this.scene = scene;
        this.controls = controls;
        this.initRaycaster();
        //this.addHelper();
        scene.add(controls.getObject());
        return this;
    }

    onKeyDown(event) {
        switch (event.keyCode) {

            case 38: // up
            case 87: // w
                this.moveForward = true;
                break;

            case 37: // left
            case 65: // a
                this.moveLeft = true;
                break;

            case 40: // down
            case 83: // s
                this.moveBackward = true;
                break;

            case 39: // right
            case 68: // d
                this.moveRight = true;
                break;

            case 32: // space
                if (this.canJump === true) this.velocity.y += this.upSpeed;
                this.canJump = false;
                this.jump = true;
                break;
        }
    }

    onKeyUp(event) {
        switch (event.keyCode) {

            case 38: // up
            case 87: // w
                this.moveForward = false;
                break;

            case 37: // left
            case 65: // a
                this.moveLeft = false;
                break;

            case 40: // down
            case 83: // s
                this.moveBackward = false;
                break;

            case 39: // right
            case 68: // d
                this.moveRight = false;
                break;

        }
    }

    addHelper() {
        let geometry = new THREE.CylinderGeometry(0, 20, 100, 3);
        geometry.translate(0, 50, 0);
        geometry.rotateX(Math.PI / 2);
        let helper1 = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
        this.scene.add(helper1);
        this.helper1 = helper1;
    }

    renderHelper() {
        // this.raycaster.setFromCamera(this.mouse, this.camera);
        // this.raycaster.set(this.controls.getObject().position, vector.sub(this.controls.getObject().position).normalize());
        // this.raycaster.ray.origin.y -= 6;
        let intersects = this.raycaster.intersectObject(this.lord);
        if (intersects.length > 0) {
            this.helper1.position.set(0, 0, 0);
            this.helper1.lookAt(intersects[0].face.normal);
            let vex = new THREE.Vector3().copy(intersects[0].point);
            vex.translationX(300);
            this.helper1.position.copy(intersects[0].point);
        }
    }

    initRaycaster() {
        //let vector = new THREE.Vector3(this.movementX, this.movementY, 0.5).unproject(this.camera);
        //let raycaster = new THREE.Raycaster(this.controls.getObject().position, vector.sub(this.camera.position).normalize());
        let raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3().copy(this.directionY), 0, 51);
        this.raycaster = raycaster;
    }


    update() {
        //判断鼠标是否锁定
        if (this.controlsEnabled === true) {

            //判断键盘移动方向
            this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
            this.direction.x = Number(this.moveLeft) - Number(this.moveRight);
            this.direction.normalize(); // this ensures consistent movements in all directions

            //用于检测地面
            this.raycaster.ray.origin.copy(this.controls.getObject().position);

            //相机距离地面的相对高度
            this.raycaster.ray.origin.y -= this.height;
            let intersections = this.raycaster.intersectObjects([this.load]);

            //将摄像头面对的相对方向置入cameradir变量,用于检测障碍物.
            this.controls.getObject().getWorldDirection(this.cameradir);


            let intersections2 = [], onWard = false, dir = new THREE.Vector3();

            //确认移动的方向，以便检测障碍物
            if (this.direction.z > 0) {
                //W
                dir.copy(this.cameradir).negate();
            } else if (this.direction.z < 0) {//
                //S
                dir.copy(this.cameradir);
            }
            if (this.direction.x > 0) {
                //A
                dir.copy(this.cameradir).applyAxisAngle(this.directionY, 90.0);
            } else if (this.direction.x < 0) {
                //D
                dir.copy(this.cameradir).applyAxisAngle(this.directionY, -90.0);
            }

            //用于检测障碍物
            if (this.direction.z != 0 || this.direction.x != 0) {
                this.raycaster.ray.direction.copy(dir);
                intersections2 = this.raycaster.intersectObjects([this.load]);
                this.raycaster.ray.direction.copy(this.directionY);
            }

            //是否碰撞标志位
            onWard = intersections2.length > 0;

            //是否下坠标识位
            let onObject = intersections.length > 0;
            // if (onObject) {
            //     this.helper1.position.set(0, 0, 0);
            //     this.helper1.lookAt(intersections[0].face.normal);
            //     let vex = new THREE.Vector3().copy(intersections[0].point);
            //     vex.x += 300;
            //     vex.y += 100;
            //     this.helper1.position.copy(vex);
            // }

            //一帧的时间 大概0.016S
            let time = performance.now();
            let delta = (time - this.prevTime) / 1000;
            //delta = 0.016; 调试时使用此项
            //以下为了保证有过渡效果
            this.velocity.x -= this.velocity.x * 10 * delta;
            this.velocity.z -= this.velocity.z * 10 * delta;
            this.velocity.y -= 9.8 * this.downSpeed * delta; // 100.0 = mass

            //人物移动距离计算
            if (this.moveForward || this.moveBackward) {
                this.velocity.z -= this.direction.z * this.moveSpeed * delta;
            }
            if (this.moveLeft || this.moveRight) {
                this.velocity.x -= this.direction.x * this.moveSpeed * delta;
            }

            //确保人物不下落
            if (onObject === true) {
                this.velocity.y = Math.max(0, this.velocity.y);
                this.canJump = true;
            }

            //确保人物碰撞停止
            if (onWard === true) {
                if ((this.direction.x != 0)) {
                    this.velocity.x = 0;
                }
                if ((this.direction.z != 0)) {
                    this.velocity.z = 0;
                }
            }

            //人物移动
            this.controls.getObject().translateX(this.velocity.x * delta);
            this.controls.getObject().translateY(this.velocity.y * delta);
            this.controls.getObject().translateZ(this.velocity.z * delta);

            this.prevTime = time;

        }
    }

}