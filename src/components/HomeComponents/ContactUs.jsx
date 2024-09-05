import React from 'react';
import { TiSocialFacebook, TiSocialInstagram, TiSocialLinkedin } from 'react-icons/ti';

function ContactUs() {

  function handleSubmit(event) {
    event.preventDefault();

    const formData = {
      name: event.target[0].value,
      email: event.target[1].value,
      message: event.target[2].value,
    };

    fetch('http://localhost:8081/contact/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.text())
      .then((data) => alert(data))
      .catch((error) => console.error('Error:', error));
  }

  return (
    <section id="contactUs">
    <div className="my-10">
      <div className="grid sm:grid-cols-2 items-center gap-16 p-10 mx-auto max-w-6xl bg-white shadow-[0_4px_20px_-5px_rgba(6,81,237,0.4)] rounded-lg text-[#333] font-['Poppins',sans-serif]">
        <div>
          <h1 className="text-4xl sm:text-5xl text-gray-800 dark:text-white font-extrabold tracking-tight">Get In Touch</h1>
          <p className="text-md text-gray-500 mt-4">
            Have some big idea or brand to develop and need help? Reach out to us—we'd love to hear about your project and offer our assistance.
          </p>

          <div className="mt-14">
            <h2 className="text-xl font-extrabold">Social Media</h2>
            <ul className="flex mt-4 space-x-6">
              <TiSocialFacebook className="bg-[#e6e6e6cf] h-12 w-12 rounded-full flex items-center justify-center shrink-0" />

              <TiSocialLinkedin className="bg-[#e6e6e6cf] h-12 w-12 rounded-full flex items-center justify-center shrink-0" />


              <TiSocialInstagram className="bg-[#e6e6e6cf] h-12 w-12 rounded-full flex items-center justify-center shrink-0" />

            </ul>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
              <input
                type="text"
                className="border-2 py-3 px-5 rounded-lg text-md focus:outline-none"
                placeholder="Enter your name"
              />
              <input
                type="email"
                className="border-2 py-3 px-5 rounded-lg text-md focus:outline-none"
                placeholder="Enter your email"
              />
              <textarea
                rows="5"
                className="border-2 py-3 px-5 rounded-lg text-md focus:outline-none resize-none"
                placeholder="Enter your message"
              />
              <button type="submit" className="bg-[#007bff] text-white py-3 px-8 rounded-full font-medium text-md hover:bg-[#0062cc]">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </section>
  );
}

export default ContactUs;
//     Background Color:

// Original: bg-gradient-to-r from-purple-400 via-pink-500 to-red-500
// Updated: bg-gradient-to-r from-blue-500 via-green-500 to-teal-400
// This updates the background gradient to use a blue-to-teal color scheme instead of purple-to-red.

// Button Colors:

// Original: bg-white text-purple-600 hover:bg-gray-200 hover:text-purple-800
// Updated: bg-white text-blue-600 hover:bg-gray-200 hover:text-blue-800
