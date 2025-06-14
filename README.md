# 📝 WYSIWYG Editor Component (React + Draft.js)

A lightweight, extensible WYSIWYG editor built with React and Draft.js, supporting both controlled and uncontrolled modes.

## 🚀 Features

- ✅ Controlled & Uncontrolled modes
- 🎨 Text formatting: Bold, Italic, Underline
- 🖌️ Text & Background colors (no 3rd-party libraries)
- 🧪 Unit tests (no 3rd-party testing libraries required)
- 🧹 Custom toolbar support
- 🦼 Clean UI & accessible ARIA labels
- 🛠️ Fully customizable via props

## 📦 Project Structure

```
src/
├── components/
│   ├── WysiwygEditor/
│   │   ├── WysiwygEditor.tsx
│   │   └── index.ts
│   └── Toolbar/
│       ├── Toolbar.tsx
│       ├── Toolbar.css
│       ├── Toolbar.types.ts
│       └── Toolbar.test.ts
├── hooks/
│   └── useEditor.ts
├── types/
│   └── editor.types.ts
├── utils/
│   └── editorUtils.ts
├── constants/
│   └── inlineStyles.ts
├── pages/
│   ├── DemoPage.tsx         # Controlled + uncontrolled demo
│   └── EditorWithAsync.tsx  # Async fetch + save demo
└── App.tsx
```

## 🧑‍💻 Usage

### Controlled Mode

```jsx
<WysiwygEditor value={editorContent} onChange={setEditorContent} />
```

### Uncontrolled Mode

```jsx
<WysiwygEditor />
```

## 🧪 Running Tests

```bash
npm test
```

Tests are written using Jest with no external testing libraries (e.g., Testing Library is not required).

## 🛠️ Custom Toolbar

You can inject your own toolbar:

```jsx
<WysiwygEditor
  renderToolbar={(onToggle) => <MyCustomToolbar onToggle={onToggle} />}
/>
```

## 📄 Styling

### Default inline styles:

- BOLD, ITALIC, UNDERLINE

### Text colors:

- RED, GREEN, BLUE

### Background colors:

- YELLOW_BG, CYAN_BG, ORANGE_BG, PINK_BG, GRAY_BG, PURPLE_BG

## 📋 Requirements

- React 18+
- Draft.js (only third-party lib used)

## 📌 Notes

- No third-party UI libraries (e.g., Material UI) are used
- No third-party formatting libraries or color pickers
- Toolbar and editor are fully accessible and testable

## 📷 Preview

Demo includes:

- Controlled editor with Save button
- Uncontrolled editor
- Async fetch & save behavior simulation

## ✅ Author

Built with ❤️ by Mariam M. Farouk
