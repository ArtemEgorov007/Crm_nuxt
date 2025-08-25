

---

# 🚀 Egorov CRM — твоя CRM, твои правила

**Egorov CRM** — это не просто «ещё одна CRM».  
Это **Nuxt 3 / Vue 3 / TypeScript** зверь с **Pinia**, **Vue Query**, **VeeValidate + Zod**, **shadcn-vue** и **Appwrite** под капотом.  
Она рождена для скорости, чистой архитектуры и удовольствия от кода.

---

## ✨ Фичи, которые уже есть или будут
- ⚡ **Nuxt 3 + SSR/SPA** — быстрый рендер и SEO‑дружелюбность.
- 🗄 **Appwrite** — аутентификация, база, файлы, всё в одном.
- 📦 **Vue Query** — умный кэш и оптимистичные апдейты.
- 🧠 **Pinia** — предсказуемое управление состоянием.
- ✅ **VeeValidate + Zod** — строгая валидация форм с типами.
- 🎨 **shadcn-vue + Tailwind** — современный UI без боли.
- 🔐 **RBAC** — роли и права доступа из коробки.
- 📱 **Адаптив** — удобно и на десктопе, и на мобиле.

---

## 🛠 Установка

```bash
# Клонируем репозиторий
git clone https://github.com/egorov/crm.git
cd crm

# Устанавливаем зависимости
npm install
# или
pnpm install
# или
yarn install
# или
bun install
```

---

## 💻 Запуск в dev‑режиме

```bash
npm run dev
# или pnpm dev / yarn dev / bun run dev
```

Открой [http://localhost:3000](http://localhost:3000) и наслаждайся.

---

## 🏗 Сборка под прод

```bash
npm run build
```

---

## 🔍 Локальный предпросмотр прод‑сборки

```bash
npm run preview
```

---

## 📂 Структура проекта

```
crm/
├─ app.vue              # Корневой компонент
├─ nuxt.config.ts       # Конфиг Nuxt
├─ layouts/             # Лейауты
├─ pages/               # Страницы
├─ components/          # UI и бизнес-компоненты
├─ composables/         # Логика и хуки
├─ stores/              # Pinia сторы
├─ assets/              # Стили, шрифты, картинки
├─ server/              # API-роуты и серверная логика
└─ lib/                 # Утилиты и типы
```

---

## 🧩 Переменные окружения

Создай `.env` и пропиши:

```env
NUXT_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NUXT_APPWRITE_PROJECT=your_project_id
NUXT_APPWRITE_API_KEY=your_api_key
```

---

## 🤝 Контрибьютинг

1. Форкни репозиторий
2. Создай ветку `feature/awesome`
3. Сделай коммит
4. Открой PR

---

## 📜 Лицензия

MIT — используй, улучшай, делись.

---
