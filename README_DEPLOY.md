# Руководство по деплою (Ubuntu + Docker)

Данная инструкция поможет вам развернуть приложение на удаленном сервере с использованием Git, Docker и Nginx.

## 1. Подготовка сервера

1. **Подключитесь к серверу**:
   ```bash
   ssh user@your-server-ip
   ```

2. **Обновите пакеты и установите Docker**:
   ```bash
   sudo apt update
   sudo apt install docker.io docker-compose -y
   sudo systemctl enable --now docker
   ```

## 2. Копирование кода

1. **Склонируйте репозиторий**:
   *(Если репозиторий приватный, используйте SSH ключи или HTTPS токен)*
   ```bash
   git clone https://github.com/your-user/AlphaBank_ML_Income_Prediction_Model.git app
   cd app
   ```

## 3. Настройка окружения

1. **Создайте файл .env**:
   ```bash
   nano .env
   ```
   Вставьте следующие значения (замените пароли на свои!):
   ```ini
   POSTGRES_USER=prod_user
   POSTGRES_PASSWORD=prod_secure_password
   POSTGRES_DB=alphabank_prod
   DATABASE_URL=postgresql://prod_user:prod_secure_password@db:5432/alphabank_prod
   ```
   *Нажмите `Ctrl+X`, затем `Y` и `Enter` для сохранения.*

## 4. Запуск приложения

1. **Запустите контейнеры**:
   ```bash
   sudo docker-compose -f docker-compose.prod.yml up -d --build
   ```

2. **Проверьте статус**:
   ```bash
   sudo docker-compose -f docker-compose.prod.yml ps
   ```

Ваше приложение должно быть доступно по IP адресу сервера:
- Frontend: `http://your-server-ip`
- API: `http://your-server-ip/api`

## 4.5. Импорт данных в базу

После запуска контейнеров необходимо импортировать клиентские данные:

1. **Убедитесь, что файл данных существует**:
   ```bash
   ls -lh backend/data/users.csv.zip
   ```

2. **Импортируйте данные**:
   ```bash
   sudo docker-compose -f docker-compose.prod.yml exec backend python import_data.py
   ```

   Скрипт импортирует данные из `backend/data/users.csv.zip` в базу данных PostgreSQL.

3. **Проверьте импорт**:
   ```bash
   # Подключитесь к базе данных и проверьте количество записей
   sudo docker-compose -f docker-compose.prod.yml exec db psql -U prod_user -d alphabank_prod -c "SELECT COUNT(*) FROM clients;"
   ```

## 5. Настройка SSL (HTTPS)

Для привязки домена и получения SSL сертификата:

1. **Направьте домен** (A-запись) на IP вашего сервера.

2. **Отредактируйте конфигурацию Nginx**:
   ```bash
   nano nginx/conf.d/default.conf
   ```
   Замените `localhost` на ваш домен в директиве `server_name`.

3. **Получите сертификат Certbot**:
   *(Вам потребуется временно остановить Nginx или настроить webroot challenge. Для простоты можно использовать команду ниже, если Nginx уже работает и раздает папку .well-known)*:
   
   ```bash
   sudo docker-compose -f docker-compose.prod.yml run --rm certbot certonly --webroot --webroot-path /var/www/certbot -d yourdomain.com
   ```

4. **Обновите Nginx конфиг для использования SSL**:
   Вам нужно будет раскомментировать/добавить блок `listen 443 ssl` и указать пути к сертификатам:
   `/etc/letsencrypt/live/yourdomain.com/fullchain.pem`
   `/etc/letsencrypt/live/yourdomain.com/privkey.pem`

5. **Перезапустите Nginx**:
   ```bash
   sudo docker-compose -f docker-compose.prod.yml restart nginx
   ```

