'use client';

import React, { DragEvent } from 'react';
import { useDnD } from './DnDContext';

type SidebarProps = {
  onDragStart?: (event: DragEvent<HTMLDivElement>, nodeType: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ onDragStart }) => {
  const [, setType] = useDnD();

  const handleDragStart = (
    event: DragEvent<HTMLDivElement>,
    nodeType: string,
  ) => {
    setType(nodeType);
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
    onDragStart?.(event, nodeType);
  };

  return (
    <aside className="p-4 space-y-4">
      <div className="text-sm text-gray-600">
        You can drag these nodes to the pane on the right.
      </div>
      <div
        className="dndnode input cursor-move"
        draggable
        onDragStart={(e) => handleDragStart(e, 'input')}
      >
        Input Node
      </div>
      <div
        className="dndnode cursor-move"
        draggable
        onDragStart={(e) => handleDragStart(e, 'default')}
      >
        Default Node
      </div>
      <div
        className="dndnode output cursor-move"
        draggable
        onDragStart={(e) => handleDragStart(e, 'output')}
      >
        Output Node
      </div>
      <div
        className="cursor-move start flex items-center gap-2 bg-green-700 text-white font-medium px-4 py-2 rounded-full shadow-md border border-green-500 w-fit"
        draggable
        onDragStart={(e) => handleDragStart(e, 'start')}
      >
        Start Node
      </div>
      <div
        className="cursor-move start flex items-center gap-2 bg-slate-600 text-white font-medium px-4 py-2 rounded-xl shadow-md border border-slate-600 w-fit"
        draggable
        onDragStart={(e) => handleDragStart(e, 'voice')}
      >
        Voice Node
      </div>
    </aside>
  );
};

export default Sidebar;
