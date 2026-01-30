"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export const Navbar = () => {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setScrolled(latest > 50);
    });

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/20 backdrop-blur-xl border-b border-white/5 py-2" : "bg-transparent py-6"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-yellow-400 blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        <span className="relative font-bold text-2xl tracking-tighter text-white group-hover:text-mango-400 transition-colors">
                            NANO<span className="text-mango-500">.</span>
                        </span>
                    </div>
                </Link>

                <div className="flex items-center gap-8">
                    <div className="hidden md:flex items-center gap-6 text-sm font-medium text-white/70">
                        {['Vision', 'Harvest', 'Craft'].map((item) => (
                            <Link key={item} href={`#${item.toLowerCase()}`} className="hover:text-white hover:text-shadow-glow transition-all">
                                {item}
                            </Link>
                        ))}
                    </div>

                    <button className="relative px-6 py-2 rounded-full overflow-hidden group bg-white/5 hover:bg-white/10 transition-colors border border-white/10 backdrop-blur-md">
                        <span className="relative z-10 text-white font-medium text-sm tracking-wide">ORDER NOW</span>
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-mango-600 to-yellow-500 transition-transform duration-300 ease-out opacity-20" />
                    </button>
                </div>
            </div>
        </motion.nav>
    );
};
