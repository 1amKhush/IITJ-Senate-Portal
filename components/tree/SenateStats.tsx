"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Building, Trophy, Target } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  count: number;
  description: string;
  color: string;
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, count, description, color, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`bg-gray-800 rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-shadow border border-gray-700`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.2 }}
          className="text-3xl font-bold"
        >
          {count}
        </motion.span>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
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
      color: "bg-blue-500/20 text-blue-300",
      delay: 0,
    },
    {
      icon: <Building className="w-6 h-6" />,
      title: "Boards",
      count: data.boards.length,
      description: "Specialized administrative boards",
      color: "bg-green-500/20 text-green-300",
      delay: 0.1,
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Clubs & Committees",
      count: data.clubs.length,
      description: "Active student organizations and committees",
      color: "bg-purple-500/20 text-purple-300",
      delay: 0.2,
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Total Positions",
      count: data.mainBodies.length + data.boards.length + data.clubs.length,
      description: "Leadership positions across all levels",
      color: "bg-orange-500/20 text-orange-300",
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