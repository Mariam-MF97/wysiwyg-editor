import React, { useState } from 'react';
import WysiwygEditor from '../components/WysiwygEditor';

const EditorDemo = () => {
  const [controlledValue, setControlledValue] = useState<string>();

  return (
    <div style={{ padding: 32, display: 'flex', gap: 40 }}>
      {/* Controlled Editor */}
      <div style={{ flex: 1 }}>
        <h3>Controlled Editor</h3>
        <WysiwygEditor value={controlledValue} onChange={setControlledValue} />
        <div style={{ marginTop: 12 }}>
          <strong>Raw JSON:</strong>
          <pre style={{ fontSize: 12, background: '#eee', padding: 8 }}>
            {controlledValue}
          </pre>
        </div>
      </div>

      {/* Uncontrolled Editor */}
      <div style={{ flex: 1 }}>
        <h3>Uncontrolled Editor</h3>
        <WysiwygEditor />
      </div>
    </div>
  );
};

export default EditorDemo;
