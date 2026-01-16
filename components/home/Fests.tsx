'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { fests } from '@/data/fests';
import { ArrowUpRight, Calendar, ExternalLink } from 'lucide-react';

const FestCard = ({ fest, index }: { fest: typeof fests[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative"
    >
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}>
        {/* Image Section */}
        <motion.div 
          className="relative w-full lg:w-1/2 aspect-[16/10] rounded-2xl overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
        >
          {/* Image */}
          <Image
            src={fest.backgroundUrl}
            alt={fest.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            priority={index < 2}
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent" />
          
          {/* Floating badge */}
          <motion.div 
            className="absolute top-6 left-6 glass-card px-4 py-2 rounded-full flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <Calendar className="w-4 h-4 text-fulvous" />
            <span className="text-sm font-medium text-white">{fest.date}</span>
          </motion.div>

          {/* Decorative corner accent */}
          <div className={`absolute bottom-0 ${isEven ? 'right-0' : 'left-0'} w-32 h-32`}>
            <div className={`absolute bottom-0 ${isEven ? 'right-0' : 'left-0'} w-full h-full bg-gradient-to-${isEven ? 'tl' : 'tr'} from-fulvous/20 to-transparent`} />
          </div>
        </motion.div>

        {/* Content Section */}
        <div className={`w-full lg:w-1/2 ${isEven ? 'lg:pl-4' : 'lg:pr-4'}`}>
          {/* Title with decorative line */}
          <div className="flex items-center gap-4 mb-6">
            <motion.div 
              className="h-px bg-gradient-to-r from-fulvous to-transparent flex-1 max-w-[60px]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
            <span className="text-fulvous text-sm font-semibold tracking-[0.2em] uppercase">
              Annual Fest
            </span>
          </div>

          <motion.h3 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="gradient-text">{fest.title}</span>
          </motion.h3>

          <motion.p 
            className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {fest.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href={fest.navlinks[0]?.href || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-fulvous to-fulvous-light text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-glow-fulvous"
            >
              <span className="relative z-10">Explore Fest</span>
              <ArrowUpRight className="w-5 h-5 relative z-10 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              <div className="absolute inset-0 bg-gradient-to-r from-fulvous-dark to-fulvous opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            </a>
            
            <a
              href={fest.navlinks[1]?.href || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 glass-card text-white font-semibold rounded-xl transition-all duration-300 hover:bg-white/10 border border-white/10 hover:border-fulvous/30"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Website</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className={`absolute ${isEven ? '-right-20' : '-left-20'} top-1/2 -translate-y-1/2 w-40 h-40 bg-fulvous/5 rounded-full blur-3xl pointer-events-none`} />
    </motion.div>
  );
};

const Fests = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section 
      ref={containerRef}
      className="relative bg-navy-950 py-24 md:py-32 overflow-hidden"
    >
      {/* Background decorative elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(229, 132, 32, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(229, 132, 32, 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-fulvous/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-fulvous/5 rounded-full blur-[120px]" />
      </motion.div>

      <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-fulvous" />
            <span className="text-fulvous text-sm font-semibold tracking-[0.3em] uppercase">
              Celebrate With Us
            </span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-fulvous" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="text-white">Major Fests at </span>
            <span className="gradient-text">IIT Jodhpur</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Experience the vibrant culture of IIT Jodhpur through our annual fests, 
            where innovation, talent, and excitement come together.
          </motion.p>
        </div>

        {/* Fest Cards */}
        <div className="space-y-24 md:space-y-32">
          {fests.slice(0, 3).map((fest, index) => (
            <FestCard key={fest.title} fest={fest} index={index} />
          ))}
        </div>

        {/* View All Link */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <a
            href="/events"
            className="group inline-flex items-center gap-3 text-lg font-medium text-gray-300 hover:text-fulvous transition-colors duration-300"
          >
            <span>View All Events & Fests</span>
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/20 group-hover:border-fulvous/50 group-hover:bg-fulvous/10 transition-all duration-300">
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Fests;