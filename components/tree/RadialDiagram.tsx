"use client";

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ZoomIn, ZoomOut, Crosshair, ChevronRight } from 'lucide-react';
import RadialNode from './RadialNode';

interface TreeNodeData {
  id: string;
  name: string;
  fullName: string;
  holder: string;
  type: string;
  parent?: string;
}

interface RadialDiagramProps {
  data: {
    mainBodies: TreeNodeData[];
    boards: TreeNodeData[];
    clubs: TreeNodeData[];
  };
  onNodeSelect?: (node: TreeNodeData | null) => void;
  highlightedNodeId?: string | null;
}

interface ProcessedNode extends TreeNodeData {
  x: number;
  y: number;
  angle: number;
  ring: number;
  parentNode?: ProcessedNode;
}

interface Connection {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourceType: string;
  targetType: string;
}

// Ring radii configuration (constant)
const RING_CONFIG = {
  senate: 0,
  councils: 140,
  boards: 280,
  clubs: 420,
} as const;

const RadialDiagram: React.FC<RadialDiagramProps> = ({
  data,
  onNodeSelect,
  highlightedNodeId,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewBox, setViewBox] = useState({ x: -500, y: -500, width: 1000, height: 1000 });
  const [zoom, setZoom] = useState(1);
  const [selectedNode, setSelectedNode] = useState<ProcessedNode | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [viewOffset, setViewOffset] = useState({ x: 0, y: 0 });

  // Process nodes into radial positions
  const { processedNodes, connections } = useMemo(() => {
    const nodes: ProcessedNode[] = [];
    const conns: Connection[] = [];

    // Add central Senate node
    const senateNode: ProcessedNode = {
      id: 'student-senate',
      name: 'Student Senate',
      fullName: 'Student Senate - IIT Jodhpur',
      holder: '',
      type: 'senate',
      x: 0,
      y: 0,
      angle: 0,
      ring: 0,
    };
    nodes.push(senateNode);

    // Process main councils (Ring 1)
    const councils = data.mainBodies;
    const councilAngleStep = (2 * Math.PI) / councils.length;
    const councilStartAngle = -Math.PI / 2;

    councils.forEach((council, index) => {
      const angle = councilStartAngle + index * councilAngleStep;
      const x = Math.cos(angle) * RING_CONFIG.councils;
      const y = Math.sin(angle) * RING_CONFIG.councils;
      
      const councilNode: ProcessedNode = {
        ...council,
        type: 'main',
        x,
        y,
        angle,
        ring: 1,
        parentNode: senateNode,
      };
      nodes.push(councilNode);

      conns.push({
        id: `senate-${council.id}`,
        sourceX: 0,
        sourceY: 0,
        targetX: x,
        targetY: y,
        sourceType: 'senate',
        targetType: 'main',
      });
    });

    // Process boards (Ring 2)
    const boardsByParent = new Map<string, TreeNodeData[]>();
    data.boards.forEach(board => {
      const parent = board.parent || '';
      if (!boardsByParent.has(parent)) {
        boardsByParent.set(parent, []);
      }
      boardsByParent.get(parent)!.push(board);
    });

    councils.forEach((council, councilIndex) => {
      const councilAngle = councilStartAngle + councilIndex * councilAngleStep;
      const councilNode = nodes.find(n => n.id === council.id)!;
      const boards = boardsByParent.get(council.id) || [];
      
      if (boards.length === 0) return;

      const spreadAngle = councilAngleStep * 0.85;
      const boardAngleStep = boards.length > 1 ? spreadAngle / (boards.length - 1) : 0;
      const boardStartAngle = councilAngle - spreadAngle / 2;

      boards.forEach((board, boardIndex) => {
        const angle = boards.length > 1 
          ? boardStartAngle + boardIndex * boardAngleStep 
          : councilAngle;
        const x = Math.cos(angle) * RING_CONFIG.boards;
        const y = Math.sin(angle) * RING_CONFIG.boards;
        
        const boardNode: ProcessedNode = {
          ...board,
          type: 'board',
          x,
          y,
          angle,
          ring: 2,
          parentNode: councilNode,
        };
        nodes.push(boardNode);

        conns.push({
          id: `${council.id}-${board.id}`,
          sourceX: councilNode.x,
          sourceY: councilNode.y,
          targetX: x,
          targetY: y,
          sourceType: 'main',
          targetType: 'board',
        });
      });
    });

    // Process clubs/committees (Ring 3)
    const clubsByParent = new Map<string, TreeNodeData[]>();
    data.clubs.forEach(club => {
      const parent = club.parent || '';
      if (!clubsByParent.has(parent)) {
        clubsByParent.set(parent, []);
      }
      clubsByParent.get(parent)!.push(club);
    });

    const boardNodes = nodes.filter(n => n.ring === 2);
    
    boardNodes.forEach(board => {
      const clubs = clubsByParent.get(board.id) || [];
      
      if (clubs.length === 0) return;

      const parentAngle = board.angle;
      const spreadAngle = 0.25;
      const clubAngleStep = clubs.length > 1 ? spreadAngle / (clubs.length - 1) : 0;
      const clubStartAngle = parentAngle - spreadAngle / 2;

      clubs.forEach((club, clubIndex) => {
        const angle = clubs.length > 1 
          ? clubStartAngle + clubIndex * clubAngleStep 
          : parentAngle;
        const x = Math.cos(angle) * RING_CONFIG.clubs;
        const y = Math.sin(angle) * RING_CONFIG.clubs;
        
        const clubNode: ProcessedNode = {
          ...club,
          x,
          y,
          angle,
          ring: 3,
          parentNode: board,
        };
        nodes.push(clubNode);

        conns.push({
          id: `${board.id}-${club.id}`,
          sourceX: board.x,
          sourceY: board.y,
          targetX: x,
          targetY: y,
          sourceType: 'board',
          targetType: club.type,
        });
      });
    });

    // Handle clubs directly under main councils
    councils.forEach(council => {
      const clubs = clubsByParent.get(council.id) || [];
      const councilNode = nodes.find(n => n.id === council.id)!;
      
      if (clubs.length === 0) return;

      const parentAngle = councilNode.angle;
      const spreadAngle = 0.35;
      const clubAngleStep = clubs.length > 1 ? spreadAngle / (clubs.length - 1) : 0;
      const clubStartAngle = parentAngle - spreadAngle / 2;

      clubs.forEach((club, clubIndex) => {
        const angle = clubs.length > 1 
          ? clubStartAngle + clubIndex * clubAngleStep 
          : parentAngle;
        const x = Math.cos(angle) * RING_CONFIG.clubs;
        const y = Math.sin(angle) * RING_CONFIG.clubs;
        
        const clubNode: ProcessedNode = {
          ...club,
          x,
          y,
          angle,
          ring: 3,
          parentNode: councilNode,
        };
        nodes.push(clubNode);

        conns.push({
          id: `${council.id}-${club.id}`,
          sourceX: councilNode.x,
          sourceY: councilNode.y,
          targetX: x,
          targetY: y,
          sourceType: 'main',
          targetType: club.type,
        });
      });
    });

    return { processedNodes: nodes, connections: conns };
  }, [data]);

  // Generate straight line path for connections (more formal)
  const generatePath = (conn: Connection) => {
    return `M ${conn.sourceX} ${conn.sourceY} L ${conn.targetX} ${conn.targetY}`;
  };

  // Handle node click
  const handleNodeClick = useCallback((node: ProcessedNode) => {
    setSelectedNode(prev => prev?.id === node.id ? null : node);
    onNodeSelect?.(node);
  }, [onNodeSelect]);

  // Handle node hover
  const handleNodeHover = useCallback((nodeId: string, hovering: boolean) => {
    setHoveredNodeId(hovering ? nodeId : null);
  }, []);

  // Zoom controls
  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.3, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.3, 0.5));
  const handleResetView = () => {
    setZoom(1);
    setViewOffset({ x: 0, y: 0 });
    setSelectedNode(null);
  };

  // Center on selected node
  const handleCenterOnSelected = () => {
    if (selectedNode) {
      setViewOffset({ x: -selectedNode.x, y: -selectedNode.y });
      setZoom(1.5);
    }
  };

  // Update viewBox based on zoom and offset
  useEffect(() => {
    const baseSize = 1000;
    const size = baseSize / zoom;
    setViewBox({
      x: -size / 2 + viewOffset.x,
      y: -size / 2 + viewOffset.y,
      width: size,
      height: size,
    });
  }, [zoom, viewOffset]);

  // Mouse panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsPanning(true);
      setPanStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning && svgRef.current) {
      const dx = (e.clientX - panStart.x) / zoom;
      const dy = (e.clientY - panStart.y) / zoom;
      setViewOffset(prev => ({ x: prev.x - dx, y: prev.y - dy }));
      setPanStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => setIsPanning(false);

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.min(Math.max(prev * delta, 0.5), 3));
  };

  // Check if connection should be highlighted
  const isConnectionHighlighted = (conn: Connection) => {
    if (!hoveredNodeId && !selectedNode) return false;
    const activeId = hoveredNodeId || selectedNode?.id;
    return conn.id.includes(activeId || '');
  };

  // Get ancestors of a node
  const getAncestorIds = (nodeId: string): string[] => {
    const node = processedNodes.find(n => n.id === nodeId);
    if (!node || !node.parentNode) return [];
    return [node.parentNode.id, ...getAncestorIds(node.parentNode.id)];
  };

  // Check if node is in highlighted path
  const isNodeInPath = (nodeId: string) => {
    if (!hoveredNodeId && !selectedNode) return false;
    const activeId = hoveredNodeId || selectedNode?.id;
    if (nodeId === activeId) return true;
    
    const activeAncestors = getAncestorIds(activeId || '');
    if (activeAncestors.includes(nodeId)) return true;
    
    const nodeAncestors = getAncestorIds(nodeId);
    if (nodeAncestors.includes(activeId || '')) return true;
    
    return false;
  };

  // Get breadcrumb path for selected node
  const getBreadcrumb = (node: ProcessedNode): ProcessedNode[] => {
    const path: ProcessedNode[] = [node];
    let current = node;
    while (current.parentNode) {
      path.unshift(current.parentNode);
      current = current.parentNode;
    }
    return path;
  };

  return (
    <div ref={containerRef} className="relative w-full h-[700px] md:h-[800px] bg-[#0a1628] rounded-xl overflow-hidden">
      {/* Header bar */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-[#0d1d33]/90 backdrop-blur-sm border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-fulvous" />
          <span className="text-white font-medium text-sm">Organizational Hierarchy</span>
          <span className="text-gray-500 text-xs">|</span>
          <span className="text-gray-400 text-xs">{processedNodes.length} entities</span>
        </div>
        
        {/* Breadcrumb */}
        {selectedNode && (
          <div className="hidden md:flex items-center gap-1 text-xs">
            {getBreadcrumb(selectedNode).map((node, idx, arr) => (
              <React.Fragment key={node.id}>
                <button
                  onClick={() => handleNodeClick(node)}
                  className={`px-2 py-1 rounded transition-colors ${
                    idx === arr.length - 1 
                      ? 'bg-fulvous/20 text-fulvous font-medium' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {node.name}
                </button>
                {idx < arr.length - 1 && <ChevronRight className="w-3 h-3 text-gray-600" />}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="absolute top-16 right-4 z-20 flex flex-col gap-1 bg-[#0d1d33]/90 backdrop-blur-sm rounded-lg p-1 border border-white/10">
        <button
          onClick={handleZoomIn}
          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <div className="h-px bg-white/10 mx-1" />
        {selectedNode && (
          <button
            onClick={handleCenterOnSelected}
            className="p-2 text-gray-400 hover:text-fulvous hover:bg-white/10 rounded transition-colors"
            title="Center on Selected"
          >
            <Crosshair className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={handleResetView}
          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
          title="Reset View"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Zoom indicator */}
      <div className="absolute top-16 left-4 z-20 bg-[#0d1d33]/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10">
        <span className="text-xs text-gray-400">{Math.round(zoom * 100)}%</span>
      </div>

      {/* SVG Diagram */}
      <svg
        ref={svgRef}
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
        className="w-full h-full pt-12"
        style={{ 
          background: 'transparent',
          cursor: isPanning ? 'grabbing' : 'grab'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <defs>
          {/* Grid pattern */}
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          </pattern>
        </defs>

        {/* Background grid */}
        <rect x={viewBox.x - 500} y={viewBox.y - 500} width={viewBox.width + 1000} height={viewBox.height + 1000} fill="url(#grid)" />

        {/* Ring guides (subtle) */}
        {[RING_CONFIG.councils, RING_CONFIG.boards, RING_CONFIG.clubs].map((radius, index) => (
          <circle
            key={`ring-${index}`}
            cx={0}
            cy={0}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth={1}
            strokeDasharray="4 8"
          />
        ))}

        {/* Ring labels */}
        <text x={RING_CONFIG.councils + 10} y={-5} fill="rgba(255,255,255,0.2)" fontSize="10" fontFamily="Inter, sans-serif">Councils</text>
        <text x={RING_CONFIG.boards + 10} y={-5} fill="rgba(255,255,255,0.2)" fontSize="10" fontFamily="Inter, sans-serif">Boards</text>
        <text x={RING_CONFIG.clubs + 10} y={-5} fill="rgba(255,255,255,0.2)" fontSize="10" fontFamily="Inter, sans-serif">Clubs</text>

        {/* Connection lines */}
        <g className="connections">
          {connections.map((conn) => {
            const highlighted = isConnectionHighlighted(conn);
            return (
              <motion.path
                key={conn.id}
                d={generatePath(conn)}
                fill="none"
                stroke={highlighted ? '#e58420' : 'rgba(255,255,255,0.15)'}
                strokeWidth={highlighted ? 2 : 1}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: 1,
                  stroke: highlighted ? '#e58420' : 'rgba(255,255,255,0.15)',
                  strokeWidth: highlighted ? 2 : 1,
                }}
                transition={{ 
                  pathLength: { duration: 0.8 },
                  stroke: { duration: 0.2 },
                  strokeWidth: { duration: 0.2 }
                }}
              />
            );
          })}
        </g>

        {/* Nodes */}
        <g className="nodes">
          {processedNodes.map((node) => (
            <RadialNode
              key={node.id}
              id={node.id}
              name={node.name}
              fullName={node.fullName}
              holder={node.holder}
              type={node.type as 'senate' | 'main' | 'board' | 'club' | 'committee'}
              x={node.x}
              y={node.y}
              isHighlighted={highlightedNodeId === node.id || isNodeInPath(node.id)}
              isSelected={selectedNode?.id === node.id}
              onClick={() => handleNodeClick(node)}
              onHover={(hovering) => handleNodeHover(node.id, hovering)}
            />
          ))}
        </g>
      </svg>

      {/* Selected Node Detail Panel */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute bottom-4 left-4 z-20 w-80 bg-[#0d1d33]/95 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
          >
            {/* Panel header */}
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded ${
                  selectedNode.type === 'senate' ? 'bg-fulvous' :
                  selectedNode.type === 'main' ? 'bg-blue-500' :
                  selectedNode.type === 'board' ? 'bg-green-500' :
                  selectedNode.type === 'committee' ? 'bg-orange-500' :
                  'bg-purple-500'
                }`} />
                <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                  {selectedNode.type === 'main' ? 'Council' : selectedNode.type}
                </span>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-gray-500 hover:text-white transition-colors p-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Panel content */}
            <div className="p-4 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{selectedNode.name}</h3>
                <p className="text-sm text-gray-400 mt-1">{selectedNode.fullName}</p>
              </div>
              
              {selectedNode.holder && (
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-fulvous to-fulvous-light flex items-center justify-center text-white font-bold text-sm">
                    {selectedNode.holder.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Current Holder</p>
                    <p className="text-sm font-medium text-white">{selectedNode.holder}</p>
                  </div>
                </div>
              )}

              {selectedNode.parentNode && (
                <div className="pt-3 border-t border-white/10">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Reports to</p>
                  <button
                    onClick={() => handleNodeClick(selectedNode.parentNode!)}
                    className="flex items-center gap-2 text-sm text-fulvous hover:text-fulvous-light transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180" />
                    {selectedNode.parentNode.name}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <div className="absolute bottom-4 right-4 z-10 text-xs text-gray-600">
        <span className="hidden md:inline">Scroll to zoom • Drag to pan • Click nodes for details</span>
        <span className="md:hidden">Pinch to zoom • Tap for details</span>
      </div>
    </div>
  );
};

export default RadialDiagram;
