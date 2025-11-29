import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock validation
    if (email && password) {
      onLogin({ name: "Иван Петров", email });
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-title">Вход для сотрудников</div>
        
        <div className="login-field">
          <input 
            type="email" 
            placeholder="Корпоративная почта" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="login-field">
          <input 
            type="password" 
            placeholder="Пароль" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{width: '100%'}}>
          Войти
        </button>
      </form>
    </div>
  );
}

