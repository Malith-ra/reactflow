'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import DeleteIcon from '@/components/icons/DeleteIcon';
import DuplicateIcon from '@/components/icons/DuplicateIcon';
import { MoreHorizontal } from 'lucide-react';

interface NodeActionsDropdownProps {
  onDuplicate: () => void;
  onDelete: () => void;
}

const NodeActionsDropdown: React.FC<NodeActionsDropdownProps> = ({
  onDuplicate,
  onDelete,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="p-1 rounded hover:bg-transparent focus:outline-none cursor-pointer"
          aria-label="Open node actions"
        >
          <MoreHorizontal className="w-4 h-4 text-[#525866]" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-36 p-2 border rounded-md bg-white shadow-md z-50"
      >
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            onDuplicate();
          }}
          className="cursor-pointer flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm text-gray-800 hover:bg-gray-100"
        >
          <DuplicateIcon />
          <span>Duplicate</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            onDelete();
          }}
          className="cursor-pointer flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm text-red-500 hover:!text-red-500"
        >
          <DeleteIcon />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NodeActionsDropdown;
