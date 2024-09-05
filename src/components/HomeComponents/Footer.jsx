import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white rounded-t-3xl mt-8">
            <div className="flex flex-col md:flex-row justify-between p-6 md:px-12 lg:px-24">
                <div className="w-full md:w-1/4 mb-6 md:mb-0">
                    <h1 className="text-2xl font-bold mb-3 text-yellow-400">FoodieWeb</h1>
                    <p className="text-sm leading-relaxed text-gray-300">
                        Immerse yourself in a symphony of flavors, where each dish is a canvas for culinary excellence.
                    </p>
                </div>
                <div className="w-full md:w-1/4 mb-6 md:mb-0">
                    <h2 className="text-lg font-semibold mb-3 text-yellow-400">Links</h2>
                    <nav className="flex flex-col space-y-1">
                        <a className="hover:text-yellow-400 transition-colors cursor-pointer text-sm" href="/">Dishes</a>
                        <a className="hover:text-yellow-400 transition-colors cursor-pointer text-sm" href="/">About</a>
                        <a className="hover:text-yellow-400 transition-colors cursor-pointer text-sm" href="/">Menu</a>
                        <a className="hover:text-yellow-400 transition-colors cursor-pointer text-sm" href="/">Reviews</a>
                    </nav>
                </div>
                <div className="w-full md:w-1/4 mb-6 md:mb-0">
                    <h2 className="text-lg font-semibold mb-3 text-yellow-400">Menu</h2>
                    <nav className="flex flex-col space-y-1">
                        <a className="hover:text-yellow-400 transition-colors cursor-pointer text-sm" href="/">Our Dishes</a>
                        <a className="hover:text-yellow-400 transition-colors cursor-pointer text-sm" href="/">Premium Menu</a>
                    </nav>
                </div>
                <div className="w-full md:w-1/4 mb-6 md:mb-0">
                    <h2 className="text-lg font-semibold mb-3 text-yellow-400">Contact Us</h2>
                    <nav className="flex flex-col space-y-1">
                        <a className="hover:text-yellow-400 transition-colors cursor-pointer text-sm" href="mailto:Foodie@gmail.com">Foodie@gmail.com</a>
                        <a className="hover:text-yellow-400 transition-colors cursor-pointer text-sm" href="tel:0112347764">011-234-7764</a>
                        <a className="hover:text-yellow-400 transition-colors cursor-pointer text-sm" href="/">Social Media</a>
                    </nav>
                </div>
            </div>
            <div className="bg-gray-800 py-3">
                <p className="text-center text-xs">
                    &copy; {new Date().getFullYear()} Developed by <span className="font-semibold text-yellow-400">Sharon Anthony</span> | All rights reserved
                </p>
            </div>
        </footer>
    );
}

export default Footer;
