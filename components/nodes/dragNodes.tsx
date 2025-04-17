import type { BuiltInNode, Node, NodeTypes } from '@xyflow/react';
import PositionLoggerNode, {
  type PositionLoggerNode as PositionLoggerNodeType,
} from './PositionLoggerNode';
import StartNode from './StartNode';
import VoiceNode from './VoiceNode';

export const initialDragNodes = [
  {
    id: 'a',
    type: 'input',
    position: { x: 0, y: 0 },
    data: { label: 'Node 01' },
  },
  {
    id: 'b',
    type: 'position-logger',
    position: { x: -100, y: 100 },
    data: { label: 'drag me!' },
  },
  { id: 'c', position: { x: 100, y: 100 }, data: { label: 'Node 02' } },
  {
    id: 'd',
    type: 'output',
    position: { x: 0, y: 200 },
    data: { label: 'Node 03' },
  },
  {
    id: 'start',
    type: 'start',
    position: { x: 250, y: 100 },
    data: { label: 'Start' },
  },
  {
    id: 'voice',
    type: 'voice',
    position: { x: 250, y: 200 },
    data: { label: 'Voice node 1' },
  },
] satisfies Node[];

export const nodeDragTypes: NodeTypes = {
  'position-logger': PositionLoggerNode,
  start: StartNode,
  voice: VoiceNode,
  // Add any of your custom nodes here!
};

// Append the types of you custom edges to the BuiltInNode type
export type CustomNodeType = BuiltInNode | PositionLoggerNodeType;
