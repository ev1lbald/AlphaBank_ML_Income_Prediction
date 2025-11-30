# 🚀 ЗАПУСК НА СЕРВЕРЕ

## Полная инструкция по запуску

### Шаг 1: Подключение к серверу

```bash
ssh user@your-server-ip
```

### Шаг 2: Установка Docker (если еще не установлен)

```bash
sudo apt update
sudo apt install docker.io docker-compose -y
sudo systemctl enable --now docker
```

### Шаг 3: Клонирование репозитория

```bash
git clone https://github.com/ev1lbald/AlphaBank_ML_Income_Prediction.git app
cd app
```

### Шаг 4: Настройка переменных окружения

```bash
nano .env
```

Вставьте:
```ini
POSTGRES_USER=prod_user
POSTGRES_PASSWORD=ваш_надежный_пароль
POSTGRES_DB=alphabank_prod
DATABASE_URL=postgresql://prod_user:ваш_надежный_пароль@db:5432/alphabank_prod
```

Сохраните: `Ctrl+X`, затем `Y`, затем `Enter`

### Шаг 5: ЗАПУСК ВСЕХ СЕРВИСОВ

```bash
# Запустить все контейнеры
sudo docker-compose -f docker-compose.prod.yml up -d --build

# Подождать 10 секунд
sleep 10

# Проверить статус
sudo docker-compose -f docker-compose.prod.yml ps
```

### Шаг 6: Импорт данных из submission.csv

```bash
# Импортировать данные
sudo docker-compose -f docker-compose.prod.yml exec backend python import_data.py
```

Вы должны увидеть:
```
Reading backend/data/submission.csv...
Successfully read CSV with 73215 rows
Importing 73215 rows...
Processed 1000 rows...
...
Import finished successfully.
```

### Шаг 7: Проверка работы

```bash
# Проверить логи всех сервисов
sudo docker-compose -f docker-compose.prod.yml logs --tail=50

# Проверить, что сайт доступен
curl http://localhost
```

**Сайт будет доступен по IP адресу сервера:**
- http://your-server-ip

---

## Если нужно перезапустить

```bash
cd ~/app

# Остановить все
sudo docker-compose -f docker-compose.prod.yml down

# Запустить снова
sudo docker-compose -f docker-compose.prod.yml up -d

# Проверить статус
sudo docker-compose -f docker-compose.prod.yml ps
```

---

## Проверка работы компонентов

```bash
# Логи backend
sudo docker-compose -f docker-compose.prod.yml logs backend

# Логи frontend
sudo docker-compose -f docker-compose.prod.yml logs frontend

# Логи nginx
sudo docker-compose -f docker-compose.prod.yml logs nginx

# Логи БД
sudo docker-compose -f docker-compose.prod.yml logs db
```

---

## Обновление кода на сервере

```bash
cd ~/app

# Обновить код
git pull

# Пересобрать и перезапустить
sudo docker-compose -f docker-compose.prod.yml down
sudo docker-compose -f docker-compose.prod.yml up -d --build
```

