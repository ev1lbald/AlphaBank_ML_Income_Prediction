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
          </div>
          <div className="rec-list rec-list--placeholder">
            <strong className="rec-placeholder">В РАЗРАБОТКЕ</strong>
          </div>
        </div>

        <div className="rec-block">
          <div className="rec-block-title">
            Финансовые рекомендации
          </div>
          <div className="rec-list rec-list--placeholder">
            <strong className="rec-placeholder">В РАЗРАБОТКЕ</strong>
          </div>
        </div>
      </div>
    </article>
  );
}

