import React from "react";
import { AiOutlineMail, AiOutlinePhone, AiOutlineGlobal } from "react-icons/ai"; 

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white rounded-t-3xl mt-8">
            <div className="flex flex-col md:flex-row justify-between p-6 md:px-12 lg:px-24">
                {/* Brand section */}
                <div className="w-full md:w-1/4 mb-6 md:mb-0">
                    <h1 className="text-2xl font-bold mb-3 text-yellow-500">ABC Restaurant</h1>
                    <p className="text-sm leading-relaxed text-gray-300">
                        Immerse yourself in a symphony of flavors, where each dish is a canvas for culinary excellence.
                    </p>
                </div>

                {/* Links section */}
                <div className="w-full md:w-1/4 mb-6 md:mb-0">
                    <h2 className="text-lg font-semibold mb-3 text-yellow-500">Quick Links</h2>
                    <nav className="flex flex-col space-y-1">
                        <a className="hover:text-yellow-500 transition-colors cursor-pointer text-sm" href="/">Home</a>
                        <a className="hover:text-yellow-500 transition-colors cursor-pointer text-sm" href="/">Services</a>
                        <a className="hover:text-yellow-500 transition-colors cursor-pointer text-sm" href="/">Facilities</a>
                        <a className="hover:text-yellow-500 transition-colors cursor-pointer text-sm" href="/">Gallery</a>
                        <a className="hover:text-yellow-500 transition-colors cursor-pointer text-sm" href="/">Contact Us</a>
                    </nav>
                </div>

                {/* Menu section */}
                <div className="w-full md:w-1/4 mb-6 md:mb-0">
                    <h2 className="text-lg font-semibold mb-3 text-yellow-500">Menu</h2>
                    <nav className="flex flex-col space-y-1">
                        <a className="hover:text-yellow-500 transition-colors cursor-pointer text-sm" href="/">Our Dishes</a>
                        <a className="hover:text-yellow-500 transition-colors cursor-pointer text-sm" href="/">Premium Menu</a>
                    </nav>
                </div>

                {/* Contact Us section */}
                <div className="w-full md:w-1/4 mb-6 md:mb-0">
                    <h2 className="text-lg font-semibold mb-3 text-yellow-500">Contact Us</h2>
                    <nav className="flex flex-col space-y-1">
                        <a className="flex items-center hover:text-yellow-500 transition-colors cursor-pointer text-sm" href="mailto:Foodie@gmail.com">
                            <AiOutlineMail className="mr-2" /> abc-restuarent@gmail.com
                        </a>
                        <a className="flex items-center hover:text-yellow-500 transition-colors cursor-pointer text-sm" href="tel:0112347764">
                            <AiOutlinePhone className="mr-2" /> 011-234-7764
                        </a>
                        <a className="flex items-center hover:text-yellow-500 transition-colors cursor-pointer text-sm" href="/">
                            <AiOutlineGlobal className="mr-2" /> Social Media
                        </a>
                    </nav>
                </div>
            </div>

            {/* Copyright section */}
            <div className="bg-gray-800 py-3">
                <p className="text-center text-xs">
                    &copy; {new Date().getFullYear()} Developed by <span className="font-semibold text-yellow-500">Sharon Anthony</span> | All rights reserved
                </p>
            </div>
        </footer>
    );
}

export default Footer;
