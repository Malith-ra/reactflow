'use client';

import React from 'react';

const TestVoiceTab: React.FC = () => {
  return (
    <div className="space-y-2 text-sm">
      <h3 className="font-medium text-gray-800">Test Voice Output</h3>
      <input
        type="text"
        className="w-full border rounded p-2"
        placeholder="Type something to speak..."
      />
      <button className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700">
        Play Voice
      </button>
    </div>
  );
};

export default TestVoiceTab;
