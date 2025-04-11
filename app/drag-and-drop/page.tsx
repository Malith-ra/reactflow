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
import React, { DragEvent, useCallback, useEffect, useRef } from 'react';

import { DnDProvider, useDnD } from '@/components/drag/DnDContext';
import Sidebar from '@/components/drag/Sidebar';
import { nodeDragTypes } from '@/components/nodes/dragNodes';
import '@xyflow/react/dist/style.css';

const getId = () => {
  const currentId = parseInt(
    localStorage.getItem('node-id-counter') || '0',
    10,
  );
  const newId = currentId + 1;
  localStorage.setItem('node-id-counter', newId.toString());
  return `dndnode_${newId}`;
};

const DnDFlow: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type, setType] = useDnD();

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

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      if (!type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
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
    const savedFlow = localStorage.getItem('flow-data');
    if (savedFlow) {
      const { nodes: savedNodes, edges: savedEdges } = JSON.parse(savedFlow);
      if (savedNodes) setNodes(savedNodes);
      if (savedEdges) setEdges(savedEdges);
    }
  }, [setNodes, setEdges]);

  useEffect(() => {
    localStorage.setItem('flow-data', JSON.stringify({ nodes, edges }));
  }, [nodes, edges]);

  return (
    <div className="dndflow">
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
      <Sidebar onDragStart={onDragStart} />
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
