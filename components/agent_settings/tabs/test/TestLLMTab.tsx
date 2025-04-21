'use client';

import { RootState } from '@/common/data/redux/store';
import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
import { useFlowControls } from '@/components/agent_settings/hooks/useFlowControls';
import { useNodesState, useReactFlow } from '@xyflow/react';
import { useAppSelector } from '@/common/utils/hooks/hooks';
import StepControl from '../../StepControl';

const TestLLMTab: React.FC = () => {
  //   const { nodes: reduxNodes, edges } = useAppSelector(
  //     (state: RootState) => state.agentFlow.flowRunnerSlice,
  //   );

  const { getNodes, getEdges } = useReactFlow();
  const reduxNodes = getNodes();
  const edges = getEdges();

  const { prompt } = useAppSelector(
    (state: RootState) => state.agentFlow.agentSettingsSlice,
  );
  const agentSettingsNodes = useAppSelector(
    (state: RootState) => state.agentFlow.agentSettingsSlice.nodes,
  );

  const [nodes, setNodes] = useNodesState(reduxNodes.map((n) => ({ ...n })));
  const { highlightNode, centerOnNode, clearHighlights } = useFlowControls(
    nodes,
    setNodes,
  );

  const [timeline, setTimeline] = useState<
    {
      id: string;
      label: string;
      message?: string;
      details?: string;
      aiQuery?: string;
      aiResponse?: string;
      userResponse?: string;
      isLoading?: boolean;
      awaitsUserInput?: boolean;
    }[]
  >([]);
  const timelineRef = React.useRef(timeline);

  React.useEffect(() => {
    timelineRef.current = timeline;
  }, [timeline]);

  const [isRunning, setIsRunning] = useState(false);

  const callChatAPI = async (text: string): Promise<string> => {
    const res = await fetch('http://localhost:8000/chat/text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
  
    if (!res.ok) {
      console.error('Failed to fetch AI response');
      return '⚠️ Failed to get response';
    }
  
    const data = await res.json();
    return data.llm_response_text || '⚠️ No response';
  };
  
  const runFlowTest = async () => {
    setIsRunning(true);
    const startNode = nodes.find((node) => node.id.startsWith('start'));
    if (!startNode) {
      console.warn('No start node found');
      setIsRunning(false);
      return;
    }

    setTimeline([]);
    clearHighlights();

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

    traverse(startNode.id);

    for (const nodeId of order) {
      const node = nodes.find((n) => n.id === nodeId);
      if (node) {
        const label = String(node.data?.label ?? node.id);

        const message = agentSettingsNodes[nodeId]?.message ?? '';
        const details = agentSettingsNodes[nodeId]?.details ?? '';

        centerOnNode(nodeId);
        highlightNode(nodeId);

        const baseStep: any = { id: nodeId, label, message, details };

        if (node.type === 'conversation') {
          // Step 1: Show spinner and AI processing
          setTimeline((prev) => [...prev, { ...baseStep, isLoading: true }]);

          const aiQuery = `Prompt:\n${prompt}\n\nUser: ${message}\nSystem: ${details}`;
          console.log('🧠 Sending to AI...\n', aiQuery);
          // await new Promise((r) => setTimeout(r, 1500));

          const aiResponse = await callChatAPI(message);

          // const aiResponse = `This is a dummy response to "${message}"`;

          // Step 2: Replace spinner with AI response + input field
          setTimeline((prev) =>
            prev.map((s) =>
              s.id === nodeId
                ? {
                    ...s,
                    aiQuery,
                    aiResponse,
                    isLoading: false,
                    awaitsUserInput: true,
                  }
                : s,
            ),
          );

          // Step 3: Wait for user input
          await new Promise<void>((resolve) => {
            const interval = setInterval(() => {
              const step = timelineRef.current.find(
                (s) => s.id === nodeId && s.awaitsUserInput === false,
              );
              if (step) {
                clearInterval(interval);
                resolve();
              }
            }, 300);
          });

          console.log('✅ User replied to:', nodeId);
        } else {
          setTimeline((prev) => [...prev, baseStep]);
        }

        await new Promise((r) => setTimeout(r, 3000));
      }
    }

    await new Promise((r) => setTimeout(r, 1000));
    clearHighlights();
    setIsRunning(false);
  };

  return (
    <div className="space-y-4 text-sm h-full overflow-hidden flex flex-col">
      <div className="space-y-2">
        <h3 className="font-medium text-gray-800">Test LLM Response</h3>

        <textarea
          rows={5}
          className="w-full border rounded p-2 resize-none"
          placeholder="Type a test prompt for the LLM..."
        />

        <button
          onClick={runFlowTest}
          disabled={isRunning}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isRunning ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Running...
            </span>
          ) : (
            '▶ Run Node Flow (LLM Style)'
          )}
        </button>
      </div>

      {/* Timeline scrollable */}
      <div className="mt-4 overflow-y-auto border-t pt-4 flex-1">
        <h4 className="font-semibold mb-2 text-gray-700">Timeline</h4>
        <ul className="border-l-2 border-blue-300 pl-4 space-y-3">
          {timeline.map((step, index) => (
            <li key={step.id + index} className="relative">
              <div className="absolute -left-[9px] top-[6px] h-3 w-3 rounded-full bg-blue-500" />
              <div className="mb-1 text-blue-900 font-medium">
                {index + 1}. {step.label}
              </div>
              {step.message && (
                <div className="text-xs text-gray-600">
                  <strong>Message:</strong> {step.message}
                </div>
              )}
              {step.details && (
                <div className="text-xs text-gray-500">
                  <strong>Details:</strong> {step.details}
                </div>
              )}
              {step.aiQuery && (
                <div className="text-xs text-purple-700 bg-purple-50 p-2 rounded mt-1">
                  <strong>🔄 Sent to AI:</strong>
                  <pre className="whitespace-pre-wrap text-xs">
                    {step.aiQuery}
                  </pre>

                  {step.isLoading && (
                    <div className="flex items-center mt-2 text-xs text-purple-400">
                      <svg
                        className="animate-spin h-4 w-4 mr-2"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                      Waiting for AI response...
                    </div>
                  )}
                </div>
              )}
              {step.aiResponse && (
                <div className="text-xs text-green-700 bg-green-50 p-2 rounded mt-1">
                  <strong>🤖 AI Response:</strong> {step.aiResponse}
                </div>
              )}

              {step.awaitsUserInput && (
                <StepControl
                  stepId={step.id}
                  userResponse={step.userResponse ?? ''}
                  onChange={(val) => {
                    setTimeline((prev) =>
                      prev.map((s) =>
                        s.id === step.id ? { ...s, userResponse: val } : s,
                      ),
                    );
                  }}
                  onSubmit={() => {
                    setTimeline((prev) =>
                      prev.map((s) =>
                        s.id === step.id ? { ...s, awaitsUserInput: false } : s,
                      ),
                    );
                  }}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TestLLMTab;
