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
// import { useFlowControls } from '@/hooks/useFlowControls';
import { DnDProvider, useDnD } from '@/components/drag/DnDContext';
import Sidebar from '@/components/drag/Sidebar';
import { nodeDragTypes } from '@/components/nodes/dragNodes';
import '@xyflow/react/dist/style.css';
import AgentSettingsPanel from '@/components/agent_settings/AgentSettingsPanel';
import { useAppSelector } from '@/common/utils/hooks/hooks';
// import { setFlow } from '@/features/agent_flow/data/redux/flowRunnerSlice';
import { RootState } from '@/common/data/redux/store';
import { useFlowControls } from '@/components/agent_settings/hooks/useFlowControls';

const DnDFlow: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const { highlightNode, centerOnNode, clearHighlights } = useFlowControls(
    nodes,
    setNodes,
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type, setType] = useDnD();
  const [loading, setLoading] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  // const dispatch = useAppDispatch();
  const reduxFlow = useAppSelector(
    (state: RootState) => state.agentFlow.flowRunnerSlice,
  );

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      setEdges((eds) => addEdge({ ...params, type: 'smoothstep' }, eds));
    },
    [setEdges],
  );

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  useEffect(() => {
    if (reduxFlow.nodes.length > 0)
      setNodes(reduxFlow.nodes.map((n) => ({ ...n })));
    if (reduxFlow.edges.length > 0)
      setEdges(reduxFlow.edges.map((e) => ({ ...e })));
  }, []);

  // useEffect(() => {
  //   dispatch(setFlow({ nodes, edges }));
  // }, [nodes, edges]);

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

  const getFlowOrder = (startNodeId: string): string[] => {
    const visited = new Set<string>();
    const order: string[] = [];

    const traverse = (nodeId: string) => {
      if (visited.has(nodeId)) return;
      visited.add(nodeId);
      order.push(nodeId);

      edges.forEach((edge) => {
        if (edge.source === nodeId) {
          traverse(edge.target);
        }
      });
    };

    traverse(startNodeId);
    return order;
  };

  const playFlow = async () => {
    const startNode = nodes.find((node) => node.id.startsWith('start'));
    if (!startNode) {
      alert('Start node not found');
      return;
    }

    const order = getFlowOrder(startNode.id);

    for (const nodeId of order) {
      const node = nodes.find((n) => n.id === nodeId);
      if (node) {
        // Print node label or ID
        console.log(`▶ Visiting: ${node.data?.label ?? node.id}`);

        if (node) await executeNodeAction(node);

        // Center the view on the node
        // setCenter(node.position.x, node.position.y, {
        //   zoom: 1.5,
        //   duration: 500,
        // });

        // // Highlight the node
        // setNodes((nds) =>
        //   nds.map((n) =>
        //     n.id === nodeId
        //       ? { ...n, style: { border: '2px solid #22c55e' } }
        //       : { ...n, style: {} },
        //   ),
        // );
        centerOnNode(nodeId);
        highlightNode(nodeId);

        // Wait for 2 seconds
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
      clearHighlights();
    }

    // Clear highlights
    setNodes((nds) => nds.map((n) => ({ ...n, style: {} })));
  };

  const executeNodeAction = async (node: Node) => {
    console.log(`▶ Executing: ${node}`, JSON.stringify(node));
    const { message, details } = node.data ?? {};
    console.log(
      `→ Data logger from node   : ${message} / ${details}`,
      node.data['message'],
    );
    // Add further conditional logic here
  };

  return (
    <div className="dndflow">
      <Sidebar onDragStart={onDragStart} />

      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <AgentSettingsPanel
          selectedNode={selectedNode}
          nodes={nodes}
          playFlow={playFlow}
        />

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
          onNodeClick={(_, node) => setSelectedNode(node)}
          onPaneClick={() => setSelectedNode(null)}
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
