'use client';

import type { Node } from '@xyflow/react';
import { Handle, NodeProps, Position } from '@xyflow/react';

export type PositionLoggerNodeData = {
  label?: string;
};

export type PositionLoggerNode = Node<PositionLoggerNodeData>;

const StartNode: React.FC<NodeProps<PositionLoggerNode>> = ({ data }) => {
  return (
    <div className="relative justify-center  px-5 py-2 flex items-center gap-2 bg-green-700 text-white rounded-full shadow-md min-w-[140px]">
      <span className="text-sm font-medium">{data.label ?? 'Start'}</span>
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-white !border-[3px] !border-green-400  w-4 h-4 rounded-full "
      />
    </div>
  );
};

export default StartNode;
