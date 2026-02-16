import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/all";
import "./TechStack.scss";




gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
//Frontend icons
const reactIcon = "/assets/images/tech-icons/reactjsIcon.svg";
const htmlIcon = "/assets/images/tech-icons/htmlIcon.svg";
const cssIcon = "/assets/images/tech-icons/cssIcon.svg";
const jsIcon = "/assets/images/tech-icons/javascriptIcon.svg";
const tsIcon = "/assets/images/tech-icons/typescriptIcon.svg";
const jqueryIcon = "/assets/images/tech-icons/jqueryIcon.svg";
const tailwindIcon = "/assets/images/tech-icons/tailwindIcon.svg";
const gsapIcon = "/assets/images/tech-icons/gsapIcon.svg";
const sassIcon = "/assets/images/tech-icons/sassIcon.svg";

//Backend icons
const javaIcon = "/assets/images/tech-icons/javaIcon.svg";
const springIcon = "/assets/images/tech-icons/springIcon.svg";
const apiIcon = "/assets/images/tech-icons/apiIcon.svg";
const junitIcon = "/assets/images/tech-icons/junitIcon.svg"; 
const swaggerIcon = "/assets/images/tech-icons/swaggerIcon.svg";  
const microservicesIcon = "/assets/images/tech-icons/microservicesIcon.svg";

// Database icons
const postgresIcon = "/assets/images/tech-icons/postgresIcon.svg";
const mongoIcon = "/assets/images/tech-icons/mongoIcon.svg";
const redisIcon = "/assets/images/tech-icons/redisIcon.svg";
const mysqlIcon = "/assets/images/tech-icons/mysqlIcon.svg";
const h2Icon = "/assets/images/tech-icons/h2Icon.svg";

//Cloud & DevOps icons
const awsIcon = "/assets/images/tech-icons/awsIcon.svg";
const s3Icon = "/assets/images/tech-icons/s3Icon.svg";
const ec2Icon = "/assets/images/tech-icons/ec2Icon.svg";
const lambdaIcon = "/assets/images/tech-icons/lambdaIcon.svg";
const cloudfrontIcon = "/assets/images/tech-icons/cloudfrontIcon.svg";
const dynamoDbIcon = "/assets/images/tech-icons/dynamodbIcon.svg";
const dockerIcon = "/assets/images/tech-icons/dockerIcon.svg";
const githubActionsIcon = "/assets/images/tech-icons/githubActionsIcon.svg";
const ciCdIcon = "/assets/images/tech-icons/ciCdIcon.svg";

// Tools icons
const postmanIcon = "/assets/images/tech-icons/postmanIcon.svg";
const eclipseIcon = "/assets/images/tech-icons/eclipseIcon.svg";
const vscodeIcon = "/assets/images/tech-icons/vscodeIcon.svg";
const figmaIcon = "/assets/images/tech-icons/figmaIcon.svg";
const msOfficeIcon = "/assets/images/tech-icons/msOfficeIcon.svg";
const jiraIcon = "/assets/images/tech-icons/jiraIcon.svg";

const SECTIONS = [
    { label: "FRONTEND", techs: ["React.js", "HTML", "CSS", "Java Script", "Type Script", "JQuery", "Tailwind", "GSAP", "SASS"] },
    { label: "BACKEND", techs: ["Java", "Spring Boot", "Spring MVC", "Spring Security", "REST APIs", "JUnit", "Micro services", "Swagger"] },
    { label: "DATABASE", techs: ["Postgre SQL", "MongoDB", "Redis", "MySQL", "H2"] },
    { label: "CLOUD & DEVOPS", techs: ["AWS", "S3", "EC2", "Lambda", "CloudFront", "Dynamo DB", "Docker", "GitHub Actions", "CI/CD"] },
    { label: "Tools", techs: ["Postman", "Eclipse", "Visual Studio Code", "Figma", "MS Office", "JIRA"] },
];

const TECH_ICONS = {
    "React.js": reactIcon,
    "HTML": htmlIcon,
    "CSS": cssIcon,
    "Java Script": jsIcon,
    "Type Script": tsIcon,
    "JQuery": jqueryIcon,
    "Tailwind": tailwindIcon,
    "GSAP": gsapIcon,
    "SASS": sassIcon,
    "Spring Boot": springIcon,
    "Spring MVC": springIcon,
    "Spring Security": springIcon,
    "Swagger": swaggerIcon,
    "REST APIs": apiIcon,
    "JUnit" : junitIcon,
    "Java" : javaIcon,
    "Micro services" : microservicesIcon,
    "Postgre SQL": postgresIcon,
    "MongoDB": mongoIcon,
    "Redis": redisIcon,
    "MySQL": mysqlIcon,
    "H2": h2Icon,
    "AWS": awsIcon,
    "S3": s3Icon,
    "EC2": ec2Icon,
    "Lambda": lambdaIcon,
    "CloudFront": cloudfrontIcon,
    "Dynamo DB": dynamoDbIcon,
    "Docker": dockerIcon,
    "GitHub Actions": githubActionsIcon,
    "CI/CD": ciCdIcon,
    "Postman": postmanIcon,
    "Eclipse": eclipseIcon,
    "Visual Studio Code": vscodeIcon,
    "Figma": figmaIcon,
    "MS Office": msOfficeIcon,
    "JIRA": jiraIcon,
};


const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export default function TechStack() {
    const sectionRef = useRef(null);
    const viewportRef = useRef(null);
    const worldRef = useRef(null);

    useEffect(() => {
        const sectionEl = sectionRef.current;
        const viewportEl = viewportRef.current;
        const worldEl = worldRef.current;
        if (!sectionEl || !viewportEl || !worldEl) return;

        const CONFIG = {
            starCount: 150,
            zGap: 800,
            camSpeed: 2.5,
            internalLerp: 0.12,
            velLerp: 0.18,
            velScale: 0.00035,
            velClamp: 1.25,
            tiltMul: 45,
            shadowMul: 40,
        };

        worldEl.innerHTML = "";

        const items = [];
        let idx = 0;
        const totalCount = SECTIONS.reduce((acc, s) => acc + 1 + s.techs.length, 0);

        const pushText = (label) => {
            const el = document.createElement("div");
            el.className = "hs-item";
            const txt = document.createElement("div");
            txt.className = "hs-big-text";
            txt.innerText = label;
            el.appendChild(txt);
            worldEl.appendChild(el);
            items.push({ el, type: "text", x: 0, y: 0, rot: 0, baseZ: -idx * CONFIG.zGap });
            idx++;
        };

        const pushCard = (domain, tech) => {
            const el = document.createElement("div");
            el.className = "hs-item";

            const card = document.createElement("div");
            card.className = "hs-card";

            const randId = Math.floor(Math.random() * 9999);
            const iconSrc = TECH_ICONS[tech]; // ✅ get icon for this tech

            card.innerHTML = `
                <div class="hs-card-header">
                <span class="hs-card-id">ID-${randId}</span>
                <div class="hs-dot"></div>
                </div>
                <h2>${tech}</h2>
                <div class="hs-card-meta">DOMAIN: ${domain}</div>
                 ${iconSrc ? `<img class="hs-tech-icon" src="${iconSrc}" alt="${tech} icon" loading="lazy" />` : ""}
                <div class="hs-card-footer">
                <span>GRID: ${Math.floor(Math.random() * 10)}x${Math.floor(Math.random() * 10)}</span>
                <span>DATA_SIZE: ${(Math.random() * 100).toFixed(1)}MB</span>
                </div>
                <div class="hs-card-ghost">0${idx}</div>
            `;

            el.appendChild(card);
            worldEl.appendChild(el);

            const angle = (idx / totalCount) * Math.PI * 6;
            const x = Math.cos(angle) * (window.innerWidth * 0.3);
            const y = Math.sin(angle) * (window.innerHeight * 0.3);
            const rot = (Math.random() - 0.5) * 30;

            items.push({ el, type: "card", x, y, rot, baseZ: -idx * CONFIG.zGap });
            idx++;
        };


        SECTIONS.forEach((s) => {
            pushText(s.label);
            s.techs.forEach((t) => pushCard(s.label, t));
        });

        const totalDepth = Math.max(0, (idx - 1) * CONFIG.zGap);
        const scrollRangePx = Math.max(1, totalDepth / CONFIG.camSpeed);

        // stars
        for (let i = 0; i < CONFIG.starCount; i++) {
            const el = document.createElement("div");
            el.className = "hs-star";
            worldEl.appendChild(el);
            items.push({
                el,
                type: "star",
                x: (Math.random() - 0.5) * 3000,
                y: (Math.random() - 0.5) * 3000,
                baseZ: -Math.random() * totalDepth,
            });
        }

        // state
        const internal = { value: 0, target: 0 };
        const vel = { v: 0, target: 0 };
        const mouse = { x: 0, y: 0 };

        const onMouseMove = (e) => {
            mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
            mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener("mousemove", onMouseMove, { passive: true });

        const smoother = ScrollSmoother.get();
        const scrollerEl = smoother ? smoother.wrapper() : undefined;

        const st = ScrollTrigger.create({
            trigger: sectionEl,
            scroller: scrollerEl,
            start: "top top",
            end: () => `+=${scrollRangePx}`,
            pin: true,
            // pinSpacing: true,
            scrub: true,
            // anticipatePin: 1,
            invalidateOnRefresh: true,
            // onLeaveBack: () => gsap.set(sectionEl, { zIndex: 0 }),

            onUpdate: (self) => {
                internal.target = self.progress * scrollRangePx;

                // KEY FIX: clamp velocity so tilt doesn’t explode
                const v = self.getVelocity() * CONFIG.velScale;
                vel.target = clamp(v, -CONFIG.velClamp, CONFIG.velClamp);
            },
        });

        const render = () => {
            internal.value += (internal.target - internal.value) * CONFIG.internalLerp;
            vel.v += (vel.target - vel.v) * CONFIG.velLerp;

            const cameraZ = internal.value * CONFIG.camSpeed;

            // KEY FIX: smaller tilt multipliers (no flipping)
            const tiltX = mouse.y * 5 - vel.v * CONFIG.tiltMul;
            const tiltY = mouse.x * 5;

            worldEl.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

            const baseFov = 1000;
            const fov = baseFov - Math.min(Math.abs(vel.v) * 260, 600);
            viewportEl.style.perspective = `${fov}px`;

            items.forEach((item) => {
                const vizZ = item.baseZ + cameraZ;

                let alpha = 1;
                if (vizZ < -3000) alpha = 0;
                else if (vizZ < -2000) alpha = (vizZ + 3000) / 1000;
                if (vizZ > 100 && item.type !== "star") alpha = 1 - (vizZ - 100) / 400;

                alpha = clamp(alpha, 0, 1);
                item.el.style.opacity = alpha;
                if (alpha <= 0) return;

                let trans = `translate3d(${item.x || 0}px, ${item.y || 0}px, ${vizZ}px)`;

                if (item.type === "star") {
                    const stretch = Math.max(1, Math.min(1 + Math.abs(vel.v) * 18, 10));
                    trans += ` scale3d(1, 1, ${stretch})`;
                } else if (item.type === "text") {
                    trans += ` rotateZ(${item.rot || 0}deg)`;
                    if (Math.abs(vel.v) > 0.02) {
                        const offset = clamp(vel.v * CONFIG.shadowMul, -40, 40);
                        item.el.style.textShadow = `${offset}px 0 var(--hs-accent), ${-offset}px 0 #ffffff`;
                    } else {
                        item.el.style.textShadow = "none";
                    }
                } else {
                    const t = gsap.ticker.time;
                    const float = Math.sin(t + (item.x || 0)) * 10;
                    trans += ` rotateZ(${item.rot || 0}deg) rotateY(${float}deg)`;
                }

                item.el.style.transform = trans;
            });
        };

        gsap.ticker.add(render);

        ScrollTrigger.refresh();

        return () => {
            gsap.ticker.remove(render);
            window.removeEventListener("mousemove", onMouseMove);
            st.kill();
            worldEl.innerHTML = "";
        };
    }, []);

    return (
        <section ref={sectionRef} className="hs-section">
            <div className="certification-header">
                <p className="sub-heading">03.  TECH STACK</p>
                <h2>TOOLS I BUILD WITH</h2>
                <p className="certification-description">
                    A curated set of technologies I use to ship fast, scalable products—clean UI, solid backend, reliable cloud, and automation.
                </p>
            </div>
            <div ref={viewportRef} className="hs-viewport">
                <div ref={worldRef} className="hs-world" />
            </div>
        </section>
    );
}
