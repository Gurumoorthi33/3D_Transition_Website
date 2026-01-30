"use client";
import { Product } from "@/data/products";
import { motion } from "framer-motion";

export const ProductDetails = ({ product }: { product: Product }) => {
    return (
        <section className="py-24 px-6 relative z-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">{product.detailsSection.title}</h2>
                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                        {product.detailsSection.description}
                    </p>
                    <div className="flex gap-3">
                        {product.features.map((feature, i) => (
                            <span key={i} className="px-4 py-2 rounded-full border border-white/20 text-sm text-white/80">
                                {feature}
                            </span>
                        ))}
                    </div>
                </motion.div>
                <motion.div
                    className="relative aspect-square rounded-3xl overflow-hidden bg-black/20"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Placeholder for detail image - could be a static image from the folder */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent p-12 flex items-center justify-center">
                        <span className="text-white/20 font-bold text-4xl">{product.name} Detail</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
