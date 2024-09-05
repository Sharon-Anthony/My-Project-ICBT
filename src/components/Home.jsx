import React from "react";
import HeroImg from "../assets/homepage-spinning-pic.png";

const Home = ({handlePopup}) => {
    return (

<div className="z-0 top-0 left-0 min-h-screen flex flex-row justify-between items-center lg:px-32 px-5 bg-[url('./assets/homepage-bg-pic.jpg')] bg-cover bg-no-repeat">
            <div className="w-full lg:w-2/3 space-y-5 mt-10">
                <h1 className="text-white font-semibold text-6xl ">
                Experience a Feast of Foods that Delight Your Palate</h1>
                <p className="text-white">
                Welcome to ABC, where passion meets flavor. Indulge in expertly crafted dishes made with fresh, locally sourced ingredients. Whether you're here for a cozy dinner or a special celebration, our warm atmosphere and attentive service will make your experience unforgettable. Join us and discover the art of dining, where every meal is a story waiting to be told.                </p>
                <div className="lg:pl-44">
                    <button 
                     className=' px-6 py-1 border-2 border-brightColor text-brightColor hover:bg-brightColor hover:text-white transition-all rounded-full
                     hover:scale-105 duration-200 flex
                     items-center'
                    title="Order Now" >Order Now</button>
                </div>
            </div>
            <div 
                    data-aos="zoom-in"
                   
                    className='min-h-[450px] flex
                justifiy-center items-center order-1 
                sm:order-2 relative'>
                        <img src={HeroImg}
                            alt=''
                            className='w-[300px] sm:w-[450px]
                    sm:scale-110 mx-auto spin '
                        />
                       
                       
                    </div>
        </div>

    )
}

export default Home