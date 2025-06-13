import { EditorState, RichUtils } from 'draft-js';

export const toggleInlineStyle = (
  editorState: EditorState,
  style: string
): EditorState => {
  return RichUtils.toggleInlineStyle(editorState, style);
};
