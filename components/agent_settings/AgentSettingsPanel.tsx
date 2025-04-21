'use client';

import React from 'react';
import { Node, useReactFlow } from '@xyflow/react';
import GlobalAgentSetting from './GlobalAgentSetting';

type NodeData = {
  label?: string;
  message?: string;
  details?: string;
};

export type FlowNode = Node<NodeData>;
type Props = {
  selectedNode: FlowNode | null;
  nodes: FlowNode[];
  playFlow: () => void;
};

const SettingsPanel: React.FC<Props> = ({ selectedNode, nodes, playFlow }) => {
  const { setCenter } = useReactFlow();

  const handleNodeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nodeId = e.target.value;
    const node = nodes.find((n) => n.id === nodeId);
    if (node) {
      const { x, y } = node.position;
      setCenter(x, y, { zoom: 1.5, duration: 800 });
    }
  };

  return (
    <div className="p-2 bg-transparent z-10 h-full w-[20%] pt-24 absolute bottom-2 right-2 pointer-events-none">
      <div className="flex flex-col bg-white shadow-2xl space-x-10 h-full rounded-xl p-3 pointer-events-auto">
        {selectedNode ? (
          <>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Node Settings
            </h3>

            <p className="text-sm text-gray-600 mb-2">
              {(selectedNode.data?.label ?? '').toString()}
            </p>

            <textarea
              className="border p-2 text-sm w-full min-h-[60px] mb-2"
              placeholder="Message"
              value={selectedNode.data?.message || ''}
              onChange={(e) => {
                const newVal = e.target.value;
                selectedNode.data.message = newVal;
              }}
            />
            <textarea
              className="border p-2 text-sm w-full min-h-[60px]"
              placeholder="Details"
              value={selectedNode.data?.details || ''}
              onChange={(e) => {
                const newVal = e.target.value;
                selectedNode.data.details = newVal;
              }}
            />
          </>
        ) : (
          <GlobalAgentSetting
            nodes={nodes}
            playFlow={playFlow}
            onNodeSelect={() => handleNodeSelect}
          />
        )}
      </div>
    </div>
  );
};

export default SettingsPanel;
