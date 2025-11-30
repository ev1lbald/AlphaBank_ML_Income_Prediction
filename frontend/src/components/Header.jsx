import React from 'react';

export default function Header({ user }) {
  const defaultUser = {
    name: 'Иван Петров',
    email: 'ivanpetrov@alfabank.ru',
    role: 'Сотрудник маркетинга',
    initials: 'ИП'
  };
  
  const displayUser = user || defaultUser;

  return (
    <header className="app-header">
      <div className="header-main-row">
        <div className="logo">
          {/* New Alfa A Logo */}
          <div className="logo-icon" style={{width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{overflow: 'visible'}}>
              <path d="M16 4L4 28H10L16 16L22 28H28L16 4Z" fill="#FF0000"/>
              <rect x="7" y="22" width="18" height="4" fill="#FF0000"/>
            </svg>
          </div>
          <div className="logo-text">
            <span>Альфа Банк</span>
            <span>Прогноз дохода клиента</span>
          </div>
        </div>
        
        <div className="header-user">
          <div className="user-avatar">{displayUser.initials}</div>
          <div className="user-info">
            <div className="user-name">{displayUser.name}</div>
            <div className="user-role">{displayUser.role}</div>
            <div className="user-email">{displayUser.email}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
