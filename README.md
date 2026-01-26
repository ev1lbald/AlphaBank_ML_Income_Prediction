# AlphaBank Income Prediction Service

Сервис для прогнозирования дохода клиентов Альфа-Банка с использованием Machine Learning. Включает в себя пользовательский интерфейс для сотрудников фронт-офиса и REST API для интеграции с ML-моделями.
Сайт доступен по адресу alpha-lamer.ru

## 👥 Команда и роли

**Название команды:** ЛАМЕР

| Участник | Роль | Telegram |
|----------|------|-------------|
| Кирилюк Александр | Data Analyst, Backend Developer | @ev1lbald
| Немцов Роман | Data Analyst, Frontend Developer | @rmnemts_off 
| Маштаков Егор | ML Engineer | @MashtakovEgor 
| Симонян Мартин | Data Sсientist | @maaati1 
| Яшин Лев | Data Sсientist | @Iev_yashin 



---

## 📋 Содержание

- [Структура проекта](#-структура-проекта)
- [Технологический стек](#-технологический-стек)
- [Требования](#-требования)
- [Установка и запуск](#-установка-и-запуск)
- [Импорт данных](#-импорт-данных)
- [API документация](#-api-документация)
- [Функционал](#-функционал)
- [Развертывание](#-развертывание)

---

## 🏗 Структура проекта

```
AlphaBank_ML_Income_Prediction_Model/
│
├── backend/                          # Backend приложение (FastAPI)
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                  # Главный файл приложения, API endpoints
│   │   ├── database.py              # Конфигурация SQLAlchemy и подключения к БД
│   │   ├── models.py                # SQLAlchemy модели (Client, Prediction, Recommendation, etc.)
│   │   ├── schemas.py               # Pydantic схемы для валидации данных
│   │   └── ml_engine/               # ML компоненты
│   │       ├── __init__.py
│   │       ├── service.py           # Заглушка для ML модели
│   │       └── llm_service.py       # Сервис для LLM интеграции (отключен)
│   ├── data/
│   │   └── submission.csv           # Данные для импорта в БД (id, target)
│   ├── Dockerfile                   # Docker образ для backend
│   ├── import_data.py               # Скрипт импорта данных из CSV в PostgreSQL
│   ├── requirements.txt             # Python зависимости
│   └── sql_app.db                   # SQLite база (для локальной разработки)
│
├── frontend/                         # Frontend приложение (React)
│   ├── src/
│   │   ├── components/              # React компоненты
│   │   │   ├── Header.jsx           # Шапка приложения с логотипом и пользователем
│   │   │   ├── SearchPanel.jsx      # Панель поиска клиента по ID
│   │   │   ├── ForecastCard.jsx     # Карточка прогноза дохода
│   │   │   ├── ShapExplanations.jsx # Визуализация SHAP факторов
│   │   │   ├── Recommendations.jsx  # Персональные рекомендации
│   │   │   ├── MetricsWidget.jsx    # Виджет метрик качества модели
│   │   │   ├── Toast.jsx            # Компонент уведомлений
│   │   │   └── Login.jsx            # Компонент авторизации (не используется)
│   │   ├── App.jsx                  # Главный компонент приложения
│   │   ├── main.jsx                 # Точка входа React
│   │   ├── index.css                # Глобальные стили
│   │   └── App.css                  # Стили компонента App
│   ├── public/                      # Статические файлы
│   ├── Dockerfile                   # Docker образ для frontend (multi-stage build)
│   ├── docker-entrypoint.sh         # Скрипт для копирования файлов в volume
│   ├── package.json                 # Node.js зависимости
│   ├── vite.config.js               # Конфигурация Vite
│   └── index.html                   # HTML шаблон
│
├── nginx/                            # Nginx конфигурация
│   └── conf.d/
│       └── default.conf              # Конфигурация reverse proxy
│
├── prototype/                        # Исходные HTML/CSS прототипы
│   ├── index3131.html
│   ├── style1313.css
│   └── app.js
│
├── docker-compose.yml                # Docker Compose для локальной разработки
├── docker-compose.prod.yml           # Docker Compose для production
├── README.md                         # Этот файл
├── README_DEPLOY.md                  # Инструкции по развертыванию
└── .env.example                      # Пример файла с переменными окружения
```

---

## 🛠 Технологический стек

### Backend
- **Python**: 3.10
- **FastAPI**: Последняя версия (устанавливается из requirements.txt)
- **SQLAlchemy**: ORM для работы с базой данных
- **Pydantic**: Валидация данных и схемы
- **Uvicorn**: ASGI сервер
- **PostgreSQL**: 15 (production) / SQLite (локальная разработка)
- **Pandas**: Обработка CSV данных
- **OpenAI**: Библиотека для LLM интеграции (отключена)

### Frontend
- **React**: 19.2.0
- **Vite**: 5.4.11 (build tool)
- **Axios**: 1.13.2 (HTTP клиент)
- **Node.js**: 20+ (требуется для разработки)

### Infrastructure
- **Docker**: Контейнеризация приложений
- **Docker Compose**: Оркестрация контейнеров
- **Nginx**: Reverse proxy и статические файлы (production)
- **PostgreSQL**: База данных

---

## 📦 Требования

### Для локальной разработки
- **Docker** и **Docker Compose** (для backend и БД)
- **Node.js** 20+ и **npm** (для frontend)
- **Python** 3.10+ (опционально, для запуска backend без Docker)

### Для production развертывания
- **Docker** и **Docker Compose**
- **Nginx** (устанавливается через Docker)
- **Git** (для клонирования репозитория)
- **SSH** доступ к серверу

---

## 🚀 Установка и запуск

### Локальная разработка

#### 1. Клонирование репозитория

```bash
git clone https://github.com/ev1lbald/AlphaBank_ML_Income_Prediction.git
cd AlphaBank_ML_Income_Prediction
```

#### 2. Настройка переменных окружения

Создайте файл `.env` в корне проекта:

```bash
# Database
POSTGRES_USER=dev_user
POSTGRES_PASSWORD=dev_password
POSTGRES_DB=alphabank_dev
DATABASE_URL=postgresql://dev_user:dev_password@db:5432/alphabank_dev

# Для локальной разработки (SQLite)
# DATABASE_URL=sqlite:///./sql_app.db
```

#### 3. Запуск Backend и базы данных

Убедитесь, что Docker запущен, затем выполните:

```bash
docker-compose up --build
```

Backend будет доступен по адресу: http://localhost:8000

**API документация:**
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
- API endpoint: http://localhost:8000/api

#### 4. Запуск Frontend (отдельный терминал)

```bash
cd frontend

# Установка зависимостей (первый запуск)
npm install

# Запуск dev сервера
npm run dev
```

Frontend будет доступен по адресу: http://localhost:5173

#### 5. Импорт данных

Для загрузки тестовых данных в базу данных:

**Локально (без Docker):**
```bash
cd backend
python import_data.py
```

**В Docker контейнере:**
```bash
docker-compose exec backend python import_data.py
```

Скрипт импортирует данные из `backend/data/submission.csv` в PostgreSQL. Скрипт создает записи клиентов с полями `id` и `target` (остальные поля будут `NULL`). Файл должен содержать колонки: `id` и `target`.

---

## 📊 Импорт данных

### Подготовка данных

1. Поместите CSV файл в `backend/data/submission.csv`
2. Файл должен содержать следующие колонки:
   - `id` - уникальный ID клиента (Integer)
   - `target` - целевое значение дохода (Float)
   
**Формат файла:**
```csv
id,target
0,62131.1
1,51334.363
3,24868.11
...
```

### Выполнение импорта

```bash
# Локально
cd backend
python import_data.py

# В Docker
docker-compose exec backend python import_data.py
```

### Проверка импорта

```bash
# Подключитесь к БД и проверьте количество записей
docker-compose exec db psql -U dev_user -d alphabank_dev -c "SELECT COUNT(*) FROM clients;"
```

---

## 🔌 API документация

### Основные endpoints

#### 1. Поиск клиентов
```http
GET /api/clients/search?id={client_id}
```

**Параметры:**
- `id` (опционально) - ID клиента

**Ответ:**
```json
[
  {
    "id": 1,
    "full_name": "Клиент 1",
    "age": 35,
    "city": "Москва",
    ...
  }
]
```

#### 2. Получение информации о клиенте
```http
GET /api/clients/{client_id}
```

**Ответ:**
```json
{
  "id": 1,
  "full_name": "Клиент 1",
  "prediction": { ... },
  "recommendations": { ... }
}
```

#### 3. Генерация прогноза
```http
POST /api/predict/{client_id}
Content-Type: application/json

{}
```

**Ответ:**
```json
{
  "value": "109 324 ₽/мес",
  "confidence": 0.93,
  "shap_features": [ ... ]
}
```

#### 4. Получение метрик модели
```http
GET /api/metrics
```

**Ответ:**
```json
[
  {
    "name": "MAE",
    "value": "8 500 ₽",
    "trend": "-4%",
    "description": "Ошибка прогноза"
  }
]
```

Полная документация доступна в Swagger UI: http://localhost:8000/docs

---

## 🎯 Функционал

### Backend

- **REST API**: FastAPI приложение с автоматической документацией
- **База данных**: PostgreSQL с моделями для клиентов, прогнозов, рекомендаций
- **ML Stub**: Заглушка для интеграции ML модели (использует `target` из БД)
- **Импорт данных**: Скрипт для загрузки данных из CSV в БД
- **CORS**: Настроен для работы с frontend

### Frontend

- **Поиск клиента**: Поиск по ID клиента
- **Карточка прогноза**: Отображение прогнозируемого дохода и доверия модели
- **SHAP объяснения**: Визуализация факторов, влияющих на прогноз (подготовлено для интеграции)
- **Рекомендации**: Блок для персональных рекомендаций (placeholder)
- **Метрики модели**: Отображение MAE и Quantile Loss

---

## 🚀 Развертывание

Подробные инструкции по развертыванию на production сервере находятся в файле [README_DEPLOY.md](./README_DEPLOY.md).

### Краткая инструкция:

1. Настройте сервер (Ubuntu/Debian)
2. Установите Docker и Docker Compose
3. Склонируйте репозиторий
4. Настройте `.env` файл
5. Запустите через `docker-compose -f docker-compose.prod.yml up -d`
6. Импортируйте данные
7. Настройте Nginx и SSL (опционально)

---

## 📝 Зависимости (детальные версии)

### Backend (Python 3.10)

См. `backend/requirements.txt`:
```
pandas
fastapi
uvicorn
sqlalchemy
psycopg2-binary
pydantic
python-dotenv
openai
```

*Примечание: Версии указываются автоматически при установке через pip. Для фиксации версий используйте `pip freeze > requirements.txt`.*

### Frontend (Node.js 20+)

См. `frontend/package.json`:
```json
{
  "dependencies": {
    "axios": "^1.13.2",
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^5.4.11",
    ...
  }
}
```

---

## 🔧 Разработка

### Структура Backend

- `app/main.py` - точка входа, определение API endpoints
- `app/models.py` - SQLAlchemy модели базы данных
- `app/schemas.py` - Pydantic схемы для валидации
- `app/database.py` - конфигурация подключения к БД
- `app/ml_engine/` - модули для ML интеграции

### Структура Frontend

- `src/App.jsx` - главный компонент, управление состоянием
- `src/components/` - переиспользуемые React компоненты
- `src/index.css` - глобальные стили в темной теме
- `vite.config.js` - конфигурация Vite с proxy для API


