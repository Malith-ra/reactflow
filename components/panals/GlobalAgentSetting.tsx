'use client';

import React, { useState } from 'react';
import { useReactFlow } from '@xyflow/react';
import { FlowNode } from './AgentSettingsPanel';
import GlobalSettingsContent from './GlobalSettingsContent';

const GlobalAgentSetting: React.FC<{
  nodes: FlowNode[];
  playFlow: () => void;
  onNodeSelect: (id: string) => void;
}> = ({ nodes, playFlow, onNodeSelect }) => {
  const { setCenter } = useReactFlow();
  const [activeTab, setActiveTab] = useState<'global' | 'test'>('global');

  return (
    <div className="flex flex-col h-full">
      {/* Tabs Header */}
      <div className="flex border-b border-gray-300 mb-3">
        <button
          onClick={() => setActiveTab('global')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'global'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Global Settings
        </button>
        <button
          onClick={() => setActiveTab('test')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'test'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Test
        </button>
      </div>

      {/* Tabs Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'global' && <GlobalSettingsContent />}

        {activeTab === 'test' && (
          <div className="text-gray-700 text-sm">
            <>
              <label className="text-gray-800 mb-2">Jump to node:</label>
              <select
                onChange={(e) => onNodeSelect(e.target.value)}
                className="border p-1 mb-4"
              >
                <option value="">-- Select --</option>
                {nodes.map((node) => (
                  <option key={node.id} value={node.id}>
                    {(node.data?.label ?? node.id).toString()}
                  </option>
                ))}
              </select>

              <label className="text-gray-800 mb-2 block">All Nodes:</label>
              <ul className="overflow-y-auto max-h-64 space-y-1 pr-1 mb-4">
                {nodes.map((node) => (
                  <li
                    key={node.id}
                    onMouseEnter={() => {
                      setCenter(node.position.x, node.position.y, {
                        zoom: 1.5,
                        duration: 300,
                      });
                    }}
                    className="cursor-pointer text-sm px-2 py-1 rounded hover:bg-gray-100 text-gray-700"
                  >
                    {(node.data?.label ?? node.id).toString()}
                  </li>
                ))}
              </ul>

              <button
                onClick={playFlow}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                ▶ Test Flow
              </button>
            </>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalAgentSetting;
