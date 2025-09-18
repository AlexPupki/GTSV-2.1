# 🧹 GTS Cleanup Roadmap

> Файл для отслеживания компонентов, подлежащих очистке в рамках AI-friendly рефакторинга

## 🗂️ ВРЕМЕННЫЕ ФАЙЛЫ К УДАЛЕНИЮ

### ❌ Executive Panel Duplicates
```
/components/admin/GTSExecutivePanel_temp.tsx          - УДАЛИТЬ (временный)
/components/admin/GTSExecutivePanel_patch.tsx         - УДАЛИТЬ (патч применен)
/components/admin/GTSExecutivePanel_CRM_Reports_patch.tsx - УДАЛИТЬ (патч применен)
/components/admin/GTSExecutivePanel_Enhanced_Notifications.tsx - УДАЛИТЬ (функция в основном файле)
```

### 🗄️ Архивные компоненты
```
/components/archive/                                   - ПЕРЕМЕСТИТЬ в отдельный repo
/GTSExecutivePanel_Fix.tsx                            - УДАЛИТЬ (исправления применены)
/temp_find_crm.txt                                    - УДАЛИТЬ (служебный файл)
/temp_quality_content.tsx                             - УДАЛИТЬ (служебный файл) 
/test_search_quality.tsx                              - УДАЛИТЬ (тестовый файл)
```

### 🔧 Модули с суффиксами
```
/components/admin/modules/GTSCRMModuleV2_NewLead.tsx  - КОНСОЛИДИРОВАТЬ с основным CRM
/components/admin/modules/GTSCRMWithOmniInbox_append.tsx - УДАЛИТЬ (аппенд применен)
/components/admin/modules/GTSCRMWithOmniInbox_Quality.tsx - КОНСОЛИДИРОВАТЬ
```

## 🎯 ДУБЛИРОВАННЫЕ ПОРТАЛЫ

### 🏢 Partner Portals (7 штук -> 1)
- `GTSBrandPartnerPortal.tsx` ✅ СОХРАНИТЬ как основной
- `GTSPartnerAgentPortal.tsx` → КОНСОЛИДИРОВАТЬ
- `GTSContractorPortal.tsx` → КОНСОЛИДИРОВАТЬ  
- Остальные партнерские порталы → КОНСОЛИДИРОВАТЬ

### 👥 Client Portals (3 штуки -> 1)
- `GTSClientClubPortalComplete.tsx` ✅ СОХРАНИТЬ как основной
- `GTSClientClubPortalFinal.tsx` → УДАЛИТЬ
- `GTSB2BClientPortal.tsx` ✅ СОХРАНИТЬ отдельно (B2B специфика)

## 📊 СТАТИСТИКА ОЧИСТКИ

### ТЕКУЩЕЕ СОСТОЯНИЕ:
- 📁 **196 файлов** в `/components`
- 🔄 **15+ временных** файлов
- 🗂️ **7 дублированных** порталов
- ⚠️ **25+ legacy** компонентов

### ЦЕЛЬ ПОСЛЕ ОЧИСТКИ:
- 📁 **~120 файлов** (-38% сокращение)
- 🔄 **0 временных** файлов  
- 🗂️ **2 унифицированных** портала
- ⚠️ **0 legacy** компонентов

## 🚀 ПЛАН ДЕЙСТВИЙ

### ЭТАП 1: Немедленная очистка (СЕГОДНЯ)
1. ❌ Удалить все `_temp.tsx`, `_patch.tsx`, `_append.tsx`
2. 🗄️ Переместить `/components/archive/` в отдельный репозиторий  
3. 🧹 Очистить корневые временные файлы

### ЭТАП 2: Консолидация (ЗАВТРА)
1. 🏢 Объединить партнерские порталы в `GTSUnifiedPartnerPortal.tsx`
2. 👥 Консолидировать клиентские порталы
3. 📊 Объединить CRM модули

### ЭТАП 3: Реорганизация (НЕДЕЛЯ 2)
1. 📁 Feature-based структура папок
2. 🎯 AI-friendly именование
3. 📚 Обновление индексов и экспортов

## 🎯 AI PROMPT TEMPLATES

Для выполнения очистки через промпты:

```
"Удали все временные файлы из категории executive panel"
"Консолидируй партнерские порталы в единый компонент" 
"Переорганизуй структуру папок по feature-based принципу"
"Создай индекс компонентов для AI навигации"
```

---

**Статус обновления:** Каждый удаленный/консолидированный файл помечается ✅  
**Последнее обновление:** 17 декабря 2024, этап 1 начат