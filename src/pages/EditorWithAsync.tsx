import React, { useEffect, useState } from 'react';
import WysiwygEditor from '../components/WysiwygEditor';
import './DemoPage.css';

const fakeFetch = () =>
  new Promise<string>((resolve) => {
    setTimeout(() => {
      const initialRaw = JSON.stringify({
        blocks: [
          {
            text: 'Welcome to the async-loaded editor!',
            key: 'init1',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
        ],
        entityMap: {},
      });
      resolve(initialRaw);
    }, 1200);
  });

const fakeSave = (data: string) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

const EditorWithAsync = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editorContent, setEditorContent] = useState<string>();

  useEffect(() => {
    fakeFetch().then((data) => {
      setEditorContent(data);
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    if (!editorContent) return;

    setSaving(true);
    setSaved(false);

    await fakeSave(editorContent);

    setSaving(false);
    setSaved(true);

    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className='async-editor-container'>
      <h2 className='async-editor-title'>Editor with Async Load + Save</h2>

      {loading ? (
        <p className='async-editor-loading'>Loading editor...</p>
      ) : (
        <>
          <WysiwygEditor value={editorContent} onChange={setEditorContent} />
          <div className='async-editor-actions'>
            <button
              onClick={handleSave}
              disabled={saving}
              className='async-save-button'
            >
              {saving ? 'Saving...' : 'Save'}
            </button>

            {saved && (
              <span className='async-save-success'>
                <span className='success-icon'>✓</span>
                Saved!
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default EditorWithAsync;
