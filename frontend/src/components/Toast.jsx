import React, { useEffect } from 'react';

export default function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`status-toast visible ${type === 'ok' ? 'ok' : ''}`}>
      <div className="status-dot"></div>
      <span>{message}</span>
    </div>
  );
}

