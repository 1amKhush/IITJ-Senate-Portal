"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

type ClubCardProps = {
  title: string;
  about: string;
  holderName: string;
  contactInfo: string;
  logoUrl: string;
  socialLinks: { label: string; href: string }[];
  index?: number;
};

const ClubCard: React.FC<ClubCardProps> = ({
  title,
  about,
  holderName,
  contactInfo,
  logoUrl,
  socialLinks,
  index = 0,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

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
      whileHover={{ y: -5 }}
      onMouseMove={handleMouseMove}
      className="group glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 spotlight-card relative overflow-hidden w-full max-w-md"
    >
      {/* Decorative gradient corners */}
      <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-fulvous/10 to-transparent rounded-full -translate-y-12 sm:-translate-y-16 translate-x-12 sm:translate-x-16 group-hover:from-fulvous/20 transition-colors duration-500" />
      <div className="absolute bottom-0 left-0 w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full translate-y-10 sm:translate-y-12 -translate-x-10 sm:-translate-x-12" />
      
      <div className="relative z-10">
        {/* Title */}
        <div className="text-center mb-4 sm:mb-6">
          <h3 className="font-bold text-lg sm:text-xl gradient-text mb-2">
            {title}
          </h3>
          <div className="w-10 sm:w-12 h-0.5 bg-gradient-to-r from-fulvous to-fulvous-light rounded-full mx-auto" />
        </div>
        
        {/* Logo Section */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <motion.div 
            className="w-20 h-20 sm:w-24 sm:h-24 glass rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:shadow-glow-fulvous-sm transition-all duration-500"
            whileHover={{ scale: 1.05, rotate: 2 }}
          >
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={`${title} Logo`}
                width={80}
                height={80}
                className="rounded-lg sm:rounded-xl object-cover w-16 h-16 sm:w-20 sm:h-20"
              />
            ) : (
              <div className="text-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-fulvous to-fulvous-light rounded-full mx-auto" />
              </div>
            )}
          </motion.div>
        </div>
        
        {/* About Section */}
        <div className="bg-white/5 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 border border-white/5 group-hover:border-white/10 transition-colors duration-300">
          <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-fulvous rounded-full" />
            <span className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">About</span>
          </div>
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-3">{about}</p>
        </div>

        {/* Contact Section */}
        <div className="bg-white/5 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 border border-white/5 group-hover:border-white/10 transition-colors duration-300">
          <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-purple-400 rounded-full" />
            <span className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">Contact</span>
          </div>
          <div className="space-y-0.5 sm:space-y-1">
            <p className="font-medium text-white text-xs sm:text-sm">{holderName || "Not assigned"}</p>
            <p className="text-gray-400 text-xs sm:text-sm">{contactInfo}</p>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white/5 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/5 group-hover:border-white/10 transition-colors duration-300">
          <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
            <span className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">Connect</span>
          </div>
          
          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
            {socialLinks.length > 0 ? (
              socialLinks.map((link, idx) => (
                <motion.a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-2.5 py-1.5 sm:px-3 sm:py-2 bg-gradient-to-r from-fulvous to-fulvous-light text-white font-medium rounded-md sm:rounded-lg text-[10px] sm:text-xs flex items-center gap-1 sm:gap-1.5 shadow-glow-fulvous-sm hover:shadow-glow-fulvous transition-all duration-300"
                >
                  {link.label}
                  <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </motion.a>
              ))
            ) : (
              <p className="text-gray-500 text-[10px] sm:text-xs italic">No links available</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ClubCard;