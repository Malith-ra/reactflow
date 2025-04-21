'use client';

import { Handle, Node, NodeProps, Position, useReactFlow } from '@xyflow/react';
import { Edit, Square } from 'lucide-react';
import NodeActionsDropdown from '../actions/NodeActionsDropdown';

export type PositionLoggerNodeData = {
  label?: string;
  subnodes?: { id: string; text: string }[];
};

export type PositionLoggerNode = Node<PositionLoggerNodeData>;

const EndingNode: React.FC<NodeProps<PositionLoggerNode>> = ({
  id,
  isConnectable,
}) => {
  const { setNodes } = useReactFlow();

  const handleRemove = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
  };

  return (
    <div className="relative gap-2 bg-[#eff6ff] text-white rounded-lg shadow-md min-w-3xs cursor-grabbing">
      <div className="pt-3 pb-2 px-3">
        <div className="flex h-5 items-center justify-between gap-1.5">
          <div className="flex items-center gap-2">
            <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center">
              <Square className="w-3 h-3 text-[#124b68]" />
            </div>
            <div className="group flex items-center gap-2">
              <div className="shrink grow basis-0 text-[#124b68] text-sm font-normal leading-tight">
                End Call
              </div>
              <button type="button">
              <Edit className="w-3 h-3 text-[#525866]" />
              </button>
            </div>
          </div>
          <NodeActionsDropdown
            onDuplicate={() => console.log('duplicate this node')}
            onDelete={handleRemove}
          />
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="!bg-white !border-[1px] !border-black w-4 h-4 rounded-full"
      />
    </div>
  );
};

export default EndingNode;
