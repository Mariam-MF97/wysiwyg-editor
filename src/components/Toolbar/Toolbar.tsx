import React, { useState, useEffect, useRef } from 'react';

import { ToolbarProps } from './Toolbar.types';
import {
  INLINE_STYLES,
  COLOR_STYLES,
  BG_COLOR_STYLES,
} from '../../constants/inlineStyles';

import './Toolbar.css';

const Toolbar: React.FC<ToolbarProps> = ({ onToggle, onFocusEditor }) => {
  const [showTextColors, setShowTextColors] = useState(false);
  const [showBgColors, setShowBgColors] = useState(false);
  const textColorRef = useRef<HTMLDivElement>(null);
  const bgColorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        textColorRef.current &&
        !textColorRef.current.contains(event.target as Node) &&
        bgColorRef.current &&
        !bgColorRef.current.contains(event.target as Node)
      ) {
        setShowTextColors(false);
        setShowBgColors(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = (style: string) => {
    onToggle(style);
    setShowTextColors(false);
    setShowBgColors(false);
  };

  return (
    <div
      role='toolbar'
      aria-label='Text formatting toolbar'
      className='toolbar'
    >
      {INLINE_STYLES.map(({ label, style }) => (
        <button
          key={style}
          aria-label={`Format text ${style.toLowerCase()}`}
          onMouseDown={(e) => {
            e.preventDefault();
            handleToggle(style);
            onFocusEditor?.();
          }}
          className='toolbar-button'
        >
          {label}
        </button>
      ))}

      <div className='color-picker-container' ref={textColorRef}>
        <button
          aria-label='Text color'
          aria-expanded={showTextColors}
          onMouseDown={(e) => {
            e.preventDefault();
            setShowTextColors((prev) => !prev);
            setShowBgColors(false);
          }}
          className='color-picker-button'
        >
          Text 🎨
        </button>
        {showTextColors && (
          <div
            role='menu'
            aria-label='Text color options'
            className='color-picker-menu'
          >
            {COLOR_STYLES.map(({ style, color }) => (
              <button
                key={style}
                role='menuitem'
                aria-label={`Set text color to ${style.toLowerCase()}`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleToggle(style);
                  onFocusEditor?.();
                }}
                className='color-option'
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
      </div>

      <div className='color-picker-container' ref={bgColorRef}>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            setShowBgColors((prev) => !prev);
            setShowTextColors(false);
          }}
          className='color-picker-button'
        >
          BG 🖍️
        </button>
        {showBgColors && (
          <div className='color-picker-menu'>
            {BG_COLOR_STYLES.map(({ style, color }) => (
              <div
                key={style}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleToggle(style);
                  onFocusEditor?.();
                }}
                className='color-option-bg'
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
