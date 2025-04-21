'use client';

import React from 'react';

const MoreIcon: React.FC<{
  width?: number;
  height?: number;
  className?: string;
}> = ({ width = 12, height = 12, className }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 12 12"
    fill="#68123d"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g id="more-fill">
      <path
        id="Vector"
        d="M2.4502 6.00156C2.4502 5.7827 2.63134 5.60156 2.8502 5.60156C3.06905 5.60156 3.2502 5.7827 3.2502 6.00156C3.2502 6.22042 3.06905 6.40156 2.8502 6.40156C2.63134 6.40156 2.4502 6.22042 2.4502 6.00156ZM8.7502 6.00156C8.7502 5.78271 8.93134 5.60156 9.1502 5.60156C9.36905 5.60156 9.5502 5.78271 9.5502 6.00156C9.5502 6.22042 9.36905 6.40156 9.1502 6.40156C8.93134 6.40156 8.7502 6.22042 8.7502 6.00156ZM5.6002 6.00156C5.6002 5.7827 5.78134 5.60156 6.0002 5.60156C6.21905 5.60156 6.4002 5.78271 6.4002 6.00156C6.4002 6.22042 6.21905 6.40156 6.0002 6.40156C5.78134 6.40156 5.6002 6.22042 5.6002 6.00156Z"
        fill="var(--state-highlighted-dark)"
        stroke="var(--state-highlighted-dark)"
      />
    </g>
  </svg>
);

export default MoreIcon;
