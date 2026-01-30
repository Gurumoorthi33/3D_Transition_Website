"use client";

import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Product } from "@/data/products";

interface HeroSequenceProps {
    product: Product;
    locked: boolean;
    onUnlock: () => void;
}

export const HeroSequence = ({ product, locked, onUnlock }: HeroSequenceProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);

    // Core Frame State
    const [frame, setFrame] = useState(0);
    // We synchronize ref for event listeners
    const frameRef = useRef(0);

    const maxFrame = 199;

    // Load Images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            for (let i = 1; i <= 200; i++) {
                const img = new Image();
                img.src = `/images/mango/${i}.jpg`;
                loadedImages.push(img);
            }
            if (loadedImages[0]) {
                loadedImages[0].onload = () => {
                    setImages(loadedImages);
                    setLoaded(true);
                };
                // Fallback
                if (loadedImages[0].complete) {
                    setImages(loadedImages);
                    setLoaded(true);
                }
            }
        };
        loadImages();
    }, []);

    // Also: If we mount and we are UNLOCKED, we should probably set frame to max?
    // User logic: "If I scroll down back to the top header then the photo transition will be automatically reversely".
    // This implies if we are locked, we likely started at 0 OR we just re-locked at 200.
    // We trust frameRef state preservation across re-renders (since component isn't unmounted).

    // Draw Logic
    const render = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || !images[index]) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = images[index];
        if (!img.complete) return;

        const cw = canvas.width;
        const ch = canvas.height;
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;
        const targetRatio = cw / ch;
        const imgRatio = iw / ih;

        let drawW, drawH, ox, oy;
        if (imgRatio > targetRatio) {
            drawH = ch;
            drawW = ch * imgRatio;
            ox = (cw - drawW) / 2;
            oy = 0;
        } else {
            drawW = cw;
            drawH = cw / imgRatio;
            ox = 0;
            oy = (ch - drawH) / 2;
        }

        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(img, ox, oy, drawW, drawH);
    };

    // Wheel Hijack
    useEffect(() => {
        // If not locked, we don't intercept.
        if (!locked) return;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();

            const strength = 0.15;
            const delta = e.deltaY * strength;

            // Allow full range scrubbing 0 to maxFrame
            const nextFrame = Math.min(maxFrame, Math.max(0, frameRef.current + delta));

            frameRef.current = nextFrame;
            setFrame(nextFrame);

            // Logic: Unlock ONLY if we hit the END and are trying to scroll DOWN further.
            if (nextFrame >= maxFrame && e.deltaY > 0) {
                onUnlock();
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: false });
        return () => window.removeEventListener("wheel", handleWheel);
    }, [locked, onUnlock]);

    // Touch Hijack
    useEffect(() => {
        if (!locked) return;
        let startY = 0;

        const handleTouchStart = (e: TouchEvent) => {
            startY = e.touches[0].clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            const currentY = e.touches[0].clientY;
            const deltaY = startY - currentY;
            startY = currentY;

            const strength = 0.5;
            const nextFrame = Math.min(maxFrame, Math.max(0, frameRef.current + deltaY * strength));

            frameRef.current = nextFrame;
            setFrame(nextFrame);

            if (nextFrame >= maxFrame && deltaY > 0) {
                onUnlock();
            }
        };

        window.addEventListener("touchstart", handleTouchStart, { passive: false });
        window.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
        };
    }, [locked, onUnlock]);

    // Render loop
    useEffect(() => {
        if (loaded) {
            requestAnimationFrame(() => render(Math.floor(frame)));
        }
    }, [frame, loaded]);

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                render(Math.floor(frameRef.current));
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [loaded]);

    const progress = Math.min(100, Math.floor((frame / maxFrame) * 100));

    return (
        <div ref={containerRef} className="relative h-screen w-full bg-black overflow-hidden z-0">
            {/* Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0" />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none z-10" />

            {/* Static Content Overlay - Editorial Layout */}
            <div className="absolute inset-0 z-20 pointer-events-none p-8 flex flex-col justify-between">
                <AnimatePresence>
                    {progress < 90 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 1 }} // Keep exit 1 for smoother mix blend transition? No, fade out text to clearly show bottle
                            transition={{ duration: 0.5 }}
                            className="w-full h-full flex flex-col justify-between"
                        >
                            {/* Top Technical Specs */}
                            <div className="flex justify-between items-start opacity-70 mix-blend-difference text-white">
                                <div className="text-xs font-mono uppercase tracking-widest space-y-1">
                                    <div>Ver: 2.0.4</div>
                                    <div>Batch: A-992</div>
                                    <div>Origin: Ratnagiri</div>
                                </div>
                                <div className="text-xs font-mono uppercase tracking-widest text-right">
                                    <div>Vol: 300ml</div>
                                    <div>Temp: 4°C</div>
                                </div>
                            </div>

                            {/* Center Title */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <h1 className="text-[20vw] font-bold text-white tracking-tighter leading-none opacity-20 select-none mix-blend-overlay">
                                    MANGO
                                </h1>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Progress / Unlock UI */}
            <div className="absolute bottom-12 left-0 right-0 z-30 flex flex-col items-center justify-center pointer-events-none px-6">
                <AnimatePresence mode="wait">
                    {locked ? (
                        <motion.div
                            key="locked"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex flex-col items-center gap-4 w-full max-w-md"
                        >
                            <div className="flex justify-between w-full text-[10px] font-mono uppercase tracking-[0.2em] text-white/50">
                                <span>Extraction</span>
                                <span>{progress}%</span>
                            </div>
                            <div className="w-full h-[2px] bg-white/10 relative overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-mango-600 to-yellow-400 box-shadow-[0_0_20px_rgba(255,179,0,0.5)]"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <span className="text-[10px] uppercase tracking-widest text-white/30 animate-pulse">
                                Step 1: Extract
                            </span>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="unlocked"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: "spring", bounce: 0.5 }}
                            className="flex flex-col items-center cursor-pointer pointer-events-auto"
                            onClick={onUnlock}
                        >
                            <div className="flex flex-col items-center animate-bounce-slow">
                                <span className="text-[10px] font-bold tracking-[0.4em] text-mango-400 uppercase mb-2">Complete</span>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" className="opacity-80">
                                    <path d="M12 4v16m0 0l-6-6m6 6l6-6" />
                                </svg>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
