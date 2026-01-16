"use client"

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';
import { ExternalLink, User, Mail, Building2 } from 'lucide-react';

interface Council {
  title: string;
  fullform: string;
  imageurl: string;
  holder: string;
  about: string;
  contactInfo: string;
  socialLinks: { label: string; href: string }[];
}

const CouncilCard: React.FC<{ council: Council }> = ({ council }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const { title, imageurl: logoUrl, holder: holderName, about, contactInfo, socialLinks = [] } = council;

  const linkedInUrl = socialLinks.find(link => link.label.toLowerCase() === 'linkedin')?.href;
  const instagramUrl = socialLinks.find(link => link.label.toLowerCase() === 'instagram')?.href;
  const facebookUrl = socialLinks.find(link => link.label.toLowerCase() === 'facebook')?.href;

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
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={handleMouseMove}
      className="glass-card rounded-3xl overflow-hidden spotlight-card group"
    >
      {/* Top Gradient Accent */}
      <div className="h-2 bg-gradient-to-r from-blue-500 via-fulvous to-purple-500" />
      
      <div className="p-8 flex flex-col lg:flex-row gap-8">
        {/* Left Content */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Header with Icon */}
          <div className="flex items-start gap-4">
            <motion.div 
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center flex-shrink-0 border border-blue-500/20"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Building2 className="w-7 h-7 text-blue-400" />
            </motion.div>
            <div>
              <h3 className="font-bold text-2xl text-white mb-2 group-hover:text-fulvous transition-colors duration-300">
                {title}
              </h3>
              <div className="w-20 h-1 bg-gradient-to-r from-fulvous to-fulvous-light rounded-full" />
            </div>
          </div>

          {/* About Section */}
          <motion.div 
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-fulvous/30 transition-all duration-300"
            whileHover={{ y: -2 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-fulvous rounded-full" />
              <span className="font-semibold text-gray-400 text-xs uppercase tracking-wider">
                About
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed">{about}</p>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300"
            whileHover={{ y: -2 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full" />
              <span className="font-semibold text-gray-400 text-xs uppercase tracking-wider">
                Contact
              </span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <User className="w-4 h-4 text-fulvous" />
              <p className="font-bold text-white text-lg">{holderName}</p>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-gray-500" />
              <p className="text-gray-400">{contactInfo}</p>
            </div>
          </motion.div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col items-center gap-6 min-w-[280px]">
          {/* Logo Section */}
          <motion.div 
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-fulvous/30 transition-all duration-300 w-full"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-32 h-32 mx-auto rounded-2xl bg-gradient-to-br from-fulvous/20 to-purple-500/10 flex items-center justify-center border border-white/10 shadow-inner">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt="Council Logo"
                  width={100}
                  height={100}
                  className="rounded-xl object-cover"
                />
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-fulvous to-purple-500 rounded-xl mx-auto flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Social Links */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 w-full hover:border-white/20 transition-all duration-300">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="font-bold text-gray-400 text-xs uppercase tracking-wider">
                Connect
              </span>
            </div>

            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {socialLinks.length > 0 ? (
                socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gradient-to-r from-fulvous to-fulvous-light text-white font-medium rounded-xl text-sm flex items-center gap-2 shadow-glow-fulvous-sm hover:shadow-glow-fulvous transition-all duration-300"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3" />
                  </motion.a>
                ))
              ) : (
                <p className="text-gray-500 text-sm italic">No links available</p>
              )}
            </div>
            
            {/* Quick Social Icons */}
            <div className="flex justify-center items-center gap-4 pt-4 border-t border-white/5">
              {instagramUrl && (
                <motion.a 
                  href={instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="text-gray-400 hover:text-pink-500 transition-colors duration-200"
                >
                  <FaInstagram size={22} />
                </motion.a>
              )}
              {linkedInUrl && (
                <motion.a 
                  href={linkedInUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                >
                  <FaLinkedin size={22} />
                </motion.a>
              )}
              {facebookUrl && (
                <motion.a 
                  href={facebookUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
                >
                  <FaFacebook size={22} />
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CouncilCard;
