# Команды для обновления сайта на сервере

Подключитесь к серверу через SSH и выполните:

```bash
cd ~/app
git pull
sudo docker-compose -f docker-compose.prod.yml up -d --build --no-cache frontend
sudo docker-compose -f docker-compose.prod.yml restart nginx
```

Если это не помогло, полностью пересоберите все контейнеры:

```bash
cd ~/app
git pull
sudo docker-compose -f docker-compose.prod.yml down
sudo docker-compose -f docker-compose.prod.yml up -d --build --no-cache
```

После этого очистите кэш браузера (Ctrl+Shift+R или Cmd+Shift+R) или откройте сайт в режиме инкогнито.

