"use client"

import React from 'react';
import InfoCard from './InfoCard';
import { motion } from 'framer-motion';

interface CardGridProps {
  cols: number;
  items: { title: string; imageurl: string}[];
}

const CardGrid: React.FC<CardGridProps> = ({ cols, items }) => {
  // Create responsive grid classes based on cols
  const getGridCols = () => {
    switch(cols) {
      case 2: return 'sm:grid-cols-2';
      case 3: return 'sm:grid-cols-2 lg:grid-cols-3';
      case 4: return 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
      default: return 'sm:grid-cols-2 lg:grid-cols-3';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`grid gap-6 md:gap-8 ${getGridCols()}`}
    >
      {items.map((item, i) => (
        <InfoCard key={i} title={item.title} imageurl={item.imageurl} index={i} />
      ))}
    </motion.div>
  );
};

export default CardGrid;