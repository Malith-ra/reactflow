'use client';

import React, { DragEvent } from 'react';
import { useDnD } from './DnDContext';

type SidebarProps = {
  onDragStart?: (event: DragEvent<HTMLDivElement>, nodeType: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ onDragStart }) => {
  const [, setType] = useDnD();

  const handleDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
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
    </aside>
  );
};

export default Sidebar;
