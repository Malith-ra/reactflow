'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Settings } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/common/utils/hooks/hooks';
import { RootState } from '@/common/data/redux/store';
import { setPrompt } from '@/features/agent_flow/data/redux/agentSettingsSlice';

const Section: React.FC<{
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, icon, children }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="mb-4">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between w-full text-left font-medium text-gray-800"
      >
        <span className="flex items-center gap-2 text-sm">
          {icon}
          {title}
        </span>
        {open ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
};

const GlobalSettingsContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const prompt = useAppSelector(
    (state: RootState) => state.agentFlow.agentSettingsSlice.prompt,
  );

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setPrompt(e.target.value));
  };

  return (
    <div className="text-sm text-gray-800 space-y-6">
      <Section
        title="Agent Settings"
        icon={<span className="text-xl">🤖</span>}
      >
        <div className="mb-4">
          <label className="block text-xs font-medium mb-1">
            Voice & Language
          </label>
          <div className="flex items-center gap-2">
            <select className="border px-3 py-1 rounded">
              <option>🇺🇸 English</option>
            </select>
            <select className="border px-3 py-1 rounded">
              <option>Myra</option>
            </select>
            <button className="ml-1 p-1 rounded border hover:bg-gray-100">
              <Settings size={14} />
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-medium mb-1">
            Global Prompt
          </label>
          <div className="flex items-center gap-2 mb-2">
            <select className="border px-3 py-1 rounded">
              <option>🧠 GPT 4o</option>
            </select>
            <button className="ml-1 p-1 rounded border hover:bg-gray-100">
              <Settings size={14} />
            </button>
          </div>
          <textarea
            value={prompt}
            onChange={handlePromptChange}
            rows={10}
            className="w-full text-sm p-2 border rounded resize-none"
          />
        </div>
      </Section>

      <Section title="Knowledge Base" icon={<span>📄</span>}>
        <p className="text-xs text-gray-600">
          Knowledge base settings coming soon.
        </p>
      </Section>

      <Section title="Speech Settings" icon={<span>🗣️</span>}>
        <p className="text-xs text-gray-600">Speech settings coming soon.</p>
      </Section>

      <Section title="Call Settings" icon={<span>🎧</span>}>
        <p className="text-xs text-gray-600">Call settings coming soon.</p>
      </Section>

      <Section title="Post-Call Analysis" icon={<span>📈</span>}>
        <p className="text-xs text-gray-600">
          Post-call analysis config coming soon.
        </p>
      </Section>

      <Section title="Security & Fallback Settings" icon={<span>🛡️</span>}>
        <p className="text-xs text-gray-600">
          Security/fallback rules coming soon.
        </p>
      </Section>
    </div>
  );
};

export default GlobalSettingsContent;
