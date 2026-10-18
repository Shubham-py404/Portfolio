import React from 'react';

interface GmailIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const GmailIcon: React.FC<GmailIconProps> = ({ size, className = '', ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 193"
      width={size}
      height={size}
      fill="none"
      className={className}
      {...props}
    >
      <path
        fill="#4285F4"
        d="M58.182 192.05V93.14L0 51.5v120.6c0 10.975 8.975 19.95 19.95 19.95h38.232z"
      />
      <path
        fill="#34A853"
        d="M197.818 192.05h38.232c10.975 0 19.95-8.975 19.95-19.95V51.5l-58.182 41.64v98.91z"
      />
      <path
        fill="#EA4335"
        d="M197.818 93.14V23.273c0-17.702-20.218-27.697-33.864-16.364L128 35.818 92.045 6.91C78.4-4.425 58.182 5.57 58.182 23.273V93.14l69.818 50.818 69.818-50.818z"
      />
      <path
        fill="#FBBC04"
        d="M0 51.5l58.182 41.64V23.273c0-4.992 1.636-9.605 4.418-13.364L0 51.5z"
      />
      <path
        fill="#C5221F"
        d="M256 51.5l-58.182 41.64V23.273c0-4.992-1.636-9.605-4.418-13.364L256 51.5z"
      />
    </svg>
  );
};

export default GmailIcon;
