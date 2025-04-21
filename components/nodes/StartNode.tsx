'use client';

import type { Node } from '@xyflow/react';
import { Handle, NodeProps, Position } from '@xyflow/react';
import { Hexagon } from 'lucide-react';

export type PositionLoggerNodeData = {
  label?: string;
};

export type PositionLoggerNode = Node<PositionLoggerNodeData>;

const StartNode: React.FC<NodeProps<PositionLoggerNode>> = ({ data,isConnectable  }) => {
  return (
    <div className="relative justify-center  px-5 py-2 flex items-center gap-2 bg-[#7d52f3] text-white rounded-full shadow-md min-w-[140px]">
      <Hexagon className="w-4 h-4 text-[#eff6ff]" />
      <span className="text-sm font-medium">{data.label ?? 'Start'}</span>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
       className="!bg-white !border-[1px] !border-black w-4 h-4 rounded-full"
      />
    </div>
  );
};

export default StartNode;
