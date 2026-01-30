"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { HeroSequence } from "@/components/HeroSequence";
import { ScrollLocker } from "@/components/ScrollLocker";
import { products } from "@/data/products";

export default function Home() {
  const [locked, setLocked] = useState(true);

  const product = products.find(p => p.id === 'mango') || products[0];

  useEffect(() => {
    const handleScroll = () => {
      if (!locked && window.scrollY < 10) {
        setLocked(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [locked]);

  return (
    <main className="min-h-screen bg-black selection:bg-mango-500 selection:text-black font-sans text-white">
      <div className="bg-noise fixed inset-0 z-0 pointer-events-none"></div>

      <ScrollLocker locked={locked} />

      <Navbar />

      <div className="relative z-10">
        <HeroSequence
          product={product}
          locked={locked}
          onUnlock={() => setLocked(false)}
        />
      </div>

      <div className="relative z-20 bg-black min-h-screen border-t border-white/10">

        {/* Marquee Banner */}
        <div className="w-full bg-mango-500 overflow-hidden py-4 border-y border-mango-400">
          <div className="whitespace-nowrap flex animate-marquee">
            {Array(10).fill("PURE • RAW • COLD PRESSED • 100% FRUIT • ").map((text, i) => (
              <span key={i} className="text-black font-bold text-xl md:text-2xl tracking-widest px-4 font-display">
                {text}
              </span>
            ))}
          </div>
        </div>

        {/* Introduction */}
        <div className="max-w-7xl mx-auto px-6 py-32 flex flex-col md:flex-row gap-20 items-end">
          <div className="flex-1">
            <div className="w-20 h-[1px] bg-mango-500 mb-8" />
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-white leading-[0.9] font-display">
              NATURE'S <br />
              <span className="text-outline-mango">GOLDEN</span> <br />
              HOUR.
            </h2>
          </div>
          <div className="flex-1 pb-4">
            <p className="text-xl text-white/70 leading-relaxed font-light">
              We've bottled the exact moment of perfect ripeness.
              Using <span className="text-mango-400 font-medium">HPP Technology</span>,
              we preserve the soul of the Alphonso mango without heat,
              locking in the vibrant color and enzyme-rich nutrition that nature intended.
            </p>
            <div className="mt-8 flex gap-4">
              <button className="px-8 py-3 rounded-none border border-white/20 hover:bg-white/10 transition-colors uppercase tracking-widest text-xs font-bold">
                Read Our Story
              </button>
              <button className="px-8 py-3 bg-white text-black hover:bg-white/90 transition-colors uppercase tracking-widest text-xs font-bold">
                Shop Packs
              </button>
            </div>
          </div>
        </div>

        {/* Feature Grid with HUD */}
        <div className="border-t border-white/10 relative">
          <div className="absolute top-0 right-0 p-4 border-l border-b border-white/10 w-16 h-16 pointer-events-none">
            <div className="w-2 h-2 bg-mango-500 absolute top-2 right-2 rounded-full animate-pulse"></div>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {[
              { title: "Cold Pressed", desc: "Hydraulic pressure extracts every drop.", icon: "❄️" },
              { title: "Zero Additives", desc: "No sugar. No water. Just fruit.", icon: "🌿" },
              { title: "Farm Direct", desc: "Sourced from Ratnagiri's best orchards.", icon: "🚜" }
            ].map((feature, i) => (
              <div key={i} className="p-12 hover:bg-white/5 transition-colors group cursor-default relative overflow-hidden">
                <div className="text-4xl mb-6 opacity-50 group-hover:scale-110 transition-transform duration-300 transform origin-left grayscale group-hover:grayscale-0">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 font-display uppercase tracking-wider">{feature.title}</h3>
                <p className="text-sm text-white/50">{feature.desc}</p>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-mango-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Flavor Profile Section */}
        <div className="py-32 border-t border-white/10 relative overflow-hidden">

          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            {/* Visual Chart */}
            <div className="bg-white/5 p-12 rounded-xl border border-white/10 backdrop-blur-sm relative">
              <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-white/40 mb-12">Analysis / Flavor Spectrum</h3>

              <div className="space-y-8">
                {[
                  { label: "Sweetness", val: 92 },
                  { label: "Acidity", val: 34 },
                  { label: "Body / Thickness", val: 88 },
                  { label: "Aroma", val: 96 }
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm uppercase font-bold tracking-widest text-white/80 mb-2">
                      <span>{stat.label}</span>
                      <span className="text-mango-400">{stat.val}/100</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.val}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: i * 0.1 }}
                        className="h-full bg-gradient-to-r from-mango-600 to-yellow-400"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative Grid Lines */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>
            </div>

            {/* Description */}
            <div>
              <div className="inline-block px-3 py-1 border border-mango-500/50 text-mango-400 text-[10px] font-mono uppercase tracking-widest mb-6 rounded-full">
                Sensory Profile
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6 font-display">
                LIQUID <br /> SUNSHINE.
              </h2>
              <p className="text-lg text-white/60 leading-relaxed font-light mb-8">
                The Alphonso isn't just a fruit; it's an emotion. Our extraction process captures the high-note aromatics often lost in thermal processing.
                The result is a juice with a heavy, nectar-like body and a finish that lingers on the palate.
              </p>

              <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                <div>
                  <div className="text-3xl font-display font-bold text-white">400+</div>
                  <div className="text-xs text-white/40 uppercase tracking-widest">Aromatic Compounds</div>
                </div>
                <div>
                  <div className="text-3xl font-display font-bold text-white">12°</div>
                  <div className="text-xs text-white/40 uppercase tracking-widest">Brix Levels</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Timeline */}
        <div className="py-32 bg-white/2 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white font-display uppercase">The Cold Path</h2>
            <p className="text-white/40 mt-4 tracking-widest uppercase text-xs">Farm to Bottle in 24 Hours</p>
          </div>

          <div className="relative max-w-5xl mx-auto px-6">
            {/* Line */}
            <div className="absolute left-[29px] md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10"></div>

            {[
              { step: "01", title: "Dawn Harvest", desc: "Picked at 5 AM when sugar content peaks." },
              { step: "02", title: "Cold Extraction", desc: "Hydraulic pressed to keep temperature below 4°C." },
              { step: "03", title: "HPP Treatment", desc: "6000 bar pressure kills bacteria without heat." },
              { step: "04", title: "Sealed Cold", desc: "Bottled instantly to prevent oxidation." }
            ].map((item, i) => (
              <div key={i} className={`relative flex items-center gap-12 mb-20 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Content */}
                <div className="flex-1 pl-16 md:pl-0 md:text-right">
                  <div className={`${i % 2 === 0 ? 'md:text-left' : ''}`}>
                    <span className="text-mango-500 font-mono text-xs uppercase tracking-widest mb-2 block">Step {item.step}</span>
                    <h3 className="text-2xl font-bold text-white mb-2 font-display">{item.title}</h3>
                    <p className="text-white/50">{item.desc}</p>
                  </div>
                </div>

                {/* Dot */}
                <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-[60px] h-[60px] rounded-full bg-[#111] border border-white/20 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>

                {/* Spacer for layout balance */}
                <div className="hidden md:block flex-1"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Break / Parallax Placeholder */}
        <div className="h-[50vh] relative overflow-hidden flex items-center justify-center bg-white/5 border-t border-white/10">
          <div className="absolute inset-0 bg-noise opacity-10"></div>
          <h2 className="text-[12vw] font-bold text-white/5 tracking-tighter select-none">TASTE REALITY</h2>

          {/* Simple visual element */}
          <div className="absolute w-64 h-64 bg-mango-500 rounded-full blur-[120px] opacity-20 animate-pulse-slow"></div>
        </div>

        {/* Footer Minimal */}
        <footer className="border-t border-white/10 py-20 bg-black">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter mb-8">NANO BANANA.</h2>
            <div className="flex justify-center gap-8 mb-12 text-xs uppercase tracking-widest text-white/50">
              <a href="#" className="hover:text-white transition-colors">Shop</a>
              <a href="#" className="hover:text-white transition-colors">Stories</a>
              <a href="#" className="hover:text-white transition-colors">Sustainability</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
            <p className="text-white/20 text-xs">&copy; 2024 Nano Banana Inc. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </main>
  );
}
