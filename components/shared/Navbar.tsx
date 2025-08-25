'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { useEffect, useState, FC } from "react"
import { ChevronDown } from "lucide-react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tree", label: "Senate Structure" },
  {
    href: "/senate",
    label: "Student Body Directory",
    hasDropdown: true
  },
  { href: "/events", label: "Events" },
  { href: "https://iitj.ac.in/PageImages/Gallery/07-2025/Academic-Calendar-AY-202526SemI2-with-CCCD-events-638871414539740843.pdf", label: "Calendar" },
  { href: "/pdfs/constitution.pdf", label: "Constitution" },
  { href: "https://www.iitj.ac.in/main/en/iitj", label: "Visit IITJ" }
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarClasses = scrolled || menuOpen
    ? 'bg-black/70 backdrop-blur-xl shadow-2xl border-b border-white/10'
    : 'bg-transparent';

  return (
    <header className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${navbarClasses}`}>
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        <Link href='/' className="flex items-center gap-4 cursor-pointer">
          <Avatar className="h-12 w-12 ring-2 ring-white/20">
            <AvatarImage src="/images/IITJ/logo/iitjlogo2.webp" alt="Logo" />
            <AvatarFallback>IITJ</AvatarFallback>
          </Avatar>
          <div className="leading-tight">
            <h1 className="text-md sm:text-lg font-bold text-white transition-colors duration-300">
              Student Senate
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 transition-colors duration-300">IIT Jodhpur</p>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex gap-6 lg:gap-8 text-base font-medium items-center">
          <DesktopNavLinks dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen} />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none transition-colors duration-300">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-xl pb-4 border-t border-white/10">
          <nav className="flex flex-col items-center gap-y-4 text-lg font-medium text-gray-200 pt-2">
            <MobileNavLinks onLinkClick={() => setMenuOpen(false)} />
          </nav>
        </div>
      )}
    </header>
  )
}

const DesktopNavLinks: FC<{
  dropdownOpen: boolean;
  setDropdownOpen: (open: boolean) => void;
}> = ({ dropdownOpen, setDropdownOpen }) => {
  return (
    <>
      {navLinks.map(({ href, label, hasDropdown }) => {
        if (hasDropdown) {
          return (
            <div
              key={href}
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link
                href={href}
                className="relative group transition-colors duration-300 text-gray-200 hover:text-fulvous flex items-center gap-1"
              >
                {label}
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 transition-all duration-300 group-hover:w-full bg-fulvous" />
              </Link>
              {dropdownOpen && (
                <div className="fixed top-[50px] right-4 w-[700px] bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-50 max-h-[500px] overflow-y-auto">
                  <div className="p-6">
                    <div className="grid grid-cols-3 gap-6">
                      {/* Leadership & Technical Column */}
                      <div className="space-y-4">
                        <div className="space-y-3">
                          <h3 className="text-fulvous font-bold text-sm uppercase tracking-wide border-b border-fulvous/30 pb-2">
                            Student Senate
                          </h3>
                          <Link
                            href="/senate#gen-secs"
                            onClick={() => setDropdownOpen(false)}
                            className="block py-2 px-3 text-sm text-gray-200 hover:text-fulvous hover:bg-white/5 rounded-md transition-all duration-200"
                          >
                            General Secretaries
                          </Link>
                          <Link
                            href="/senate#vps"
                            onClick={() => setDropdownOpen(false)}
                            className="block py-2 px-3 text-sm text-gray-200 hover:text-fulvous hover:bg-white/5 rounded-md transition-all duration-200"
                          >
                            Vice Presidents
                          </Link>
                        </div>
                        {/* Cultural clubs */}
                        <div className="space-y-3">
                          <h3 className="text-fulvous font-bold text-sm uppercase tracking-wide border-b border-fulvous/30 pb-2">
                            BAC
                          </h3>
                          <Link href="/senate#raw" onClick={() => setDropdownOpen(false)} className="block py-1 px-2 text-sm text-gray-200 hover:text-fulvous hover:bg-white/5 rounded transition-all duration-200">RAW</Link>
                          <Link href="/senate#designerds" onClick={() => setDropdownOpen(false)} className="block py-1 px-2 text-sm text-gray-200 hover:text-fulvous hover:bg-white/5 rounded transition-all duration-200">Designerds</Link>
                          <Link href="/senate#sangam" onClick={() => setDropdownOpen(false)} className="block py-1 px-2 text-sm text-gray-200 hover:text-fulvous hover:bg-white/5 rounded transition-all duration-200">Sangam</Link>
                          <Link href="/senate#shutterbugs" onClick={() => setDropdownOpen(false)} className="block py-1 px-2 text-sm text-gray-200 hover:text-fulvous hover:bg-white/5 rounded transition-all duration-200">RAW</Link>
                          <Link href="/senate#Atliers" onClick={() => setDropdownOpen(false)} className="block py-1 px-2 text-sm text-gray-200 hover:text-fulvous hover:bg-white/5 rounded transition-all duration-200">Designerds</Link>
                          <Link href="/senate#sangam" onClick={() => setDropdownOpen(false)} className="block py-1 px-2 text-sm text-gray-200 hover:text-fulvous hover:bg-white/5 rounded transition-all duration-200">Sangam</Link>
                        </div>

                        <div className="space-y-3">
                          <h3 className="text-fulvous font-bold text-sm uppercase tracking-wide border-b border-fulvous/30 pb-2">
                            BLA
                          </h3>
                          <Link href="/senate#quiz-society" onClick={() => setDropdownOpen(false)} className="block py-1 px-2 text-sm text-gray-200 hover:text-fulvous hover:bg-white/5 rounded transition-all duration-200">Quiz Society</Link>
                          <Link href="/senate#literature-society" onClick={() => setDropdownOpen(false)} className="block py-1 px-2 text-sm text-gray-200 hover:text-fulvous hover:bg-white/5 rounded transition-all duration-200">Literature Society</Link>
                          <Link href="/senate#pheme" onClick={() => setDropdownOpen(false)} className="block py-1 px-2 text-sm text-gray-200 hover:text-fulvous hover:bg-white/5 rounded transition-all duration-200">PHEME</Link>
                      </div>

                      </div>

                      

                      {/* Technical Clubs Column */}
                      <div className="space-y-3">
                        <h3 className="text-fulvous font-bold text-sm uppercase tracking-wide border-b border-fulvous/30 pb-2">
                          BCCA  
                        </h3>
                        <Link href="/senate#robotics-society" onClick={() => setDropdownOpen(false)} className="block py-1 px-2 text-sm text-gray-200 hover:text-fulvous hover:bg-white/5 rounded transition-all duration-200">Robotics Society</Link>
                        <Link href="/senate#devlup-labs" onClick={() => setDropdownOpen(false)} className="block py-1 px-2 text-sm text-gray-200 hover:text-fulvous hover:bg-white/5 rounded transition-all duration-200">Devlup Labs</Link>
                        <Link href="/senate#product-club" onClick={() => setDropdownOpen(false)} className="block py-1 px-2 text-sm text-gray-200 hover:text-fulvous hover:bg-white/5 rounded transition-all duration-200">Product Club</Link>
                        <Link href="/senate#respawn" onClick={() => setDropdownOpen(false)} className="block py-1 px-2 text-sm text-gray-200 hover:text-fulvous hover:bg-white/5 rounded transition-all duration-200">Respawn</Link>
                        <Link href="/senate#quant-club" onClick={() => setDropdownOpen(false)} className="block py-1 px-2 text-sm text-gray-200 hover:text-fulvous hover:bg-white/5 rounded transition-all duration-200">Quant Club</Link>
                        <Link href="/senate#boltheads" onClick={() => setDropdownOpen(false)} className="block py-1 px-2 text-sm text-gray-200 hover:text-fulvous hover:bg-white/5 rounded transition-all duration-200">Boltheads</Link>
                        <Link href="/senate#psoc" onClick={() => setDropdownOpen(false)} className="block py-1 px-2 text-sm text-gray-200 hover:text-fulvous hover:bg-white/5 rounded transition-all duration-200">PSOC</Link>
                        <Link href="/senate#nexus" onClick={() => setDropdownOpen(false)} className="block py-1 px-2 text-sm text-gray-200 hover:text-fulvous hover:bg-white/5 rounded transition-all duration-200">Nexus</Link>
                        <Link href="/senate#raid" onClick={() => setDropdownOpen(false)} className="block py-1 px-2 text-sm text-gray-200 hover:text-fulvous hover:bg-white/5 rounded transition-all duration-200">RAID</Link>
                        <Link href="/senate#inside" onClick={() => setDropdownOpen(false)} className="block py-1 px-2 text-sm text-gray-200 hover:text-fulvous hover:bg-white/5 rounded transition-all duration-200">InSiDe</Link>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-fulvous font-bold text-sm uppercase tracking-wide border-b border-fulvous/30 pb-2">
                          BSS  
                        </h3>
                        <Link href="/senate#respawn" onClick={() => setDropdownOpen(false)} className="block py-1 px-2 text-sm text-gray-200 hover:text-fulvous hover:bg-white/5 rounded transition-all duration-200">Respawn</Link>
                        <Link href="/senate#chess-society" onClick={() => setDropdownOpen(false)} className="block py-1 px-2 text-sm text-gray-200 hover:text-fulvous hover:bg-white/5 rounded transition-all duration-200">Chess Society</Link>
                        <Link href="/senate#table-tennis-society" onClick={() => setDropdownOpen(false)} className="block py-1 px-2 text-sm text-gray-200 hover:text-fulvous hover:bg-white/5 rounded transition-all duration-200">Table Tennis</Link>
                        <Link href="/senate#football-society" onClick={() => setDropdownOpen(false)} className="block py-1 px-2 text-sm text-gray-200 hover:text-fulvous hover:bg-white/5 rounded transition-all duration-200">Football Society</Link>
                        <Link href="/senate#basketball-society" onClick={() => setDropdownOpen(false)} className="block py-1 px-2 text-sm text-gray-200 hover:text-fulvous hover:bg-white/5 rounded transition-all duration-200">Basketball</Link>
                        <Link href="/senate#badminton-society" onClick={() => setDropdownOpen(false)} className="block py-1 px-2 text-sm text-gray-200 hover:text-fulvous hover:bg-white/5 rounded transition-all duration-200">Badminton</Link>
                        <Link href="/senate#volleyball-society" onClick={() => setDropdownOpen(false)} className="block py-1 px-2 text-sm text-gray-200 hover:text-fulvous hover:bg-white/5 rounded transition-all duration-200">Volleyball</Link>
                        <Link href="/senate#cricket-society" onClick={() => setDropdownOpen(false)} className="block py-1 px-2 text-sm text-gray-200 hover:text-fulvous hover:bg-white/5 rounded transition-all duration-200">Cricket Society</Link>
                        <Link href="/senate#athletics-society" onClick={() => setDropdownOpen(false)} className="block py-1 px-2 text-sm text-gray-200 hover:text-fulvous hover:bg-white/5 rounded transition-all duration-200">Athletics</Link>
                        <Link href="/senate#squash-society" onClick={() => setDropdownOpen(false)} className="block py-1 px-2 text-sm text-gray-200 hover:text-fulvous hover:bg-white/5 rounded transition-all duration-200">Squash</Link>
                        <Link href="/senate#hockey-society" onClick={() => setDropdownOpen(false)} className="block py-1 px-2 text-sm text-gray-200 hover:text-fulvous hover:bg-white/5 rounded transition-all duration-200">Hockey</Link>
                      </div>


                      {/* Sports Clubs Column */}
                      <div className="space-y-3">
                        <h3 className="text-fulvous font-bold text-sm uppercase tracking-wide border-b border-fulvous/30 pb-2">
                          Sports & Others
                        </h3>
                        
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        }

        return (
          <Link
            key={href}
            href={href}
            target={["Calendar", "Constitution", "Visit IITJ"].includes(label) ? "_blank" : undefined}
            rel={["Calendar", "Constitution", "Visit IITJ"].includes(label) ? "noopener noreferrer" : undefined}
            className="relative group transition-colors duration-300 text-gray-200 hover:text-fulvous"
          >
            {label}
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 transition-all duration-300 group-hover:w-full bg-fulvous" />
          </Link>
        );
      })}
    </>
  )
}

const MobileNavLinks: FC<{ onLinkClick: () => void }> = ({ onLinkClick }) => {
  return (
    <>
      {navLinks.map(({ href, label }) => {
        // For mobile, don't show dropdown - just show the main link
        return (
          <Link
            key={href}
            href={href}
            onClick={onLinkClick}
            className="py-2 hover:text-fulvous transition-colors duration-200"
            target={["Calendar", "Constitution", "Visit IITJ"].includes(label) ? "_blank" : undefined}
            rel={["Calendar", "Constitution", "Visit IITJ"].includes(label) ? "noopener noreferrer" : undefined}
          >
            {label}
          </Link>
        );
      })}
    </>
  )
}
