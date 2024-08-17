import React, { useEffect } from 'react';

const PreventInspect = () => {
  const handleKeyDown = (event) => {
    if (
      (event.ctrlKey && event.shiftKey && event.key === 'I') ||
      (event.ctrlKey && event.shiftKey && event.key === 'J') ||
      (event.ctrlKey && event.shiftKey && event.key === 'C') ||
      (event.ctrlKey && event.shiftKey && event.key === 'K') ||
      (event.ctrlKey && event.shiftKey && event.key === 'P') ||
      (event.ctrlKey && event.shiftKey && event.key === 'M') ||
      (event.ctrlKey && event.shiftKey && event.key === 'E') ||
      (event.ctrlKey && event.key === 'u')
    ) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const handleKeyDownEvent = (event) => handleKeyDown(event);

    document.addEventListener('keydown', handleKeyDownEvent);
    window.addEventListener('contextmenu', handleContextMenu);

    // Cleanup functions
    return () => {
      document.removeEventListener('keydown', handleKeyDownEvent);
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return <div></div>;
};

export default PreventInspect;
