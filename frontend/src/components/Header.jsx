import React from 'react';

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-main-row">
        <div className="logo">
          <div className="logo-mark"></div>
          <div className="logo-text">
            <span>Альфа-Банк</span>
            <span>Прогноз дохода клиента</span>
          </div>
        </div>
        <div className="header-user">
          <div className="user-circle">АБ</div>
          <div>
            <div>Сотрудник фронт-офиса</div>
            <div style={{fontSize: '11px', color: 'var(--text-soft)'}}>
              demo@alfabank.ru
            </div>
          </div>
        </div>
      </div>
      <div className="header-subtitle">
        Введите ID клиента или выберите его из списка, примените фильтры и
        получите прогноз дохода, объяснение и персональные рекомендации.
      </div>
    </header>
  );
}

