import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./Certifications.scss";

gsap.registerPlugin(ScrollTrigger);

const Certifications = () => {
    const sectionRef = useRef(null);

    useGSAP(
        () => {

            const rooti = sectionRef.current;
            if (!rooti) return;

            const imgs = gsap.utils.toArray(".right .slide img", rooti);
            const cleanups = [];

            imgs.forEach((img) => {
                // perspective for 3D tilt
                gsap.set(img, {
                    transformPerspective: 650,
                    transformOrigin: "50% 50%",
                    willChange: "transform",
                });

                const rx = gsap.quickTo(img, "rotationX", { duration: 0.25, ease: "power3.out" });
                const ry = gsap.quickTo(img, "rotationY", { duration: 0.25, ease: "power3.out" });
                const tx = gsap.quickTo(img, "x", { duration: 0.25, ease: "power3.out" });
                const ty = gsap.quickTo(img, "y", { duration: 0.25, ease: "power3.out" });

                const onMove = (e) => {
                    const r = img.getBoundingClientRect();
                    const px = (e.clientX - r.left) / r.width;
                    const py = (e.clientY - r.top) / r.height;

                    rx(gsap.utils.interpolate(15, -15, py));
                    ry(gsap.utils.interpolate(-15, 15, px));
                    tx(gsap.utils.interpolate(-30, 30, px));
                    ty(gsap.utils.interpolate(-30, 30, py));
                };

                const onLeave = () => {
                    rx(0); ry(0); tx(0); ty(0);
                };

                img.addEventListener("pointermove", onMove);
                img.addEventListener("pointerleave", onLeave);

                cleanups.push(() => {
                    img.removeEventListener("pointermove", onMove);
                    img.removeEventListener("pointerleave", onLeave);
                });
            });

















            const root = sectionRef.current;
            if (!root) return;

            const list = root.querySelector(".certification-list");
            const fill = root.querySelector(".fill");

            const listItems = gsap.utils.toArray("li", list);
            const slides = gsap.utils.toArray(".slide", root);

            const count = Math.min(listItems.length, slides.length);
            if (!count) return;

            // --- init ---
            gsap.set(slides, { autoAlpha: 0 });
            gsap.set(listItems, { clearProps: "color" });

            // CSS class drives colors (cheaper & reversible)
            listItems.forEach((li) => li.classList.remove("active"));
            listItems[0]?.classList.add("active");
            slides[0] && gsap.set(slides[0], { autoAlpha: 1 });

            // fill
            const minScale = 1 / count;
            const setFillScale = fill ? gsap.quickSetter(fill, "scaleY") : null;
            if (fill) gsap.set(fill, { transformOrigin: "top left", scaleY: minScale });

            let activeIndex = 0;

            const showIndex = (next) => {
                if (next === activeIndex) return;

                listItems[activeIndex]?.classList.remove("active");
                listItems[next]?.classList.add("active");

                slides[activeIndex] &&
                    gsap.to(slides[activeIndex], { autoAlpha: 0, duration: 0.2, overwrite: true });
                slides[next] &&
                    gsap.to(slides[next], { autoAlpha: 1, duration: 0.2, overwrite: true });

                activeIndex = next;
            };

            const st = ScrollTrigger.create({
                trigger: root,
                start: "top top",
                end: "+=" + count * 80 + "%",
                pin: true,
                scrub: true,
                // pinSpacing: false,
                // optional snap (nice for steps):
                // snap: { snapTo: 1 / (count - 1), duration: 0.2, ease: "power2.out" },
                onUpdate(self) {
                    // smooth fill (no extra ScrollTrigger)
                    if (setFillScale) setFillScale(minScale + self.progress * (1 - minScale));

                    // active step (works both directions)
                    const idx = Math.round(self.progress * (count - 1));
                    showIndex(idx);
                },
            });

            return () => st.kill();
        },
        { scope: sectionRef }
    );

    return (
        <section className="section pin-section" ref={sectionRef}>
            <div className="certification-header">
                <p className="sub-heading">03. CERTIFICATIONS</p>
                <h2>CERTIFICATIONS AND HONORS</h2>
                <p className="certification-description">
                    Skill milestones that back up the work—verified knowledge in development, architecture, and deployment best practices.
                </p>
            </div>
            <div className="content">
                <ul className="certification-list">
                    <li>AWS - Developer Associate</li>
                    <li>CDW Certified UI Developer</li>
                    <li>Sailpoint Ambassador</li>
                </ul>

                <div className="fill" />

                <div className="right">
                    <div className="slide center">
                        <img src="/assets/images/AWS_Certification.jpg" alt="" />
                    </div>
                    <div className="slide center">
                        <img src="/assets/images/UIBC.png" alt="" />
                    </div>
                    <div className="slide center">
                        <img src="/assets/images/sailpointAmbassador.png" alt="" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Certifications;
