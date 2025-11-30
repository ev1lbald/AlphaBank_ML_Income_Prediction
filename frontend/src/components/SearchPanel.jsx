import React, { useState } from 'react';

export default function SearchPanel({ onSearch }) {
  const [clientId, setClientId] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // We now pass only clientId, removing filters object completely
    onSearch(clientId);
  };

  return (
    <section className="search-panel">
      <form className="search-row" onSubmit={handleSearch} style={{width: '100%', maxWidth: '600px'}}>
        <div className="field">
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
