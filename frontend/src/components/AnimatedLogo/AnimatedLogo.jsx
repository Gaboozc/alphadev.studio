import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AnimatedLogo.css';

export const AnimatedLogo = ({
  logo,
  onClick,
  size = 200,
  clickable = true,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (clickable && onClick) {
      onClick();
    } else if (clickable) {
      navigate('/');
    }
  };

  return (
    <div
      className="animated-logo-container"
      onClick={handleClick}
      style={{ cursor: clickable ? 'pointer' : 'default' }}
    >
      {/* Animated diagonal lines halo */}
      <div className="animated-logo__halo">
        <svg viewBox="0 0 400 400" className="animated-logo__svg">
          {/* Layer 1 - Outer diagonal lines */}
          <g className="animated-logo__group animated-logo__group--1">
            <line x1="0" y1="0" x2="400" y2="0" stroke="currentColor" strokeWidth="2" opacity="0.8" />
            <line x1="400" y1="0" x2="400" y2="400" stroke="currentColor" strokeWidth="2" opacity="0.8" />
            <line x1="400" y1="400" x2="0" y2="400" stroke="currentColor" strokeWidth="2" opacity="0.8" />
            <line x1="0" y1="400" x2="0" y2="0" stroke="currentColor" strokeWidth="2" opacity="0.8" />
          </g>

          {/* Layer 2 - Diagonal cross lines */}
          <g className="animated-logo__group animated-logo__group--2">
            <line x1="0" y1="0" x2="400" y2="400" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
            <line x1="400" y1="0" x2="0" y2="400" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
          </g>

          {/* Layer 3 - Inner animated diagonals */}
          <g className="animated-logo__group animated-logo__group--3">
            <line x1="50" y1="50" x2="350" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="350" y1="50" x2="350" y2="350" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="350" y1="350" x2="50" y2="350" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="50" y1="350" x2="50" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          </g>

          {/* Corner accents */}
          <g className="animated-logo__corners">
            <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.7" />
            <circle cx="380" cy="20" r="3" fill="currentColor" opacity="0.7" />
            <circle cx="380" cy="380" r="3" fill="currentColor" opacity="0.7" />
            <circle cx="20" cy="380" r="3" fill="currentColor" opacity="0.7" />
          </g>
        </svg>
      </div>

      {/* Logo image */}
      <div className="animated-logo__image">
        <img src={logo} alt="AlphaDev Logo" style={{ width: size, height: 'auto' }} />
      </div>

      {/* Click indicator */}
      {clickable && <div className="animated-logo__pulse"></div>}
    </div>
  );
};
