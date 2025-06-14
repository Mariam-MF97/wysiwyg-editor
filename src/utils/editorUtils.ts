import { EditorState, Modifier, RichUtils } from 'draft-js';

export const toggleInlineStyle = (
  editorState: EditorState,
  style: string
): EditorState => {
  const selection = editorState.getSelection();

  const COLOR_STYLES = ['RED', 'GREEN', 'BLUE'];
  const BG_COLOR_STYLES = [
    'YELLOW_BG',
    'CYAN_BG',
    'ORANGE_BG',
    'PINK_BG',
    'GRAY_BG',
    'PURPLE_BG',
  ];

  if (!COLOR_STYLES.includes(style) && !BG_COLOR_STYLES.includes(style)) {
    return RichUtils.toggleInlineStyle(editorState, style);
  }

  if (selection.isCollapsed()) {
    return editorState;
  }

  const contentState = editorState.getCurrentContent();
  let nextContent = contentState;

  const removeStyles = (styles: string[]) => {
    styles.forEach((s) => {
      nextContent = Modifier.removeInlineStyle(nextContent, selection, s);
    });
  };

  if (COLOR_STYLES.includes(style)) {
    removeStyles(COLOR_STYLES);
  } else if (BG_COLOR_STYLES.includes(style)) {
    removeStyles(BG_COLOR_STYLES);
  }

  nextContent = Modifier.applyInlineStyle(nextContent, selection, style);

  return EditorState.push(editorState, nextContent, 'change-inline-style');
};

export const CUSTOM_STYLE_MAP = {
  RED: { color: 'red' },
  GREEN: { color: 'green' },
  BLUE: { color: 'blue' },
  YELLOW_BG: { backgroundColor: 'yellow' },
  CYAN_BG: { backgroundColor: 'cyan' },
  ORANGE_BG: { backgroundColor: 'orange' },
  PINK_BG: { backgroundColor: 'pink' },
  GRAY_BG: { backgroundColor: '#ccc' },
  PURPLE_BG: { backgroundColor: 'plum' },
};
