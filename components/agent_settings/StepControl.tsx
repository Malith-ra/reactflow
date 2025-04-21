'use client';

import React from 'react';

interface Props {
  stepId: string;
  userResponse: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
}

const StepControl: React.FC<Props> = ({
  //   stepId,
  userResponse,
  onChange,
  onSubmit,
}) => {
  return (
    <div className="mt-2 space-y-1">
      <label className="text-xs text-gray-500">User Input:</label>
      <input
        type="text"
        className="w-full border rounded px-2 py-1 text-xs"
        placeholder="Enter your reply..."
        value={userResponse}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        onClick={onSubmit}
        className="mt-1 text-xs text-white bg-blue-500 px-2 py-1 rounded hover:bg-blue-600"
      >
        Submit & Continue
      </button>
    </div>
  );
};

export default StepControl;
