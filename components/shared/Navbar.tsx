'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { useEffect, useState, FC } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tree", label: "Senate Structure" },
  // { href: "/societies", label: "Student bodies" },
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
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarClasses = scrolled || menuOpen
    ? 'bg-navy/80 backdrop-blur-2xl shadow-premium border-b border-white/5'
    : 'bg-transparent';

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-500 ${navbarClasses}`}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        <Link href='/' className="flex items-center gap-4 cursor-pointer group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Avatar className="h-12 w-12 ring-2 ring-white/20 group-hover:ring-fulvous/50 transition-all duration-300">
              <AvatarImage src="/images/IITJ/logo/iitjlogo2.webp" alt="Logo" />
              <AvatarFallback>IITJ</AvatarFallback>
            </Avatar>
          </motion.div>
          <div className="leading-tight">
            <h1 className="text-md sm:text-lg font-bold text-white transition-colors duration-300 group-hover:text-fulvous">
              Student Senate
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 transition-colors duration-300">IIT Jodhpur</p>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex gap-6 lg:gap-8 text-base font-medium items-center">
          <DesktopNavLinks 
            dropdownOpen={dropdownOpen} 
            setDropdownOpen={setDropdownOpen} 
            currentPath={pathname}
          />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <motion.button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
            whileTap={{ scale: 0.9 }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.path 
                    key="close"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    exit={{ pathLength: 0 }}
                    transition={{ duration: 0.3 }}
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                ) : (
                  <motion.g
                    key="menu"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </motion.g>
                )}
              </AnimatePresence>
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-navy/95 backdrop-blur-2xl border-t border-white/5 overflow-hidden"
          >
            <nav className="flex flex-col items-center gap-y-2 text-lg font-medium text-gray-200 py-6 px-4">
              <MobileNavLinks onLinkClick={() => setMenuOpen(false)} currentPath={pathname} />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

const DesktopNavLinks: FC<{
  dropdownOpen: boolean;
  setDropdownOpen: (open: boolean) => void;
  currentPath: string;
}> = ({ dropdownOpen, setDropdownOpen, currentPath }) => {
  return (
    <>
      {navLinks.map(({ href, label, hasDropdown }) => {
        const isActive = currentPath === href || (href !== "/" && currentPath.startsWith(href));
        
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
                className={`relative group transition-colors duration-300 flex items-center gap-1 py-2 ${
                  isActive ? 'text-fulvous' : 'text-gray-200 hover:text-fulvous'
                }`}
              >
                {label}
                <motion.div
                  animate={{ rotate: dropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
                {/* Active indicator */}
                <motion.span 
                  className="absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-fulvous to-fulvous-light rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: isActive ? "100%" : 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="fixed top-[60px] right-4 w-[700px] glass-card rounded-xl shadow-premium-lg z-50 max-h-[500px] overflow-y-auto"
                  >
                    <div className="p-6">
                      <div className="grid grid-cols-3 gap-6">
                        {/* Leadership & Technical Column */}
                        <motion.div 
                          className="space-y-4"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <div className="space-y-3">
                            <h3 className="gradient-text font-bold text-sm uppercase tracking-wider pb-2 border-b border-fulvous/20">
                              Student Senate
                            </h3>
                            <Link
                              href="/senate#gen-secs"
                              onClick={() => setDropdownOpen(false)}
                              className="block py-2 px-3 text-sm text-gray-300 hover:text-fulvous hover:bg-white/5 rounded-lg transition-all duration-200"
                            >
                              General Secretaries
                            </Link>
                            <Link
                              href="/senate#vps"
                              onClick={() => setDropdownOpen(false)}
                              className="block py-2 px-3 text-sm text-gray-300 hover:text-fulvous hover:bg-white/5 rounded-lg transition-all duration-200"
                            >
                              Vice Presidents
                            </Link>
                          </div>
                          {/* Cultural clubs */}
                          <div className="space-y-3">
                            <h3 className="gradient-text font-bold text-sm uppercase tracking-wider pb-2 border-b border-fulvous/20">
                              BAC
                            </h3>
                            <Link href="/senate#raw" onClick={() => setDropdownOpen(false)} className="block py-1.5 px-3 text-sm text-gray-300 hover:text-fulvous hover:bg-white/5 rounded-lg transition-all duration-200">RAW</Link>
                            <Link href="/senate#designerds" onClick={() => setDropdownOpen(false)} className="block py-1.5 px-3 text-sm text-gray-300 hover:text-fulvous hover:bg-white/5 rounded-lg transition-all duration-200">Designerds</Link>
                            <Link href="/senate#sangam" onClick={() => setDropdownOpen(false)} className="block py-1.5 px-3 text-sm text-gray-300 hover:text-fulvous hover:bg-white/5 rounded-lg transition-all duration-200">Sangam</Link>
                            <Link href="/senate#shutterbugs" onClick={() => setDropdownOpen(false)} className="block py-1.5 px-3 text-sm text-gray-300 hover:text-fulvous hover:bg-white/5 rounded-lg transition-all duration-200">RAW</Link>
                            <Link href="/senate#Atliers" onClick={() => setDropdownOpen(false)} className="block py-1.5 px-3 text-sm text-gray-300 hover:text-fulvous hover:bg-white/5 rounded-lg transition-all duration-200">Designerds</Link>
                            <Link href="/senate#sangam" onClick={() => setDropdownOpen(false)} className="block py-1.5 px-3 text-sm text-gray-300 hover:text-fulvous hover:bg-white/5 rounded-lg transition-all duration-200">Sangam</Link>
                          </div>

                          <div className="space-y-3">
                            <h3 className="gradient-text font-bold text-sm uppercase tracking-wider pb-2 border-b border-fulvous/20">
                              BLA
                            </h3>
                            <Link href="/senate#quiz-society" onClick={() => setDropdownOpen(false)} className="block py-1.5 px-3 text-sm text-gray-300 hover:text-fulvous hover:bg-white/5 rounded-lg transition-all duration-200">Quiz Society</Link>
                            <Link href="/senate#literature-society" onClick={() => setDropdownOpen(false)} className="block py-1.5 px-3 text-sm text-gray-300 hover:text-fulvous hover:bg-white/5 rounded-lg transition-all duration-200">Literature Society</Link>
                            <Link href="/senate#pheme" onClick={() => setDropdownOpen(false)} className="block py-1.5 px-3 text-sm text-gray-300 hover:text-fulvous hover:bg-white/5 rounded-lg transition-all duration-200">PHEME</Link>
                          </div>
                        </motion.div>

                        {/* Technical Clubs Column */}
                        <motion.div 
                          className="space-y-3"
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 }}
                        >
                          <h3 className="gradient-text font-bold text-sm uppercase tracking-wider pb-2 border-b border-fulvous/20">
                            BCCA  
                          </h3>
                          <Link href="/senate#robotics-society" onClick={() => setDropdownOpen(false)} className="block py-1.5 px-3 text-sm text-gray-300 hover:text-fulvous hover:bg-white/5 rounded-lg transition-all duration-200">Robotics Society</Link>
                          <Link href="/senate#devlup-labs" onClick={() => setDropdownOpen(false)} className="block py-1.5 px-3 text-sm text-gray-300 hover:text-fulvous hover:bg-white/5 rounded-lg transition-all duration-200">Devlup Labs</Link>
                          <Link href="/senate#product-club" onClick={() => setDropdownOpen(false)} className="block py-1.5 px-3 text-sm text-gray-300 hover:text-fulvous hover:bg-white/5 rounded-lg transition-all duration-200">Product Club</Link>
                          <Link href="/senate#respawn" onClick={() => setDropdownOpen(false)} className="block py-1.5 px-3 text-sm text-gray-300 hover:text-fulvous hover:bg-white/5 rounded-lg transition-all duration-200">Respawn</Link>
                          <Link href="/senate#quant-club" onClick={() => setDropdownOpen(false)} className="block py-1.5 px-3 text-sm text-gray-300 hover:text-fulvous hover:bg-white/5 rounded-lg transition-all duration-200">Quant Club</Link>
                          <Link href="/senate#boltheads" onClick={() => setDropdownOpen(false)} className="block py-1.5 px-3 text-sm text-gray-300 hover:text-fulvous hover:bg-white/5 rounded-lg transition-all duration-200">Boltheads</Link>
                          <Link href="/senate#psoc" onClick={() => setDropdownOpen(false)} className="block py-1.5 px-3 text-sm text-gray-300 hover:text-fulvous hover:bg-white/5 rounded-lg transition-all duration-200">PSOC</Link>
                          <Link href="/senate#nexus" onClick={() => setDropdownOpen(false)} className="block py-1.5 px-3 text-sm text-gray-300 hover:text-fulvous hover:bg-white/5 rounded-lg transition-all duration-200">Nexus</Link>
                          <Link href="/senate#raid" onClick={() => setDropdownOpen(false)} className="block py-1.5 px-3 text-sm text-gray-300 hover:text-fulvous hover:bg-white/5 rounded-lg transition-all duration-200">RAID</Link>
                          <Link href="/senate#inside" onClick={() => setDropdownOpen(false)} className="block py-1.5 px-3 text-sm text-gray-300 hover:text-fulvous hover:bg-white/5 rounded-lg transition-all duration-200">InSiDe</Link>
                        </motion.div>

                        <motion.div 
                          className="space-y-3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <h3 className="gradient-text font-bold text-sm uppercase tracking-wider pb-2 border-b border-fulvous/20">
                            BSS  
                          </h3>
                          <Link href="/senate#respawn" onClick={() => setDropdownOpen(false)} className="block py-1.5 px-3 text-sm text-gray-300 hover:text-fulvous hover:bg-white/5 rounded-lg transition-all duration-200">Respawn</Link>
                          <Link href="/senate#chess-society" onClick={() => setDropdownOpen(false)} className="block py-1.5 px-3 text-sm text-gray-300 hover:text-fulvous hover:bg-white/5 rounded-lg transition-all duration-200">Chess Society</Link>
                          <Link href="/senate#table-tennis-society" onClick={() => setDropdownOpen(false)} className="block py-1.5 px-3 text-sm text-gray-300 hover:text-fulvous hover:bg-white/5 rounded-lg transition-all duration-200">Table Tennis</Link>
                          <Link href="/senate#football-society" onClick={() => setDropdownOpen(false)} className="block py-1.5 px-3 text-sm text-gray-300 hover:text-fulvous hover:bg-white/5 rounded-lg transition-all duration-200">Football Society</Link>
                          <Link href="/senate#basketball-society" onClick={() => setDropdownOpen(false)} className="block py-1.5 px-3 text-sm text-gray-300 hover:text-fulvous hover:bg-white/5 rounded-lg transition-all duration-200">Basketball</Link>
                          <Link href="/senate#badminton-society" onClick={() => setDropdownOpen(false)} className="block py-1.5 px-3 text-sm text-gray-300 hover:text-fulvous hover:bg-white/5 rounded-lg transition-all duration-200">Badminton</Link>
                          <Link href="/senate#volleyball-society" onClick={() => setDropdownOpen(false)} className="block py-1.5 px-3 text-sm text-gray-300 hover:text-fulvous hover:bg-white/5 rounded-lg transition-all duration-200">Volleyball</Link>
                          <Link href="/senate#cricket-society" onClick={() => setDropdownOpen(false)} className="block py-1.5 px-3 text-sm text-gray-300 hover:text-fulvous hover:bg-white/5 rounded-lg transition-all duration-200">Cricket Society</Link>
                          <Link href="/senate#athletics-society" onClick={() => setDropdownOpen(false)} className="block py-1.5 px-3 text-sm text-gray-300 hover:text-fulvous hover:bg-white/5 rounded-lg transition-all duration-200">Athletics</Link>
                          <Link href="/senate#squash-society" onClick={() => setDropdownOpen(false)} className="block py-1.5 px-3 text-sm text-gray-300 hover:text-fulvous hover:bg-white/5 rounded-lg transition-all duration-200">Squash</Link>
                          <Link href="/senate#hockey-society" onClick={() => setDropdownOpen(false)} className="block py-1.5 px-3 text-sm text-gray-300 hover:text-fulvous hover:bg-white/5 rounded-lg transition-all duration-200">Hockey</Link>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        }

        const isLinkActive = currentPath === href;
        return (
          <Link
            key={href}
            href={href}
            target={["Calendar", "Constitution", "Visit IITJ"].includes(label) ? "_blank" : undefined}
            rel={["Calendar", "Constitution", "Visit IITJ"].includes(label) ? "noopener noreferrer" : undefined}
            className={`relative group transition-colors duration-300 py-2 ${
              isLinkActive ? 'text-fulvous' : 'text-gray-200 hover:text-fulvous'
            }`}
          >
            {label}
            <motion.span 
              className="absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-fulvous to-fulvous-light rounded-full"
              initial={{ width: 0 }}
              animate={{ width: isLinkActive ? "100%" : 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </Link>
        );
      })}
    </>
  )
}

const MobileNavLinks: FC<{ onLinkClick: () => void; currentPath: string }> = ({ onLinkClick, currentPath }) => {
  return (
    <>
      {navLinks.map(({ href, label }, index) => {
        const isActive = currentPath === href;
        return (
          <motion.div
            key={href}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              href={href}
              onClick={onLinkClick}
              className={`block py-3 px-6 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'text-fulvous bg-fulvous/10' 
                  : 'text-gray-200 hover:text-fulvous hover:bg-white/5'
              }`}
              target={["Calendar", "Constitution", "Visit IITJ"].includes(label) ? "_blank" : undefined}
              rel={["Calendar", "Constitution", "Visit IITJ"].includes(label) ? "noopener noreferrer" : undefined}
            >
              {label}
            </Link>
          </motion.div>
        );
      })}
    </>
  )
}
