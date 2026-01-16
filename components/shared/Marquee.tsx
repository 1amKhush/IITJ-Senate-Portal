"use client";

import React, { useEffect } from "react";
import Marquee from "react-fast-marquee";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

type MarqueeItem = {
  title: string;
  imageurl: string;
};

type InfiniteMarqueeProps = {
  data: MarqueeItem[];
  minItemsPerRow?: number;
  maxItemsPerRow?: number;
};

function chunkArray<T>(arr: T[], chunkSize: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
}

const InfiniteMarquee: React.FC<InfiniteMarqueeProps> = ({
  data,
  minItemsPerRow = 3,
  maxItemsPerRow = 6,
}) => {
  let itemsPerRow = Math.ceil(data.length / 2);
  itemsPerRow = Math.max(minItemsPerRow, Math.min(maxItemsPerRow, itemsPerRow));
  const rows = chunkArray(data, itemsPerRow);

  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
      });
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={controls}
      className="w-full py-8"
    >
      <div className="flex flex-col gap-6">
        {rows.map((row, idx) => (
          <div
            key={idx}
            className="relative overflow-hidden"
            style={{
              maskImage: `linear-gradient(to right, 
                rgba(0,0,0,0) 0%, 
                rgba(0,0,0,1) 10%, 
                rgba(0,0,0,1) 90%, 
                rgba(0,0,0,0) 100%
              )`,
              WebkitMaskImage: `linear-gradient(to right, 
                rgba(0,0,0,0) 0%, 
                rgba(0,0,0,1) 10%, 
                rgba(0,0,0,1) 90%, 
                rgba(0,0,0,0) 100%
              )`,
            }}
          >
            <Marquee
              speed={30 + idx * 8}
              pauseOnHover={true}
              gradient={false}
              direction={idx % 2 === 0 ? "left" : "right"}
              className="py-3"
              autoFill
            >
              <div className="flex">
                {row.map((item, i) => (
                  <motion.div
                    key={i}
                    className="group relative mx-3 flex items-center justify-center glass-card rounded-xl px-6 py-4 min-w-[200px] border border-white/10 hover:border-fulvous/30 transition-all duration-300"
                    whileHover={{ 
                      y: -4, 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {/* Title */}
                    <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors duration-300 text-center line-clamp-2">
                      {item.title}
                    </span>

                    {/* Hover accent */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-fulvous/0 via-fulvous/5 to-fulvous/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </motion.div>
                ))}
              </div>
            </Marquee>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default InfiniteMarquee;