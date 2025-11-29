import React, { useState } from 'react';

function ShapItem({ item, isExpanded, onToggle }) {
  const positive = item.impact >= 0;
  const impactPercent = Math.round(Math.abs(item.impact) * 100);
  
  return (
    <div className={`shap-item ${isExpanded ? 'expanded' : ''}`} onClick={onToggle}>
      <div className="shap-head">
        <div className={`shap-impact-pill ${positive ? 'positive' : 'negative'}`}>
          {positive ? "+" : "-"}{impactPercent}%
        </div>
        <div className="shap-title-block">
          <div className="shap-name">{item.feature_name}</div>
          <div className="shap-desc-short">{item.explanation}</div>
        </div>
        <div className="shap-chevron">›</div>
      </div>
      {isExpanded && (
        <div className="shap-chart" style={{display: 'flex'}}>
          <div className="shap-bar-track">
            <div
              className={`shap-bar ${positive ? 'positive' : ''}`}
              style={{width: `${Math.min(100, 20 + impactPercent)}%`}}
            ></div>
          </div>
          <div className="shap-details">
            <strong>Признак:</strong> {item.feature_code}<br/>
            {item.details}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShapExplanations({ shapFeatures }) {
  const [expandedIndex, setExpandedIndex] = useState(0);

  return (
    <article className="card">
      <header className="card-header">
        <div>
          <div className="card-title">
            <span className="accent-dot"></span>
            Факторы, влияющие на прогноз
          </div>
          <div className="card-subtitle">
            На основе признаков из витрины (salary, region, активность и др.)
          </div>
        </div>
        <div className="badge">
          SHAP &bull; Top&nbsp;5 факторов
        </div>
      </header>

      <div className="shap-list">
        {(!shapFeatures || shapFeatures.length === 0) ? (
          <div style={{padding:'12px', fontSize:'12px', color:'var(--text-muted)'}}>
            Нет данных о факторах.
          </div>
        ) : (
          shapFeatures.map((item, index) => (
            <ShapItem 
              key={index} 
              item={item} 
              isExpanded={index === expandedIndex}
              onToggle={() => setExpandedIndex(index === expandedIndex ? -1 : index)}
            />
          ))
        )}
      </div>
    </article>
  );
}

