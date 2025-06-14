
import React, { useRef } from 'react';
import { Editor } from 'draft-js';
import { useEditor } from '../../hooks/useEditor';
import { toggleInlineStyle, CUSTOM_STYLE_MAP } from '../../utils/editorUtils';
import { WysiwygEditorProps } from '../../types/editor.types';
import Toolbar from '../Toolbar/Toolbar';

import 'draft-js/dist/Draft.css';

const WysiwygEditor: React.FC<WysiwygEditorProps> = ({
  value,
  onChange,
  renderToolbar,
  className,
  style,
}) => {
  const { editorState, updateState } = useEditor(value, onChange);
  const editorRef = useRef<Editor>(null);

  const handleToggleStyle = (style: string) => {
    updateState(toggleInlineStyle(editorState, style));
    editorRef.current?.focus();
  };

  const focusEditor = () => {
    editorRef.current?.focus();
  };

  return (
    <div
      className={className}
      style={{
        border: '1px solid #ccc',
        borderRadius: 4,
        padding: '10px',
        backgroundColor: '#fdfdfd',
        transition: 'border 0.2s ease',
        ...style,
      }}
    >
      {renderToolbar ? (
        renderToolbar(handleToggleStyle)
      ) : (
        <Toolbar onToggle={handleToggleStyle} onFocusEditor={focusEditor} />
      )}
      <div
        style={{
          minHeight: 150,
          padding: 8,
          backgroundColor: '#fff',
          cursor: 'text',
        }}
        onClick={focusEditor}
      >
        <Editor
          ref={editorRef}
          editorState={editorState}
          onChange={updateState}
          customStyleMap={CUSTOM_STYLE_MAP}
        />
      </div>
    </div>
  );
};

export default WysiwygEditor;
