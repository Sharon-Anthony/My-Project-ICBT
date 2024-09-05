import React, { useState } from "react";
import { Link as Link1 } from "react-scroll";
import { BiChevronDown, BiRestaurant } from 'react-icons/bi';
import { AiOutlineClose, AiOutlineMenuUnfold } from "react-icons/ai";
import { useNavigate } from "react-router-dom";


const Navigationbar = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
  //  const navigate = useNavigate();

    const handleLoginButtonClick = () => {
        setShowPopup(true);
    };

    const handleLogin = (user) => {
        setUsername(user);
        setLoggedIn(true);
        setShowPopup(false);
        navigate('/'); // Navigate to home or default route after login
    };

    const closePopup = () => {
        setShowPopup(false);
        navigate('/'); // Navigate to home or default route when closing popup
    };

    const [menu, setMenu] = useState(false);

    const handleChange = () => {
        setMenu(!menu);
    };

    return (
        <div className="fixed w-full absolute z-50 top-0 left-0">
            <div>
                <div className="flex flex-row justify-between p-5 ms:px-32 px-5 bg-white shadow-[0_3px_10px_rgba(0,0,0,2)]">
                    <div className="flex flex-row items-center cursor-pointer">
                        <span>
                            <BiRestaurant size={32} />
                        </span>
                        <h1 className="text-xl font-semibold">ABC  Restaurant</h1>
                    </div>
                    <nav className="hidden md:flex flex-row items-center text-lg font-medium gap-8">
                        <Link1 to="home" spy={true} smooth={true} duration={500} className="hover:text-brightColor transition-all cursor-pointer">Home</Link1>
                        <div className="relative group">
                            <div className="flex items-center gap-1">
                                <Link1 to="dishes" spy={true} smooth={true} duration={500} className="hover:text-brightColor transition-all cursor-pointer">Services</Link1>
                                <BiChevronDown className="cursor-pointer size{25}"/>
                            </div>
                            <ul className="absolute hidden space-y-2 group-hover:block bg-white border border-gray-300 rounded-lg p-5">
                                <li><Link1 to="dishes" spy={true} smooth={true} duration={500} className="hover:text-brightColor transition-all cursor-pointer">Spice</Link1></li>
                                <li><Link1 to="dishes" spy={true} smooth={true} duration={500} className="hover:text-brightColor transition-all cursor-pointer">Tasty</Link1></li>
                                <li><Link1 to="dishes" spy={true} smooth={true} duration={500} className="hover:text-brightColor transition-all cursor-pointer">Sweet</Link1></li>
                                <li><Link1 to="dishes" spy={true} smooth={true} duration={500} className="hover:text-brightColor transition-all cursor-pointer">Lime</Link1></li>
                            </ul>
                        </div>
                        <Link1 to="about" spy={true} smooth={true} duration={500} className="hover:text-brightColor transition-all cursor-pointer">About</Link1>
                        <Link1 to="menu" spy={true} smooth={true} duration={500} className="hover:text-brightColor transition-all cursor-pointer">Menu</Link1>
                        <Link1 to="review" spy={true} smooth={true} duration={500} className="hover:text-brightColor transition-all cursor-pointer">Reviews</Link1>
                        <div>
                            {loggedIn ? (
                                <span>{username}</span> // Display username if logged in
                            ) : (
                                <button
                                className=' px-6 py-1 border-2 border-brightColor text-brightColor hover:bg-brightColor hover:text-white transition-all rounded-full
                                hover:scale-105 duration-200 flex
                                items-center'
                                    onClick={handleLoginButtonClick}
                                >
                                    Login
                                </button>
                            )}
                            {showPopup && <Popup setShowPopup={setShowPopup} onLogin={handleLogin} />}
                        </div>
                    </nav>
                    <div className="md:hidden flex items-center">
                        {menu ? (
                            <AiOutlineClose size={25} onClick={handleChange} />
                        ) : (
                            <AiOutlineMenuUnfold size={25} onClick={handleChange} />
                        )}
                    </div>
                </div>
                <div className={`lg:hidden flex flex-col absolute bg-black text-white left-0 top-20 font-semibold text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300 ${menu ? "translate-x-0" : "-translate-x-full"}`}>
                    <Link1 to="home" spy={true} smooth={true} duration={500} className="hover:text-brightColor transition-all cursor-pointer">Home</Link1>
                    <Link1 to="dishes" spy={true} smooth={true} duration={500} className="hover:text-brightColor transition-all cursor-pointer">Spice</Link1>
                    <Link1 to="about" spy={true} smooth={true} duration={500} className="hover:text-brightColor transition-all cursor-pointer">About</Link1>
                    <Link1 to="review" spy={true} smooth={true} duration={500} className="hover:text-brightColor transition-all cursor-pointer">Reviews</Link1>
                    <button 
                         onClick={handleLoginButtonClick} title="Login" />
                </div>
            </div>
        </div>
    );
};

export default Navigationbar;
