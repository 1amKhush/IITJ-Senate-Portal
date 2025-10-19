'use client';
import React from 'react';
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

// The PersonCard component now has a modern, dark-theme design
const PersonCard: React.FC<{ person: Person }> = ({ person }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="group relative overflow-hidden rounded-lg shadow-lg bg-gray-800 border border-gray-700/50 flex flex-col h-full"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        {/* Member's Image with effects */}
        <Image
          src={person.image}
          alt={person.name}
          fill
          className="object-cover transition-all duration-500 ease-in-out group-hover:scale-110"
          onError={(e) => {
            // Fallback to a default image if the provided one fails
            (e.target as HTMLImageElement).onerror = null; 
            (e.target as HTMLImageElement).src = '/images/IITJ/logo/iitjlogo.png';
          }}
        />
        {/* Hover overlay for social media links */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-end items-start p-4">
          <div className="flex flex-col gap-4">
            {person.links.linkedin && (
              <a href={person.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            )}
            {person.links.instagram && (
              <a href={person.links.instagram} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
                <Instagram size={20} /> 
              </a>
            )}
            {person.email && (
              <a href={`mailto:${person.email}`} className="text-white/70 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            )}
          </div>
        </div>
      </div>
      {/* Member's details */}
      <div className="p-4 text-center bg-gray-800 flex-grow flex flex-col justify-center">
        <div>
          <h3 className="text-lg font-semibold text-white">{person.name}</h3>
          <div className="mt-1">
            {person.pors.map((por, index) => (
              <p key={index} className="text-sm text-gray-400 leading-tight">{por}</p>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PersonCard;
