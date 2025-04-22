import type { BuiltInNode, NodeTypes } from '@xyflow/react';
import ConversationNode from './ConversationNode';
import PositionLoggerNode, {
  type PositionLoggerNode as PositionLoggerNodeType,
} from './PositionLoggerNode';
import StartNode from './StartNode';
import VoiceNode from './VoiceNode';
import EndingNode from './EndingNode';
import FunctionNode from './FunctionNode';
import CallTransferNode from './CallTransferNode';
import PressDigitNode from './PressDigitNode';
import LogicSplitNode from './LogicSplitNode';
import SendSMSNode from './SendSMSNode';


export const nodeDragTypes: NodeTypes = {
  'position-logger': PositionLoggerNode,
  start: StartNode,
  voice: VoiceNode,
  conversation: ConversationNode,
  ending: EndingNode,
  function: FunctionNode,
  'call-transfer': CallTransferNode,
  'press-digit': PressDigitNode,
  'logic-split': LogicSplitNode,
  sms: SendSMSNode,
};

export type CustomNodeType = BuiltInNode | PositionLoggerNodeType;
