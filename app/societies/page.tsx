"use client"

import React, { useState, useEffect, useRef } from 'react'
import CouncilCard from '@/components/societies/CouncilCard'
import Cube from '@/components/societies/3DCube'
import ClubCard from '@/components/societies/ClubCard'
import { councils } from '@/data/councils'
import { ACACBoards, SACBoards } from '@/data/boards'
import { getCubeFaces } from '@/lib/utils'
import { BCCAClubs, BLAClubs, BACClubs, BSSClubs } from '@/data/clubs';
import { BHACommunities } from '@/data/communities';
import { BAICommunities, BDSCommunities } from '@/data/communities';
import { ACACOtherCommunities, BCCAOtherCommunities, SSOtherCommunities } from '@/data/communities';

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="relative flex items-center justify-center my-16">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t-2 border-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
    </div>
    <div className="relative bg-gray-900 px-8">
      <h2 className="text-4xl font-bold text-center text-gray-100 drop-shadow-sm">
        {children}
      </h2>
    </div>
  </div>
);

const Societies = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);
    const ACAC_faces = getCubeFaces(ACACBoards);
    const SAC_faces = getCubeFaces(SACBoards);

    const SAC_communities = [ ...BHACommunities, ...BCCAOtherCommunities];
    const ACAC_communities = [...BAICommunities, ...BDSCommunities, ...ACACOtherCommunities];
    const SS_communities = [...SSOtherCommunities];

    // Handle clicks outside of navigation
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setIsNavOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsNavOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-900 relative">
            {/* Quick Navigation */}
            <div 
                ref={navRef}
                className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50"
            >
                {/* Toggle Button */}
                <button
                    onClick={() => setIsNavOpen(!isNavOpen)}
                    className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#E58420] to-[#323273] text-white p-3 rounded-l-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                        isNavOpen ? 'translate-x-48' : 'translate-x-0'
                    }`}
                >
                    <svg 
                        className={`w-5 h-5 transition-transform duration-300 ${isNavOpen ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Navigation Panel */}
                <div className={`bg-gray-800 rounded-l-2xl shadow-2xl border border-gray-700 overflow-hidden transition-all duration-300 ${
                    isNavOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                }`}>
                    <div className="p-6 w-48">
                        <div className="text-center mb-4">
                            <h3 className="font-bold text-lg text-gray-100 mb-1">Quick Nav</h3>
                            <div className="w-8 h-0.5 bg-gradient-to-r from-[#E58420] to-[#323273] rounded-full mx-auto"></div>
                        </div>
                        
                        <nav className="space-y-3">
                            <button
                                onClick={() => scrollToSection('councils-section')}
                                className="w-full text-left px-4 py-3 rounded-xl bg-gradient-to-r from-[#E58420]/10 to-[#323273]/10 hover:from-[#E58420] hover:to-[#323273] hover:text-white transition-all duration-300 text-gray-100 font-semibold text-sm group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-[#E58420] rounded-full group-hover:bg-white"></div>
                                    Councils
                                </div>
                            </button>
                            
                            <button
                                onClick={() => scrollToSection('boards-section')}
                                className="w-full text-left px-4 py-3 rounded-xl bg-gradient-to-r from-[#E58420]/10 to-[#323273]/10 hover:from-[#E58420] hover:to-[#323273] hover:text-white transition-all duration-300 text-gray-100 font-semibold text-sm group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-[#323273] rounded-full group-hover:bg-white"></div>
                                    Boards
                                </div>
                            </button>
                            
                            <button
                                onClick={() => scrollToSection('clubs-section')}
                                className="w-full text-left px-4 py-3 rounded-xl bg-gradient-to-r from-[#E58420]/10 to-[#323273]/10 hover:from-[#E58420] hover:to-[#323273] hover:text-white transition-all duration-300 text-gray-100 font-semibold text-sm group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-[#262872] rounded-full group-hover:bg-white"></div>
                                    Clubs
                                </div>
                            </button>
                            
                            <button
                                onClick={() => scrollToSection('communities-section')}
                                className="w-full text-left px-4 py-3 rounded-xl bg-gradient-to-r from-[#E58420]/10 to-[#323273]/10 hover:from-[#E58420] hover:to-[#323273] hover:text-white transition-all duration-300 text-gray-100 font-semibold text-sm group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-[#E58420] rounded-full group-hover:bg-white"></div>
                                    Communities
                                </div>
                            </button>
                        </nav>
                        
                        <div className="mt-4 pt-3 border-t border-gray-600">
                            <div className="text-xs text-gray-400 text-center">
                                Click to navigate
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-6xl font-bold text-gray-100 mb-4 drop-shadow-lg">
                        Student Societies
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Explore the vibrant community of student councils, boards, clubs, and societies at IIT Jodhpur
                    </p>
                </div>

                {/* Councils Section */}
                <section id="councils-section" className="mb-20 scroll-mt-20">
                    <SectionTitle>Student Councils</SectionTitle>
                    <div className="bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-700">
                        <div className="flex flex-col gap-8">
                            {councils.map((council, index) => (
                                <div key={index} className="transform hover:scale-[1.02] transition-transform duration-300">
                                    <CouncilCard council={council} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Boards Section */}
                <section id="boards-section" className="mb-20 scroll-mt-20">
                    <SectionTitle>Student Boards</SectionTitle>
                    <div className="space-y-12">
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl p-8 border border-gray-700">
                            <h3 className="text-2xl font-semibold text-center text-blue-300 mb-8">
                                Boards under ACAC
                            </h3>
                            <div className="flex justify-center">
                                <Cube faces={ACAC_faces} />
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl p-8 border border-gray-700">
                            <h3 className="text-2xl font-semibold text-center text-green-300 mb-8">
                                Boards under SAC
                            </h3>
                            <div className="flex justify-center">
                                <Cube faces={SAC_faces} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Clubs Section */}
                <section id="clubs-section" className="mb-20 scroll-mt-20">
                    <SectionTitle>Student Clubs</SectionTitle>
                    <div className="space-y-16">
                        {/* BCCA Clubs */}
                        <div className="bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-700">
                            <h3 className="text-3xl font-semibold text-center text-purple-300 mb-8 relative">
                                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    Clubs under BCCA
                                </span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {BCCAClubs.map((club, index) => (
                                    <div key={index} className="transform hover:scale-105 transition-transform duration-300">
                                        <ClubCard
                                            title={club.title}
                                            about={club.description || 'About this club'}
                                            holderName={club.holder}
                                            contactInfo={club.contactInfo || "Contact information not available"}
                                            logoUrl={club.imageurl || '/images/IITJ/logo/iitjlogo.png'}
                                            socialLinks={club.socialLinks || []}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* BLA Clubs */}
                        <div className="bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-700">
                            <h3 className="text-3xl font-semibold text-center text-blue-300 mb-8">
                                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                    Clubs under BLA
                                </span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {BLAClubs.map((club, index) => (
                                    <div key={index} className="transform hover:scale-105 transition-transform duration-300">
                                        <ClubCard
                                            title={club.title}
                                            about={club.description || 'About this club'}
                                            holderName={club.holder}
                                            contactInfo={club.contactInfo || "Contact information not available"}
                                            logoUrl={club.imageurl || '/images/IITJ/logo/iitjlogo.png'}
                                            socialLinks={club.socialLinks || []}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* BAC Clubs */}
                        <div className="bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-700">
                            <h3 className="text-3xl font-semibold text-center text-orange-300 mb-8">
                                <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                                    Clubs under BAC
                                </span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {BACClubs.map((club, index) => (
                                    <div key={index} className="transform hover:scale-105 transition-transform duration-300">
                                        <ClubCard
                                            title={club.title}
                                            about={club.description || 'About this club'}
                                            holderName={club.holder}
                                            contactInfo={club.contactInfo || "Contact information not available"}
                                            logoUrl={club.imageurl || '/images/IITJ/logo/iitjlogo.png'}
                                            socialLinks={club.socialLinks || []}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* BSS Clubs */}
                        <div className="bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-700">
                            <h3 className="text-3xl font-semibold text-center text-green-300 mb-8">
                                <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                                    Clubs under BSS
                                </span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {BSSClubs.map((club, index) => (
                                    <div key={index} className="transform hover:scale-105 transition-transform duration-300">
                                        <ClubCard
                                            title={club.title}
                                            about={club.description || 'About this club'}
                                            holderName={club.holder}
                                            contactInfo={club.contactInfo || "Contact information not available"}
                                            logoUrl={club.imageurl || '/images/IITJ/logo/iitjlogo.png'}
                                            socialLinks={club.socialLinks || []}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Communities Section */}
                <section id="communities-section" className="mb-20 scroll-mt-20">
                    <SectionTitle>Student Committees</SectionTitle>
                    <div className="space-y-16">
                        {/* SAC Communities */}
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl p-8 border border-gray-700">
                            <h3 className="text-3xl font-semibold text-center text-indigo-300 mb-8">
                                Committees affilated with SAC
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {SAC_communities.map((community, index) => (
                                    <div key={index} className="transform hover:scale-105 transition-transform duration-300">
                                        <ClubCard
                                            title={community.title}
                                            about={community.description || 'About this community'}
                                            holderName={community.holder}
                                            contactInfo={community.contactInfo || "Contact information not available"}
                                            logoUrl={community.imageurl || '/images/IITJ/logo/iitjlogo.png'}
                                            socialLinks={community.socialLinks || []}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ACAC Communities */}
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl p-8 border border-gray-700">
                            <h3 className="text-3xl font-semibold text-center text-rose-300 mb-8">
                                Committees affilated with ACAC
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {ACAC_communities.map((community, index) => (
                                    <div key={index} className="transform hover:scale-105 transition-transform duration-300">
                                        <ClubCard
                                            title={community.title}
                                            about={community.description || 'About this community'}
                                            holderName={community.holder}
                                            contactInfo={community.contactInfo || "Contact information not available"}
                                            logoUrl={community.imageurl || '/images/IITJ/logo/iitjlogo.png'}
                                            socialLinks={community.socialLinks || []}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* SS Communities */}
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl p-8 border border-gray-700">
                            <h3 className="text-3xl font-semibold text-center text-amber-300 mb-8">
                                Committees affilated with SS
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {SS_communities.map((community, index) => (
                                    <div key={index} className="transform hover:scale-105 transition-transform duration-300">
                                        <ClubCard
                                            title={community.title}
                                            about={community.description || 'About this community'}
                                            holderName={community.holder}
                                            contactInfo={community.contactInfo || "Contact information not available"}
                                            logoUrl={community.imageurl || '/images/IITJ/logo/iitjlogo.png'}
                                            socialLinks={community.socialLinks || []}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Societies;