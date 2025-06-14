import React, { useState } from 'react';
import WysiwygEditor from './components/WysiwygEditor';
import { INLINE_STYLES, COLOR_STYLES } from './constants/inlineStyles';

const App = () => {
  const [content, setContent] = useState<string | undefined>();

  const renderCustomToolbar = (onToggle: (style: string) => void) => (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      {INLINE_STYLES.map(({ label, style }) => (
        <button
          key={style}
          onMouseDown={(e) => {
            e.preventDefault();
            onToggle(style);
          }}
        >
          {label}
        </button>
      ))}
      {COLOR_STYLES.map(({ style, color }) => (
        <button
          key={style}
          onMouseDown={(e) => {
            e.preventDefault();
            onToggle(style);
          }}
          style={{ backgroundColor: color, width: 24, height: 24 }}
        />
      ))}
    </div>
  );

  return (
    <div style={{ padding: 24 }}>
      <h2>Custom Toolbar Example</h2>
      <WysiwygEditor
        value={content}
        onChange={setContent}
        renderToolbar={renderCustomToolbar}
      />
    </div>
  );
};

export default App;
