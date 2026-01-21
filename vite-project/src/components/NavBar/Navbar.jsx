import React from 'react'
import { navLinks } from '../../constants/navbarConstants'
import './Navbar.scss'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
    
    useGSAP(() => {
        const navTween = gsap.timeline({
            scrollTrigger: {
                trigger: "nav",
                start: "bottom top",
            },
        });

        navTween.fromTo(
            ".navbar-wrapper",
            { backgroundColor: "transparent" },
            {
                backgroundColor: "#00000050",
                backdropFilter: "blur(10px)",
                duration: 1,
                ease: "power1.inOut",
            }
        );
    });
    return (
        <nav className='navbar'>
            <div className='navbar-wrapper'>
                <a href="#home">
                    <img src="./assets/images/icons8-home.svg" alt="home-icon" />
                </a>
                <ul>
                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <a href={`#${link.id}`}>{link.label}</a>
                        </li>
                    ))}
                </ul>

            </div>
        </nav>
    )
}

export default Navbar
