'use client';

import { Handle, Node, NodeProps, Position, useReactFlow } from '@xyflow/react';
import { Delete, Edit, GitBranch, LoaderIcon, Plus, Split } from 'lucide-react';
import { useCallback, useEffect, useId } from 'react';
import NodeActionsDropdown from '../actions/NodeActionsDropdown';
import EditIcon from '../icons/EditIcon';

export type PositionLoggerNodeData = {
  label?: string;
  subnodes?: { id: string; text: string }[];
};

export type PositionLoggerNode = Node<PositionLoggerNodeData>;

const LogicSplitNode: React.FC<NodeProps<PositionLoggerNode>> = ({
  id,
  data,
  isConnectable,
}) => {
  const { setNodes } = useReactFlow();

  const fallbackSubnodeId = useId();

  const handleRemove = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
  };

  useEffect(() => {
    if (!data.subnodes || data.subnodes.length === 0) {
      data.subnodes = [
        {
          id: fallbackSubnodeId,
          text: 'Else',
        },
      ];
    }
  }, []);

  const handleAddSubnode = () => {
    setNodes((nodes) =>
      nodes.map((node: any) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                subnodes: [
                  ...(node.data.subnodes ?? []),
                  {
                    id: `${Date.now()}`,
                    text: `Describe the transition condition ${
                      node.data.subnodes?.length + 1 || 1
                    }`,
                  },
                ],
              },
            }
          : node,
      ),
    );
  };

  const handleDeleteSubnode = useCallback(
    (subId: string) => {
      setNodes((nodes) =>
        nodes.map((node: any) =>
          node.id === id
            ? {
                ...node,
                data: {
                  ...node.data,
                  subnodes: node.data.subnodes?.filter(
                    (s: any) => s.id !== subId,
                  ),
                },
              }
            : node,
        ),
      );
    },
    [id, setNodes],
  );

  return (
    <div className="relative gap-2 bg-[#ebf1ff] text-white rounded-lg shadow-md min-w-3xs cursor-grabbing">
      <div className="pt-3 pb-2 px-3">
        <div className="flex h-5 items-center justify-between gap-1.5">
          <div className="flex items-center gap-2">
            <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center">
              <Split className="w-3 h-3 text-[#122368]" />
            </div>
            <div className="group flex items-center gap-2">
              <div className="shrink grow basis-0 text-[#122368] text-sm font-normal leading-tight">
                {data.label || 'Logic Split'}
              </div>
              <button type="button">
                <EditIcon />
              </button>
            </div>
          </div>
          <NodeActionsDropdown
            onDuplicate={() => console.log('duplicate this node')}
            onDelete={handleRemove}
          />
        </div>
      </div>

      {/* Subnodes Section */}
      <div className="flex flex-col items-start justify-start gap-0.5 px-1.5 py-2">
        <div className="relative pointer-events-auto cursor-inherit w-full">
          <div className="p-2 space-y-1 w-full bg-white rounded-md">
            <div className="flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2">
                <GitBranch className="w-3 h-3 text-[#99a0ae]" />
                <p className="h-5 text-sm font-normal leading-tight text-[#99a0ae]">
                  Transition
                </p>
              </div>
              <Plus
                onClick={handleAddSubnode}
                className="w-3 h-3 text-[#525866]"
              />
            </div>

            {/* need to add hard codeded subnodes */}
            {data.subnodes &&
              data.subnodes.length > 0 &&
              data.subnodes.map((sub, index) => (
                <div
                  key={sub.id}
                  className="relative gap-2 text-xs text-[#525866] bg-[#f5f7fa] rounded border border-gray-200 px-3 py-2 flex justify-between items-center"
                >
                  <div className="flex gap-2 items-center">
                    <LoaderIcon className="w-3 h-3 text-[#525866]" />
                    <span>{sub.text}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Edit className="w-3 h-3 text-[#525866]" />
                    <Delete
                      onClick={() => handleDeleteSubnode(sub.id)}
                      className="w-3 h-3 text-[#525866]"
                    />
                  </div>

                  {/* Individual source handle per subnode */}
                  <Handle
                    type="source"
                    position={Position.Right}
                    id={`subnode-${index}`}
                    className="!bg-white !border-[1px] !border-black w-4 h-4 rounded-full"
                    isConnectable={isConnectable}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="!bg-white !border-[1px] !border-black w-4 h-4 rounded-full !top-[13%]"
      />
    </div>
  );
};

export default LogicSplitNode;
