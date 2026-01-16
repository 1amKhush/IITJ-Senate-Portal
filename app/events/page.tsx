"use client"

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { 
    Calendar, ExternalLink, ChevronDown, 
    Sparkles, Star, ArrowUp, Filter, Grid3X3, LayoutList,
    Music, Trophy, BookOpen, Code, Zap, Heart
} from 'lucide-react'
import { fests } from '@/data/fests'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Event category icons and colors
const eventCategories = {
    technical: { icon: Code, color: 'from-blue-500 to-cyan-400', label: 'Technical' },
    cultural: { icon: Music, color: 'from-pink-500 to-rose-400', label: 'Cultural' },
    sports: { icon: Trophy, color: 'from-green-500 to-emerald-400', label: 'Sports' },
    literary: { icon: BookOpen, color: 'from-purple-500 to-violet-400', label: 'Literary' },
    social: { icon: Heart, color: 'from-red-500 to-orange-400', label: 'Social' },
    innovation: { icon: Zap, color: 'from-yellow-500 to-amber-400', label: 'Innovation' },
}

// Categorize fests
const categorizeFest = (title: string) => {
    const t = title.toLowerCase()
    if (t.includes('prometeo') || t.includes('intellia') || t.includes('edificio')) return 'technical'
    if (t.includes('ignus') || t.includes('spandan') || t.includes('nimble')) return 'cultural'
    if (t.includes('varchas') || t.includes('kridansh')) return 'sports'
    if (t.includes('kathayan')) return 'literary'
    if (t.includes('dashak') || t.includes('sandstone')) return 'social'
    return 'innovation'
}

// Hero Section with Parallax
const HeroSection = () => {
    const { scrollY } = useScroll()
    const y = useTransform(scrollY, [0, 500], [0, 200])
    const opacity = useTransform(scrollY, [0, 400], [1, 0])
    const scale = useTransform(scrollY, [0, 500], [1, 1.2])

    return (
        <section className="relative h-screen overflow-hidden">
            {/* Background with parallax */}
            <motion.div 
                className="absolute inset-0"
                style={{ y, scale }}
            >
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/fests/bg/background6.jpg')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/40 to-navy" />
                <div className="absolute inset-0 bg-gradient-to-r from-fulvous/10 via-transparent to-purple-500/10" />
            </motion.div>

            {/* Animated particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-fulvous/30 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 4,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* 3D Floating Cards Carousel */}
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    className="relative w-[300px] h-[400px] [transform-style:preserve-3d]"
                    animate={{ rotateY: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute inset-0 rounded-2xl overflow-hidden"
                            style={{
                                transform: `rotateY(${i * 45}deg) translateZ(400px)`,
                                opacity: 0.8,
                            }}
                            whileHover={{ scale: 1.1 }}
                        >
                            <Image
                                src={`/images/fests/sliderImages/Image (${(i % 14) + 1}).png`}
                                alt={`Event ${i + 1}`}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Hero Content */}
            <motion.div 
                className="relative z-10 h-full flex flex-col items-center justify-end pb-20 px-6"
                style={{ opacity }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-center max-w-4xl"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fulvous/20 border border-fulvous/30 mb-6 backdrop-blur-sm"
                    >
                        <Sparkles className="w-4 h-4 text-fulvous" />
                        <span className="text-sm font-medium text-fulvous">IIT Jodhpur</span>
                    </motion.div>

                    {/* Title */}
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6">
                        <span className="text-white drop-shadow-2xl">EVENTS</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
                        Experience the vibrant tapestry of festivals, competitions, and celebrations
                        that define campus life at IIT Jodhpur
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap justify-center gap-8">
                        {[
                            { value: '12+', label: 'Annual Events' },
                            { value: '50K+', label: 'Participants' },
                            { value: '100+', label: 'Activities' },
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 + i * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</div>
                                <div className="text-sm text-gray-400">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-8"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex flex-col items-center gap-2 text-gray-400"
                    >
                        <span className="text-xs font-medium">Explore Events</span>
                        <ChevronDown className="w-5 h-5" />
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    )
}

// Premium Fest Card
const PremiumFestCard: React.FC<{ fest: typeof fests[0]; index: number }> = ({ fest, index }) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)
    const category = categorizeFest(fest.title)
    const categoryData = eventCategories[category as keyof typeof eventCategories]
    const CategoryIcon = categoryData.icon

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        cardRef.current.style.setProperty('--mouse-x', `${x}%`)
        cardRef.current.style.setProperty('--mouse-y', `${y}%`)
    }

    const getEventDate = (dateStr: string) => {
        try {
            const parsableDateStr = dateStr.split('-')[0].trim()
            const date = new Date(parsableDateStr)
            if (isNaN(date.getTime())) return { day: 'TBA', month: 'TBA', year: '' }
            return {
                day: date.getDate(),
                month: date.toLocaleString('default', { month: 'short' }),
                year: date.getFullYear()
            }
        } catch {
            return { day: 'TBA', month: 'TBA', year: '' }
        }
    }

    const { day, month, year } = getEventDate(fest.date)

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative rounded-3xl overflow-hidden spotlight-card h-[500px]"
        >
            {/* Background Image with Parallax */}
            <motion.div
                className="absolute inset-0"
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.6 }}
            >
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${fest.backgroundUrl})` }}
                />
            </motion.div>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
            <motion.div 
                className={`absolute inset-0 bg-gradient-to-br ${categoryData.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
            />

            {/* Category Badge */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="absolute top-6 left-6 z-20"
            >
                <div className={`flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r ${categoryData.color} backdrop-blur-sm`}>
                    <CategoryIcon className="w-4 h-4 text-white" />
                    <span className="text-xs font-semibold text-white uppercase tracking-wider">
                        {categoryData.label}
                    </span>
                </div>
            </motion.div>

            {/* Date Badge */}
            <div className="absolute top-6 right-6 z-20">
                <motion.div 
                    className="glass rounded-2xl p-4 text-center min-w-[80px]"
                    whileHover={{ scale: 1.05 }}
                >
                    <div className="text-3xl font-bold gradient-text leading-none">{day}</div>
                    <div className="text-sm font-medium text-gray-300 uppercase tracking-wider">{month}</div>
                    {year && <div className="text-xs text-gray-500">{year}</div>}
                </motion.div>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                {/* Title */}
                <motion.h3
                    className="text-3xl md:text-4xl font-bold text-white mb-3 group-hover:text-fulvous transition-colors duration-300"
                    animate={{ x: isHovered ? 10 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {fest.title}
                </motion.h3>

                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                    {fest.description}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Calendar className="w-4 h-4 text-fulvous" />
                        <span>{fest.date}</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    {fest.website && (
                        <motion.a
                            href={fest.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-gradient-to-r from-fulvous to-fulvous-light text-white font-semibold rounded-xl flex items-center gap-2 shadow-glow-fulvous-sm hover:shadow-glow-fulvous transition-all duration-300"
                        >
                            Visit Website
                            <ExternalLink className="w-4 h-4" />
                        </motion.a>
                    )}
                    
                    <Dialog>
                        <DialogTrigger asChild>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 glass border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 transition-all duration-300"
                            >
                                Learn More
                            </motion.button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px] bg-navy border-white/10">
                            <DialogHeader>
                                <DialogTitle className="gradient-text text-2xl">{fest.title}</DialogTitle>
                            </DialogHeader>
                            <div className="py-6">
                                <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
                                    <div 
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{ backgroundImage: `url(${fest.backgroundUrl})` }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent" />
                                </div>
                                
                                <p className="text-gray-300 leading-relaxed mb-6">{fest.description}</p>
                                
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-gray-400">
                                        <Calendar className="w-5 h-5 text-fulvous" />
                                        <span>{fest.date}</span>
                                    </div>
                                    
                                    {fest.navlinks && fest.navlinks.length > 0 && (
                                        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                                            {fest.navlinks.map((link, idx) => (
                                                <a
                                                    key={idx}
                                                    href={link.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-fulvous/20 hover:border-fulvous/30 hover:text-fulvous transition-all duration-300 flex items-center gap-2"
                                                >
                                                    {link.label}
                                                    <ExternalLink className="w-3 h-3" />
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Shine effect on hover */}
            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, transparent 50%)',
                }}
                animate={isHovered ? { x: ['0%', '200%'] } : {}}
                transition={{ duration: 0.8 }}
            />
        </motion.div>
    )
}

// Featured Event Section
const FeaturedEvent = () => {
    const featuredFest = fests.find(f => f.title.toLowerCase().includes('prometeo')) || fests[0]
    
    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: `url(${featuredFest.backgroundUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 mb-8"
                >
                    <Star className="w-6 h-6 text-fulvous fill-fulvous" />
                    <span className="text-fulvous font-semibold text-lg">Featured Event</span>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            {featuredFest.title}
                        </h2>
                        <p className="text-xl text-gray-300 leading-relaxed mb-8">
                            {featuredFest.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-6 mb-8">
                            <div className="flex items-center gap-3 text-gray-400">
                                <Calendar className="w-5 h-5 text-fulvous" />
                                <span className="text-lg">{featuredFest.date}</span>
                            </div>
                        </div>

                        {featuredFest.website && (
                            <motion.a
                                href={featuredFest.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-fulvous to-fulvous-light text-white font-bold text-lg rounded-2xl shadow-glow-fulvous hover:shadow-glow-fulvous transition-all duration-300"
                            >
                                Explore {featuredFest.title}
                                <ExternalLink className="w-5 h-5" />
                            </motion.a>
                        )}
                    </motion.div>

                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                            <div 
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${featuredFest.backgroundUrl})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                        </div>
                        
                        {/* Floating badges */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute -top-4 -right-4 glass rounded-2xl px-4 py-3"
                        >
                            <div className="text-fulvous font-bold text-2xl">2026</div>
                            <div className="text-gray-400 text-xs">Edition</div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

// Filter Bar
const FilterBar: React.FC<{
    activeFilter: string;
    onFilterChange: (filter: string) => void;
    viewMode: 'grid' | 'list';
    onViewModeChange: (mode: 'grid' | 'list') => void;
}> = ({ activeFilter, onFilterChange, viewMode, onViewModeChange }) => {
    const filters = ['all', ...Object.keys(eventCategories)]

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-4 mb-12 sticky top-20 z-40"
        >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Category Filters */}
                <div className="flex items-center gap-2 flex-wrap justify-center">
                    {filters.map((filter) => {
                        const category = eventCategories[filter as keyof typeof eventCategories]
                        const Icon = category?.icon || Filter
                        
                        return (
                            <button
                                key={filter}
                                onClick={() => onFilterChange(filter)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                                    activeFilter === filter
                                        ? `bg-gradient-to-r ${category?.color || 'from-fulvous to-fulvous-light'} text-white shadow-lg`
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                <Icon className="w-4 h-4" />
                                {filter.charAt(0).toUpperCase() + filter.slice(1)}
                            </button>
                        )
                    })}
                </div>

                {/* View Mode */}
                <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1">
                    <button
                        onClick={() => onViewModeChange('grid')}
                        className={`p-2 rounded-lg transition-all ${
                            viewMode === 'grid' ? 'bg-fulvous text-white' : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        <Grid3X3 className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => onViewModeChange('list')}
                        className={`p-2 rounded-lg transition-all ${
                            viewMode === 'list' ? 'bg-fulvous text-white' : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        <LayoutList className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

// Scroll to Top Button
const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => setIsVisible(window.scrollY > 500)
        window.addEventListener('scroll', toggleVisibility)
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-gradient-to-r from-fulvous to-fulvous-light rounded-full flex items-center justify-center shadow-glow-fulvous hover:scale-110 transition-transform"
                >
                    <ArrowUp className="w-5 h-5 text-white" />
                </motion.button>
            )}
        </AnimatePresence>
    )
}

// Main Component
const EventsPage = () => {
    const [activeFilter, setActiveFilter] = useState('all')
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

    const filteredFests = useMemo(() => {
        if (activeFilter === 'all') return fests
        return fests.filter(fest => categorizeFest(fest.title) === activeFilter)
    }, [activeFilter])

    return (
        <div className="min-h-screen bg-navy">
            {/* Hero */}
            <HeroSection />

            {/* Featured Event */}
            <FeaturedEvent />

            {/* All Events Section */}
            <section className="py-24 relative">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <motion.div 
                            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-fulvous to-fulvous-light mb-6"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                            <Calendar className="w-8 h-8 text-white" />
                        </motion.div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            All Events & Fests
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Discover the complete calendar of events that make IIT Jodhpur a vibrant campus
                        </p>
                        <div className="w-24 h-1 bg-gradient-to-r from-fulvous to-fulvous-light rounded-full mx-auto mt-6" />
                    </motion.div>

                    {/* Filter Bar */}
                    <FilterBar
                        activeFilter={activeFilter}
                        onFilterChange={setActiveFilter}
                        viewMode={viewMode}
                        onViewModeChange={setViewMode}
                    />

                    {/* Events Grid */}
                    <div className={`grid gap-8 ${
                        viewMode === 'grid' 
                            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                            : 'grid-cols-1 max-w-4xl mx-auto'
                    }`}>
                        {filteredFests.map((fest, index) => (
                            <PremiumFestCard key={fest.title} fest={fest} index={index} />
                        ))}
                    </div>

                    {/* No Results */}
                    {filteredFests.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                                <Calendar className="w-10 h-10 text-gray-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">No events found</h3>
                            <p className="text-gray-400 mb-6">Try selecting a different category</p>
                            <button
                                onClick={() => setActiveFilter('all')}
                                className="px-6 py-3 bg-gradient-to-r from-fulvous to-fulvous-light text-white font-medium rounded-xl"
                            >
                                Show All Events
                            </button>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Scroll to Top */}
            <ScrollToTop />
        </div>
    )
}

export default EventsPage
