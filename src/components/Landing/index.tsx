"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { JSX, useRef, useState } from "react";
import useMousePosition from "@/utils/useMousePosition";

gsap.registerPlugin(useGSAP);

interface MaskProxy {
    x: number;
    y: number;
    size: number;
}

export default function Landing(): JSX.Element {
    const containerRef = useRef<HTMLElement>(null);
    const maskRef = useRef<HTMLDivElement>(null);
    const proxyRef = useRef<MaskProxy>({ x: 0, y: 0, size: 40 });
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const { x, y } = useMousePosition();

    useGSAP(
        () => {
            if (!maskRef.current || x === null || y === null) return;

            const el = maskRef.current;
            const proxy = proxyRef.current;
            const size: number = isHovered ? 420 : 40;

            gsap.to(proxy, {
                x: x - size / 2,
                y: y - size / 2,
                size,
                duration: 0.5,
                ease: "back.out(1.7)",
                overwrite: true,
                onUpdate: () => {
                    const s = el.style as CSSStyleDeclaration & {
                        webkitMaskPosition: string;
                        webkitMaskSize: string;
                    };
                    s.webkitMaskPosition = `${proxy.x}px ${proxy.y}px`;
                    s.webkitMaskSize = `${proxy.size}px`;
                },
            });
        },
        { dependencies: [x, y, isHovered], scope: containerRef }
    );

    return (
        <section className={styles.landing} ref={containerRef}>
            <div className={styles.background}>
                <p>
                    Triceratops was a large herbivorous dinosaur from the late Cretaceous period (68–66 million years ago).
                    It is known for its three horns and large frill, used for defense and display.
                    With a strong beak and teeth for tough plants, its fossils are mainly found in North America.
                </p>
            </div>

            <div className={styles.mask} ref={maskRef}>
                <p
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    Tyrannosaurus rex (T. rex) was a massive carnivorous dinosaur from the late Cretaceous period (68–66 million years ago).
                    With a huge skull, sharp teeth, and powerful bite, it was a top predator.
                    Its fossils, mainly found in North America, make it one of the most famous dinosaurs.
                </p>
            </div>
        </section>
    );
}