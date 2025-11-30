import React from 'react';

export default function MetricsWidget({ metrics }) {
  // Find MAE metric from the metrics array, or use default
  const defaultMAE = {name: "MAE", value: "8 500 ₽", trend: "-4%", description: "Ошибка прогноза"};
  
  let maeMetric = defaultMAE;
  if (metrics && metrics.length > 0) {
    const foundMAE = metrics.find(m => m.name === "MAE");
    if (foundMAE) {
      maeMetric = foundMAE;
    }
  }

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

      <div className="metric-card-full">
        <div className="metric-label">{maeMetric.name}</div>
        <div className="metric-value-row">
          <div className="metric-value">{maeMetric.value}</div>
          <div className="metric-trend">{maeMetric.trend}</div>
        </div>
        <div className="mini-spark">
          {maeMetric.description}
        </div>
      </div>
    </article>
  );
}

