'use client';

import {
  Bot,
  Circle,
  FileInput,
  FileOutput,
  HashIcon,
  Keyboard,
  Mic,
  PhoneForwarded,
  Power,
  QrCode,
  Send,
  Split
} from 'lucide-react';
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
      Drag New Node
      </div>
      <div
        className="dndnode input cursor-move"
        draggable
        onDragStart={(e) => handleDragStart(e, 'input')}
      >
        <div className="grid grid-cols-3">
          <div className="col-span-1" />
          <div className="col-span-2 items-center">
            <FileInput className="inline-block mr-1" size={16} />
            Input Node
          </div>
        </div>
      </div>
      <div
        className="dndnode cursor-move"
        draggable
        onDragStart={(e) => handleDragStart(e, 'default')}
      >
        <div className="grid grid-cols-3">
          <div className="col-span-1" />
          <div className="col-span-2 items-center">
            <Keyboard className="inline-block mr-1" size={16} />
            Default Node
          </div>
        </div>
      </div>
      <div
        className="dndnode output cursor-move"
        draggable
        onDragStart={(e) => handleDragStart(e, 'output')}
      >
        <div className="grid grid-cols-3">
          <div className="col-span-1" />
          <div className="col-span-2 items-center">
            <FileOutput className="inline-block mr-1" size={16} />
            Output Node
          </div>
        </div>
      </div>
      <div
        className="dndnode cursor-move"
        draggable
        onDragStart={(e) => handleDragStart(e, 'start')}
      >
        <div className="grid grid-cols-3">
          <div className="col-span-1" />
          <div className="col-span-2 items-center">
            <Power className="inline-block mr-1" size={16} />
            Start Node
          </div>
        </div>
      </div>
      <div
        className="dndnode cursor-move"
        draggable
        onDragStart={(e) => handleDragStart(e, 'voice')}
      >
        <div className="grid grid-cols-3">
          <div className="col-span-1" />
          <div className="col-span-2 items-center">
            <Mic className="inline-block mr-1" size={16} />
            Voice Node
          </div>
        </div>
      </div>
      <div
        className="dndnode input cursor-move"
        draggable
        onDragStart={(e) => handleDragStart(e, 'conversation')}
      >
        <div className="grid grid-cols-3">
          <div className="col-span-1" />
          <div className="col-span-2 items-center">
            <HashIcon className="inline-block mr-1" size={16} />
            Conversation
          </div>
        </div>
      </div>
      <div
        className="dndnode input cursor-move"
        draggable
        onDragStart={(e) => handleDragStart(e, 'function')}
      >
        <div className="grid grid-cols-3">
          <div className="col-span-1" />
          <div className="col-span-2 items-center">
            <Bot className="inline-block mr-1" size={16} />
            Function
          </div>
        </div>
      </div>
      <div
        className="dndnode input cursor-move"
        draggable
        onDragStart={(e) => handleDragStart(e, 'call-transfer')}
      >
        <div className="grid grid-cols-3">
          <div className="col-span-1" />
          <div className="col-span-2 items-center">
            <PhoneForwarded className="inline-block mr-1" size={16} />
            Call Transfer
          </div>
        </div>
      </div>
      <div
        className="dndnode input cursor-move"
        draggable
        onDragStart={(e) => handleDragStart(e, 'press-digit')}
      >
        <div className="grid grid-cols-3">
          <div className="col-span-1" />
          <div className="col-span-2 items-center">
            <QrCode className="inline-block mr-1" size={16} />
            Press Digit
          </div>
        </div>
      </div>
      <div
        className="dndnode input cursor-move"
        draggable
        onDragStart={(e) => handleDragStart(e, 'logic-split')}
      >
        <div className="grid grid-cols-3">
          <div className="col-span-1" />
          <div className="col-span-2 items-center">
            <Split className="inline-block mr-1" size={16} />
            Logic Split Node
          </div>
        </div>
      </div>
      <div
        className="dndnode input cursor-move"
        draggable
        onDragStart={(e) => handleDragStart(e, 'sms')}
      >
        <div className="grid grid-cols-3">
          <div className="col-span-1" />
          <div className="col-span-2 items-center">
            <Send className="inline-block mr-1" size={16} />
            Send SMS
          </div>
        </div>
      </div>
      <div
        className="dndnode input cursor-move"
        draggable
        onDragStart={(e) => handleDragStart(e, 'ending')}
      >
        <div className="grid grid-cols-3">
          <div className="col-span-1" />
          <div className="col-span-2 items-center">
            <Circle className="inline-block mr-1" size={16} />
            Ending
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
