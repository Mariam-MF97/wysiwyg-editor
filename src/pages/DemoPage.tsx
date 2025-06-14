import React, { useEffect, useState } from 'react';
import WysiwygEditor from '../components/WysiwygEditor';

const fakeFetch = () =>
  new Promise<string>((resolve) => {
    setTimeout(() => {
      const initialRaw = JSON.stringify({
        blocks: [
          {
            key: 'init1',
            text: 'Hello World',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [
              { offset: 0, length: 5, style: 'BOLD' },
              { offset: 6, length: 5, style: 'BLUE' },
            ],
            entityRanges: [],
            data: {},
          },
        ],
        entityMap: {},
      });
      resolve(initialRaw);
    }, 1200);
  });

const EditorDemo = () => {
  const [controlledValue, setControlledValue] = useState<string>();
  const [savedValue, setSavedValue] = useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fakeFetch().then((val) => {
      setControlledValue(val);
      setLoading(false);
    });
  }, []);

  const handleSave = () => {
    setSavedValue(controlledValue);
    console.log('Saved value:', controlledValue);
  };

  return (
    <div
      style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 40 }}
    >
      <div>
        <h3>Controlled Editor</h3>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <WysiwygEditor
              value={controlledValue}
              onChange={setControlledValue}
            />
              <button
                onClick={handleSave}
                style={{
                  marginTop: 12,
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: 10,
                  cursor: 'pointer',
                  borderRadius: 4,
                }}
              >
              Save
            </button>
            {savedValue && (
              <div style={{ color: 'green', marginTop: 8 }}>
                ✅ Content saved!
              </div>
            )}
          </>
        )}
      </div>

      <div>
        <h3>Uncontrolled Editor</h3>
        <WysiwygEditor />
      </div>
    </div>
  );
};

export default EditorDemo;
