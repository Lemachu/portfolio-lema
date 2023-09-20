import { EventEmitter } from "events";
import Experience from "./experience.js";
import GSAP from "gsap";
import convert from "./Utils/convertDivsToSpans.js";



export default class Preloader extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;

        this.sizes.on("switchdevice", (device) => {
            this.device = device;
        });

        this.world.on("worldready", () => {
            this.setAssets();
            this.playIntro();
        });
    }

    setAssets(){
        
        convert(document.querySelector(".intro-text"));
        convert(document.querySelector(".hero-main-title"));
        convert(document.querySelector(".hero-main-description"));
        convert(document.querySelector(".first-sub"));
        convert(document.querySelector(".second-sub"));

        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
        //console.log(this.roomChildren);
    }

    firstIntro(){
        return new Promise ((resolve) => {
            this.timeline = new GSAP.timeline();
            this.timeline.set(".animatedis", {
                y: 0,
                yPercent: 100,
            });
            this.timeline.to(".preloader",{
                opacity: 0,
                delay: 0.5,
                onComplete: () => {
                    document.querySelector(".preloader").classList.add("hidden");
                }
            });
            //console.log(this.device);
            if(this.device === "desktop"){
                this.timeline.to(this.roomChildren.kockica.scale,{
                    x: 0.4,
                    y: 0.4,
                    z: 0.4,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                }).to(this.room.position, {
                    x: -1.7,
                    ease: "power1.out",
                    duration: 0.7,
                });
            }else{
                this.timeline.to(this.roomChildren.kockica.scale,{
                    x: 0.5,
                    y: 0.5,
                    z: 0.5,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                }).to(this.room.position, {
                    z: -2,
                    ease: "power1.out",
                    duration: 0.7,
                    
                });
            }
            this.timeline.to(".intro-text .animatedis", {
                yPercent: 0,
                stagger: 0.07,
                ease: "back.out(1.2)",
            }).to(".arrow-svg-wrapper", {
                opacity: 1,
            },"same").to(".toggle-bar", {
                opacity: 1,
                onComplete: resolve,
            },"same");
        });
        
        
    }

    secondIntro(){
        return new Promise ((resolve) => {
        this.secondTimeline = new GSAP.timeline();
        console.log(this.device);
        
            
        this.secondTimeline.to(".intro-text .animatedis", {
            yPercent: 100,
            stagger: 0.07,
            ease: "back.in(1.2)",
        },"fadeout").to(".arrow-svg-wrapper", {
            opacity: 0,
        },"fadeout");

        if(this.device === "desktop"){
            this.secondTimeline.set(this.room.position, {
                x: 0,
                y: 0,
                z: 0,
                ease: "power1.out",
                
            },"same");
        }else{
            this.secondTimeline.set(this.room.position, {
                x: 0,
                y: 0,
                z: -1,
                ease: "power1.out",
                
            },"same");
        }
            this.secondTimeline.to(this.roomChildren.kockica.rotation, {
                y: 2*Math.PI + Math.PI/4,
            },"same").to(this.roomChildren.kockica.scale, {
                x: 2,
                y: 2,
                z: 2,
            },"same").to(this.camera.orthographicCamera.position, {
                y: 2.5,
            },"same").to(this.roomChildren.kockica.position, {
                y: 2.5,
                z: 1.3243,
                x: 0,
            },"same").set(this.roomChildren.floor.scale, {
                x: 1,
                y: 1,
                z: 1,
            }).set(this.roomChildren.wall.scale, {
                x: 1,
                y: 1,
                z: 1,
            }).set(this.roomChildren.parket.scale, {
                x: 1,
                y: 1,
                z: 1,
            }).to(this.roomChildren.kockica.scale, {
                x: 0,
                y: 0,
                z: 0,
                duration: 0.5,
            },"introtext").to(".hero-main-title .animatedis", {
                yPercent: 0,
                stagger: 0.03,
                ease: "back.out(1.7)",
            },"introtext").to(".hero-main-description .animatedis", {
                yPercent: 0,
                stagger: 0.03,
                ease: "back.out(1.7)",
            },"introtext").to(".first-sub .animatedis", {
                yPercent: 0,
                stagger: 0.03,
                ease: "back.out(1.7)",
            },"introtext").to(".second-sub .animatedis", {
                yPercent: 0,
                stagger: 0.03,
                ease: "back.out(1.7)",
            },"introtext")
       .to(this.roomChildren.josprozora.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },">-0.6").to(this.roomChildren.prozor.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },">-0.6").to(this.roomChildren.staklaprozor.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },">-0.6").to(this.roomChildren.nogeodstola.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },">-0.6").to(this.roomChildren.sto.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },">-0.6").to(this.roomChildren.ladica.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            }).to(this.roomChildren.podloga.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },"same3").to(this.roomChildren.tastatura001.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "power1.out",
                duration: 0.5,
            },"same4").to(this.roomChildren.tastaturatipke.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "power1.out",
                duration: 0.5,
            },"same4").to(this.roomChildren.mis.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "power1.out",
                duration: 0.5,
            },"same4").to(this.roomChildren.pccase.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "power1.out",
                duration: 0.5,
            },"same4").to(this.roomChildren.staklopc.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "power1.out",
                duration: 0.5,
            },"same4").to(this.roomChildren.circle.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },">-0.6").to(this.roomChildren.monitor.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "power1.out",
                duration: 0.5,
            },"same4").to(this.roomChildren.polica.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },">-0.6").to(this.roomChildren.vrecasjedenje.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },"same3").to(this.roomChildren.vreca.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },"same3").to(this.roomChildren.kanta.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },"same3").to(this.roomChildren.pero.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "power1.out",
                duration: 0.5,
            },"same5").to(this.roomChildren.ledsvjetla.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "power1.out",
                duration: 0.5,
            },"same5").to(this.roomChildren.slike.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "power1.out",
                duration: 0.5,
            },"same5").to(this.roomChildren.knjiga.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },"same6").to(this.roomChildren.skecbuk.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },"same6").to(this.roomChildren.zvucnik.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },"same6").to(this.roomChildren.zvucnik2.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },"same6").to(this.roomChildren.pencilholder.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },"same6").to(this.roomChildren.olovke.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },"same6").to(this.roomChildren.nudledodatak.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },"same6").to(this.roomChildren.nudle.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },"same6").to(this.roomChildren.voda.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },"same6").to(this.roomChildren.kaktus.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },"same6").to(this.roomChildren.knjigica.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },"same6").to(this.roomChildren.vazna001.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },"same6").to(this.roomChildren.vazna002.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },"same6").to(this.roomChildren.sat003.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },"same6").to(this.roomChildren.nurbspath001.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },"same7").to(this.roomChildren.nurbspath002.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },"same7").to(this.roomChildren.nurbspath003.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },"same7").to(this.roomChildren.list2.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },"same7").to(this.roomChildren.list3.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },"same7").to(this.roomChildren.list4.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },"same7").to(this.roomChildren.list5.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },"same7").to(this.roomChildren.list6.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },"same7").to(this.roomChildren.list7.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },"same7").to(this.roomChildren.list8.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },"same7").to(this.roomChildren.minjedinice.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },"same7").to(this.roomChildren.mindesetice.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },"same7").to(this.roomChildren.tacke.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },"same7").to(this.roomChildren.satijedinice.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },"same7").to(this.roomChildren.satidesetice.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },"same7").to(this.roomChildren.stolica.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "power2.out",
                duration: 0.5,
            },"same8").to(this.roomChildren.stolica.rotation, {
                y: 4*Math.PI+Math.PI/4,
                ease: "power2.out",
                duration: 1,
                
            },"same8").to(".arrow-svg-wrapper", {
                opacity: 1,
                onComplete: resolve,
            });    
     });
    }

    onScroll(e) {
        if (e.deltaY > 0) {
            this.removeEventListeners();
            this.playSecondIntro();
        }
    }

    onTouch(e) {
        this.initalY = e.touches[0].clientY;
    }

    onTouchMove(e) {
        let currentY = e.touches[0].clientY;
        let difference = this.initalY - currentY;
        if (difference > 0) {
            console.log("swipped up");
            this.removeEventListeners();
            this.playSecondIntro();
        }
        this.initalY = null;
    }

    removeEventListeners() {
        window.removeEventListener("wheel", this.scrollOnceEvent);
        window.removeEventListener("touchstart", this.touchStart);
        window.removeEventListener("touchmove", this.touchMove);
    }

    
    async playIntro() {
        //document.querySelector(".page").style.overflow = "hidden";
        document.body.style.overflow = "hidden";

        this.scaleFlag = true;
        await this.firstIntro();
        this.moveFlag = true;
        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);


        window.addEventListener("wheel", this.scrollOnceEvent);
        window.addEventListener("touchstart", this.touchStart);
        window.addEventListener("touchmove", this.touchMove);
    }

    async playSecondIntro() {

        this.moveFlag = false;
        await this.secondIntro();
        this.scaleFlag = false;
        //document.querySelector(".page").style.overflow = "visible";
        document.body.style.overflow = "visible";
        
        this.emit("enablecontrols");
    }


    move(){
        if(this.device==="desktop"){
            this.room.position.set(-1.7, 0, 0);
        }else{
            this.room.position.set(0, 0, -2);
        }
    }

    scale(){
       
        this.roomChildren.rectLight2.width = 0;
        this.roomChildren.rectLight2.height = 0;

        if(this.device==="desktop"){
            this.room.scale.set(0.7, 0.7, 0.7);
        }else{
            this.room.scale.set(0.4, 0.4, 0.4);
        }
    }

    update() {
        if (this.moveFlag) {
            this.move();
        }

        if (this.scaleFlag) {
            this.scale();
        }
    }
}