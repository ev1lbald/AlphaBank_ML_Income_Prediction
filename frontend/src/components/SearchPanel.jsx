import React, { useState } from 'react';

export default function SearchPanel({ onSearch }) {
  const [clientId, setClientId] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!clientId.trim()) return;
    onSearch(clientId.trim());
  };

  return (
    <form className="search-panel-form-simple" onSubmit={handleSearch}>
      <input
        id="clientIdInput"
        type="text"
        placeholder="ID КЛИЕНТА"
        autoComplete="off"
        value={clientId}
        onChange={(e) => setClientId(e.target.value)}
        className="search-input"
      />
      <button className="btn btn-primary search-btn" type="submit">
        НАЙТИ
      </button>
    </form>
  );
}
