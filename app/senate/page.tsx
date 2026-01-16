'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import PersonCard from '@/components/shared/PersonCard';
import { people, clubMembers } from '@/data/people';
import { ChevronLeftCircle, Search } from 'lucide-react';

// Define the structure for a person's data
interface Person {
  id: number;
  name: string;
  pors: string[];
  email?: string;
  phone?: string;
  links: {
    linkedin?: string;
    instagram?: string;
  };
  image: string;
  category: string;
  club?: string;
}

// Define the structure for a club
interface Club {
  clubName: string;
  members: Person[];
}

// Section component for consistent styling
const Section: React.FC<{ id: string; title: string; children: React.ReactNode }> = ({ id, title, children }) => (
  <section id={id} className="mb-10 sm:mb-12 md:mb-16 scroll-mt-16 sm:scroll-mt-20">
    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-fulvous mb-4 sm:mb-6 md:mb-8 text-center">{title}</h2>
    {children}
  </section>
);

// Main component for the Senate page
const SenatePage = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navRef = useRef<HTMLDivElement>(null);

  const filteredPeople = useMemo(() => {
    if (!searchTerm.trim()) {
      return [];
    }
    return people.filter(person =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );
  }, [searchTerm]);

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

  // Renders a section for each club category
  const renderClubSection = (clubs: Club[], sectionId: string, sectionTitle: string) => {
    const generateClubId = (clubName: string) => {
      return clubName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    };

    return (
      <Section id={sectionId} title={sectionTitle}>
        {clubs.map((club) => (
          <div key={club.clubName} id={generateClubId(club.clubName)} className="mb-8 sm:mb-10 md:mb-12 scroll-mt-16 sm:scroll-mt-20">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-300 mb-4 sm:mb-5 md:mb-6 text-center">
              {club.clubName}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {club.members.map((person) => (
                <PersonCard key={person.id} person={person} />
              ))}
            </div>
          </div>
        ))}
      </Section>
    );
  };

  const genSecs = useMemo(() => people.filter(p => p.category === 'gen-sec'), []);
  const vps = useMemo(() => people.filter(p => p.category === 'vp'), []);
  const otherSocietiesAndCommitties = useMemo(() => clubMembers.otherSocietiesAndCommitties, []);


  return (
    <div className="bg-black text-white min-h-screen">
      {/* Quick Navigation */}
      <div ref={navRef} className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50">
        <button
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800/50 backdrop-blur-md text-white p-2 rounded-l-md shadow-lg hover:bg-gray-700/70 transition-all duration-300"
        >
          <ChevronLeftCircle className={`w-6 h-6 transition-transform duration-300 ${isNavOpen ? 'rotate-180' : ''}`} />
        </button>
        <div className={`bg-gray-800/80 backdrop-blur-md rounded-l-lg shadow-2xl overflow-hidden transition-all duration-300 ${isNavOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
          <div className="p-4 w-48">
            <nav className="space-y-2">
              <button onClick={() => scrollToSection('gen-secs')} className="w-full text-left p-2 rounded hover:bg-gray-700/50 transition-colors">General Secretaries</button>
              <button onClick={() => scrollToSection('vps')} className="w-full text-left p-2 rounded hover:bg-gray-700/50 transition-colors">Vice Presidents</button>
              <button onClick={() => scrollToSection('tech-clubs')} className="w-full text-left p-2 rounded hover:bg-gray-700/50 transition-colors">Technical Clubs</button>
              <button onClick={() => scrollToSection('cultural-clubs')} className="w-full text-left p-2 rounded hover:bg-gray-700/50 transition-colors">Cultural Clubs</button>
              <button onClick={() => scrollToSection('sports-clubs')} className="w-full text-left p-2 rounded hover:bg-gray-700/50 transition-colors">Sports Clubs</button>
              <button onClick={() => scrollToSection('academic-societies')} className="w-full text-left p-2 rounded hover:bg-gray-700/50 transition-colors">Academic Societies</button>
              <button onClick={() => scrollToSection('other-societies')} className="w-full text-left p-2 rounded hover:bg-gray-700/50 transition-colors">Other Societies</button>
            </nav>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-black pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 overflow-hidden">
        <div
            className="absolute inset-0 w-full h-full opacity-20"
            style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 25%, transparent 25%), linear-gradient(225deg, rgba(255, 255, 255, 0.05) 25%, transparent 25%)',
                backgroundSize: '40px 40px',
            }}
         ></div>
         <div className="absolute top-1/2 left-1/2 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-fulvous/10 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 tracking-tight">
            MEET THE SENATE
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">
            STUDENT SENATE TEAM MEMBERS<span className="text-white font-medium"></span>
          </p>
          <div className="mt-6 sm:mt-8 max-w-md sm:max-w-lg mx-auto px-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for a member...."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800/50 border-2 border-gray-700 rounded-full py-2.5 sm:py-3 pl-10 sm:pl-12 pr-4 text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fulvous focus:border-transparent transition-all"
              />
              <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content with organized sections */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {searchTerm.trim() !== '' ? (
          <section id="search-results">
            <h2 className="text-3xl font-bold text-fulvous mb-8 text-center">Search Results</h2>
            {filteredPeople.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredPeople.map((person) => (
                  <PersonCard key={person.id} person={person} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400 text-lg">No members found matching your search.</p>
            )}
          </section>
        ) : (
          <>
            <Section id="gen-secs" title="General Secretaries">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {genSecs.map((person) => (
                  <PersonCard key={person.id} person={person} />
                ))}
              </div>
            </Section>

            <Section id="vps" title="Vice Presidents">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                {vps.map((person) => (
                  <PersonCard key={person.id} person={person} />
                ))}
              </div>
            </Section>

            {renderClubSection(clubMembers.technicalClubs, "tech-clubs", "Technical Clubs")}
            {renderClubSection(clubMembers.culturalClubs, "cultural-clubs", "Cultural Clubs")}
            {renderClubSection(clubMembers.sportsClubs, "sports-clubs", "Sports Clubs")}
            {renderClubSection(clubMembers.academicSocieties, "academic-societies", "Academic Societies")}
            {renderClubSection(otherSocietiesAndCommitties, "other-societies", "Other Societies and Committees")}
          </>
        )}
      </div>
    </div>
  );
};

export default SenatePage;