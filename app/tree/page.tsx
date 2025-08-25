"use client";

import React, { useState } from 'react';
import SenateTree from '@/components/tree/SenateTree';
import SearchableTree from '@/components/tree/SearchableTree';
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

export default function TreePage() {
  const [selectedSearchNode, setSelectedSearchNode] = useState<TreeNodeData | null>(null);

  const handleSearchNodeSelect = (node: TreeNodeData) => {
    setSelectedSearchNode(node);
    // Auto-scroll to show the selected node info
    const element = document.getElementById('selected-node-info');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gray-900 text-white">
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: "url('/images/fests/bg/background7.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 z-10 bg-black/60" />

      <div className="relative z-20 container mx-auto px-4 py-8">
        <div className="text-center mb-8 pt-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            Student Senate Structure
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            Explore the organizational hierarchy of IIT Jodhpur&apos;s Student Senate,
            including the main councils, boards, clubs, and committees that govern student life.
          </p>

          {/* Search Bar */}
          <div className="flex justify-center mb-6">
            <SearchableTree
              data={treeData}
              onNodeSelect={handleSearchNodeSelect}
            />
          </div>
        </div>

        {/* Statistics Cards */}
        <SenateStats data={treeData} />

        {/* Selected Search Node Info */}
        {selectedSearchNode && (
          <div id="selected-node-info" className="mb-6 bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-fulvous mb-1">
                  Search Result: {selectedSearchNode.name}
                </h3>
                <p className="text-gray-300">{selectedSearchNode.fullName}</p>
                <p className="text-sm text-gray-400 mt-1">
                  Current Holder: <span className="font-medium">{selectedSearchNode.holder}</span>
                </p>
              </div>
              <button
                onClick={() => setSelectedSearchNode(null)}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg overflow-hidden">
          <SenateTree />
        </div>

        <div className="mt-8 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">Legend</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-gray-300">Main Councils (ACAC, SS, SAC)</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-gray-300">Boards</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span className="text-gray-300">Committees</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span className="text-gray-300">Clubs</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-800 rounded-lg">
            <h3 className="font-semibold text-fulvous mb-2">How to Navigate:</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• <strong>Search:</strong> Type to find specific councils, boards, clubs, or position holders</li>
              <li>• <strong>Flow Diagram:</strong> Use mouse to pan and zoom, click nodes for information</li>
              <li>• The flow diagram shows the complete organizational structure with real-time interaction</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}