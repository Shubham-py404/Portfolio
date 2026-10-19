import React from 'react';

interface LinkedInIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const LinkedInIcon: React.FC<LinkedInIconProps> = ({ size = 20, className = '', ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      {...props}
    >
      {/* Background container tile: turns to official LinkedIn Blue #0A66C2 on card hover */}
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="3"
        fill="currentColor"
        className="text-line-strong group-hover:text-[#0A66C2] transition-colors duration-300"
      />
      {/* Official "in" glyph rendered crisp in white on hover */}
      <path
        d="M6.94 5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM5.5 9h2.88v10H5.5V9zm4.72 0h2.76v1.37h.04c.38-.72 1.32-1.48 2.7-1.48 2.89 0 3.42 1.9 3.42 4.38V19H16.3v-4.98c0-1.19-.02-2.72-1.66-2.72-1.66 0-1.92 1.3-1.92 2.63V19h-2.5V9z"
        className="fill-canvas group-hover:fill-white transition-colors duration-300"
      />
    </svg>
  );
};

export default LinkedInIcon;
