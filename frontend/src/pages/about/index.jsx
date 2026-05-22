import React from 'react';
import { GiCupcake, GiCakeSlice, GiDonut } from 'react-icons/gi';
import Header from '../../components/ui/Header';

const AboutUs = () => {
  return (
    <div className="bg-[#FCFAF7] min-h-screen font-sans">
      <Header />
      <main className="pt-16">
      {/* Hero Section with Background Image */}
      <div
        className="w-full bg-cover bg-center py-24 px-6 text-center relative"
        style={{ backgroundImage: "url('/assets/about.webp')" }}
      >
        <div className="absolute inset-0 bg-[#2F6D66]/40"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold text-white drop-shadow mb-4">Welcome to Cuppie Cake</h1>
          <p className="text-white text-lg max-w-2xl mx-auto drop-shadow">
            Where every bite is a celebration! We bake joy into every cupcake, macaron, and cake slice.
          </p>
        </div>
      </div>

      {/* Our Specialties Section */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-4xl font-bold text-[#8C5A3C] mb-10">Our Specialties</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: <GiCupcake />,
              title: 'Cupcakes',
              desc: 'Whimsical flavors topped with creamy swirls and sprinkles.',
            },
            {
              icon: <GiCakeSlice />,
              title: 'Occasion Cakes',
              desc: 'Custom-designed cakes for birthdays, weddings & more.',
            },
            {
              icon: <GiDonut />,
              title: 'Macarons',
              desc: 'Delicate, colorful bites filled with love and ganache.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow p-8 flex flex-col items-center border border-[#E9DED2] hover:shadow-xl transition"
            >
              <div className="text-6xl w-20 h-20 p-5 rounded-full bg-[#F2E2C4] text-[#2F6D66] mb-6 shadow-[0_-5px_20px_rgba(47,109,102,0.18)] flex justify-center items-center">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Magic Process Section */}
      <section
        className="py-20 px-6 text-center bg-cover bg-center bg-[#f9ecec] relative"
        style={{ backgroundImage: "url('/assets/banner.webp')" }}
      >
        <div className="absolute inset-0 bg-white/40"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4 text-[#8C5A3C]">Our Magic Process</h2>
          <p className="text-gray-500">
            From whisk to wow—our baking process blends tradition, creativity, <br />
            and a sprinkle of magic. Every treat is handcrafted with love, precision, and pastel dreams.
          </p>
          <button className="mt-8 bg-[#2F6D66] hover:bg-[#245852] text-white font-semibold px-6 py-3 rounded-full shadow-md transition">
            Discover More
          </button>
        </div>
      </section>
      </main>
    </div>
  );
};

export default AboutUs;
