import { useState, useEffect, useCallback } from 'react';
import {
  EditorState,
  convertFromRaw,
  convertToRaw,
} from 'draft-js';

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
      } catch (e) {
        console.warn('Invalid content, falling back to empty', e);
      }
    }
    return EditorState.createEmpty();
  });

  const updateState = useCallback(
    (newState: EditorState) => {
      const selection = newState.getSelection();
      const content = newState.getCurrentContent();

      const nextState = EditorState.forceSelection(
        EditorState.createWithContent(content),
        selection
      );

      setEditorState(nextState);

      if (onChange) {
        const raw = convertToRaw(content);
        const stringified = JSON.stringify(raw);
        onChange(stringified);
      }
    },
    [onChange]
  );

  useEffect(() => {
    if (value) {
      try {
        const parsed = JSON.parse(value);
        const content = convertFromRaw(parsed);

        const selection = editorState.getSelection();
        const nextState = EditorState.forceSelection(
          EditorState.createWithContent(content),
          selection
        );

        setEditorState(nextState);
      } catch (e) {
        console.warn('Invalid content in effect, falling back to empty', e);
      }
    }
  }, [value, editorState.getSelection()]);

  return { editorState, updateState };
};
