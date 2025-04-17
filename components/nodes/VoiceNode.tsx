/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useReactFlow, NodeProps, Node } from '@xyflow/react';
import Image from 'next/image';
import { useState } from 'react';

export type PositionLoggerNodeData = {
  label?: string;
};

export type PositionLoggerNode = Node & { data: PositionLoggerNodeData };

const VoiceNode: React.FC<NodeProps<PositionLoggerNode>> = ({ id }) => {
  const [transcript, setTranscript] = useState<string>('');
  const [listening, setListening] = useState<boolean>(false);

  const { setNodes } = useReactFlow();

  const handleRemove = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
  };

  const handleMicClick = () => {
    const SpeechRecognition =
      typeof window !== 'undefined' &&
      ((window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition);

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setListening(true);
    recognition.start();

    recognition.onresult = (event: any) => {
      const resultEvent = event;
      const spokenText = resultEvent.results[0][0].transcript;
      setTranscript(spokenText);
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  return (
    <div className={`relative px-5 py-2 flex flex-col  bg-slate-600 text-white rounded shadow-md min-w-[140px] ${listening ? 'animate-pulse' : ''}`}>
      <div className="flex justify-end items-center">
        <Image
          width={10}
          height={10}
          alt="Remove"
          src="/cross.png"
          className="cursor-pointer ml-6 border-[1px] border-white rounded-full"
          onClick={handleRemove}
        />
      </div>
      <div className="flex my-3  gap-2">
        <span className="text-sm font-medium">voice recognition</span>
        <Image
          width={18}
          height={18}
          alt="microphone"
          src="/microphone.png"
          className={`cursor-pointer ${listening ? 'animate-pulse' : ''}`}
          onClick={handleMicClick}
        />
      </div>

      {transcript && (
        <div className="mt-2 text-xs max-w-[200px] text-left text-white bg-slate-700 p-1 rounded w-full break-words">
          {transcript}
        </div>
      )}
    </div>
  );
};

export default VoiceNode;
