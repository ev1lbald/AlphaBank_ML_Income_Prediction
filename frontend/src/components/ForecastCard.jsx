import React from 'react';

export default function ForecastCard({ client, prediction }) {
  if (!client || !prediction) {
    return (
      <article className="card" id="forecastCard">
        <header className="card-header">
          <div>
            <div className="card-title">
              <span className="accent-dot"></span>
              Прогноз дохода
            </div>
            <div className="card-subtitle">
              ID клиента не выбран
            </div>
          </div>
          <div className="badge">
            Модель: demo / v0.1
          </div>
        </header>
        <div className="forecast-main" style={{justifyContent: 'center', padding: '20px 0'}}>
           <div className="forecast-context" style={{textAlign: 'center'}}>
             Выберите клиента, чтобы увидеть прогноз.
           </div>
        </div>
      </article>
    );
  }

  const fillWidth = Math.max(18, Math.min(96, (prediction.vs_segment || 0.5) * 100));

  return (
    <article className="card" id="forecastCard">
      <header className="card-header">
        <div>
          <div className="card-title">
            <span className="accent-dot"></span>
            Прогноз дохода
          </div>
          <div className="card-subtitle">
            ID {client.id}
          </div>
        </div>
      </header>

      <div className="forecast-main">
        <div className="forecast-figure">
          <div className="chip">
            <span className="chip-label">Прогноз на горизонте</span>
            <span className="chip-value">
              {prediction.horizon}
            </span>
          </div>
          <div className="forecast-value">
            {prediction.value}
          </div>
          <div className="forecast-chip-row">
            <div className="chip">
              <span className="chip-label">Доверие модели</span>
              <span className="chip-value neutral">
                {prediction.confidence}
              </span>
            </div>
          </div>
        </div>

        <div className="forecast-context">
          <div>
            <strong>Комментарий модели:</strong> {prediction.comment}
          </div>
          <div className="forecast-bars">
            <div style={{flex: 1}}>
              <div className="spark-bar">
                <div
                  className="spark-bar-fill"
                  style={{width: `${fillWidth}%`}}
                ></div>
              </div>
              <div className="spark-bar-label">
                Прогноз клиента относительно среднего по сегменту
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

