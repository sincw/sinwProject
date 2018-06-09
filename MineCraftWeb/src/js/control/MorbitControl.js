export class MorbitControl {

    static getInstance() {
        if (!MorbitControl.instance) {
            MorbitControl.instance = new MorbitControl();
        }
        return MorbitControl.instance;
    }

    constructor() {
        this.addEvent();

    }

    /*
    * @des 初始化
    * @param camera 相机
    * @return
    */
    init(camera, scene, lord){
        let blocker = document.getElementById('blocker');
        document.body.removeChild(blocker);
        camera.position.set(-400, 400, 800);
        camera.lookAt(scene.position);
        this.camera = camera;
        this.scene = scene;
        this.lord = lord;
        let controls = new THREE.OrbitControls(camera);
        this.controls = controls;
        this.addHelper();
        return this;
    }

    addHelper(){
        let geometry = new THREE.CylinderGeometry(0, 20, 100, 3);
        geometry.translate(0, 50, 0);
        geometry.rotateX(Math.PI / 2);
        let helper1 = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
        //this.scene.add(helper1);
        this.helper1 = helper1;
    }

    renderHelper() {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        let intersects = this.raycaster.intersectObject(this.lord);
        if (intersects.length > 0) {

            this.helper1.position.set(0, 0, 0);
            this.helper1.lookAt(intersects[0].face.normal);

            this.helper1.position.copy(intersects[0].point);

        }
    }

    addEvent() {
        this.object = [];
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.INTERSECTED = null;
        document.addEventListener('mousemove', (event) => {
            event.preventDefault();
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        }, false);
    }

    /*
    * @des 控制器更新方法
    * @param
    * @return
    */
    update() {
        this.controls.update();
    }
}