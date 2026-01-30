"use client";

import React, { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
import { Product } from "@/data/products";

interface ProductBottleScrollProps {
    product: Product;
    onProgress: (progress: number) => void;
}

export const ProductBottleScroll = ({ product, onProgress }: ProductBottleScrollProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);

    // We expect a long scroll area to allow smooth playback
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const frameCount = 199; // Using 200 frames (0-199 or 1-200)

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];

            // Preload a few critical frames first? No, simple loop for now
            // Improve: Load effectively.
            for (let i = 1; i <= frameCount; i++) {
                const img = new Image();
                img.src = `/images/mango/${i}.jpg`; // Hardcoded for Mango Ad focus
                // We'll trust browser cache and parallel loading
                loadedImages.push(img);
            }

            // Wait for at least first image
            loadedImages[0].onload = () => {
                setImages(loadedImages);
                setLoaded(true);
            };
            // Just set them, they will load
            setImages(loadedImages);
            setLoaded(true);
        };

        loadImages();
    }, []);

    // Render logic
    useEffect(() => {
        if (!loaded || !canvasRef.current || images.length === 0) return;

        const render = (index: number) => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const img = images[index];
            if (!img || !img.complete) return; // Skip if not loaded yet

            // Responsive cover/contain logic
            const cw = canvas.width;
            const ch = canvas.height;
            const iw = img.naturalWidth;
            const ih = img.naturalHeight;

            const targetRatio = cw / ch;
            const imgRatio = iw / ih;

            let drawW, drawH, ox, oy;

            // Cover logic for premium full screen feel
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

        // Scroll listener
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            onProgress(latest);
            const frameIndex = Math.min(
                frameCount - 1,
                Math.floor(latest * frameCount)
            );
            requestAnimationFrame(() => render(frameIndex));
        });

        // Initial render
        render(0);

        return () => unsubscribe();
    }, [loaded, scrollYProgress, images, onProgress]);

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div ref={containerRef} className="h-[500vh] relative z-0">
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
                <canvas ref={canvasRef} className="w-full h-full object-cover" />

                {/* Overlay Gradient for seamless text integration */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-40 pointer-events-none" />
            </div>
        </div>
    );
};
