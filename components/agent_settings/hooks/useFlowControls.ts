'use client';

import { useCallback } from 'react';
import { Node, useReactFlow } from '@xyflow/react';

export function useFlowControls(
  nodes: Node[],
  setNodes: (updater: (nds: Node[]) => Node[]) => void,
) {
  const { setCenter } = useReactFlow();

  const highlightNode = useCallback(
    (nodeId: string) => {
      const node = nodes.find((n) => n.id === nodeId);
      if (!node) return;

      setNodes((nds) =>
        nds.map((n) =>
          n.id === nodeId
            ? { ...n, style: { border: '2px solid #22c55e' } }
            : { ...n, style: {} },
        ),
      );
    },
    [nodes, setNodes],
  );

  const clearHighlights = useCallback(() => {
    setNodes((nds) => nds.map((n) => ({ ...n, style: {} })));
  }, [setNodes]);

  const centerOnNode = useCallback(
    (nodeId: string) => {
      const node = nodes.find((n) => n.id === nodeId);
      if (!node) return;

      setCenter(node.position.x, node.position.y, {
        zoom: 1.5,
        duration: 500,
      });
    },
    [nodes, setCenter],
  );

  return {
    highlightNode,
    clearHighlights,
    centerOnNode,
  };
}
