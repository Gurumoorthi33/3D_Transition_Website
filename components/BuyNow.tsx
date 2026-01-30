"use client";
import { Product } from "@/data/products";
import { motion } from "framer-motion";

export const BuyNow = ({ product }: { product: Product }) => {
    return (
        <section className="py-24 px-6 relative z-10">
            <div className="max-w-6xl mx-auto bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="text-xs font-bold tracking-widest text-white/60 mb-2 block uppercase">Order Now</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">{product.name}</h2>
                        <p className="text-xl text-white/80 mb-8">{product.subName}</p>

                        <div className="flex items-baseline gap-2 mb-8">
                            <span className="text-5xl font-bold text-orange-400">{product.buyNowSection.price}</span>
                            <span className="text-gray-400">{product.buyNowSection.unit}</span>
                        </div>

                        <div className="space-y-4 mb-8">
                            {product.buyNowSection.processingParams.map((param, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-300">{param}</span>
                                </div>
                            ))}
                        </div>

                        <button className="w-full bg-white text-black font-bold text-lg py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all hover:bg-gray-100">
                            Add to Cart
                        </button>
                        <p className="mt-4 text-center text-sm text-gray-500">{product.buyNowSection.returnPolicy}</p>
                    </div>

                    <div className="bg-black/20 rounded-2xl p-8 border border-white/5 h-full flex flex-col justify-center">
                        <div className="mb-8">
                            <h4 className="text-white font-bold mb-2">Delivery Promise</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">{product.buyNowSection.deliveryPromise}</p>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {product.stats.map((stat, idx) => (
                                <div key={idx} className="bg-white/5 rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold text-white mb-1">{stat.val}</div>
                                    <div className="text-xs text-gray-400 uppercase tracking-wide">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
