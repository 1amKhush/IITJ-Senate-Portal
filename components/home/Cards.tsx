'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { councils } from '@/data/councils';
import { ACACBoards, SACBoards } from '@/data/boards';
import { BCCAClubs, BLAClubs, BACClubs, BSSClubs, SAAClubs, IRteam } from '@/data/clubs';
import CardGrid from '../shared/CardGrid';
import InfoCard from '../shared/InfoCard';
import InfiniteMarquee from '../shared/Marquee';

type ItemWithAbout = {
  title: string;
  imageurl: string;
};

type Item = {
  title: string;
  imageurl: string;
};


const mapItemsForCards = (arr: ItemWithAbout[]) =>
  arr.map(({ title, imageurl}) => ({ title, imageurl}));
  
const mapItemsForMarquee = (arr: Item[]) =>
  arr.map(({ title, imageurl }) => ({ title, imageurl }));

// Premium Section Header Component
const SectionHeader = ({ 
  title, 
  subtitle, 
  description 
}: { 
  title: string; 
  subtitle: string; 
  description?: string;
}) => (
  <div className="text-center mb-16 md:mb-20">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="inline-flex items-center gap-3 mb-6"
    >
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-fulvous" />
      <span className="text-fulvous text-sm font-semibold tracking-[0.3em] uppercase">
        {subtitle}
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
      <span className="gradient-text">{title}</span>
    </motion.h2>

    {description && (
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
      >
        {description}
      </motion.p>
    )}
  </div>
);

const Cards: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const councilItems = mapItemsForCards(councils);
  const acacItems = mapItemsForCards(ACACBoards);
  const sacItems = mapItemsForCards(SACBoards);
  const acacClubs = [
    ...mapItemsForMarquee(IRteam),
    ...mapItemsForMarquee(BCCAClubs),
    ...mapItemsForMarquee(SAAClubs),
    ...mapItemsForMarquee(IRteam),
  ];
  const sacClubs = [
    ...mapItemsForMarquee(BLAClubs),
    ...mapItemsForMarquee(BACClubs),
    ...mapItemsForMarquee(BSSClubs),
  ];

  return (
    <div 
      ref={containerRef}
      className="relative bg-navy-950 text-white overflow-hidden"
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
        <div className="absolute top-[10%] -left-32 w-96 h-96 bg-fulvous/10 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] -right-32 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px]" />
        <div className="absolute top-[70%] left-1/4 w-64 h-64 bg-fulvous/5 rounded-full blur-[80px]" />
      </motion.div>

      {/* Councils Section */}
      <section className="relative py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <SectionHeader 
            subtitle="Leadership"
            title="Councils under the Student Body"
            description="The governing bodies that represent and serve the student community at IIT Jodhpur."
          />
          <CardGrid cols={3} items={councilItems} />
        </div>
      </section>

      {/* Boards under ACAC Section */}
      <section className="relative py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <SectionHeader 
            subtitle="Academic Affairs"
            title="Boards under ACAC"
            description="Academic and career-focused boards fostering intellectual growth and professional development."
          />
          <CardGrid cols={3} items={acacItems} />
        </div>
        
        {/* Decorative divider */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-fulvous/30 to-transparent" />
      </section>

      {/* Boards under SAC Section */}
      <section className="relative py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <SectionHeader 
            subtitle="Student Activities"
            title="Boards under SAC"
            description="Boards dedicated to cultural, sports, and co-curricular activities for holistic development."
          />
          {/* Custom 3+2 centered layout */}
          <div className="flex flex-col gap-6 md:gap-8">
            {/* First row - 3 items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {sacItems.slice(0, 3).map((item, i) => (
                <InfoCard key={i} title={item.title} imageurl={item.imageurl} index={i} />
              ))}
            </div>
            {/* Second row - 2 items centered with same width as top cards */}
            <div className="flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 w-full lg:w-2/3">
                {sacItems.slice(3, 5).map((item, i) => (
                  <InfoCard key={i + 3} title={item.title} imageurl={item.imageurl} index={i + 3} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Societies under ACAC Section */}
      <section className="relative py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <SectionHeader 
            subtitle="Technical Excellence"
            title="Societies under ACAC"
            description="Technical societies driving innovation, research, and skill development across diverse domains."
          />
        </div>
        <InfiniteMarquee
          data={acacClubs}
          minItemsPerRow={4}
          maxItemsPerRow={4}
        />
      </section>

      {/* Societies under SAC Section */}
      <section className="relative py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <SectionHeader 
            subtitle="Culture & Sports"
            title="Societies under SAC"
            description="Cultural, literary, and sports societies celebrating talent and fostering community spirit."
          />
        </div>
        <InfiniteMarquee
          data={sacClubs}
          maxItemsPerRow={10}
        />
      </section>
    </div>
  );
};

export default Cards;