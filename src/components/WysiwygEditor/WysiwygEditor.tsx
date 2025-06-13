import React from 'react';
import { Editor } from 'draft-js';
import { useEditor } from '../../hooks/useEditor';
import { WysiwygEditorProps } from '../../types/editor.types';
import { toggleInlineStyle } from '../../utils/editorUtils';

import 'draft-js/dist/Draft.css';

const WysiwygEditor: React.FC<WysiwygEditorProps> = ({
  value,
  onChange,
  renderToolbar,
  className,
  style,
}) => {
  const { editorState, updateState } = useEditor(value, onChange);

  const handleToggleStyle = (style: string) => {
    updateState(toggleInlineStyle(editorState, style));
  };

  return (
    <div
      className={className}
      style={{ border: '1px solid #ccc', padding: '10px', ...style }}
    >
      {renderToolbar?.(handleToggleStyle)}
      <Editor editorState={editorState} onChange={updateState} />
    </div>
  );
};

export default WysiwygEditor;
