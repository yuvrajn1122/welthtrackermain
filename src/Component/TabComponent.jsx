import React, { useState } from 'react';

const TabComponent = () => {
  const [isTabEnabled, setIsTabEnabled] = useState(true);

  const enableTab = () => {
    setIsTabEnabled(true);
  };

  const disableTab = () => {
    setIsTabEnabled(false);
  };

  return (
    <div>
      <div className="tab" style={{ pointerEvents: isTabEnabled ? 'auto' : 'none', opacity: isTabEnabled ? 1 : 0.5 }}>
        {isTabEnabled ? 'Tab is Enabled' : 'Tab is Disabled'}
      </div>
      <button onClick={enableTab}>Enable Tab</button>
      <button onClick={disableTab}>Disable Tab</button>
    </div>
  );
};

export default TabComponent;
