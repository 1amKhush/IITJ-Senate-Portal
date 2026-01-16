"use client";

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface CardProps {
  title: string;
  imageurl: string;
  index?: number;
}

const InfoCard: React.FC<CardProps> = ({ title, imageurl, index = 0 }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const parts = title.split(/(-|\(|\))/).map(part => part.trim()).filter(Boolean);

  // Spotlight effect handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty('--mouse-x', `${x}%`);
    cardRef.current.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1], delay: index * 0.05 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -8 }}
      onMouseMove={handleMouseMove}
      className="group relative rounded-2xl overflow-hidden h-96 glass-card spotlight-card flex flex-col p-6"
    >
      {/* Decorative gradient corners */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-fulvous/10 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:from-fulvous/20 transition-colors duration-500" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full translate-y-12 -translate-x-12" />

      {/* Logo Section */}
      <div className="relative z-10 flex-shrink-0 flex justify-center items-center h-52 mb-6 p-6 bg-white/5 rounded-xl group-hover:bg-white/10 transition-all duration-500 border border-white/5 group-hover:border-white/10">
        <motion.div 
          className="relative w-40 h-40"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-fulvous/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
          <Image
            src={imageurl}
            alt={title}
            width={160}
            height={160}
            className="relative z-10 object-contain w-full h-full filter brightness-110 group-hover:brightness-125 transition-all duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/IITJ/logo/iitjlogo.png';
            }}
          />
        </motion.div>
      </div>
      
      {/* Text Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center text-center space-y-3">
        <div className="space-y-2">
          {parts.map((part, idx) => {
            if (part === '-' || part === '(' || part === ')') return null;
            const isName = parts[idx - 1] === '-';
            const isAcronym = parts[idx - 1] === '(';

            if (isName || isAcronym) {
              return (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.05, duration: 0.4 }}
                  className="text-gray-400 group-hover:text-gray-300 font-medium text-sm tracking-widest uppercase transition-colors duration-300"
                >
                  {part}
                </motion.div>
              );
            }

            return (
              <motion.h3 
                key={idx} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.05, duration: 0.4 }}
                className="text-xl font-bold gradient-text leading-tight"
              >
                {part}
              </motion.h3>
            );
          })}
        </div>
        
        {/* Decorative line */}
        <div className="flex justify-center items-center pt-2">
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-fulvous to-transparent rounded-full opacity-50 group-hover:opacity-100 group-hover:w-20 transition-all duration-500" />
        </div>
      </div>
    </motion.div>
  );
};

export default InfoCard;