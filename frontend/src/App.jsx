import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import SearchPanel from './components/SearchPanel';
import ForecastCard from './components/ForecastCard';
import ShapExplanations from './components/ShapExplanations';
import Recommendations from './components/Recommendations';
import MetricsWidget from './components/MetricsWidget';
import Toast from './components/Toast';

import './index.css';

// API URL relative for production/docker networking
const API_URL = '/api';

function App() {
  const [clientData, setClientData] = useState(null);
  const [metrics, setMetrics] = useState([]);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch metrics on mount
  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const res = await axios.get(`${API_URL}/metrics`);
      setMetrics(res.data);
    } catch (err) {
      console.error("Failed to fetch metrics", err);
    }
  };

  const handleSearch = async (clientId) => {
    if (!clientId) {
      showToast("Введите ID клиента", "error");
      return;
    }

    setLoading(true);
    try {
      // First try to get the client from DB
      try {
        const res = await axios.get(`${API_URL}/clients/${clientId}`);
        setClientData(res.data);
        showToast(`Загружены данные клиента ${res.data.full_name}`, "ok");
        
        // Also trigger a prediction update (using the static logic in backend now)
        const predRes = await axios.post(`${API_URL}/predict/${clientId}`, {
            // No filters passed anymore
        });
        
        setClientData(prev => ({
            ...prev,
            prediction: predRes.data
        }));

      } catch (err) {
        if (err.response && err.response.status === 404) {
           showToast(`Клиент с ID ${clientId} не найден`, "error");
           setClientData(null);
        } else {
           throw err;
        }
      }

    } catch (err) {
      console.error(err);
      showToast("Ошибка при загрузке данных", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setClientData(null);
    showToast("Сброшено", "ok");
  };

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  return (
    <div className="app-shell">
      <Header />
      
      {/* Removed onReset prop since filters are gone, only passing search handler */}
      <SearchPanel onSearch={handleSearch} />

      <main className="layout">
        <section className="col">
          <ForecastCard 
            client={clientData} 
            prediction={clientData?.prediction} 
          />
          <ShapExplanations shapFeatures={clientData?.prediction?.shap_features} />
        </section>

        <section className="col">
          <Recommendations recommendations={clientData?.recommendations} />
          <MetricsWidget metrics={metrics} />
        </section>
      </main>

      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
}

export default App;
