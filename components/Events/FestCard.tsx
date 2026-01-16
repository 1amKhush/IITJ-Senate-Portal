"use client"

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, ExternalLink } from 'lucide-react';

interface Fest {
  title: string;
  description: string;
  backgroundUrl: string;
  date: string;
  website: string;
  navlinks: { label: string; href: string }[];
  porHolders: string[];
}

const FestCard: React.FC<{ fest: Fest; index?: number }> = ({ fest, index = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
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

  const getEventDate = (dateStr: string) => {
    try {
      const parsableDateStr = dateStr.split('-')[0].trim();
      const date = new Date(parsableDateStr);
      if (isNaN(date.getTime())) return { day: 'TBA', month: 'TBA' };
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'short' });
      return { day, month };
    } catch (error) {
      console.error("Error parsing date:", error);
      return { day: 'TBA', month: 'TBA' };
    }
  };

  const { day, month } = getEventDate(fest.date);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.2 }}
      onMouseMove={handleMouseMove}
      className="group relative rounded-2xl overflow-hidden h-full glass-card spotlight-card"
    >
      {/* Background image with parallax effect */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${fest.backgroundUrl})` }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.6 }}
      />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-fulvous/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative flex flex-col h-full p-6 z-10">
        <div className="flex justify-between items-start">
          <div className="pr-4 flex-1">
            <motion.h3 
              className="text-2xl font-bold mb-3 gradient-text"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              {fest.title}
            </motion.h3>
            <p className={`text-sm text-gray-300 leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
              {fest.description}
            </p>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-fulvous font-medium mt-3 text-sm hover:text-fulvous-light transition-colors flex items-center gap-1 group/btn"
            >
              {isExpanded ? 'See Less' : 'See More'}
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                ↓
              </motion.span>
            </button>
          </div>
          
          {/* Date badge */}
          <div className="flex-shrink-0 glass rounded-xl p-4 text-center min-w-[80px]">
            <div className="text-4xl font-extrabold gradient-text leading-none">{day}</div>
            <div className="text-sm font-medium text-gray-300 uppercase tracking-wider mt-1">{month}</div>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="mt-auto pt-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{fest.date}</span>
          </div>
          
          <div className="flex gap-2">
            {fest.website && (
              <a 
                href={fest.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-fulvous hover:border-fulvous/30 transition-all duration-300"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="text-white bg-white/5 border border-white/10 hover:bg-fulvous/10 hover:text-fulvous hover:border-fulvous/30 transition-all duration-300"
                >
                  More Info
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-navy border-white/10">
                <DialogHeader>
                  <DialogTitle className="gradient-text text-xl">{fest.title} - POR Holders</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <ul className="space-y-3">
                    {fest.porHolders.map((holder, index) => (
                      <li key={index} className="flex items-center gap-3 text-gray-300">
                        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-fulvous to-fulvous-light" />
                        {holder}
                      </li>
                    ))}
                  </ul>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FestCard;