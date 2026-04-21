"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {JSX, useRef, useState} from "react";
import useMousePosition from "@/utils/useMousePosition";

gsap.registerPlugin(useGSAP);

interface MaskProxy {
    x: number;
    y: number;
    size: number;
}

export default function Landing(): JSX.Element {
    const landingRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const { x, y } = useMousePosition();
    const maskRef = useRef<HTMLDivElement>(null);
    const proxyRef = useRef<MaskProxy>({ x: 0, y: 0, size: 40 });

    useGSAP(() => {
        if (!maskRef.current || x === null || y === null) return;
        const el = maskRef.current;
        const proxy = proxyRef.current;
        const size: number = isHovered ? 400 : 40;

        gsap.to(proxy, {
            x: x - size / 2,
            y: y - size / 2,
            size,
            duration: 0.5,
            ease: 'back.out(1.7)',
            overwrite: true,
            onUpdate: () => {
                (el.style as CSSStyleDeclaration & { webkitMaskPosition: string; webkitMaskSize: string }).webkitMaskPosition =
                    `${proxy.x}px ${proxy.y}px`;
                (el.style as CSSStyleDeclaration & { webkitMaskSize: string }).webkitMaskSize =
                    `${proxy.size}px`;
            },
        });
    }, [x, y, isHovered]);

    return (
        <section className={styles.landing} ref={landingRef}>
            <div className={styles.mask} ref={maskRef}>
                <p
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    The Tyrannosaurus rex, often called T. rex, was one of the largest and most powerful carnivorous dinosaurs to ever live.
                    It roamed the Earth about 68–66 million years ago during the late Cretaceous period.
                    Known for its massive skull, sharp teeth, and incredibly strong bite force, T. rex was a top predator in its ecosystem.
                    Despite its tiny forearms, its powerful legs allowed it to move efficiently.
                    Fossils of T. rex have been found mainly in North America, helping scientists understand more about its behavior, diet, and role in prehistoric life.
                    Today, it remains one of the most famous and fascinating dinosaurs in history.</p>
            </div>

            <div className={styles.para}>
                <p>The Triceratops was a large, plant-eating dinosaur that lived about 68–66 million years ago during the late Cretaceous period.
                    It is easily recognized by its three horns—two above the eyes and one on the nose—and a large bony frill at the back of its head.
                    These features likely helped in defense against predators like Tyrannosaurus rex and may also have been used for display or mating purposes.
                    Triceratops had a strong beak and rows of teeth suited for cutting tough plants.
                    Fossils of this dinosaur have been mainly found in North America, making it one of the most well-known herbivorous dinosaurs.</p>
            </div>
        </section>
    );
}