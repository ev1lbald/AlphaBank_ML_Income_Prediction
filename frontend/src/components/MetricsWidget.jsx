import React from 'react';

export default function MetricsWidget({ metrics }) {
  // Find metrics from the metrics array, or use defaults
  const defaultMAE = {name: "WMAE", value: "47 475₽", trend: "-4%", description: "Ошибка прогноза"};
  const defaultQuantileLoss = {name: "Quantile Loss", value: "—", trend: "—", description: "Квантильная ошибка"};
  
  let maeMetric = defaultMAE;
  let quantileLossMetric = defaultQuantileLoss;
  
  if (metrics && metrics.length > 0) {
    const foundMAE = metrics.find(m => m.name === "MAE");
    if (foundMAE) {
      maeMetric = foundMAE;
    }
    const foundQuantileLoss = metrics.find(m => m.name === "Quantile Loss");
    if (foundQuantileLoss) {
      quantileLossMetric = foundQuantileLoss;
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

      <div className="metrics-grid-two">
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
        
        <div className="metric-card-full">
          <div className="metric-label">{quantileLossMetric.name}</div>
          <div className="metric-value-row">
            <div className="metric-value">{quantileLossMetric.value}</div>
            <div className="metric-trend">{quantileLossMetric.trend}</div>
          </div>
          <div className="mini-spark">
            {quantileLossMetric.description}
          </div>
        </div>
      </div>
    </article>
  );
}

