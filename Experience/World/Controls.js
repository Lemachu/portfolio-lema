import * as THREE from "three";
import Experience from "../experience.js";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import ASScroll from '@ashthornton/asscroll'

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room =this.experience.world.room.actualRoom;
        this.room.children.forEach((child =>{
            if(child.type === "RectAreaLight"){
                this.rectLight = child;
                this.rectLight2 = child;
            }
        }));
        this.circleFirst = this.experience.world.floor.circleFirst;
        this.circleSecond = this.experience.world.floor.circleSecond;
        this.circleThird = this.experience.world.floor.circleThird;
        GSAP.registerPlugin(ScrollTrigger);

    

        document.querySelector(".page").style.overflow = "visible";
        //document.body.style.overflow = "visible";

        this.setSmoothScroll();
        this.setScrollTrigger();
    }

    setupASScroll() {

        
    }

     setSmoothScroll() {
    }

    setScrollTrigger(){
        ScrollTrigger.matchMedia({
            //desktop
            "(min-width: 969px)": ()=> {
                //console.log(this.room);
                this.rectLight.width = 0.6;
                this.rectLight.height = 0.4;

                
                this.rectLight2.width = 0.6;
                this.rectLight2.height = 0.4;
                this.room.scale.set(0.7, 0.7, 0.7);
                this.room.position.set(0, 0, 0);

                //First section

                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        //markers: true,
                        invalidateOnRefresh: true,
                        
                    },
                });
                
                this.firstMoveTimeline.to(
                    this.room.position,
                    {
                        x: () => {
                            return this.sizes.width * 0.0014;
                        },
                    }
                );   
                
                //Second section

                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                        
                    },
                })
                    .to(
                        this.room.position, 
                        {
                           y: -5,
                        },                        
                       
                    );

                     //Third section

                    this.thirdMoveTimeline = new GSAP.timeline({
                        scrollTrigger: {
                            trigger: ".third-move",
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.6,
                            //markers: true,
                            invalidateOnRefresh: true,
                        },
                    });
                  
                       

            },
            //Mobile
            "(max-width: 968px)": ()=> {
                
                //Resets
                this.room.scale.set(0.4, 0.4, 0.4);
                this.room.position.set(0, 0, -1);
                this.rectLight.width = 0.3;
                this.rectLight.height = 0.2;
                this.room.children[57].width= 0.3;
                this.room.children[57].height= 0.3;
                //First section
                
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        //markers: true,
                        invalidateOnRefresh: true,
                    },
                }).to(this.room.scale,{
                    x: 0.6,
                    y: 0.6,
                    z: 0.6,
                });  

                //Second section

                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(
                    this.room.position, 
                    {
                       y: -5,
                    },                        
                   
                ).to(".html", {duration: 10, x: 100});

                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        //markers: true,
                        invalidateOnRefresh: true,
                    },
                });


            },

            "all": () => {
                this.sections = document.querySelectorAll(".section");
                this.sections.forEach(section=>{
                    this.progressWrapper = section.querySelector(".progress-wrapper");
                    this.progressBar = section.querySelector(".progress-bar");
                    if (section.classList.contains("right")) {
                        GSAP.to(section, {
                            borderTopLeftRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomLeftRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });
                    } else {
                        GSAP.to(section, {
                            borderTopRightRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomRightRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });
                    }
                    GSAP.from(this.progressBar, {
                        scaleY: 0,
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.4,
                            pin: this.progressWrapper,
                            pinSpacing: false,
                        },
                    });
                });
                        // All animations
                // First section -----------------------------------------
                this.firstCircle = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                    },
                }).to(this.circleFirst.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                });

                this.firstCircle = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                    },
                }).to(this.circleFirst.scale, {
                    x: 0,
                    y: 0,
                    z: 0,
                });

               
            },
        });
    
    }
    resize() {}

    update() {
        
    }
}