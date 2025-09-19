# 🧹 GTS Platform - Этап 1: Безопасная очистка

## Удаленные дублирующиеся файлы

### /src/app/ - дублирует functionality из legacy /App.tsx
- App.tsx ❌ (простейшая версия, не используется)
- LoadingPage.tsx ❌ (дублирует логику из /App.tsx)
- error.tsx ❌ 
- layout.tsx ❌
- loading.tsx ❌
- page.tsx ❌
- providers.tsx ❌ (дублирует /contexts/)
- router.tsx ❌

### /src/pages/ - дублирует /components/pages/
- GTSPageRouter.tsx ❌ (дублирует /components/pages/GTSPageRouter.tsx)
- admin/ ❌
- auth/ ❌  
- home/ ❌

### /src/entities/ - неиспользуемая FSD структура
- user/ ❌

### /src/features/ - неиспользуемая FSD структура  
- auth/ ❌ (дублирует /components/auth/)
- navigation/ ❌ (дублирует /hooks/useNavigation.ts)

### /src/widgets/ - неиспользуемая FSD структура
- demo/ ❌ (дублирует /components/core/GTSDemoRouter.tsx)

### Сохранено (может содержать полезные утилиты)
- /src/shared/ ✅ (может содержать полезные стили и утилиты)

## Статус
- ✅ Определены файлы для удаления
- ⏳ Удаление в процессе
- ⏳ Тестирование после очистки