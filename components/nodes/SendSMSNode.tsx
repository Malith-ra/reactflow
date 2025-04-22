'use client';

import { Handle, Node, NodeProps, Position, useReactFlow } from '@xyflow/react';
import { Play, Send } from 'lucide-react';
import { toast } from 'sonner'; // Optional toast for feedback
import NodeActionsDropdown from '../actions/NodeActionsDropdown';

export type PositionLoggerNodeData = {
  label?: string;
  subnodes?: { id: string; text: string }[];
};

export type PositionLoggerNode = Node<PositionLoggerNodeData>;

const SendSMSNode: React.FC<NodeProps<PositionLoggerNode>> = ({
  id,
  isConnectable,
}) => {
  const { setNodes } = useReactFlow();

  const handleRemove = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
  };

  const sendSMS = async () => {
    try {
      const response = await fetch('/api/sendsms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: '+94718772549',
          message: 'Hello! This is a SMS from your AI Agent.',
        }),
      });

      const result = await response.json();
      toast.success(`SMS Sent! Status: ${result.status}`);
    } catch (err) {
      toast.error('Failed to send SMS');
      console.error('SMS Error:', err);
    }
  };

  return (
    <div className="relative gap-2 bg-[#fc7f7f] text-white rounded-lg shadow-md min-w-3xs cursor-grabbing">
      <div className="pt-3 pb-2 px-3">
        <div className="flex h-5 items-center justify-between gap-1.5">
          <div className="flex items-center gap-2">
            <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center">
              <Send className="w-3 h-3 text-white" />
            </div>
            <div className="group w-full flex justify-between items-center gap-2">
              <div className="shrink grow basis-0 text-white text-sm font-normal leading-tight">
                Send SMS
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={sendSMS}>
              <Play className="w-3 h-3 text-white hover:text-green-200" />
            </button>
            <NodeActionsDropdown
              onDuplicate={() => console.log('duplicate this node')}
              onDelete={handleRemove}
            />
          </div>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="!bg-white !border-[1px] !border-black w-4 h-4 rounded-full"
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="!bg-white !border-[1px] !border-black w-4 h-4 rounded-full"
      />
    </div>
  );
};

export default SendSMSNode;
