import React, { useState } from 'react';

export default function SearchPanel({ onSearch }) {
  const [clientId, setClientId] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!clientId.trim()) return;
    onSearch(clientId.trim());
  };

  return (
    <section className="search-panel search-panel--simple">
      <form className="search-panel__form" onSubmit={handleSearch}>
        <div className="field field--stretch">
          <label htmlFor="clientIdInput">ID клиента</label>
          <input
            id="clientIdInput"
            type="text"
            placeholder="Введите ID клиента"
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
