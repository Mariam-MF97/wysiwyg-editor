import { useState, useEffect } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';

export const useEditor = (
  value?: string,
  onChange?: (value: string) => void
) => {
  const [editorState, setEditorState] = useState(() =>
    value
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(value)))
      : EditorState.createEmpty()
  );

  useEffect(() => {
    if (value && onChange) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(value)))
      );
    }
  }, [value]);

  const updateState = (state: EditorState) => {
    setEditorState(state);
    if (onChange) {
      const content = JSON.stringify(convertToRaw(state.getCurrentContent()));
      onChange(content);
    }
  };

  return { editorState, updateState };
};
