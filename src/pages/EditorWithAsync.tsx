import React, { useEffect, useState } from 'react';
import WysiwygEditor from '../components/WysiwygEditor';

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
    console.log('💾 Saving content to server...', data);
    setTimeout(() => {
      console.log('✅ Saved!');
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

    setTimeout(() => setSaved(false), 2000); // hide after 2s
  };

  return (
    <div style={{ padding: 32 }}>
      <h2>Editor with Async Load + Save</h2>

      {loading ? (
        <p>Loading editor...</p>
      ) : (
        <>
          <WysiwygEditor value={editorContent} onChange={setEditorContent} />
          <div style={{ marginTop: 16 }}>
            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                padding: '8px 16px',
                fontWeight: 'bold',
                cursor: saving ? 'not-allowed' : 'pointer',
                background: saving ? '#ccc' : '#2d79f3',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
              }}
            >
              {saving ? 'Saving...' : 'Save'}
            </button>

            {saved && (
              <span style={{ marginLeft: 12, color: 'green', fontWeight: 500 }}>
                ✅ Saved!
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default EditorWithAsync;
