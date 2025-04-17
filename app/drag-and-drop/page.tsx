'use client';

import {
  Background,
  Connection,
  Controls,
  Edge,
  Node,
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react';
import React, {
  DragEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { DnDProvider, useDnD } from '@/components/drag/DnDContext';
import Sidebar from '@/components/drag/Sidebar';
import { nodeDragTypes } from '@/components/nodes/dragNodes';
import '@xyflow/react/dist/style.css';

const DnDFlow: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type, setType] = useDnD();
  const [loading, setLoading] = useState(false);

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges],
  );

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const getTypedId = (type: string): string => {
    const key = `node-id-counter-${type}`;
    const currentId = parseInt(localStorage.getItem(key) || '0', 10);
    const newId = currentId + 1;
    localStorage.setItem(key, newId.toString());
    return `${type}_${newId}`;
  };

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      if (!type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const id = getTypedId(type);
      const idNumber = id.split('_')[1]; // e.g., 3 from "start_3"

      const newNode: Node = {
        id,
        type,
        position,
        data: { label: `${type} node ${idNumber}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type, setNodes],
  );

  const onDragStart = (event: DragEvent, nodeType: string) => {
    setType(nodeType);
    event.dataTransfer.setData('text/plain', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  useEffect(() => {
    if (!loading) {
      setLoading(true);
    }
  }, [loading]);

  useEffect(() => {
    const savedFlow = localStorage.getItem('flow-data');
    if (savedFlow) {
      const { nodes: savedNodes, edges: savedEdges } = JSON.parse(savedFlow);
      if (savedNodes) setNodes(savedNodes);
      if (savedEdges) setEdges(savedEdges);
    }
  }, [setNodes, setEdges]);

  useEffect(() => {
    if (loading) {
      localStorage.setItem('flow-data', JSON.stringify({ nodes, edges }));
    }
  }, [nodes, edges]);

  

  return (
    <div className="dndflow">
      <Sidebar onDragStart={onDragStart} />
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeDragTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
          style={{ backgroundColor: '#F7F9FB' }}
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

const DnDFlowPage: React.FC = () => (
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow />
    </DnDProvider>
  </ReactFlowProvider>
);

export default DnDFlowPage;
