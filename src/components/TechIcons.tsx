import React from 'react';

interface TechIconProps {
  id: string;
  className?: string;
  size?: number;
}

export const TechIcon: React.FC<TechIconProps> = ({ id, className = '', size = 26 }) => {
  switch (id) {
    case 'typescript':
      // Official TypeScript Square Emblem
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <rect width="24" height="24" rx="4" fill="#3178C6" />
          <path d="M12.2 12.3H9.8V19H8V12.3H5.6V10.8H12.2V12.3ZM18.4 13.5C18.4 12.4 17.5 11.8 16.1 11.4C14.7 11 14.2 10.7 14.2 10.1C14.2 9.6 14.6 9.2 15.4 9.2C16.2 9.2 16.7 9.6 16.9 10.3L18.4 9.7C18 8.4 17 7.7 15.4 7.7C13.6 7.7 12.4 8.7 12.4 10.2C12.4 11.5 13.3 12.1 14.8 12.5C16.2 12.9 16.6 13.3 16.6 13.9C16.6 14.5 16 15 15.2 15C14.2 15 13.6 14.4 13.3 13.5L11.7 14.2C12.2 15.6 13.4 16.5 15.2 16.5C17.2 16.5 18.4 15.2 18.4 13.5Z" fill="#FFFFFF" />
        </svg>
      );

    case 'javascript':
      // Official JavaScript Emblem
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <rect width="24" height="24" rx="4" fill="#F7DF1E" />
          <path d="M7.7 18.2C8.6 18.2 9.2 17.7 9.2 16.6V11.2H7.6V16.5C7.6 17 7.3 17.2 6.8 17.2C6.4 17.2 6.1 17 6 16.8L5.3 17.8C5.8 18.1 6.7 18.2 7.7 18.2ZM14.7 18.3C16.8 18.3 17.9 17.2 17.9 15.6C17.9 13.9 16.8 13.3 15.2 12.6C14.1 12.1 13.6 11.8 13.6 11.2C13.6 10.7 14 10.3 14.8 10.3C15.6 10.3 16.1 10.7 16.4 11.3L17.7 10.5C17.1 9.5 16.1 9.1 14.8 9.1C13 9.1 12 10.1 12 11.4C12 12.9 13 13.6 14.6 14.3C15.7 14.8 16.2 15.2 16.2 15.8C16.2 16.5 15.6 17 14.6 17C13.5 17 12.8 16.4 12.5 15.6L11.2 16.5C11.8 17.7 13.1 18.3 14.7 18.3Z" fill="#000000" />
        </svg>
      );

    case 'react':
      // Official React Atom Orbit
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
        </svg>
      );

    case 'nodejs':
      // Official Node.js Hexagon
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path d="M12 2L21 7.2V16.8L12 22L3 16.8V7.2L12 2Z" fill="#5FA04E" />
          <path d="M12 4.2L19.2 8.4V15.6L12 19.8L4.8 15.6V8.4L12 4.2Z" fill="#333333" />
          <path d="M10.2 9H13.8V11.5L10.2 12.5V9ZM10.2 13.5L13.8 12.5V15H10.2V13.5Z" fill="#FFFFFF" />
        </svg>
      );

    case 'express':
      // Express.js Wordmark / Fast Minimalist Logo
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <rect width="24" height="24" rx="4" fill="#263746" />
          <path d="M6 8L10 16M10 8L6 16M14 16V8L18 12L14 16Z" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'html5':
      // Official HTML5 Shield
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path d="M2 3L3.82 23.4L12 25.68L20.18 23.4L22 3H2Z" fill="#E34F26" transform="scale(0.85) translate(2, 1)" />
          <path d="M12 4.9V23.7L18.66 21.84L20.16 4.9H12Z" fill="#EF652A" transform="scale(0.85) translate(2, 1)" />
          <path d="M12 9.5H8.38L8.14 6.78H12V4.08H5.2L5.86 12.2H12V9.5ZM12 16.32L9.36 15.6L9.2 13.68H6.5L6.82 17.28L12 18.72V16.32Z" fill="#ECECEC" transform="scale(0.85) translate(2, 1)" />
          <path d="M12 9.5V12.2H15.4L15.08 15.6L12 16.32V18.72L17.18 17.28L17.8 10.36L17.88 9.5H12ZM12 4.08V6.78H18.52L18.76 4.08H12Z" fill="#FFFFFF" transform="scale(0.85) translate(2, 1)" />
        </svg>
      );

    case 'css3':
      // Official CSS3 Shield
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path d="M2 3L3.82 23.4L12 25.68L20.18 23.4L22 3H2Z" fill="#1572B6" transform="scale(0.85) translate(2, 1)" />
          <path d="M12 4.9V23.7L18.66 21.84L20.16 4.9H12Z" fill="#33A9DC" transform="scale(0.85) translate(2, 1)" />
          <path d="M12 9.5H8.38L8.14 6.78H12V4.08H5.2L5.86 12.2H12V9.5ZM12 16.32L9.36 15.6L9.2 13.68H6.5L6.82 17.28L12 18.72V16.32Z" fill="#ECECEC" transform="scale(0.85) translate(2, 1)" />
          <path d="M12 9.5V12.2H15.4L15.08 15.6L12 16.32V18.72L17.18 17.28L17.8 10.36L17.88 9.5H12ZM12 4.08V6.78H18.52L18.76 4.08H12Z" fill="#FFFFFF" transform="scale(0.85) translate(2, 1)" />
        </svg>
      );

    case 'django':
      // Official Django Brandmark
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <rect width="24" height="24" rx="4" fill="#092E20" />
          <path d="M10.87 5H12.92V13.88C12.3 14.13 11.66 14.28 10.97 14.28C9.28 14.28 8.2 13.27 8.2 11.63C8.2 9.94 9.33 8.92 10.87 8.92V5ZM10.87 10.66C9.99 10.66 9.38 11.23 9.38 12.11C9.38 12.95 9.92 13.48 10.87 13.48V10.66Z" fill="#44B78B" />
          <path d="M14.2 8.92H16.25V18.95H14.2V8.92ZM14.2 5.05H16.25V7.1H14.2V5.05Z" fill="#FFFFFF" />
        </svg>
      );

    case 'flask':
      // Official Flask Icon
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path d="M10 2V4H10.5L6.3 12.4C5.5 14 5.1 15 5.1 16.2C5.1 19.4 7.7 22 10.9 22H13.1C16.3 22 18.9 19.4 18.9 16.2C18.9 15 18.5 14 17.7 12.4L13.5 4H14V2H10ZM12 7.2L15.4 14H8.6L12 7.2Z" fill="#263746" />
          <circle cx="10" cy="17" r="1.2" fill="#8FC5F0" />
          <circle cx="13.5" cy="18" r="1.5" fill="#8FC5F0" />
          <circle cx="14" cy="15.5" r="0.8" fill="#8FC5F0" />
        </svg>
      );

    case 'postgresql':
      // Official PostgreSQL Logo (Elephant silhouette / blue mark)
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <rect width="24" height="24" rx="4" fill="#336791" />
          <path d="M12 4C8.5 4 6 6.5 6 10C6 12.8 7.5 15.1 9.8 16.1V19C9.8 19.6 10.3 20 10.9 20C11.5 20 12 19.6 12 19V17H12.5C15.5 17 18 14.5 18 11.5C18 7.4 15.4 4 12 4ZM10 11.5C9.4 11.5 9 11.1 9 10.5C9 9.9 9.4 9.5 10 9.5C10.6 9.5 11 9.9 11 10.5C11 11.1 10.6 11.5 10 11.5ZM14.5 14H13V12H14.5C15.3 12 16 12.7 16 13.5C16 14.3 15.3 15 14.5 14Z" fill="#FFFFFF" />
        </svg>
      );

    case 'mysql':
      // Official MySQL Dolphin Mark
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <rect width="24" height="24" rx="4" fill="#00758F" />
          <path d="M6 16.5C8 16 10 13 11 10C11.5 8.5 12.5 7.5 14 7C16 6.5 17.5 7 18.5 8C19 8.5 18 9.5 17 9.5C15.5 9.5 14.5 10.5 14 12C13.5 13.5 12 15 9.5 16C8 16.5 6.8 16.8 6 16.5Z" fill="#F29111" />
          <circle cx="16" cy="8" r="0.8" fill="#FFFFFF" />
        </svg>
      );

    case 'git':
      // Official Git Rhombus
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path d="M22.5 10.87L13.13 1.5C12.46 0.83 11.37 0.83 10.7 1.5L8.9 3.3L11.14 5.54C11.72 5.35 12.39 5.48 12.87 5.96C13.35 6.44 13.48 7.12 13.29 7.7L15.5 9.91C16.08 9.72 16.76 9.85 17.24 10.33C17.9 11 17.9 12.08 17.24 12.75C16.57 13.41 15.49 13.41 14.82 12.75C14.34 12.27 14.21 11.59 14.4 11.01L12.35 8.96V14.73C12.56 14.9 12.74 15.14 12.87 15.42C13.35 16.43 12.92 17.65 11.91 18.13C10.9 18.61 9.68 18.18 9.2 17.17C8.72 16.16 9.15 14.94 10.16 14.46C10.45 14.33 10.77 14.27 11.1 14.29V8.58C10.77 8.6 10.45 8.54 10.16 8.41C9.68 8.19 9.3 7.81 9.08 7.33L6.85 9.56L1.5 14.91C0.83 15.58 0.83 16.67 1.5 17.34L10.87 26.71C11.54 27.38 12.63 27.38 13.3 26.71L22.5 17.51C23.17 16.84 23.17 15.75 22.5 15.08" fill="#F05032" transform="scale(0.8) translate(3, 0)" />
        </svg>
      );

    case 'github':
      // Official GitHub Octocat Silhouette
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017C2 16.446 4.87 20.198 8.84 21.523C9.34 21.616 9.52 21.306 9.52 21.039C9.52 20.803 9.51 20.021 9.51 19.191C6.73 19.794 6.14 17.85 6.14 17.85C5.69 16.7 5.03 16.394 5.03 16.394C4.12 15.772 5.1 15.785 5.1 15.785C6.1 15.856 6.63 16.817 6.63 16.817C7.52 18.349 8.97 17.907 9.54 17.65C9.63 17.003 9.89 16.562 10.17 16.315C7.95 16.063 5.62 15.204 5.62 11.378C5.62 10.288 6.01 9.398 6.65 8.701C6.55 8.448 6.2 7.433 6.75 6.068C6.75 6.068 7.59 5.8 9.5 7.093C10.3 6.871 11.15 6.761 12 6.757C12.85 6.761 13.7 6.871 14.5 7.093C16.41 5.8 17.25 6.068 17.25 6.068C17.8 7.433 17.45 8.448 17.35 8.701C17.99 9.398 18.38 10.288 18.38 11.378C18.38 15.215 16.04 16.06 13.81 16.307C14.17 16.618 14.49 17.234 14.49 18.177C14.49 19.53 14.48 20.619 14.48 20.952C14.48 21.222 14.66 21.536 15.17 21.434C19.14 20.103 22 16.353 22 11.928C22 6.484 17.523 2 12 2Z" fill="#24292F" />
        </svg>
      );

    default:
      return null;
  }
};
