import React, { useState } from 'react';
import WysiwygEditor from './components/WysiwygEditor';

const App = () => {

  const [controlledValue, setControlledValue] = useState<string | undefined>();

  return (
    <div style={{ padding: 20 }}>
      <h2>Controlled Editor</h2>
      <WysiwygEditor value={controlledValue} onChange={setControlledValue} />

      <h2 style={{ marginTop: 40 }}>Uncontrolled Editor</h2>
      <WysiwygEditor />
    </div>
  );
};

export default App;
