"use client";

import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

interface CustomNodeData {
  id: string;
  name: string;
  fullName: string;
  holder: string;
  type: string;
  nodeType: string;
  onNodeClick: (node: NodeProps<CustomNodeData>) => void;
}

const CustomNode: React.FC<NodeProps<CustomNodeData>> = ({ data, ...nodeProps }) => {
  const handleClick = () => {
    data.onNodeClick({ data, ...nodeProps });
  };

  const getNodeStyles = () => {
    switch (data.nodeType) {
      case 'main':
        return {
          background: 'rgba(59, 130, 246, 0.1)',
          border: '2px solid #3B82F6',
          color: '#BFDBFE',
          minWidth: '220px',
          minHeight: '90px',
          fontSize: '14px',
        };
      case 'board':
        return {
          background: 'rgba(16, 185, 129, 0.1)',
          border: '2px solid #10B981',
          color: '#A7F3D0',
          minWidth: '180px',
          minHeight: '80px',
          fontSize: '13px',
        };
      default: // club or committee
        return {
          background: data.type === 'committee'
            ? 'rgba(245, 158, 11, 0.1)'
            : 'rgba(139, 92, 246, 0.1)',
          border: data.type === 'committee' ? '2px solid #F59E0B' : '2px solid #8B5CF6',
          color: data.type === 'committee' ? '#FDE68A' : '#DDD6FE',
          minWidth: '160px',
          minHeight: '70px',
          fontSize: '12px',
        };
    }
  };

  const styles = getNodeStyles();

  return (
    <div
      className="px-4 py-3 shadow-lg rounded-lg cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-105 backdrop-blur-sm"
      style={styles}
      onClick={handleClick}
    >
      {/* Input handle for connections from above */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-gray-700 !border-2 !border-gray-500 opacity-0 hover:opacity-100 transition-opacity"
      />

      <div className="text-center">
        <h3 className="font-bold mb-1 leading-tight" style={{ fontSize: styles.fontSize, color: 'white' }}>
          {data.name}
        </h3>
        <p className="opacity-90 leading-tight" style={{ fontSize: `calc(${styles.fontSize} - 2px)` }}>
          {data.holder}
        </p>
      </div>

      {/* Output handle for connections to below */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-gray-700 !border-2 !border-gray-500 opacity-0 hover:opacity-100 transition-opacity"
      />
    </div>
  );
};

export default CustomNode;