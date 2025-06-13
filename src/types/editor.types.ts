export type WysiwygEditorProps = {
  value?: string;
  onChange?: (value: string) => void;
  renderToolbar?: (onToggle: (style: string) => void) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};
