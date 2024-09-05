import React from 'react'
import BannerImg from "../../assets/homepage-bg-pic.jpg";
import BgTexture from "../../assets/homepage-bg-pic.jpg";
import { GrSecure } from 'react-icons/gr';
import { IoFastFood } from 'react-icons/io5';
import { GiFoodTruck } from 'react-icons/gi';

const bgImage = {
    backgroundImage: 'url(${BgTexture})',
    backgroundColor: "secondary",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
}
const Banner = () => {
    return (
        <>
            <div className="bg-[url('./assets/homepage-bg-pic.jpg')]">
                <div className="container min-h-[550px] flex 
                justify-center items-center py-12 sm:py-0">
                    <div className='grid grid-cols-1 
        sm:grid-cols-2 gap-6'>
                        {/* Image section */}
                        <div>
                            <img src={BannerImg} alt=""
                                className='
                            max-w-[430px] w-full mx-auto spin 
                            drop-shadow-xl'
                            />
                        </div>
                        {/* text content */}
                        <div className='flex flex-col justify-center 
                        gap-6 sm:pt-0'>
                            <h1 className='text-3xl sm:text-4xl 
                        font-bold font-cursive'>Premium Dishes</h1>
                            <p className='text-sm text-gray-500 tracking-wide 
                        leading-5 '>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since the 1500s,
                                when an unknown printer took a galley of type and
                                scrambled it to make
                            </p>
                            <div className='grid grid-cols-2 gap-6'>
                                <div >
                                    <div className='flex items-center gap-3'>
                                        <GrSecure 
                                        className='text-2xl h-12
                                        w-12 shadow-sm p-3 rounded-full 
                                        bg-red-100 '
                                        />
                                        <span>Premium Dish</span>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <IoFastFood 
                                        className='text-2xl h-12
                                        w-12 shadow-sm p-3 rounded-full 
                                        bg-orange-100 '
                                        />
                                        <span>Hot Dish</span>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <GiFoodTruck 
                                        className='text-2xl h-12
                                        w-12 shadow-sm p-3 rounded-full 
                                        bg-yellow-100 '
                                        />
                                        <span>Cold Coffee</span>
                                    </div>
                                </div>
                                <div className='border-l-4 border-primary/50 
                                pl-6 space-y-3'>
                                    <h1 className='text-2xl font-semibold 
                                    font-cursive'>
                                        Tea Lovers
                                    </h1>
                                    <p className='text-gray-500 text-sm'>
                                        {""}
                                        Much like writing code. brewing the 
                                        perfect cup of tea requires patient, precision, 
                                        and a dash of passion to 
                                        create a comfortiong blend of flavors.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Banner