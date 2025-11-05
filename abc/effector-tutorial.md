Bu shu tartibda ketilsang, Effector’ni chuqur egallaysan.
Bu tartib aynan FSD uslubida ham mos bo‘ladi.

---

# Effector MASTER ROADMAP

**(0 dan → Pro / FSD daraja)**

## 1 — Boshlang‘ich asoslar

-  Effector nima? event, store, effect tushunchalari
-  `createEvent`, `createStore`, `createEffect`
-  `.on()` bilan store’ni yangilash
-  `.watch()` nima

## 2 — React integratsiyasi

-  `useUnit()` nima
-  storelarni React component ichida ishlatish
-  dependency array yo‘qligi va “deriving” tushunchasi

## 3 — Derived State / Combine

-  `combine()` bilan derived state
-  computed store’lar konsepsiyasi
-  caching va dependency DAG

## 4 — Async logika

-  `createEffect` (async)
-  `.pending` store
-  `finally`, `fail`, `done`, `failData`, `doneData`
-  error handling

## 5 — sample — **Effectorning yadro engine’i**

-  `sample()` nima uchun “central orchestrator”
-  clock / source / target
-  sample orqali “feature flow”larni chizish
-  Redux-saga o‘rnini bosuvchi mantiqlar

## 6 — attach

-  dynamic effect configuratsiya
-  remote API client + params binding
-  FSD’da “shared/api” bilan ishlatish

## 7 — split + guard

-  eventlarni va effect natijalarini shart bo‘yicha tarqatish
-  domen bo‘yicha routing logic
-  UI conditional flow’lar

## 8 — FSD Integration

-  model’larni `entities`ga
-  view’larni `ui`ga
-  actions esa `model` ichida
-  events, effects, stores’ni “export surface” bilan boshqarish
-  `index.ts` pivot file tuzilmalari

## 9 — Scope va SSR (advanced)

-  `fork`, `allSettled`, `serialize`
-  server side rendering — Next.js da effector
-  request-level isolation
-  “state leaking”ni oldini olish

## 10 — Testing

-  events bilan unit test
-  effects mock/testing
-  scope testing (`fork` bilan)

## 11 — Performance profiling

-  unnecessary re-rendersni oldini olish
-  combine misuse
-  splitting state
-  lazy modules

## 12 — Production Anti-Patterns + Best Practices

-  `sample({ source: $store... })` o‘rniga noto‘g‘ri ketma-ketlar
-  `effect`ni component ichida chaqirmaslik
-  “fat model” o‘rniga FSD layering

## 13 — Patterns Library (senior level)

-  event-driven form validation
-  query-cache pattern (RTK Query muqobili)
-  entity normalize pattern
-  debounced event / throttled flow
-  optimistic updates

## 14 — Real Case Study

-  Auth flow: login → refresh token → user store
-  Todos + filter + pagination
-  ACL / Role-based routing

## 15 — Enterprise FSD Setup Template

-  shared/api
-  shared/lib
-  entities/_ / features/_ / widgets/ / pages/
-  API client attach
-  Cross-widget orchestratsiya sample-based
