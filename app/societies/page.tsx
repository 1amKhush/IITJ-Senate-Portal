"use client"

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { 
    Search, X, ChevronDown, ChevronUp, 
    Building2, Users, Sparkles, 
    ArrowUp, ExternalLink, Grid3X3, LayoutList,
    Layers, Award, BookOpen, Palette
} from 'lucide-react'
import CouncilCard from '@/components/societies/CouncilCard'
import ClubCard from '@/components/societies/ClubCard'
import { councils } from '@/data/councils'
import { ACACBoards, SACBoards } from '@/data/boards'
import { BCCAClubs, BLAClubs, BACClubs, BSSClubs } from '@/data/clubs'
import { BHACommunities, BAICommunities, BDSCommunities, ACACOtherCommunities, BCCAOtherCommunities, SSOtherCommunities } from '@/data/communities'

// Types
interface BoardType {
    title: string;
    about: string;
    holder: string;
    contactInfo: string;
    imageurl: string;
    socialLinks: { label: string; href: string }[];
    clubs?: string[];
}

// Stats data
const statsData = [
    { icon: Building2, label: "Councils", count: 3, color: "from-blue-500 to-blue-400" },
    { icon: Layers, label: "Boards", count: 11, color: "from-green-500 to-emerald-400" },
    { icon: Award, label: "Clubs", count: 25, color: "from-purple-500 to-violet-400" },
    { icon: Users, label: "Committees", count: 15, color: "from-orange-500 to-amber-400" },
]

// Section categories
const sectionCategories = [
    { id: 'councils', label: 'Councils', icon: Building2, color: 'from-blue-500 to-blue-400' },
    { id: 'boards', label: 'Boards', icon: Layers, color: 'from-green-500 to-emerald-400' },
    { id: 'clubs', label: 'Clubs', icon: Award, color: 'from-purple-500 to-violet-400' },
    { id: 'communities', label: 'Committees', icon: Users, color: 'from-orange-500 to-amber-400' },
]

// Animated counter
const AnimatedCounter: React.FC<{ value: number; delay?: number }> = ({ value, delay = 0 }) => {
    const [count, setCount] = useState(0)
    const ref = useRef<HTMLSpanElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.1 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!isVisible) return
        const timeout = setTimeout(() => {
            const duration = 1500
            const startTime = performance.now()
            
            const animate = (currentTime: number) => {
                const elapsed = currentTime - startTime
                const progress = Math.min(elapsed / duration, 1)
                const easeOut = 1 - Math.pow(1 - progress, 3)
                setCount(Math.floor(easeOut * value))
                if (progress < 1) requestAnimationFrame(animate)
            }
            requestAnimationFrame(animate)
        }, delay)
        return () => clearTimeout(timeout)
    }, [isVisible, value, delay])

    return <span ref={ref}>{count}</span>
}

// Hero Section
const HeroSection = () => {
    const { scrollY } = useScroll()
    const y = useTransform(scrollY, [0, 500], [0, 150])
    const opacity = useTransform(scrollY, [0, 300], [1, 0])

    return (
        <motion.section 
            className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
            style={{ y }}
        >
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy-light to-navy" />
                <div className="absolute inset-0 custom-grid-bg opacity-30" />
                
                {/* Floating orbs */}
                <motion.div 
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-fulvous/10 rounded-full blur-3xl"
                    animate={{ 
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
                    animate={{ 
                        x: [0, -40, 0],
                        y: [0, 40, 0],
                        scale: [1, 1.15, 1]
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
                <motion.div 
                    className="absolute top-1/2 right-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
                    animate={{ 
                        x: [0, 30, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
            </div>

            <motion.div 
                className="relative z-10 text-center px-6 max-w-6xl mx-auto"
                style={{ opacity }}
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fulvous/10 border border-fulvous/20 mb-8"
                >
                    <Sparkles className="w-4 h-4 text-fulvous" />
                    <span className="text-sm font-medium text-fulvous">IIT Jodhpur Student Senate</span>
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6"
                >
                    <span className="text-white">Student Body</span>
                    <br />
                    <span className="gradient-text">Directory</span>
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-2"
                >
                    Discover the vibrant ecosystem of student organizations at IIT Jodhpur. 
                    Explore councils, boards, clubs, and committees that shape campus life.
                </motion.p>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto px-2"
                >
                    {statsData.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className="glass-card rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 text-center group cursor-default"
                        >
                            <div className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-0.5 sm:mb-1`}>
                                <AnimatedCounter value={stat.count} delay={index * 100} />+
                            </div>
                            <div className="text-xs sm:text-sm text-gray-400 font-medium">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="flex flex-col items-center gap-2 text-gray-500"
                    >
                        <span className="text-xs font-medium">Scroll to explore</span>
                        <ChevronDown className="w-5 h-5" />
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.section>
    )
}

// Section Header Component
const SectionHeader: React.FC<{ 
    title: string; 
    subtitle: string; 
    icon: React.ElementType; 
    gradient: string;
}> = ({ title, subtitle, icon: Icon, gradient }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 sm:mb-12 px-2"
    >
        <motion.div 
            className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${gradient} mb-4 sm:mb-6`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
        </motion.div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4">{title}</h2>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">{subtitle}</p>
        <div className={`w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r ${gradient} rounded-full mx-auto mt-4 sm:mt-6`} />
    </motion.div>
)

// Board Card Component
const BoardCard: React.FC<{ board: BoardType; index: number }> = ({ board, index }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const cardRef = useRef<HTMLDivElement>(null)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        cardRef.current.style.setProperty('--mouse-x', `${x}%`)
        cardRef.current.style.setProperty('--mouse-y', `${y}%`)
    }

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            className="glass-card rounded-2xl overflow-hidden spotlight-card group"
        >
            {/* Header */}
            <div className="p-6 pb-4">
                <div className="flex items-start gap-4">
                    <motion.div 
                        className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/10 flex items-center justify-center flex-shrink-0 border border-green-500/20"
                        whileHover={{ scale: 1.05 }}
                    >
                        {board.imageurl ? (
                            <Image src={board.imageurl} alt={board.title} width={48} height={48} className="w-12 h-12 rounded-lg object-cover" />
                        ) : (
                            <Layers className="w-8 h-8 text-green-400" />
                        )}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg text-white mb-1 line-clamp-2 group-hover:text-green-300 transition-colors">
                            {board.title}
                        </h3>
                        {board.holder && (
                            <p className="text-sm text-fulvous font-medium">{board.holder}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="px-6 pb-4">
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <p className={`text-gray-400 text-sm leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
                        {board.about}
                    </p>
                    {board.about && board.about.length > 150 && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-fulvous text-sm font-medium mt-2 hover:underline flex items-center gap-1"
                        >
                            {isExpanded ? 'Show less' : 'Read more'}
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                    )}
                </div>
            </div>

            {/* Social Links */}
            {board.socialLinks && board.socialLinks.length > 0 && (
                <div className="px-6 pb-6">
                    <div className="flex flex-wrap gap-2">
                        {board.socialLinks.map((link, idx) => (
                            <motion.a
                                key={idx}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-medium rounded-lg flex items-center gap-1.5 shadow-lg hover:shadow-green-500/20 transition-shadow"
                            >
                                {link.label}
                                <ExternalLink className="w-3 h-3" />
                            </motion.a>
                        ))}
                    </div>
                </div>
            )}

            {/* Bottom accent */}
            <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-400" />
        </motion.div>
    )
}

// Floating Quick Nav
const QuickNav: React.FC<{ activeSection: string; onNavigate: (id: string) => void }> = ({ activeSection, onNavigate }) => {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
        >
            <motion.div
                className="glass-card rounded-2xl p-2 shadow-premium-lg"
                animate={{ width: isExpanded ? 200 : 56 }}
                transition={{ duration: 0.3 }}
            >
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full flex items-center justify-center p-2 rounded-xl hover:bg-white/5 transition-colors mb-2"
                >
                    <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                        <ChevronDown className="w-5 h-5 text-gray-400 rotate-90" />
                    </motion.div>
                </button>
                
                <div className="space-y-2">
                    {sectionCategories.map((section) => (
                        <motion.button
                            key={section.id}
                            onClick={() => onNavigate(section.id)}
                            className={`w-full flex items-center gap-3 p-2 rounded-xl transition-all duration-300 ${
                                activeSection === section.id 
                                    ? 'bg-gradient-to-r ' + section.color + ' text-white' 
                                    : 'hover:bg-white/5 text-gray-400'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <section.icon className="w-5 h-5 flex-shrink-0" />
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="text-sm font-medium whitespace-nowrap"
                                    >
                                        {section.label}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    )
}

// Scroll to Top Button
const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 500)
        }
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

// Search and Filter Bar
const SearchFilterBar: React.FC<{
    searchQuery: string;
    onSearchChange: (query: string) => void;
    activeFilter: string;
    onFilterChange: (filter: string) => void;
    viewMode: 'grid' | 'list';
    onViewModeChange: (mode: 'grid' | 'list') => void;
}> = ({ searchQuery, onSearchChange, activeFilter, onFilterChange, viewMode, onViewModeChange }) => {
    const filters = ['all', 'councils', 'boards', 'clubs', 'committees']

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-8 sm:mb-12 sticky top-16 sm:top-20 z-40"
        >
            <div className="flex flex-col gap-3 sm:gap-4">
                {/* Search - Full width on all screens */}
                <div className="relative w-full">
                    <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search organizations..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-10 sm:pl-12 pr-10 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-fulvous/50 focus:ring-2 focus:ring-fulvous/20 transition-all"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => onSearchChange('')}
                            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        >
                            <X className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    )}
                </div>

                {/* Filters and View Toggle Row */}
                <div className="flex items-center justify-between gap-2 sm:gap-4">
                    {/* Filters - Horizontally scrollable on mobile */}
                    <div className="flex-1 overflow-x-auto scrollbar-hide">
                        <div className="flex items-center gap-1.5 sm:gap-2 min-w-max">
                            {filters.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => onFilterChange(filter)}
                                    className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                                        activeFilter === filter
                                            ? 'bg-gradient-to-r from-fulvous to-fulvous-light text-white shadow-glow-fulvous-sm'
                                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                    }`}
                                >
                                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1 flex-shrink-0">
                        <button
                            onClick={() => onViewModeChange('grid')}
                            className={`p-1.5 sm:p-2 rounded-md sm:rounded-lg transition-all ${
                                viewMode === 'grid' ? 'bg-fulvous text-white' : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            <Grid3X3 className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        <button
                            onClick={() => onViewModeChange('list')}
                            className={`p-1.5 sm:p-2 rounded-md sm:rounded-lg transition-all ${
                                viewMode === 'list' ? 'bg-fulvous text-white' : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            <LayoutList className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

// Main Component
const Societies = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [activeFilter, setActiveFilter] = useState('all')
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [activeSection, setActiveSection] = useState('councils')

    // Collect all data
    const allBoards = useMemo(() => [...ACACBoards, ...SACBoards], [])
    const allClubs = useMemo(() => [...BCCAClubs, ...BLAClubs, ...BACClubs, ...BSSClubs], [])
    const allCommunities = useMemo(() => [
        ...BHACommunities, ...BAICommunities, ...BDSCommunities,
        ...ACACOtherCommunities, ...BCCAOtherCommunities, ...SSOtherCommunities
    ], [])

    // Filter logic
    const filteredCouncils = useMemo(() => {
        if (activeFilter !== 'all' && activeFilter !== 'councils') return []
        return councils.filter(c => 
            c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.holder.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [searchQuery, activeFilter])

    const filteredBoards = useMemo(() => {
        if (activeFilter !== 'all' && activeFilter !== 'boards') return []
        return allBoards.filter(b => 
            b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (b.holder && b.holder.toLowerCase().includes(searchQuery.toLowerCase()))
        )
    }, [allBoards, searchQuery, activeFilter])

    const filteredClubs = useMemo(() => {
        if (activeFilter !== 'all' && activeFilter !== 'clubs') return []
        return allClubs.filter(c => 
            c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (c.holder && c.holder.toLowerCase().includes(searchQuery.toLowerCase()))
        )
    }, [allClubs, searchQuery, activeFilter])

    const filteredCommunities = useMemo(() => {
        if (activeFilter !== 'all' && activeFilter !== 'committees') return []
        return allCommunities.filter(c => 
            c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (c.holder && c.holder.toLowerCase().includes(searchQuery.toLowerCase()))
        )
    }, [allCommunities, searchQuery, activeFilter])

    // Section scroll observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id.replace('-section', ''))
                    }
                })
            },
            { threshold: 0.2, rootMargin: '-100px 0px -50% 0px' }
        )

        const sections = document.querySelectorAll('[data-section]')
        sections.forEach((section) => observer.observe(section))

        return () => observer.disconnect()
    }, [])

    const scrollToSection = (id: string) => {
        const element = document.getElementById(`${id}-section`)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    return (
        <div className="min-h-screen bg-navy relative overflow-x-hidden">
            {/* Hero */}
            <HeroSection />

            {/* Main Content */}
            <div className="relative z-10 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto -mt-20">
                {/* Search & Filter */}
                <SearchFilterBar
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                />

                {/* Councils Section */}
                {filteredCouncils.length > 0 && (
                    <section id="councils-section" data-section className="mb-24 scroll-mt-32">
                        <SectionHeader
                            title="Student Councils"
                            subtitle="The governing bodies that lead and represent the student community"
                            icon={Building2}
                            gradient="from-blue-500 to-blue-400"
                        />
                        <div className="space-y-6">
                            {filteredCouncils.map((council, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <CouncilCard council={council} />
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Boards Section */}
                {filteredBoards.length > 0 && (
                    <section id="boards-section" data-section className="mb-24 scroll-mt-32">
                        <SectionHeader
                            title="Student Boards"
                            subtitle="Specialized bodies overseeing different domains of student activities"
                            icon={Layers}
                            gradient="from-green-500 to-emerald-400"
                        />
                        
                        {/* ACAC Boards */}
                        {ACACBoards.some(b => filteredBoards.includes(b)) && (
                            <div className="mb-12">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-3 mb-6"
                                >
                                    <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full" />
                                    <h3 className="text-2xl font-bold text-white">Boards under ACAC</h3>
                                    <BookOpen className="w-5 h-5 text-blue-400" />
                                </motion.div>
                                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                                    {ACACBoards.filter(b => filteredBoards.includes(b)).map((board, index) => (
                                        <BoardCard key={index} board={board} index={index} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* SAC Boards */}
                        {SACBoards.some(b => filteredBoards.includes(b)) && (
                            <div>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-3 mb-6"
                                >
                                    <div className="w-1 h-8 bg-gradient-to-b from-green-400 to-emerald-600 rounded-full" />
                                    <h3 className="text-2xl font-bold text-white">Boards under SAC</h3>
                                    <Palette className="w-5 h-5 text-green-400" />
                                </motion.div>
                                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                                    {SACBoards.filter(b => filteredBoards.includes(b)).map((board, index) => (
                                        <BoardCard key={index} board={board} index={index} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>
                )}

                {/* Clubs Section */}
                {filteredClubs.length > 0 && (
                    <section id="clubs-section" data-section className="mb-24 scroll-mt-32">
                        <SectionHeader
                            title="Student Clubs"
                            subtitle="Interest-based communities fostering talents and passions"
                            icon={Award}
                            gradient="from-purple-500 to-violet-400"
                        />

                        {/* BCCA Clubs */}
                        {BCCAClubs.some(c => filteredClubs.includes(c)) && (
                            <div className="mb-12">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-3 mb-6"
                                >
                                    <div className="w-1 h-8 bg-gradient-to-b from-purple-400 to-pink-600 rounded-full" />
                                    <h3 className="text-2xl font-bold text-white">Clubs under BCCA</h3>
                                </motion.div>
                                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                                    {BCCAClubs.filter(c => filteredClubs.includes(c)).map((club, index) => (
                                        <ClubCard
                                            key={index}
                                            index={index}
                                            title={club.title}
                                            about={club.description || 'About this club'}
                                            holderName={club.holder}
                                            contactInfo={club.contactInfo || "Contact information not available"}
                                            logoUrl={club.imageurl || '/images/IITJ/logo/iitjlogo.png'}
                                            socialLinks={club.socialLinks || []}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* BLA Clubs */}
                        {BLAClubs.some(c => filteredClubs.includes(c)) && (
                            <div className="mb-12">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-3 mb-6"
                                >
                                    <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-cyan-600 rounded-full" />
                                    <h3 className="text-2xl font-bold text-white">Clubs under BLA</h3>
                                </motion.div>
                                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                                    {BLAClubs.filter(c => filteredClubs.includes(c)).map((club, index) => (
                                        <ClubCard
                                            key={index}
                                            index={index}
                                            title={club.title}
                                            about={club.description || 'About this club'}
                                            holderName={club.holder}
                                            contactInfo={club.contactInfo || "Contact information not available"}
                                            logoUrl={club.imageurl || '/images/IITJ/logo/iitjlogo.png'}
                                            socialLinks={club.socialLinks || []}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* BAC Clubs */}
                        {BACClubs.some(c => filteredClubs.includes(c)) && (
                            <div className="mb-12">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-3 mb-6"
                                >
                                    <div className="w-1 h-8 bg-gradient-to-b from-orange-400 to-red-600 rounded-full" />
                                    <h3 className="text-2xl font-bold text-white">Clubs under BAC</h3>
                                </motion.div>
                                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                                    {BACClubs.filter(c => filteredClubs.includes(c)).map((club, index) => (
                                        <ClubCard
                                            key={index}
                                            index={index}
                                            title={club.title}
                                            about={club.description || 'About this club'}
                                            holderName={club.holder}
                                            contactInfo={club.contactInfo || "Contact information not available"}
                                            logoUrl={club.imageurl || '/images/IITJ/logo/iitjlogo.png'}
                                            socialLinks={club.socialLinks || []}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* BSS Clubs */}
                        {BSSClubs.some(c => filteredClubs.includes(c)) && (
                            <div>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-3 mb-6"
                                >
                                    <div className="w-1 h-8 bg-gradient-to-b from-green-400 to-teal-600 rounded-full" />
                                    <h3 className="text-2xl font-bold text-white">Clubs under BSS</h3>
                                </motion.div>
                                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                                    {BSSClubs.filter(c => filteredClubs.includes(c)).map((club, index) => (
                                        <ClubCard
                                            key={index}
                                            index={index}
                                            title={club.title}
                                            about={club.description || 'About this club'}
                                            holderName={club.holder}
                                            contactInfo={club.contactInfo || "Contact information not available"}
                                            logoUrl={club.imageurl || '/images/IITJ/logo/iitjlogo.png'}
                                            socialLinks={club.socialLinks || []}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>
                )}

                {/* Communities Section */}
                {filteredCommunities.length > 0 && (
                    <section id="communities-section" data-section className="mb-24 scroll-mt-32">
                        <SectionHeader
                            title="Student Committees"
                            subtitle="Collaborative groups working towards specific goals and initiatives"
                            icon={Users}
                            gradient="from-orange-500 to-amber-400"
                        />
                        
                        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                            {filteredCommunities.map((community, index) => (
                                <ClubCard
                                    key={index}
                                    index={index}
                                    title={community.title}
                                    about={community.description || 'About this committee'}
                                    holderName={community.holder}
                                    contactInfo={community.contactInfo || "Contact information not available"}
                                    logoUrl={community.imageurl || '/images/IITJ/logo/iitjlogo.png'}
                                    socialLinks={community.socialLinks || []}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {/* No Results */}
                {filteredCouncils.length === 0 && filteredBoards.length === 0 && 
                 filteredClubs.length === 0 && filteredCommunities.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20"
                    >
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                            <Search className="w-10 h-10 text-gray-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">No results found</h3>
                        <p className="text-gray-400 mb-6">
                            Try adjusting your search or filter criteria
                        </p>
                        <button
                            onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}
                            className="px-6 py-3 bg-gradient-to-r from-fulvous to-fulvous-light text-white font-medium rounded-xl hover:shadow-glow-fulvous transition-shadow"
                        >
                            Clear filters
                        </button>
                    </motion.div>
                )}
            </div>

            {/* Quick Nav */}
            <QuickNav activeSection={activeSection} onNavigate={scrollToSection} />

            {/* Scroll to Top */}
            <ScrollToTop />
        </div>
    )
}

export default Societies
