import React from 'react';

export default function Recommendations({ recommendations }) {
  const { products = [], advice = [], response_score } = recommendations || {};

  const formatPercent = (val) => {
      if(val === undefined || val === null) return "—";
      return `${Math.round(val * 100)}%`;
  }

  return (
    <article className="card">
      <header className="card-header">
        <div>
          <div className="card-title">
            <span className="accent-dot"></span>
            Персональные рекомендации
          </div>
          <div className="card-subtitle">
            Продукты и финансовые действия под профиль клиента
          </div>
        </div>
        <div className="badge">
          Вероятность отклика: {formatPercent(response_score)}
        </div>
      </header>

      <div className="rec-columns">
        <div className="rec-block">
          <div className="rec-block-title">
            Продукты
            <span className="rec-badge">Автогенерация</span>
          </div>
          <ul className="rec-list">
            {products.map((p, i) => (
              <li key={i}>
                <strong>{p.name}</strong>
                <span className="rec-tagline">{p.tagline}</span>
                <div className="rec-meta">
                  {(p.meta || []).map((m, j) => <span key={j}>{m}</span>)}
                </div>
              </li>
            ))}
            {products.length === 0 && <li>Нет рекомендаций</li>}
          </ul>
        </div>

        <div className="rec-block">
          <div className="rec-block-title">
            Финансовые рекомендации
            <span className="rec-badge">Advisory</span>
          </div>
          <ul className="rec-list">
            {advice.map((a, i) => (
               <li key={i}>
                <strong>{a.title}</strong>
                <span className="rec-tagline">{a.tagline}</span>
                <div className="rec-meta">
                  {(a.meta || []).map((m, j) => <span key={j}>{m}</span>)}
                </div>
              </li>
            ))}
             {advice.length === 0 && <li>Нет советов</li>}
          </ul>
        </div>
      </div>
    </article>
  );
}

