"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronDown, ChevronRight, Building2 } from 'lucide-react';
import RadialDiagram from '@/components/tree/RadialDiagram';
import SenateStats from '@/components/tree/SenateStats';
import { treeData } from '@/data/treeData';

interface TreeNodeData {
  id: string;
  name: string;
  fullName: string;
  holder: string;
  type: string;
  parent?: string;
}

// Mobile Tree View Component
const MobileTreeView: React.FC<{ data: typeof treeData }> = ({ data }) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['sac', 'ss', 'acac']));

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  const getChildBoards = (parentId: string) => {
    return data.boards.filter(board => board.parent === parentId);
  };

  const getChildClubs = (parentId: string) => {
    return data.clubs.filter(club => club.parent === parentId);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'main': return 'from-blue-500 to-blue-400';
      case 'board': return 'from-green-500 to-green-400';
      case 'committee': return 'from-orange-500 to-orange-400';
      default: return 'from-purple-500 to-purple-400';
    }
  };

  return (
    <div className="space-y-3">
      {/* Senate Root */}
      <div className="glass-card rounded-xl p-4 border border-fulvous/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fulvous to-fulvous-light flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white">Student Senate</h3>
            <p className="text-xs text-gray-400">IIT Jodhpur</p>
          </div>
        </div>
      </div>

      {/* Main Councils */}
      {data.mainBodies.map(council => (
        <div key={council.id} className="ml-4">
          <motion.button
            onClick={() => toggleNode(council.id)}
            className="w-full glass-card rounded-xl p-4 flex items-center justify-between hover:border-blue-500/30 border border-transparent transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getTypeColor('main')} flex items-center justify-center`}>
                <span className="text-white text-xs font-bold">{council.name.slice(0, 2)}</span>
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-white text-sm">{council.name}</h4>
                <p className="text-xs text-gray-400">{council.fullName}</p>
              </div>
            </div>
            {expandedNodes.has(council.id) ? (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
          </motion.button>

          <AnimatePresence>
            {expandedNodes.has(council.id) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {/* Boards under this council */}
                {getChildBoards(council.id).map(board => (
                  <div key={board.id} className="ml-6 mt-2">
                    <motion.button
                      onClick={() => toggleNode(board.id)}
                      className="w-full glass-card rounded-lg p-3 flex items-center justify-between hover:border-green-500/30 border border-transparent transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded bg-gradient-to-br ${getTypeColor('board')} flex items-center justify-center`}>
                          <span className="text-white text-[10px] font-bold">{board.name.slice(0, 2)}</span>
                        </div>
                        <div className="text-left">
                          <h5 className="font-medium text-white text-xs">{board.name}</h5>
                          {board.holder && <p className="text-[10px] text-fulvous">{board.holder}</p>}
                        </div>
                      </div>
                      {getChildClubs(board.id).length > 0 && (
                        expandedNodes.has(board.id) ? (
                          <ChevronDown className="w-3 h-3 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-3 h-3 text-gray-400" />
                        )
                      )}
                    </motion.button>

                    <AnimatePresence>
                      {expandedNodes.has(board.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="ml-4 mt-1 space-y-1 overflow-hidden"
                        >
                          {getChildClubs(board.id).map(club => (
                            <div 
                              key={club.id} 
                              className={`glass-card rounded-lg p-2 flex items-center gap-2 border-l-2 ${
                                club.type === 'committee' ? 'border-orange-500' : 'border-purple-500'
                              }`}
                            >
                              <div className={`w-5 h-5 rounded bg-gradient-to-br ${getTypeColor(club.type)} flex items-center justify-center`}>
                                <span className="text-white text-[8px] font-bold">{club.name.slice(0, 1)}</span>
                              </div>
                              <span className="text-xs text-gray-300">{club.name}</span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* Direct clubs/committees under council */}
                {getChildClubs(council.id).map(club => (
                  <div 
                    key={club.id} 
                    className={`ml-6 mt-2 glass-card rounded-lg p-2 flex items-center gap-2 border-l-2 ${
                      club.type === 'committee' ? 'border-orange-500' : 'border-purple-500'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded bg-gradient-to-br ${getTypeColor(club.type)} flex items-center justify-center`}>
                      <span className="text-white text-[8px] font-bold">{club.name.slice(0, 1)}</span>
                    </div>
                    <span className="text-xs text-gray-300">{club.name}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default function TreePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedSearchNode, setSelectedSearchNode] = useState<TreeNodeData | null>(null);
  const [highlightedNodeId, setHighlightedNodeId] = useState<string | null>(null);

  const allNodes = useMemo(() => {
    return [...treeData.mainBodies, ...treeData.boards, ...treeData.clubs];
  }, []);

  const filteredNodes = useMemo(() => {
    if (!searchTerm.trim()) return [];
    return allNodes.filter(node =>
      node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.holder.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 8);
  }, [searchTerm, allNodes]);

  const getNodeTypeLabel = (type: string) => {
    if (type === 'main') return 'Council';
    if (type === 'board') return 'Board';
    if (type === 'committee') return 'Committee';
    return 'Club';
  };

  const getNodeTypeColor = (type: string) => {
    if (type === 'main') return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    if (type === 'board') return 'bg-green-500/20 text-green-400 border-green-500/30';
    if (type === 'committee') return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
  };

  const handleSearchSelect = (node: TreeNodeData) => {
    setSelectedSearchNode(node);
    setHighlightedNodeId(node.id);
    setSearchTerm('');
    setIsSearchFocused(false);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSelectedSearchNode(null);
    setHighlightedNodeId(null);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-navy-950">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('/images/fests/bg/background7.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-950/95 to-navy-950" />
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-fulvous/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Premium Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 pt-16 sm:pt-20">
          {/* Decorative top line */}
          <motion.div 
            className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="h-px w-8 sm:w-12 md:w-16 bg-gradient-to-r from-transparent to-fulvous"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <span className="text-fulvous text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.2em] sm:tracking-[0.3em] uppercase">
              Organizational Structure
            </span>
            <motion.div 
              className="h-px w-8 sm:w-12 md:w-16 bg-gradient-to-l from-transparent to-fulvous"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>

          <motion.h1 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="gradient-text">Student Senate</span>
          </motion.h1>

          <motion.p 
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore the organizational hierarchy of IIT Jodhpur&apos;s Student Senate,
            including the main councils, boards, clubs, and committees that govern student life.
          </motion.p>

          {/* Glass Morphism Search Bar */}
          <motion.div 
            className="relative w-full max-w-sm sm:max-w-md md:max-w-xl mx-auto px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search councils, boards, clubs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 glass-card rounded-xl sm:rounded-2xl text-sm sm:text-base text-white placeholder-gray-500 border border-white/10 focus:border-fulvous/50 focus:outline-none focus:ring-2 focus:ring-fulvous/20 transition-all duration-300"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Search Results Dropdown */}
            <AnimatePresence>
              {isSearchFocused && searchTerm && filteredNodes.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 glass-card rounded-xl border border-white/10 overflow-hidden z-50"
                >
                  {filteredNodes.map((node) => (
                    <button
                      key={node.id}
                      onClick={() => handleSearchSelect(node)}
                      className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors border-b border-white/5 last:border-b-0"
                    >
                      <div className="text-left">
                        <p className="text-white font-medium">{node.name}</p>
                        <p className="text-sm text-gray-400">{node.fullName}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getNodeTypeColor(node.type)}`}>
                        {getNodeTypeLabel(node.type)}
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Statistics Cards */}
        <SenateStats data={treeData} />

        {/* Selected Search Node Info */}
        <AnimatePresence>
          {selectedSearchNode && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 glass-card rounded-2xl p-5 border border-fulvous/20"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${
                    selectedSearchNode.type === 'main' ? 'from-blue-500 to-blue-400' :
                    selectedSearchNode.type === 'board' ? 'from-green-500 to-green-400' :
                    selectedSearchNode.type === 'committee' ? 'from-orange-500 to-orange-400' :
                    'from-purple-500 to-purple-400'
                  }`}>
                    <span className="text-white font-bold text-sm">
                      {selectedSearchNode.name.slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{selectedSearchNode.name}</h3>
                    <p className="text-gray-400">{selectedSearchNode.fullName}</p>
                    {selectedSearchNode.holder && (
                      <p className="text-sm text-fulvous mt-1">
                        Holder: <span className="font-medium">{selectedSearchNode.holder}</span>
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedSearchNode(null);
                    setHighlightedNodeId(null);
                  }}
                  className="text-gray-400 hover:text-white transition-colors p-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Visualization */}
        <motion.div 
          className="glass-card rounded-3xl overflow-hidden border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Desktop: Radial Diagram */}
          <div className="hidden md:block">
            <RadialDiagram 
              data={treeData} 
              onNodeSelect={(node) => {
                if (node) {
                  setSelectedSearchNode(node);
                }
              }}
              highlightedNodeId={highlightedNodeId}
            />
          </div>

          {/* Mobile: Collapsible Tree View */}
          <div className="md:hidden p-4">
            <MobileTreeView data={treeData} />
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div 
          className="mt-8 glass-card rounded-2xl p-6 border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-fulvous to-fulvous-light rounded-full" />
            Legend
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { color: 'from-blue-500 to-blue-400', label: 'Main Councils', desc: 'ACAC, SS, SAC' },
              { color: 'from-green-500 to-green-400', label: 'Boards', desc: 'Administrative bodies' },
              { color: 'from-orange-500 to-orange-400', label: 'Committees', desc: 'Special committees' },
              { color: 'from-purple-500 to-purple-400', label: 'Clubs', desc: 'Student organizations' },
            ].map((item, index) => (
              <motion.div 
                key={item.label}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              >
                <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${item.color}`} />
                <div>
                  <span className="text-white text-sm font-medium block">{item.label}</span>
                  <span className="text-gray-500 text-xs">{item.desc}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Tips */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <h3 className="text-sm font-semibold text-fulvous mb-3 uppercase tracking-wider">How to Navigate</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-fulvous" />
                <span><strong className="text-white">Search:</strong> Find specific councils, boards, or holders</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-fulvous" />
                <span><strong className="text-white">Hover:</strong> View node details and connections</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-fulvous" />
                <span><strong className="text-white">Click:</strong> Select node for detailed information</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-fulvous" />
                <span><strong className="text-white">Zoom:</strong> Use controls to zoom in/out</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}