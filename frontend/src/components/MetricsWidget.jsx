import React from 'react';

export default function MetricsWidget({ metrics }) {
  const defaultMetrics = [
      {name: "MAE", value: "—", trend: "—", description: "ошибка прогноза"},
      {name: "R2", value: "—", trend: "—", description: "точность"},
      {name: "Success", value: "—", trend: "—", description: "конверсия"},
      {name: "Coverage", value: "—", trend: "—", description: "охват"}
  ];
  
  const displayMetrics = (metrics && metrics.length > 0) ? metrics : defaultMetrics;

  return (
    <article className="card">
      <header className="card-header">
        <div>
          <div className="card-title">
            <span className="accent-dot"></span>
            Качество модели и витрины
          </div>
          <div className="card-subtitle">
            Мониторинг в реальном времени по последним расчётам
          </div>
        </div>
        <div className="badge">
          Обновлено: сейчас
        </div>
      </header>

      <div className="metrics-grid">
        {displayMetrics.map((m, i) => (
            <div className="metric-card" key={i}>
              <div className="metric-label">{m.name}</div>
              <div className="metric-value-row">
                <div className="metric-value">{m.value}</div>
                <div className="metric-trend">{m.trend}</div>
              </div>
              <div className="mini-spark">
                 {m.description}
              </div>
            </div>
        ))}
      </div>
    </article>
  );
}

