import React, { useState } from 'react';

export default function SearchPanel({ onSearch, onReset }) {
  const [clientId, setClientId] = useState('');
  const [selectedClient, setSelectedClient] = useState('');
  
  const [filters, setFilters] = useState({
    city: '',
    age: '',
    income: '',
    risk: ''
  });

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(clientId || selectedClient, filters);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const activeFilters = Object.values(filters).filter(Boolean);

  return (
    <section className="search-panel">
      <div className="search-row">
        <form className="search-form" onSubmit={handleSearch}>
          <div className="field">
            <label htmlFor="clientIdInput">ID клиента</label>
            <input
              id="clientIdInput"
              type="text"
              placeholder="Например, 102781"
              autoComplete="off"
              value={clientId}
              onChange={(e) => {
                setClientId(e.target.value);
                setSelectedClient(e.target.value);
              }}
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Найти
          </button>
        </form>

        <div className="client-select">
          <select 
            id="clientSelect" 
            value={selectedClient}
            onChange={(e) => {
              setSelectedClient(e.target.value);
              setClientId(e.target.value);
            }}
          >
            <option value="">Выбрать клиента из списка</option>
            <option value="10001">10001 — Иван Петров</option>
            <option value="10002">10002 — Мария Смирнова</option>
            <option value="10003">10003 — Алексей Иванов</option>
            <option value="10004">10004 — Ольга Кузнецова</option>
          </select>
        </div>

        <button 
          className="btn btn-ghost" 
          type="button" 
          onClick={() => {
            setClientId('');
            setSelectedClient('');
            setFilters({ city: '', age: '', income: '', risk: '' });
            onReset();
          }}
        >
          Сбросить фильтры
        </button>
      </div>

      <div className="filters-row">
        <div className="filters-group">
          <div className="filter-pill">
            <span>Город</span>
            <select 
              value={filters.city}
              onChange={(e) => handleFilterChange('city', e.target.value)}
            >
              <option value="">Все</option>
              <option value="Москва">Москва</option>
              <option value="Санкт-Петербург">Санкт-Петербург</option>
              <option value="Новосибирск">Новосибирск</option>
              <option value="Другие">Другие</option>
            </select>
          </div>
          <div className="filter-pill">
            <span>Возраст</span>
            <select
               value={filters.age}
               onChange={(e) => handleFilterChange('age', e.target.value)}
            >
              <option value="">Все</option>
              <option value="18-25">18–25</option>
              <option value="26-35">26–35</option>
              <option value="36-45">36–45</option>
              <option value="46+">46+</option>
            </select>
          </div>
          <div className="filter-pill">
            <span>Доход</span>
            <select
              value={filters.income}
              onChange={(e) => handleFilterChange('income', e.target.value)}
            >
              <option value="">Все</option>
              <option value="Низкий">Низкий</option>
              <option value="Средний">Средний</option>
              <option value="Высокий">Высокий</option>
              <option value="Премиум">Премиум</option>
            </select>
          </div>
          <div className="filter-pill">
            <span>Риск</span>
            <select
              value={filters.risk}
              onChange={(e) => handleFilterChange('risk', e.target.value)}
            >
              <option value="">Все</option>
              <option value="Низкий">Низкий</option>
              <option value="Средний">Средний</option>
              <option value="Высокий">Высокий</option>
            </select>
          </div>
        </div>

        <div className="applied-filters">
          Активные фильтры: <strong>{activeFilters.length > 0 ? Object.values(filters).filter(Boolean).join(', ') : 'нет'}</strong>
        </div>
      </div>
    </section>
  );
}

