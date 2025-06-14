
import React, { useState, useEffect, useRef } from 'react';
import { ToolbarProps } from './Toolbar.types';
import {
  INLINE_STYLES,
  COLOR_STYLES,
  BG_COLOR_STYLES,
} from '../../constants/inlineStyles';

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
      style={{
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        marginBottom: 12,
        position: 'relative',
      }}
    >
      {INLINE_STYLES.map(({ label, style }) => (
        <button
          key={style}
          onMouseDown={(e) => {
            e.preventDefault();
            handleToggle(style);
            onFocusEditor?.();
          }}
          style={{
            padding: '6px 10px',
            fontWeight: 'bold',
            border: '1px solid #ccc',
            borderRadius: 4,
            cursor: 'pointer',
            background: '#fff',
          }}
        >
          {label}
        </button>
      ))}

      <div style={{ position: 'relative' }} ref={textColorRef}>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            setShowTextColors((prev) => !prev);
            setShowBgColors(false);
          }}
          style={{
            padding: '6px 10px',
            border: '1px solid #ccc',
            borderRadius: 4,
            cursor: 'pointer',
            background: '#fff',
          }}
        >
          Text 🎨
        </button>
        {showTextColors && (
          <div
            style={{
              position: 'absolute',
              top: '110%',
              left: 0,
              background: '#fff',
              border: '1px solid #ccc',
              padding: 6,
              display: 'flex',
              gap: 8,
              zIndex: 2,
              borderRadius: 4,
            }}
          >
            {COLOR_STYLES.map(({ style, color }) => (
              <div
                key={style}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleToggle(style);
                  onFocusEditor?.();
                }}
                style={{
                  backgroundColor: color,
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  cursor: 'pointer',
                  border: '1px solid #999',
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div style={{ position: 'relative' }} ref={bgColorRef}>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            setShowBgColors((prev) => !prev);
            setShowTextColors(false);
          }}
          style={{
            padding: '6px 10px',
            border: '1px solid #ccc',
            borderRadius: 4,
            cursor: 'pointer',
            background: '#fff',
          }}
        >
          BG 🖍️
        </button>
        {showBgColors && (
          <div
            style={{
              position: 'absolute',
              top: '110%',
              left: 0,
              background: '#fff',
              border: '1px solid #ccc',
              padding: 6,
              display: 'flex',
              gap: 8,
              zIndex: 2,
              borderRadius: 4,
            }}
          >
            {BG_COLOR_STYLES.map(({ style, color }) => (
              <div
                key={style}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleToggle(style);
                  onFocusEditor?.();
                }}
                style={{
                  backgroundColor: color,
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  cursor: 'pointer',
                  border: '1px solid #999',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
