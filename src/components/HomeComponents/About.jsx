import React from 'react';
import about from '../../assets/homepage-spinning-pic.png'

const AboutUsSection = ({id}) => {
  return (
    <section id='about' className="relative bg-gray-100 py-16">
      <div className="absolute inset-0 opacity-20">
        <img  className="w-full h-full object-cover" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center">
            <h2 className="text-5xl font-extrabold text-gray-800 mb-6">About ABC Restaurant</h2>
            <p className="text-lg text-gray-700 mb-6">
              ABC Restaurant is a symbol of elegance and fine dining, serving as the perfect venue for weddings, corporate meetings, and private gatherings. Our commitment to excellence is evident in every detail, ensuring your experience is nothing short of exceptional.
            </p>
            <p className="text-lg text-gray-700">
              From intimate dinners to grand celebrations, ABC Restaurant offers a unique blend of tradition and innovation, creating memorable moments in a luxurious setting.
            </p>
          </div>
          <div className="flex items-center">
            <img src={about}   alt=''
                            className='w-[300px] sm:w-[450px]
                    sm:scale-110 mx-auto spin ' />
          </div>                   
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
