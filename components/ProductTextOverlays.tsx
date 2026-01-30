"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import React, { useRef } from "react";
import { Product } from "@/data/products";

export const ProductTextOverlays = ({ product }: { product: Product }) => {
    // We need to sync with the same scroll container as the bottle.
    // Since this component is likely placed absolutely over the sticky bottle or 
    // inside the same container, we can use the same scroll progress mechanism
    // OR we pass the ref. But simpler is to assume it sits in the same 500vh container space.
    // Actually, the prompt implies "Display 4 text sections... fade In/Out based on scroll progress".
    // Best practice: component hooks into common scroll context or we pass progress.

    // Since the wrapper in page.tsx will likely contain both, we can't easily share the Ref unless lifted.
    // However, `useScroll` defaults to window scroll unless container is specified.
    // The logic implies the TextOverlays are Fixed/Sticky on top of the canvas, changing as we scroll.
    // So they should be inside the Sticky container or synchronized.

    // Let's implement independent sections that just fade in/out at specific scroll points
    // assuming the parent is the `h-[500vh]` container.

    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    const sections = [product.section1, product.section2, product.section3, product.section4];

    // Define scroll ranges for each section
    // 0.0 - 0.2: Section 1
    // 0.25 - 0.45: Section 2
    // 0.5 - 0.7: Section 3
    // 0.75 - 0.95: Section 4

    return (
        <div ref={targetRef} className="absolute inset-0 pointer-events-none h-full w-full"> {/* Matches the 500vh parent */}
            {sections.map((section, idx) => {
                const start = 0.1 + (idx * 0.25);
                const end = start + 0.15;

                const opacity = useTransform(
                    scrollYProgress,
                    [start - 0.05, start, end, end + 0.05],
                    [0, 1, 1, 0]
                );

                const y = useTransform(
                    scrollYProgress,
                    [start - 0.05, start, end, end + 0.05],
                    [50, 0, 0, -50]
                );

                return (
                    <motion.div
                        key={idx}
                        style={{ opacity, y }}
                        className="fixed top-1/2 left-0 right-0 -translate-y-1/2 flex flex-col items-center justify-center text-center px-4 z-20"
                    >
                        <h2 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-6 drop-shadow-2xl">
                            {section.title}
                        </h2>
                        <h3 className="text-2xl md:text-3xl text-white/80 max-w-2xl font-light">
                            {section.subtitle}
                        </h3>
                    </motion.div>
                );
            })}
        </div>
    );
};
