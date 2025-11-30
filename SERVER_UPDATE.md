# КРИТИЧЕСКОЕ ОБНОВЛЕНИЕ СЕРВЕРА

На сервере используется СТАРЫЙ Dockerfile. Выполните ВСЕ команды:

```bash
# 1. ВЕРНУТЬСЯ В ПРАВИЛЬНУЮ ДИРЕКТОРИЮ
cd ~/app

# 2. ОБНОВИТЬ КОД ИЗ GITHUB
git pull

# 3. ПРОВЕРИТЬ, что Dockerfile правильный (должен быть alpine:latest, НЕ nginx)
echo "=== Проверка Dockerfile ==="
grep "FROM alpine:latest" frontend/Dockerfile
grep "FROM.*nginx" frontend/Dockerfile
# Должно показать только "FROM alpine:latest", НЕ должно показать nginx!

# 4. ПРОВЕРИТЬ, что docker-entrypoint.sh существует
echo "=== Проверка entrypoint скрипта ==="
ls -la frontend/docker-entrypoint.sh
head -5 frontend/docker-entrypoint.sh
# Должен показать файл и его содержимое!

# 5. ОСТАНОВИТЬ ВСЁ
sudo docker-compose -f docker-compose.prod.yml down

# 6. УДАЛИТЬ старый образ
sudo docker rm -f app-frontend-1 2>/dev/null || true
sudo docker rmi -f app-frontend 2>/dev/null || true
sudo docker images | grep frontend | awk '{print $3}' | xargs sudo docker rmi -f 2>/dev/null || true

# 7. УДАЛИТЬ volume
sudo docker volume rm app_frontend_static 2>/dev/null || true

# 8. Очистить кэш
sudo docker builder prune -a -f

# 9. ПЕРЕСОБРАТЬ (ВНИМАТЕЛЬНО СМОТРЕТЬ НА ВЫВОД!)
sudo docker-compose -f docker-compose.prod.yml build --no-cache --pull frontend

# Во время сборки должны увидеть:
# - "FROM alpine:latest"
# - "=== Verifying entrypoint ==="
# - "=== Entrypoint verified ==="
# НЕ должно быть "nginx:alpine"!

# 10. ПРОВЕРИТЬ созданный образ
sudo docker images | grep frontend
# Размер должен быть ~50-60MB (alpine), не ~150MB (nginx)

# 11. ПРОВЕРИТЬ файл в образе
sudo docker run --rm app-frontend ls -la /custom-entrypoint.sh
sudo docker run --rm app-frontend head -5 /custom-entrypoint.sh
# Должен показать файл и его содержимое!

# 12. Запустить
sudo docker-compose -f docker-compose.prod.yml up -d frontend

# 13. Проверить логи
sleep 5
sudo docker-compose -f docker-compose.prod.yml logs frontend
# Должны видеть:
# "=== Frontend container starting ==="
# "✓ Volume mounted at /volume"
# "✓ Files copied to volume successfully!"

# 14. Если все ОК, запустить остальное
sudo docker-compose -f docker-compose.prod.yml up -d
sudo docker-compose -f docker-compose.prod.yml restart nginx
```

## ПРОВЕРКА ДО ОБНОВЛЕНИЯ:

```bash
cd ~/app

# Проверить текущий Dockerfile
cat frontend/Dockerfile | grep "FROM"

# Должно показать:
# FROM node:20-alpine as build
# FROM alpine:latest
# 
# НЕ должно быть:
# FROM nginx:alpine
```

## ЕСЛИ docker-entrypoint.sh НЕ НАЙДЕН:

```bash
cd ~/app
ls -la frontend/docker-entrypoint.sh

# Если файл не существует, значит код не обновился:
git status
git pull --force
ls -la frontend/docker-entrypoint.sh
```

