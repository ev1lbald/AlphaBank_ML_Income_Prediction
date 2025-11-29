import React from 'react';

export default function Header({ user }) {
  return (
    <header className="app-header">
      <div className="header-main-row">
        <div className="logo">
          {/* New Alfa A Logo */}
          <div className="logo-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{overflow: 'visible'}}>
              <path d="M16 4L4 28H10L16 16L22 28H28L16 4Z" fill="#FF0000"/>
              <rect x="7" y="22" width="18" height="4" fill="#FF0000"/>
            </svg>
          </div>
          <div className="logo-text">
            <span>Альфа Банк</span>
            <span>Прогноз дохода клиента</span>
          </div>
        </div>
        
        {user && (
          <div className="header-user">
            <div className="user-avatar">ИП</div>
            <div style={{textAlign:'left'}}>
              <div style={{fontWeight: 600, fontSize: '14px'}}>{user.name}</div>
              <div style={{fontSize: '12px', color: 'var(--text-muted)'}}>Сотрудник маркетинга</div>
              <div style={{fontSize: '11px', color: 'var(--text-soft)'}}>{user.email}</div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
