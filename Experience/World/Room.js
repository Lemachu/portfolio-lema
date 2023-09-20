import * as THREE from "three";
import Experience from "../experience";
import GSAP from "gsap";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildren = {};

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1
        };

        this.setModel();
        this.setAnimation();
        this.onMouseMove();
    }

    setModel(){
        this.actualRoom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;
            //console.log(child);
            

            if(child instanceof THREE.Group){
                child.children.forEach((groupChild) =>{
                    groupChild.castShadow = true;
                    groupChild.receiveShadow = true;
                });
            }

            if (child.name === "stakloPC") {
                // console.log(child);
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness = 0;
                child.material.color.set(0xE4E4E4);
                child.material.ior = 5;
                child.material.transmission = 1;
                child.material.opacity = 1;
                child.material.depthWrite = true;
                child.material.depthTest = true;
            }

           

            if (child.name === "voda") {
                //console.log(child);
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness = 0;
                child.material.color.set(0xEBA760);
                child.material.ior = 1;
                child.material.transmission = 0.7;
                child.material.opacity = 1;
                child.material.depthWrite = false;
                child.material.depthTest = true;
            }

            if (child.name === "monitor") {
                //console.log(child);
                child.children[1].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                });
            }

            child.scale.set(0, 0, 0);
            
            if(child.name==="kockica"){
                //child.scale.set(0.2, 0.2, 0.2);
                child.position.set(0, 0.5, 0);
                child.rotation.y = Math.PI/4;
            }

            this.roomChildren[child.name.toLowerCase()] = child;

        });

        const width = 0.8;
        const height = 0.7;
        const intensity = 1;
        const rectLight = new THREE.RectAreaLight(
            0x34B816,
            intensity,
            width,
            height
        );
        rectLight.position.set(0.2, 2.5, -0.8);
        rectLight.rotation.y =- Math.PI / 3.5;
        this.actualRoom.add(rectLight);

        const width2 = 0.6;
        const height2 = 0.4;
        const rectLight2 = new THREE.RectAreaLight(
            0x34B816,
            intensity,
            width2,
            height2
        );
        rectLight2.position.set(-0.3 , 1.7 , -0.6);
        rectLight2.rotation.x =-Math.PI / 2;
        rectLight2.rotation.z =Math.PI /4.5;
        this.actualRoom.add(rectLight2);

        this.roomChildren['rectLight'] = rectLight;
        this.roomChildren['rectLight2'] = rectLight2;

        //const rectLightHelper = new RectAreaLightHelper(rectLight2);
        //rectLight.add(rectLightHelper);


        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.7, 0.7, 0.7);
        //this.actualRoom.rotation.y = Math.PI;
    }

    setAnimation(){
        this.mixer = new THREE.AnimationMixer(this.actualRoom);

    }

    onMouseMove() {
        window.addEventListener("mousemove", (e) => {
            this.rotation =
                ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation * 0.09;
        });
    }

    resize() {
        
    }

    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;
        
        this.mixer.update(this.time.delta);

        
    }
}