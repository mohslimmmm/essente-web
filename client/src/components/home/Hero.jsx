import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import imgHero1 from '../../assets/images/Minimal sofa with plant.jpg';
import imgHero2 from '../../assets/images/Window with sunlight.jpg';

const Hero = () => {
  return (
    <section id="hero" className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32 px-4">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        className="hero-swiper max-w-[1440px] mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-essente-gold/20"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[80vh] px-6 md:px-16 bg-essente-cream">
            <div className="space-y-6 text-center md:text-left animate-fade-in-up">
              <span className="inline-block px-4 py-2 bg-essente-gold text-essente-charcoal text-sm uppercase tracking-widest rounded-full mb-4 animate-pulse">
                Nouvelle Collection
              </span>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-elegant font-light leading-tight">
                L'Essentiel, <br className="hidden md:block" /><span className="text-essente-gold">Redéfini.</span>
              </h2>
              <p className="text-lg md:text-xl font-light italic tracking-wider text-essente-charcoal/80 max-w-lg">
                Une approche consciente du luxe minimaliste.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link to="/collection" className="bg-[#000] text-[#fff] px-[40px] py-[15px] rounded-none tracking-[1px] uppercase text-sm hover:opacity-80 transition-opacity duration-300">
                  DÉCOUVRIR LA COLLECTION
                </Link>
                <Link to="/philosophie" className="px-8 py-3 text-essente-charcoal bg-transparent border border-essente-charcoal hover:bg-essente-charcoal hover:text-essente-cream transition-all duration-300 uppercase text-sm tracking-widest rounded-lg">
                  Notre Philosophie
                </Link>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl h-full">
              <img src={imgHero1}
                   alt="Minimalist Sofa"
                   className="w-full h-full object-cover aspect-[4/5] md:aspect-[5/6] transition duration-700 ease-in-out hover:scale-105" />
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[80vh] px-6 md:px-16 bg-essente-cream">
            <div className="space-y-6 text-center md:text-left animate-fade-in-up">
              <span className="inline-block px-4 py-2 bg-essente-gold text-essente-charcoal text-sm uppercase tracking-widest rounded-full mb-4">
                Édition Limitée
              </span>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-elegant font-light leading-tight">
                Qualité <br className="hidden md:block" />sur Quantité
              </h2>
              <p className="text-lg md:text-xl font-light italic tracking-wider text-essente-charcoal/80 max-w-lg">
                Investissez dans des pièces conçues pour durer toute une vie.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button className="px-8 py-3 text-essente-cream bg-essente-charcoal border border-essente-charcoal hover:bg-essente-charcoal/90 transition-all duration-300 uppercase text-sm tracking-widest rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Explorer les Matières
                </button>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl order-first md:order-last h-full">
              <img src={imgHero2}
                   alt="Window Sunlight"
                   className="w-full h-full object-cover aspect-[4/5] md:aspect-[5/6] transition duration-700 ease-in-out hover:scale-105" />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Hero;
