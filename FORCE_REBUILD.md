# КРИТИЧЕСКАЯ ПЕРЕСБОРКА ФРОНТЕНДА

Если на сайте не видны изменения, выполните ВСЕ команды ниже по порядку:

```bash
cd ~/app

# 1. Обновить код
git pull

# 2. ОСТАНОВИТЬ ВСЁ
sudo docker-compose -f docker-compose.prod.yml down

# 3. УДАЛИТЬ ВСЕ КОНТЕЙНЕРЫ frontend (даже остановленные)
sudo docker ps -a | grep frontend | awk '{print $1}' | xargs sudo docker rm -f 2>/dev/null || true

# 4. УДАЛИТЬ ВСЕ ОБРАЗЫ, связанные с frontend
sudo docker images | grep -E "frontend|app-frontend" | awk '{print $3}' | xargs sudo docker rmi -f 2>/dev/null || true

# 5. УДАЛИТЬ volume
sudo docker volume rm app_frontend_static 2>/dev/null || true

# 6. УДАЛИТЬ ВСЕ build cache для frontend
sudo docker builder prune -a -f

# 7. ПРОВЕРИТЬ, что Dockerfile правильный
cat frontend/Dockerfile | head -25

# 8. ПРОВЕРИТЬ, что entrypoint скрипт существует
ls -la frontend/docker-entrypoint.sh

# 9. ПЕРЕСОБРАТЬ с нуля БЕЗ КЭША
sudo docker-compose -f docker-compose.prod.yml build --no-cache --pull frontend

# 10. ПРОВЕРИТЬ созданный образ - должен быть alpine, не nginx
sudo docker images | grep frontend

# 11. Запустить только frontend
sudo docker-compose -f docker-compose.prod.yml up -d frontend

# 12. СРАЗУ проверить логи - ДОЛЖНЫ УВИДЕТЬ наши сообщения:
sudo docker-compose -f docker-compose.prod.yml logs frontend

# 13. Если все ОК, запустить остальное
sudo docker-compose -f docker-compose.prod.yml up -d

# 14. Перезапустить nginx
sudo docker-compose -f docker-compose.prod.yml restart nginx

# 15. ФИНАЛЬНАЯ ПРОВЕРКА логов
sudo docker-compose -f docker-compose.prod.yml logs frontend | tail -30
```

**ОЖИДАЕМЫЙ ВЫВОД В ЛОГАХ:**
```
==========================================
=== Frontend container starting ===
==========================================
Waiting for volume mount...
✓ Volume mounted at /volume
Copying files from /source to /volume...
✓ Files copied to volume successfully!
Files in volume:
[список файлов index.html, assets/ и т.д.]
==========================================
=== Frontend container ready ===
==========================================
```

**ЕСЛИ ВСЕ ЕЩЕ ВИДИТЕ NGINX ЛОГИ:**

Выполните:
```bash
# Узнать точное имя образа
sudo docker-compose -f docker-compose.prod.yml config | grep -A 10 frontend

# Узнать, какой образ использует контейнер
sudo docker inspect app-frontend-1 | grep -i image

# Удалить его явно
sudo docker rmi -f $(sudo docker inspect app-frontend-1 --format='{{.Image}}')

# И пересобрать снова
sudo docker-compose -f docker-compose.prod.yml build --no-cache frontend
sudo docker-compose -f docker-compose.prod.yml up -d frontend
```

