// ==== Demo данные по клиентам ====
const mockClients = {
  "10001": {
    id: "10001",
    name: "Иван Петров",
    segment: "Массовый — стабильный доход",
    city: "Москва",
    age: 32,
    incomeCategory: "Средний",
    risk: "Низкий",
    forecast: {
      value: "145 000 ₽/мес",
      growth: "+18% за год",
      horizon: "12 месяцев",
      confidence: "0.93",
      vsSegment: 0.68,
      text:
        "Доход клиента растёт быстрее среднего по сегменту. Основные драйверы — рост зарплаты и регулярный оборот по картам."
    },
    shap: [
      {
        feature: "salary_6to12m_avg",
        name: "Уровень зарплаты за 6–12 месяцев",
        impact: 0.32,
        explanation:
          "Высокая средняя зарплата за последние 6–12 месяцев существенно увеличивает прогнозируемый доход.",
        details:
          "Согласно витрине, рост официальной зарплаты клиента на ~25% за последний год даёт +32% вклада в итоговый прогноз."
      },
      {
        feature: "profit_income_out_rur_amt_12m",
        name: "Операционный доход за 12 месяцев",
        impact: 0.21,
        explanation:
          "Стабильный операционный доход по продуктам банка подтягивает прогноз вверх.",
        details:
          "Низкая волатильность входящих оборотов и отсутствие просрочек повышают доверие модели к текущему уровню дохода."
      },
      {
        feature: "city_smart_name",
        name: "Регион и город клиента",
        impact: 0.12,
        explanation:
          "Проживание в регионе с высоким среднедушевым доходом позитивно влияет на прогноз.",
        details:
          "Москва и крупные города-миллионники показывают более высокий потолок дохода в своей когорте."
      },
      {
        feature: "age",
        name: "Возраст",
        impact: -0.06,
        explanation:
          "Возраст близок к среднему по сегменту, эффект умеренный и слегка сдерживает рост.",
        details:
          "Для молодых клиентов 25–30 лет модель ожидает более быстрый рост дохода при прочих равных."
      },
      {
        feature: "cntRegionTripsWavg1m",
        name: "Мобильность и поездки между регионами",
        impact: 0.07,
        explanation:
          "Командировки и частые поездки коррелируют с более высоким доходом.",
        details:
          "Регулярные поездки в деловые центры повышают вероятность роста дохода."
      }
    ],
    recommendations: {
      products: [
        {
          name: "Премиальная дебетовая карта",
          tagline: "Кэшбэк за траты и повышенный процент на остаток.",
          meta: ["Вероятность отклика: 78%", "Цель: удержание"]
        },
        {
          name: "Инвестиционный счёт",
          tagline: "Перевести часть накоплений в консервативные инструменты.",
          meta: ["Профиль риска: низкий", "Горизонт: 3+ года"]
        }
      ],
      advice: [
        {
          title: "Создать резервный фонд",
          tagline:
            "Отложить 3–6 ежемесячных доходов на отдельный счёт с процентом.",
          meta: ["Снижение риска", "Повышение устойчивости"]
        },
        {
          title: "Оптимизировать кредитную нагрузку",
          tagline:
            "Рефинансировать потребкредит под более низкую ставку и ускорить погашение.",
          meta: ["Сокращение переплаты", "Улучшение скоринга"]
        }
      ],
      responseScore: "0.74"
    }
  },
  "10002": {
    id: "10002",
    name: "Мария Смирнова",
    segment: "Премиум — высокий доход",
    city: "Санкт-Петербург",
    age: 41,
    incomeCategory: "Высокий",
    risk: "Низкий",
    forecast: {
      value: "310 000 ₽/мес",
      growth: "+9% за год",
      horizon: "12 месяцев",
      confidence: "0.89",
      vsSegment: 0.83,
      text:
        "Доход клиента выше 80% премиум-сегмента, ожидается плавный рост."
    },
    shap: [
      {
        feature: "salary_6to12m_avg",
        name: "Уровень зарплаты за 6–12 месяцев",
        impact: 0.26,
        explanation:
          "Стабильная высокая зарплата задаёт основной уровень прогнозируемого дохода.",
        details:
          "Незначительные колебания бонусов, при этом базовая ставка растёт."
      },
      {
        feature: "profit_income_out_rur_amt_9m",
        name: "Инвестиционный доход",
        impact: 0.18,
        explanation:
          "Регулярные поступления от инвестиций заметно увеличивают прогноз.",
        details:
          "Портфель сбалансирован, высокая доля облигаций снижает риск."
      },
      {
        feature: "per_capita_income_rur_amt",
        name: "Доход в регионе проживания",
        impact: 0.09,
        explanation:
          "Регион с высоким среднедушевым доходом поддерживает текущий уровень.",
        details:
          "Санкт-Петербург показывает прогнозируемый рост по рынку труда."
      },
      {
        feature: "age",
        name: "Возраст",
        impact: 0.05,
        explanation:
          "Пик карьеры — возраст положительно влияет на ожидаемый доход.",
        details:
          "Для клиентов 35–45 лет модель ожидает плато и плавный рост."
      }
    ],
    recommendations: {
      products: [
        {
          name: "Private Banking обслуживание",
          tagline: "Персональный менеджер и индивидуальные решения.",
          meta: ["LTV рост", "Кросс-селл"]
        },
        {
          name: "Страхование жизни и здоровья",
          tagline:
            "Защитить будущий доход и семью от финансовых рисков.",
          meta: ["Риск-менеджмент", "Комплексное решение"]
        }
      ],
      advice: [
        {
          title: "Диверсифицировать инвестиционный портфель",
          tagline:
            "Снизить долю концентрированных позиций и добавить защитные активы.",
          meta: ["Снижение волатильности", "Сохранение доходности"]
        }
      ],
      responseScore: "0.81"
    }
  },
  "10003": {
    id: "10003",
    name: "Алексей Иванов",
    segment: "Развивающийся сегмент",
    city: "Новосибирск",
    age: 27,
    incomeCategory: "Средний",
    risk: "Средний",
    forecast: {
      value: "92 000 ₽/мес",
      growth: "+24% за год",
      horizon: "12 месяцев",
      confidence: "0.87",
      vsSegment: 0.61,
      text:
        "Молодой клиент с потенциалом роста дохода за счёт карьерного роста."
    },
    shap: [
      {
        feature: "salary_6to12m_avg",
        name: "Рост зарплаты",
        impact: 0.29,
        explanation:
          "Недавнее повышение оклада значительно влияет на прогноз.",
        details:
          "Модель видит резкий скачок за последние 3 месяца и экстраполирует тренд."
      },
      {
        feature: "cntRegionTripsWavg1m",
        name: "Поездки в другие регионы",
        impact: 0.11,
        explanation:
          "Командировки и переезды коррелируют с развитием карьеры.",
        details:
          "Нарастающая мобильность — сигнал о росте ответственности и должности."
      },
      {
        feature: "incomeValueCategory",
        name: "Категория дохода",
        impact: 0.08,
        explanation:
          "Клиент вышел из зоны низкого дохода, что усиливает прогноз.",
        details:
          "Переход в новый доходный диапазон увеличивает ожидаемый рост."
      }
    ],
    recommendations: {
      products: [
        {
          name: "Кредитная карта с льготным периодом",
          tagline: "Помогает сгладить кассовые разрывы без переплаты.",
          meta: ["Ответственный лимит", "Повышение лояльности"]
        },
        {
          name: "Накопительный счёт",
          tagline:
            "Постепенно формировать капитал при растущем доходе.",
          meta: ["Финансовая подушка", "Автопополнение"]
        }
      ],
      advice: [
        {
          title: "Планирование крупных покупок",
          tagline:
            "Перевести спонтанные траты в планируемые с помощью целей в приложении.",
          meta: ["Контроль расходов", "Целенаправленный рост активов"]
        }
      ],
      responseScore: "0.69"
    }
  },
  "10004": {
    id: "10004",
    name: "Ольга Кузнецова",
    segment: "Массовый сегмент",
    city: "Другие",
    age: 52,
    incomeCategory: "Средний",
    risk: "Средний",
    forecast: {
      value: "78 000 ₽/мес",
      growth: "+3% за год",
      horizon: "12 месяцев",
      confidence: "0.82",
      vsSegment: 0.54,
      text:
        "Доход клиента стабилен, ощутимого роста не ожидается — акцент на защите и оптимизации."
    },
    shap: [
      {
        feature: "age",
        name: "Возраст",
        impact: -0.14,
        explanation:
          "Близость к предпенсионному возрасту сдерживает прогноз роста.",
        details:
          "Модель учитывает более низкую вероятность карьерных скачков."
      },
      {
        feature: "profit_income_out_rur_amt_l2m",
        name: "Недавние изменения в доходе",
        impact: -0.09,
        explanation:
          "Небольшое снижение оборотов за последние месяцы уменьшает прогноз.",
        details:
          "При восстановлении оборотов влияние фактора сократится."
      }
    ],
    recommendations: {
      products: [
        {
          name: "Надёжный вклад",
          tagline: "Сохранить накопления и защитить от инфляции.",
          meta: ["Фиксированная ставка", "Гарантия возврата"]
        }
      ],
      advice: [
        {
          title: "Подготовка к выходу на пенсию",
          tagline:
            "Формирование дополнительной пенсии через накопительные программы.",
          meta: ["Долгосрочное планирование", "Снижение будущих рисков"]
        }
      ],
      responseScore: "0.63"
    }
  }
};

// ==== helpers ====
const getEl = (id) => document.getElementById(id);

function showToast(message, type = "error") {
  const toast = getEl("statusToast");
  const text = getEl("statusText");
  text.textContent = message;
  toast.classList.toggle("ok", type === "ok");
  toast.classList.add("visible");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    toast.classList.remove("visible");
  }, 2800);
}

function formatPercent(value) {
  if (value === null || value === undefined || value === "—") return "—";
  const n = Number(value);
  if (Number.isNaN(n)) return value;
  return `${Math.round(n * 100)}%`;
}

function updateAppliedFilters() {
  const city = getEl("filterCity").value;
  const age = getEl("filterAge").value;
  const income = getEl("filterIncome").value;
  const risk = getEl("filterRisk").value;

  const parts = [];
  if (city) parts.push(`Город: ${city}`);
  if (age) parts.push(`Возраст: ${age}`);
  if (income) parts.push(`Доход: ${income}`);
  if (risk) parts.push(`Риск: ${risk}`);

  const el = getEl("appliedFilters");
  if (!parts.length) {
    el.innerHTML = `Активные фильтры: <strong>нет</strong>`;
  } else {
    el.innerHTML = `Активные фильтры: <strong>${parts.join(", ")}</strong>`;
  }
}

// ==== Основное заполнение ====

function applyClient(client) {
  getEl(
    "clientSummary"
  ).textContent = `${client.name} · ID ${client.id} · ${client.segment}`;
  getEl(
    "forecastBadge"
  ).textContent = `Город: ${client.city} · Доход: ${client.incomeCategory}`;

  getEl("forecastValue").textContent = client.forecast.value;
  getEl("forecastGrowth").textContent = client.forecast.growth;
  getEl("forecastHorizon").textContent = client.forecast.horizon;
  getEl("forecastConfidence").textContent = `${client.forecast.confidence}`;

  getEl("forecastContext").innerHTML = `
    <div><strong>Комментарий модели:</strong> ${client.forecast.text}</div>
    <div class="forecast-bars">
      <div style="flex:1;">
        <div class="spark-bar">
          <div
            class="spark-bar-fill"
            id="sparkClient"
            style="width:${Math.max(
              18,
              Math.min(96, client.forecast.vsSegment * 100)
            )}%;"
          ></div>
        </div>
        <div class="spark-bar-label">
          Прогноз клиента относительно среднего по сегменту
        </div>
      </div>
    </div>
  `;

  renderShapList(client.shap);
  renderRecommendations(client.recommendations);

  getEl("metricMae").textContent = "8 500 ₽";
  getEl("metricMaeTrend").textContent = "-4% к прошлому месяцу";
  getEl("metricR2").textContent = "0.86";
  getEl("metricR2Trend").textContent = "+2 п.п.";
  getEl("metricSuccess").textContent = "95%";
  getEl("metricSuccessTrend").textContent = "+3 п.п. к прошлой неделе";
  getEl("metricCoverage").textContent = "82%";
  getEl("metricCoverageTrend").textContent = "+5 п.п.";
}

function renderShapList(shapItems) {
  const container = getEl("shapList");
  if (!shapItems || !shapItems.length) {
    container.innerHTML =
      '<div style="padding:12px;font-size:12px;color:var(--text-muted);">Нет рассчитанных факторов для данного клиента.</div>';
    return;
  }
  container.innerHTML = "";
  shapItems.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "shap-item";
    if (index === 0) row.classList.add("expanded");

    const positive = item.impact >= 0;
    const impactPercent = Math.round(Math.abs(item.impact) * 100);

    row.innerHTML = `
      <div class="shap-head">
        <div class="shap-impact-pill ${positive ? "positive" : "negative"}">
          ${positive ? "+" : "-"}${impactPercent}%
        </div>
        <div class="shap-title-block">
          <div class="shap-name">${item.name}</div>
          <div class="shap-desc-short">${item.explanation}</div>
        </div>
        <div class="shap-chevron">›</div>
      </div>
      <div class="shap-chart">
        <div class="shap-bar-track">
          <div
            class="shap-bar ${positive ? "positive" : ""}"
            style="width:${Math.min(100, 20 + impactPercent)}%;"
          ></div>
        </div>
        <div class="shap-details">
          <strong>Признак:</strong> ${item.feature}<br/>
          ${item.details}
        </div>
      </div>
    `;

    row.addEventListener("click", () => {
      row.classList.toggle("expanded");
      const chart = row.querySelector(".shap-chart");
      chart.style.display = row.classList.contains("expanded")
        ? "flex"
        : "none";
    });

    if (index !== 0) {
      const chart = row.querySelector(".shap-chart");
      chart.style.display = "none";
    }
    container.appendChild(row);
  });
}

function renderRecommendations(rec) {
  const productList = getEl("productList");
  const adviceList = getEl("adviceList");

  productList.innerHTML = "";
  adviceList.innerHTML = "";

  (rec.products || []).forEach((p) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${p.name}</strong>
      <span class="rec-tagline">${p.tagline}</span>
      <div class="rec-meta">
        ${(p.meta || [])
          .map((m) => `<span>${m}</span>`)
          .join("")}
      </div>
    `;
    productList.appendChild(li);
  });

  (rec.advice || []).forEach((a) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${a.title}</strong>
      <span class="rec-tagline">${a.tagline}</span>
      <div class="rec-meta">
        ${(a.meta || [])
          .map((m) => `<span>${m}</span>`)
          .join("")}
      </div>
    `;
    adviceList.appendChild(li);
  });

  getEl("recScore").textContent =
    "Вероятность отклика: " + formatPercent(rec.responseScore);
}

// ==== Инициализация ====

function init() {
  const form = getEl("searchForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = getEl("clientIdInput").value.trim();
    if (!id) {
      showToast("Введите ID клиента", "error");
      return;
    }
    const client = mockClients[id];
    if (!client) {
      showToast(`Клиент с ID ${id} не найден (demo)`, "error");
      return;
    }
    getEl("clientSelect").value = id;
    applyClient(client);
    showToast(`Загружены данные клиента ${client.name}`, "ok");
  });

  getEl("clientSelect").addEventListener("change", (e) => {
    const id = e.target.value;
    if (!id) return;
    const client = mockClients[id];
    if (client) {
      getEl("clientIdInput").value = id;
      applyClient(client);
      showToast(`Загружены данные клиента ${client.name}`, "ok");
    }
  });

  ["filterCity", "filterAge", "filterIncome", "filterRisk"].forEach((id) => {
    getEl(id).addEventListener("change", () => {
      updateAppliedFilters();
    });
  });

  getEl("resetFiltersBtn").addEventListener("click", () => {
    ["filterCity", "filterAge", "filterIncome", "filterRisk"].forEach((id) => {
      getEl(id).value = "";
    });
    updateAppliedFilters();
    showToast("Фильтры сброшены", "ok");
  });

  updateAppliedFilters();

  const defaultClient = mockClients["10001"];
  applyClient(defaultClient);
  getEl("clientIdInput").value = defaultClient.id;
  getEl("clientSelect").value = defaultClient.id;
}

document.addEventListener("DOMContentLoaded", init);

// Шаблон под интеграцию с ML-бэком:
// function updateFromBackend(payload) {
//   // 1. Преобразовать payload в формат объекта client.
//   // 2. Вызвать applyClient(client);
// }
