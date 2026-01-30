"use client";
import { Product } from "@/data/products";
import { motion } from "framer-motion";

export const Freshness = ({ product }: { product: Product }) => {
    return (
        <section className="py-24 px-6 relative z-10 bg-black/20 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-orange-400 font-bold tracking-wider uppercase text-sm mb-2 block">Our Promise</span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
                        {product.freshnessSection.title}
                    </h2>
                    <p className="text-xl text-gray-300 leading-relaxed">
                        {product.freshnessSection.description}
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
