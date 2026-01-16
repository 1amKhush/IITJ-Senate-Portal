'use client';
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Instagram, Mail } from 'lucide-react';
import Image from 'next/image';

// Define the structure for a person's data
interface Person {
  id: number;
  name: string;
  pors: string[];
  email?: string;
  phone?: string;
  links: {
    linkedin?: string;
    instagram?: string;
  };
  image: string;
  category?: string;
  club?: string;
}

// The PersonCard component now has a modern, dark-theme design with spotlight effect
const PersonCard: React.FC<{ person: Person; index?: number }> = ({ person, index = 0 }) => {
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
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -8 }}
      onMouseMove={handleMouseMove}
      className="group relative overflow-hidden rounded-2xl glass-card spotlight-card flex flex-col h-full"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        {/* Member's Image with effects */}
        <Image
          src={person.image}
          alt={person.name}
          fill
          className="object-cover transition-all duration-700 ease-out group-hover:scale-110"
          onError={(e) => {
            // Fallback to a default image if the provided one fails
            (e.target as HTMLImageElement).onerror = null; 
            (e.target as HTMLImageElement).src = '/images/IITJ/logo/iitjlogo.png';
          }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        
        {/* Hover overlay for social media links */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-navy via-navy/90 to-navy/50 flex justify-center items-end pb-8"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex gap-4">
            {person.links.linkedin && (
              <motion.a 
                href={person.links.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-fulvous hover:border-fulvous transition-all duration-300"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin size={20} />
              </motion.a>
            )}
            {person.links.instagram && (
              <motion.a 
                href={person.links.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:border-transparent transition-all duration-300"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram size={20} /> 
              </motion.a>
            )}
            {person.email && (
              <motion.a 
                href={`mailto:${person.email}`} 
                className="p-3 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-blue-500 hover:border-blue-500 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={20} />
              </motion.a>
            )}
          </div>
        </motion.div>
      </div>
      
      {/* Member's details */}
      <div className="p-5 text-center bg-surface-2 flex-grow flex flex-col justify-center relative">
        {/* Decorative line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-fulvous to-transparent" />
        
        <motion.h3 
          className="text-lg font-semibold text-white group-hover:gradient-text transition-all duration-300"
        >
          {person.name}
        </motion.h3>
        <div className="mt-2 space-y-1">
          {person.pors.map((por, idx) => (
            <p key={idx} className="text-sm text-gray-400 leading-tight">{por}</p>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PersonCard;
