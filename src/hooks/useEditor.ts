import { useState, useEffect, useCallback } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';

export const useEditor = (
  value?: string,
  onChange?: (value: string) => void
) => {
  const [editorState, setEditorState] = useState<EditorState>(() => {
    if (value) {
      try {
        const parsed = JSON.parse(value);
        const content = convertFromRaw(parsed);
        return EditorState.createWithContent(content);
      } catch {
        return EditorState.createEmpty();
      }
    }
    return EditorState.createEmpty();
  });

  const updateState = useCallback(
    (newState: EditorState) => {
      setEditorState(newState);

      if (onChange) {
        const content = newState.getCurrentContent();
        const raw = convertToRaw(content);
        onChange(JSON.stringify(raw));
      }
    },
    [onChange]
  );

  useEffect(() => {
    if (!value) return;

    try {
      const parsed = JSON.parse(value);
      const content = convertFromRaw(parsed);
      const newState = EditorState.createWithContent(content);

      const withSelection = EditorState.forceSelection(
        newState,
        editorState.getSelection()
      );

      setEditorState(withSelection);
    } catch (e) {
      console.warn('Invalid content in useEffect:', e);
    }
  }, [value]);

  return { editorState, updateState };
};
