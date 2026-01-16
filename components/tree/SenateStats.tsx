"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Users, Building, Trophy, Target } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  count: number;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  delay: number;
}

// Animated counter component
const AnimatedCounter: React.FC<{ value: number }> = ({ value }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
  });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return unsubscribe;
  }, [springValue]);

  return <span ref={ref}>{displayValue}</span>;
};

const StatCard: React.FC<StatCardProps> = ({ 
  icon, 
  title, 
  count, 
  description, 
  gradientFrom, 
  gradientTo, 
  delay 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
      className="group relative glass-card rounded-2xl p-6 text-white overflow-hidden"
    >
      {/* Gradient border effect on hover */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${gradientFrom}20, transparent 50%, ${gradientTo}20)`,
        }}
      />
      
      {/* Glow effect */}
      <div 
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-3xl"
        style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          {/* Icon with gradient background */}
          <motion.div 
            className="p-3 rounded-xl relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${gradientFrom}20, ${gradientTo}10)`,
            }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(135deg, ${gradientFrom}40, ${gradientTo}30)`,
              }}
            />
            <div className="relative" style={{ color: gradientFrom }}>
              {icon}
            </div>
          </motion.div>
          
          {/* Animated count */}
          <div className="text-right">
            <motion.span
              className="text-4xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
              }}
            >
              <AnimatedCounter value={count} />
            </motion.span>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-white/90 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
      </div>

      {/* Bottom accent line */}
      <motion.div 
        className="absolute bottom-0 left-0 h-1 rounded-b-2xl"
        style={{
          background: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo})`,
        }}
        initial={{ width: "0%" }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: delay + 0.3 }}
      />
    </motion.div>
  );
};

interface SenateStatsProps {
  data: {
    mainBodies: Array<{ id: string; name: string; holder: string; type: string }>;
    boards: Array<{ id: string; name: string; holder: string; type: string }>;
    clubs: Array<{ id: string; name: string; holder: string; type: string }>;
  };
}

const SenateStats: React.FC<SenateStatsProps> = ({ data }) => {
  const stats = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Main Councils",
      count: data.mainBodies.length,
      description: "Core governing bodies of the student senate",
      gradientFrom: "#3b82f6",
      gradientTo: "#60a5fa",
      delay: 0,
    },
    {
      icon: <Building className="w-6 h-6" />,
      title: "Boards",
      count: data.boards.length,
      description: "Specialized administrative boards",
      gradientFrom: "#10b981",
      gradientTo: "#34d399",
      delay: 0.1,
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Clubs & Committees",
      count: data.clubs.length,
      description: "Active student organizations and committees",
      gradientFrom: "#8b5cf6",
      gradientTo: "#a78bfa",
      delay: 0.2,
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Total Positions",
      count: data.mainBodies.length + data.boards.length + data.clubs.length,
      description: "Leadership positions across all levels",
      gradientFrom: "#e58420",
      gradientTo: "#f59e3d",
      delay: 0.3,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default SenateStats;