import React from 'react';
import { Editor, EditorState } from 'draft-js';

import 'draft-js/dist/Draft.css';

const WysiwygEditor: React.FC = () => {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px' }}>
      <Editor editorState={editorState} onChange={setEditorState} />
    </div>
  );
};

export default WysiwygEditor;
