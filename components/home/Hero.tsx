"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import MagneticButton from "@/components/shared/MagneticButton"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

const images = [
  "/images/IITJ/hero/iitj1.jpg",
  "/images/IITJ/hero/iitj2.jpg",
  "/images/IITJ/hero/iitj3.jpg",
  "/images/IITJ/hero/iitj4.jpg",
  "/images/IITJ/hero/iitj5.jpg",
  "/images/IITJ/hero/iitj6.jpg",
  "/images/IITJ/hero/iitj7.jpg",
  "/images/IITJ/hero/iitj8.jpg",
  "/images/IITJ/hero/iitj9.jpg",
];

const words = ["Welcome to the", "IITJ Student Senate"];

export default function Hero() {
  const [index, setIndex] = useState(0)
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 7000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden">
      {/* Parallax Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        {images.map((img, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${img})` }}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: i === index ? 1 : 0,
              scale: i === index ? 1 : 1.1
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        ))}
        {/* Premium gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-navy/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      </motion.div>

      {/* Floating gradient orbs */}
      <div className="absolute inset-0 z-5 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-fulvous/20 to-transparent blur-3xl animate-float-slow"
          style={{ opacity }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-gradient-to-tl from-purple-500/10 to-transparent blur-3xl animate-float-delayed"
          style={{ opacity }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-gradient-to-bl from-blue-500/10 to-transparent blur-3xl animate-float"
          style={{ opacity }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-6">
        <motion.div
          style={{ y: textY, opacity }}
          className="p-4 sm:p-6 md:p-8 rounded-md text-center max-w-5xl mx-auto"
        >
          {/* Text reveal animation */}
          <div className="overflow-hidden mb-4 sm:mb-6">
            <motion.p
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
              className="text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-300 tracking-widest uppercase font-medium"
            >
              {words[0]}
            </motion.p>
          </div>
          
          <div className="overflow-hidden mb-6 sm:mb-8">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight"
            >
              <span className="gradient-text">{words[1]}</span>
            </motion.h1>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-200/90 mx-auto max-w-3xl mb-8 sm:mb-10 px-2 sm:px-4 leading-relaxed"
          >
            Your official portal for all student activities, councils, and events at IIT Jodhpur.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
            className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 flex-wrap"
          >
            <MagneticButton strength={0.4}>
              <Link href="/events">
                <Button 
                  size="xl" 
                  variant="gradient"
                  className="cursor-pointer text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
                >
                  Explore Events
                </Button>
              </Link>
            </MagneticButton>
            <MagneticButton strength={0.4}>
              <Link href="/societies">
                <Button 
                  size="xl" 
                  variant="glass" 
                  className="cursor-pointer text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
                >
                  About the Senate
                </Button>
              </Link>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-white/60 text-sm tracking-widest uppercase">Scroll</span>
        <motion.div 
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
        >
          <motion.div 
            className="w-1.5 h-1.5 bg-fulvous rounded-full animate-scroll-bounce"
          />
        </motion.div>
        <ChevronDown className="w-5 h-5 text-white/40 animate-scroll-bounce" />
      </motion.div>
    </section>
  )
}