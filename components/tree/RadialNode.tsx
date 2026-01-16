"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RadialNodeProps {
  id: string;
  name: string;
  fullName: string;
  holder: string;
  type: 'senate' | 'main' | 'board' | 'club' | 'committee';
  x: number;
  y: number;
  isHighlighted?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
  onHover?: (hovering: boolean) => void;
}

const RadialNode: React.FC<RadialNodeProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id,
  name,
  fullName,
  holder,
  type,
  x,
  y,
  isHighlighted = false,
  isSelected = false,
  onClick,
  onHover,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Size configurations based on hierarchy level - more uniform for formal look
  const sizeConfig = {
    senate: { width: 120, height: 50, fontSize: 12, rx: 8 },
    main: { width: 90, height: 36, fontSize: 10, rx: 6 },
    board: { width: 75, height: 30, fontSize: 9, rx: 5 },
    club: { width: 65, height: 26, fontSize: 8, rx: 4 },
    committee: { width: 65, height: 26, fontSize: 8, rx: 4 },
  };

  const size = sizeConfig[type];

  // Professional color scheme
  const getColors = () => {
    const colors = {
      senate: { bg: '#1e3a5f', border: '#e58420', text: '#ffffff' },
      main: { bg: '#1a365d', border: '#3182ce', text: '#ffffff' },
      board: { bg: '#1c4532', border: '#38a169', text: '#ffffff' },
      club: { bg: '#44337a', border: '#805ad5', text: '#ffffff' },
      committee: { bg: '#744210', border: '#dd6b20', text: '#ffffff' },
    };
    return colors[type];
  };

  const colors = getColors();

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover?.(false);
  };

  const isActive = isHovered || isHighlighted || isSelected;

  return (
    <g
      transform={`translate(${x}, ${y})`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: 'pointer' }}
    >
      {/* Selection indicator */}
      {isSelected && (
        <rect
          x={-size.width / 2 - 4}
          y={-size.height / 2 - 4}
          width={size.width + 8}
          height={size.height + 8}
          rx={size.rx + 2}
          fill="none"
          stroke="#e58420"
          strokeWidth={2}
          strokeDasharray="4 2"
        />
      )}

      {/* Main node rectangle */}
      <motion.rect
        x={-size.width / 2}
        y={-size.height / 2}
        width={size.width}
        height={size.height}
        rx={size.rx}
        fill={colors.bg}
        stroke={isActive ? '#e58420' : colors.border}
        strokeWidth={isActive ? 2 : 1.5}
        initial={false}
        animate={{
          scale: isActive ? 1.05 : 1,
          filter: isActive ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' : 'none',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      />

      {/* Node name */}
      <text
        y={holder && type !== 'senate' ? -3 : 0}
        textAnchor="middle"
        dominantBaseline="central"
        fill={colors.text}
        fontSize={size.fontSize}
        fontWeight="600"
        fontFamily="Inter, system-ui, sans-serif"
        className="pointer-events-none select-none"
      >
        {name}
      </text>

      {/* Holder name (small, below) */}
      {holder && type !== 'senate' && (
        <text
          y={size.height / 2 - 8}
          textAnchor="middle"
          dominantBaseline="central"
          fill="rgba(255,255,255,0.7)"
          fontSize={size.fontSize - 2}
          fontFamily="Inter, system-ui, sans-serif"
          className="pointer-events-none select-none"
        >
          {holder.length > 12 ? holder.split(' ')[0] : holder}
        </text>
      )}

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.g
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
          >
            <rect
              x={-120}
              y={size.height / 2 + 8}
              width={240}
              height={holder ? 52 : 36}
              rx={6}
              fill="rgba(10, 14, 26, 0.95)"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth={1}
            />
            <text
              x={0}
              y={size.height / 2 + 26}
              textAnchor="middle"
              fill="white"
              fontSize={11}
              fontWeight="600"
              fontFamily="Inter, system-ui, sans-serif"
            >
              {fullName.length > 35 ? fullName.slice(0, 35) + '...' : fullName}
            </text>
            {holder && (
              <text
                x={0}
                y={size.height / 2 + 44}
                textAnchor="middle"
                fill="#e58420"
                fontSize={10}
                fontFamily="Inter, system-ui, sans-serif"
              >
                {holder}
              </text>
            )}
          </motion.g>
        )}
      </AnimatePresence>
    </g>
  );
};

export default RadialNode;
