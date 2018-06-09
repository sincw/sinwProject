import {Detector} from '../lib/Detector';
import {Stats} from '../lib/Stats';
import {THREEx} from '../lib/THREEx';
import * as dat from 'dat.gui';
import {Control} from './control/Control.js';
import {MorbitControl} from './control/MorbitControl.js';

class Scene {
    static getInstance() {
        if (!Scene.instance) {
            Scene.instance = new Scene();
        }
        return Scene.instance;
    }

    constructor() {
        this.object = [];
        //this.addEvent();
        this.initThree();
    }

    initThree() {

        let scene = null, camera = null, renderer = null, container = null,
            controls = null, stats = null;

        // SCENE
        scene = new THREE.Scene();
        this.scene = scene;
        scene.background = new THREE.Color(0xffffff);

        // FOG
        //scene.fog = new THREE.FogExp2( 0xffffff, 0.00015 );

        // CAMERA
        let SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
        let VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
        camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
        scene.add(camera);


        // RENDERER
        if (Detector.webgl) {
            renderer = new THREE.WebGLRenderer();
        } else {
            renderer = new THREE.CanvasRenderer();
        }
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        renderer.setPixelRatio(window.devicePixelRatio);
        container = document.getElementById('container');
        document.body.appendChild(renderer.domElement);

        // EVENTS
        THREEx.WindowResize(renderer, camera);
        THREEx.FullScreen.bindKey({charCode: 'm'.charCodeAt(0)});

        // STATS
        stats = new Stats();
        document.body.appendChild(stats.dom);


        // FLOOR
        let helper = new THREE.GridHelper(1000, 50, 0x0000ff, 0x808080);
        scene.add(helper);

        //LIGGHT
        let ambientLight = new THREE.AmbientLight(0xcccccc);
        scene.add(ambientLight);
        let directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight.position.set(1, 1, 0.5).normalize();
        scene.add(directionalLight);

        this.keyboard = new THREEx.KeyboardState();
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.container = container;
        this.controls = controls;
        this.stats = stats;

        this.initSky();
    }

    initControl(load) {
        //this.controls = MorbitControl.getInstance().init(this.camera, this.scene, load);
        this.controls = Control.getInstance().init(this.camera, this.scene, load);
    }

    initSky() {
        let sky = null, sunSphere = null;
        sky = new THREE.Sky();
        sky.scale.setScalar(450000);
        sunSphere = new THREE.Mesh(
            new THREE.SphereBufferGeometry(20000, 16, 8),
            new THREE.MeshBasicMaterial({color: 0xffffff})
        );
        sunSphere.position.y = -700000;
        sunSphere.visible = false;
        this.addGeometry(sky).add(sunSphere);

        let effectController = {
            turbidity: 10,
            rayleigh: 2,
            mieCoefficient: 0.005,
            mieDirectionalG: 0.8,
            luminance: 1,
            inclination: 0.49, // elevation / inclination
            azimuth: 0.25, // Facing front,
            sun: !true
        };

        let distance = 400000;

        let guiChanged = () => {

            let uniforms = sky.material.uniforms;
            uniforms.turbidity.value = effectController.turbidity;
            uniforms.rayleigh.value = effectController.rayleigh;
            uniforms.luminance.value = effectController.luminance;
            uniforms.mieCoefficient.value = effectController.mieCoefficient;
            uniforms.mieDirectionalG.value = effectController.mieDirectionalG;

            let theta = Math.PI * (effectController.inclination - 0.5);
            let phi = 2 * Math.PI * (effectController.azimuth - 0.5);

            sunSphere.position.x = distance * Math.cos(phi);
            sunSphere.position.y = distance * Math.sin(phi) * Math.sin(theta);
            sunSphere.position.z = distance * Math.sin(phi) * Math.cos(theta);

            sunSphere.visible = effectController.sun;

            uniforms.sunPosition.value.copy(sunSphere.position);
            this.render();


        };

        let gui = new dat.GUI();


        gui.add(effectController, 'turbidity', 1.0, 20.0, 0.1).onChange(() => {
            guiChanged();
        });
        gui.add(effectController, 'rayleigh', 0.0, 4, 0.001).onChange(() => {
            guiChanged();
        });
        gui.add(effectController, 'mieCoefficient', 0.0, 0.1, 0.001).onChange(() => {
            guiChanged();
        });
        gui.add(effectController, 'mieDirectionalG', 0.0, 1, 0.001).onChange(() => {
            guiChanged();
        });
        gui.add(effectController, 'luminance', 0.0, 2).onChange(() => {
            guiChanged();
        });
        gui.add(effectController, 'inclination', 0, 1, 0.0001).onChange(() => {
            guiChanged();
        });
        gui.add(effectController, 'azimuth', 0, 1, 0.0001).onChange(() => {
            guiChanged();
        });
        gui.add(effectController, 'sun').onChange(() => {
            guiChanged();
        });
        guiChanged();

        this.sky = sky;
        this.sunSphere = sunSphere;


    }


    render() {
        //this.controls.renderHelper();
        this.renderer.render(this.scene, this.camera);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.render();
        this.update();
    }

    addGeometry(geometry) {
        this.scene.add(geometry);
        this.object.push(geometry);
        return this.scene;
    }

    update() {
        // if (this.keyboard.pressed('z')) {
        //     // do something
        // }
        this.controls.update();
        this.stats.update();

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
}

export default Scene;