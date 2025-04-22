'use client';

import React from 'react';

interface ClearButtonProps {
  label?: string;
  reloadAfterClear?: boolean;
}

const ClearButton: React.FC<ClearButtonProps> = ({
  label = 'Clear Canvas',
  reloadAfterClear = true,
}) => {
  const handleClear = () => {
    localStorage.clear();

    if (reloadAfterClear) {
      window.location.reload();
    }
  };

  return (
    <button
      onClick={handleClear}
      type="button"
      className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded"
    >
      {label}
    </button>
  );
};

export default ClearButton;
