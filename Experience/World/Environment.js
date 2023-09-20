import * as THREE from "three";
import Experience from "../experience.js";
import GSAP from "gsap";
import GUI from 'lil-gui'; 

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        //this.gui = new GUI({ container: document.querySelector(".hero-main") });
        this.obj = {
            colorObj: { r: 0, g: 0, b: 0 },
            intensity: 3,
        };

        this.setSunlight();
        //this.setGUI();
    }

    setGUI() {
        this.gui.addColor(this.obj, "colorObj").onChange(() => {
            this.sunLight.color.copy(this.obj.colorObj);
            this.ambientLight.color.copy(this.obj.colorObj);
            console.log(this.obj.colorObj);
        });
        this.gui.add(this.obj, "intensity", 0, 10).onChange(() => {
            this.sunLight.intensity = this.obj.intensity;
            this.sunLight.ambientLight = this.obj.intensity;
        });
    }


    setSunlight() {
        this.sunLight = new THREE.DirectionalLight(0xffffff, 0.8);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 30;
        this.sunLight.shadow.mapSize.set(2048, 2048);
        this.sunLight.shadow.normalBias = 0.05;
        //const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
        //this.scene.add(helper);

        this.sunLight.position.set(-1.5, 7, 3);
        this.scene.add(this.sunLight);

        this.ambientLight = new THREE.AmbientLight(0x545454);
        this.scene.add(this.ambientLight);
    }

    switchTheme(theme){
        if(theme==="dark"){
            GSAP.to(this.sunLight.color, {
                r: 0.15,
                g: 0.15,
                b: 0.15,
            });
            GSAP.to(this.ambientLight.color, {
                r: 0.15,
                g: 0.15,
                b: 0.15,
            });
        }else{
            GSAP.to(this.sunLight.color, {
                r: 0.8,
                g: 0.8,
                b: 0.8,
            });
            GSAP.to(this.ambientLight.color, {
                r: 0.3,
                g: 0.3,
                b: 0.3,
            });
        }
    }
  
    resize() {}

    update() {}
}