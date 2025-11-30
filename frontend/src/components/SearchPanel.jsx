import React, { useState } from 'react';

export default function SearchPanel({ onSearch }) {
  const [clientId, setClientId] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(clientId);
  };

  return (
    <section className="search-panel">
      <form className="search-row" onSubmit={handleSearch}>
        <div className="field">
          <label htmlFor="clientIdInput">ID клиента</label>
          <input
            id="clientIdInput"
            type="text"
            placeholder="Например, 102781"
            autoComplete="off"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Найти
        </button>
      </form>
    </section>
  );
}
