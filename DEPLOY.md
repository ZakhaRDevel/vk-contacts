# Деплой на GitHub Pages

## Автоматический деплой

Проект настроен для автоматического деплоя на GitHub Pages через GitHub Actions.

### Настройка репозитория

1. Убедитесь, что ваш репозиторий публичный или у вас есть GitHub Pro
2. Перейдите в Settings → Pages
3. В разделе "Source" выберите "GitHub Actions"

### Триггеры деплоя

- При пуше в ветку `main`
- При создании Pull Request в ветку `main`

## Ручной деплой

Если нужно выполнить деплой вручную:

```bash
# Установка зависимостей
npm install

# Сборка статической версии
npm run build:static

# Деплой (требует установки angular-cli-ghpages)
npm run deploy
```

## Структура файлов

- `dist/vk-contacts/browser/` - папка со статическими файлами для деплоя
- `.github/workflows/deploy.yml` - конфигурация GitHub Actions
- `public/.nojekyll` - файл для отключения Jekyll

## Настройки Angular

- Конфигурация `static` в `angular.json` для сборки без SSR
- Все ассеты копируются в папку `assets`
- Включено хеширование файлов для кэширования
