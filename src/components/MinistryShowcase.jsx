import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import { useTheme } from '../context/ThemeContext';

export default function MinistryShowcase() {
  const { dark } = useTheme();

  const slides = [
    {
      image: '/Photo 1.jpeg',
      title: 'Worship Encounter',
      subtitle: 'Experiencing God’s Presence Together',
    },
    {
      image: '/Photo 2.jpeg',
      title: 'The Word in Action',
      subtitle: 'Transforming Lives Through Truth',
    },
    {
      image: '/Photo 3.jpeg',
      title: 'Global Outreach',
      subtitle: 'Reaching Souls Across Nations',
    },
    {
      image: '/Photo 4.jpeg',
      title: 'Our Leader',
      subtitle: 'A Voice Called for This Generation',
    },
  ];

  return (
    <section className={`py-20 ${dark ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-6 text-center mb-10">
        <h2 className={`text-3xl md:text-4xl font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>
          Our Ministry in Action
        </h2>
        <p className={`mt-3 text-lg ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
          Moments that define our calling and impact
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          effect="fade"
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          className="rounded-2xl overflow-hidden shadow-2xl"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[700px] md:h-[700px]">
                
                {/* Image */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center text-center px-6">
                  
                  {/* Animated Text */}
                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-3 animate-fadeInUp">
                    {slide.title}
                  </h3>

                  <p className="text-lg md:text-xl text-gray-200 animate-fadeInUp delay-200">
                    {slide.subtitle}
                  </p>

                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}