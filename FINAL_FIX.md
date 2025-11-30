# ФИНАЛЬНОЕ ИСПРАВЛЕНИЕ

Проблема: контейнер использует СТАРЫЙ образ с Nginx вместо нового с Alpine.

## РЕШЕНИЕ - выполните ВСЕ команды:

```bash
cd ~/app

# 1. Обновить код
git pull

# 2. ОСТАНОВИТЬ ВСЁ
sudo docker-compose -f docker-compose.prod.yml down

# 3. УДАЛИТЬ контейнер
sudo docker rm -f app-frontend-1 2>/dev/null || true

# 4. УДАЛИТЬ образ app-frontend (КРИТИЧНО!)
sudo docker rmi -f app-frontend 2>/dev/null || true
sudo docker rmi -f app-frontend:latest 2>/dev/null || true

# 5. Найти ВСЕ образы с frontend и удалить их
echo "=== Все образы с frontend ==="
sudo docker images | grep -i frontend
echo "Удаляю все найденные образы..."
sudo docker images | grep -i frontend | awk '{print $3}' | xargs sudo docker rmi -f 2>/dev/null || true

# 6. Удалить volume
sudo docker volume rm app_frontend_static 2>/dev/null || true

# 7. Очистить ВСЕ неиспользуемые образы и кэш
sudo docker system prune -a -f

# 8. ПРОВЕРИТЬ Dockerfile (должен начинаться с alpine:latest на второй стадии)
echo "=== Проверка Dockerfile ==="
grep -A 2 "FROM alpine:latest" frontend/Dockerfile

# 9. ПРОВЕРИТЬ entrypoint скрипт (должен начинаться с "=== Frontend container")
echo "=== Проверка entrypoint ==="
head -5 frontend/docker-entrypoint.sh

# 10. ПЕРЕСОБРАТЬ с нуля (это займет время!)
echo "=== Пересборка образа ==="
sudo docker-compose -f docker-compose.prod.yml build --no-cache --pull frontend

# 11. ПРОВЕРИТЬ созданный образ
echo "=== Проверка образа ==="
sudo docker images | grep frontend
echo "Размер должен быть ~50-60MB (alpine), не ~150MB (nginx)"

# 12. Запустить frontend
sudo docker-compose -f docker-compose.prod.yml up -d frontend

# 13. Подождать 5 секунд
sleep 5

# 14. ПРОВЕРИТЬ логи - ДОЛЖНЫ ВИДЕТЬ наши сообщения:
echo "=== ЛОГИ FRONTEND (должны видеть наши сообщения) ==="
sudo docker-compose -f docker-compose.prod.yml logs frontend

# 15. ПРОВЕРИТЬ entrypoint в контейнере - должен быть наш скрипт:
echo "=== Проверка entrypoint в контейнере ==="
sudo docker exec app-frontend-1 head -5 /docker-entrypoint.sh
echo "Должен начинаться с: === Frontend container starting ==="

# 16. Если все ОК, запустить остальное
sudo docker-compose -f docker-compose.prod.yml up -d

# 17. Перезапустить nginx
sudo docker-compose -f docker-compose.prod.yml restart nginx
```

## ОЖИДАЕМЫЙ РЕЗУЛЬТАТ:

**В логах frontend:**
```
=== Frontend container starting ===
✓ Volume mounted at /volume
✓ Files copied to volume successfully!
```

**При проверке entrypoint:**
```bash
sudo docker exec app-frontend-1 head -5 /docker-entrypoint.sh
```
Должен показать:
```
#!/bin/sh
set -e

echo "=========================================="
echo "=== Frontend container starting ==="
```

**НЕ должен показывать Nginx функции!**

