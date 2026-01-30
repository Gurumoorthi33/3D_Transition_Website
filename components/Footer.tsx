import Link from "next/link";

export const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-16 border-t border-white/5 relative z-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-1">
                    <Link href="/" className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-500 mb-6 block">
                        Nano Banana
                    </Link>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Revolutionizing the way you consume fresh fruit. Cold-pressed, HPP treated, and delivered with zero compromise.
                    </p>
                </div>

                <div>
                    <h4 className="font-bold mb-6 text-orange-500">Shop</h4>
                    <ul className="space-y-4 text-gray-400 text-sm">
                        <li><Link href="/" className="hover:text-white transition-colors">All Flavors</Link></li>
                        <li><Link href="/" className="hover:text-white transition-colors">Bundles</Link></li>
                        <li><Link href="/" className="hover:text-white transition-colors">Subscriptions</Link></li>
                        <li><Link href="/" className="hover:text-white transition-colors">Gift Cards</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-6 text-orange-500">Support</h4>
                    <ul className="space-y-4 text-gray-400 text-sm">
                        <li><Link href="/" className="hover:text-white transition-colors">FAQ</Link></li>
                        <li><Link href="/" className="hover:text-white transition-colors">Shipping</Link></li>
                        <li><Link href="/" className="hover:text-white transition-colors">Returns</Link></li>
                        <li><Link href="/" className="hover:text-white transition-colors">Contact Us</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-6 text-orange-500">Stay Fresh</h4>
                    <p className="text-gray-400 text-sm mb-4">Join our newsletter for exclusive drops and health tips.</p>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-orange-500 transition-colors"
                        />
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            Join
                        </button>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-800 text-center text-gray-600 text-xs">
                © {new Date().getFullYear()} Nano Banana. All rights reserved.
            </div>
        </footer>
    );
};
