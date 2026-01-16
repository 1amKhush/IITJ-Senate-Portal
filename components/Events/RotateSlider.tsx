'use client'

import React from 'react'
import Image from 'next/image'

const RotateSlider: React.FC = () => {
  // Extended to 28 images for full-width coverage, looping through available images
  const imageCount = 28
  
  return (
    <div className="relative w-full h-screen overflow-hidden text-center bg-gradient-to-br from-navy via-navy-light to-navy">
      {/* Full Page Background Image with Overlay */}
      <div
        className="absolute inset-0 w-full h-full bg-no-repeat bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/images/fests/bg/background6.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/50 to-navy z-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-fulvous/10 via-transparent to-purple-500/10 z-0" />

      {/* Full-Width Horizontal Carousel */}
      <div className="absolute inset-0 flex items-center overflow-hidden z-10">
        {/* Infinite scrolling track - starts from left edge */}
        <div className="flex animate-scroll-x gap-2 sm:gap-3 md:gap-4 hover:[animation-play-state:paused]" style={{ width: 'max-content' }}>
          {/* First set of images */}
          {[...Array(imageCount)].map((_, i) => (
            <div
              key={`first-${i}`}
              className="flex-shrink-0 w-[180px] h-[250px] sm:w-[220px] sm:h-[300px] md:w-[280px] md:h-[380px] lg:w-[320px] lg:h-[440px] group"
            >
              <div className="relative w-full h-full rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl 
                            border border-white/10 backdrop-blur-sm
                            group-hover:scale-105 group-hover:border-fulvous/50 
                            transition-all duration-500 ease-out">
                <Image
                  src={`/images/fests/sliderImages/Image (${(i % 14) + 1}).png`}
                  alt={`Event ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 480px) 180px, (max-width: 640px) 220px, (max-width: 1024px) 280px, 320px"
                  priority={i < 5}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                              -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              </div>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {[...Array(imageCount)].map((_, i) => (
            <div
              key={`second-${i}`}
              className="flex-shrink-0 w-[180px] h-[250px] sm:w-[220px] sm:h-[300px] md:w-[280px] md:h-[380px] lg:w-[320px] lg:h-[440px] group"
            >
              <div className="relative w-full h-full rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl 
                            border border-white/10 backdrop-blur-sm
                            group-hover:scale-105 group-hover:border-fulvous/50 
                            transition-all duration-500 ease-out">
                <Image
                  src={`/images/fests/sliderImages/Image (${(i % 14) + 1}).png`}
                  alt={`Event ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 480px) 180px, (max-width: 640px) 220px, (max-width: 1024px) 280px, 320px"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />
                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                              -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle fade edges for seamless look */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-navy/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-navy/80 to-transparent z-20 pointer-events-none" />

      {/* Foreground Content */}
      <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6 md:p-10 flex flex-col items-center sm:items-start sm:flex-row sm:items-end justify-between z-30 text-center sm:text-left gap-4 sm:gap-0">
        <h1 className="font-['ICA_Rubrik'] text-4xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] leading-none text-white relative drop-shadow-2xl">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-300">EVENTS</span>
        </h1>
        <div className="w-full sm:w-auto max-w-xs sm:max-w-sm md:max-w-md sm:ml-8 text-white z-10">
          <div className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-xl">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold gradient-text">Events at IITJ</h2>
            <p className="font-semibold text-fulvous text-sm sm:text-base md:text-lg mt-1">Culture • Tech • Sports</p>
            <p className="text-gray-300 text-xs sm:text-sm mt-2 sm:mt-3 leading-relaxed">
              IIT Jodhpur hosts a vibrant array of events and fests spanning diverse fields, celebrating talent,
              innovation, and creativity across disciplines.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RotateSlider