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
          {/* <div className="badge">
            Модель: demo / v0.1
          </div> */}
        </header>
        <div className="forecast-main" style={{justifyContent: 'center', padding: '20px 0'}}>
           <div className="forecast-context" style={{textAlign: 'center'}}>
             Выберите клиента, чтобы увидеть прогноз.
           </div>
        </div>
      </article>
    );
  }

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
      </div>
    </article>
  );
}

