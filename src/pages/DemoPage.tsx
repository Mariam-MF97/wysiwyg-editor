import React, { useEffect, useState } from 'react';
import WysiwygEditor from '../components/WysiwygEditor';
import './DemoPage.css';

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
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fakeFetch().then((val) => {
      setControlledValue(val);
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSavedValue(controlledValue);
    setSaving(false);
  };

  return (
    <div className='demo-container'>
      <div className='editor-section'>
        <h3>Controlled Editor</h3>
        {loading ? (
          <div className='loading-text'>Loading...</div>
        ) : (
          <>
            <WysiwygEditor
              value={controlledValue}
              onChange={setControlledValue}
            />
            <button
              onClick={handleSave}
              disabled={saving}
              className={`save-button ${saving ? 'saving' : ''}`}
            >
              {saving ? (
                <>
                  <span className='save-spinner'></span>
                  Saving...
                </>
              ) : (
                'Save'
              )}
            </button>
            {savedValue && (
              <div className='save-success'>
                <span className='success-icon'>✓</span>
                Content saved successfully!
              </div>
            )}
          </>
        )}
      </div>

      <div className='editor-section'>
        <h3>Uncontrolled Editor</h3>
        <WysiwygEditor />
      </div>
    </div>
  );
};

export default EditorDemo;
