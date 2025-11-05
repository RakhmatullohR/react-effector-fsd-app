// src/entities/todos/model.ts
import {
   createEffect,
   createEvent,
   createStore,
   sample,
} from '../../shared/lib/effector';
import { Todo } from './types';

// ==== Events (UI faqat shularni chaqiradi) ====
export const loadTodos = createEvent();
export const toggleRequested = createEvent<{
   id: number;
   completed: boolean;
}>();

// Ichki (model ichida ishlatiladigan) voqealar:
const applyOptimistic = createEvent<{
   id: number;
   next: boolean;
   prev: boolean;
}>();
const rollback = createEvent<{ id: number; prev: boolean }>();
const clearForId = createEvent<{ id: number }>();

// ==== Effects ====
export const fetchTodosFx = createEffect(async () => {
   const res = await fetch(
      'https://jsonplaceholder.typicode.com/todos?_limit=5'
   );
   if (!res.ok) throw new Error('Failed to load todos');
   return (await res.json()) as Todo[];
});

export const toggleCompletedFx = createEffect(
   async ({ id, completed }: { id: number; completed: boolean }) => {
      // Demo maqsadida JSONPlaceholder ishlatyapmiz:
      // U PATCH'ni qabul qiladi va echo qaytaradi (haqiqiy DB yozilmasa ham).
      const res = await fetch(
         `https://jsonplaceholder.typicode.com/todos/${id}`,
         {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed }),
         }
      );
      if (!res.ok) throw new Error('PATCH failed');
      const data = (await res.json()) as Partial<Todo>;
      return { id, completed: data.completed ?? completed };
   }
);

// ==== Stores ====
export const $todos = createStore<Todo[]>([])
   .on(fetchTodosFx.doneData, (_, data) => data)
   // optimistik qo'llanadi
   .on(applyOptimistic, (list, { id, next }) =>
      list.map(t => (t.id === id ? { ...t, completed: next } : t))
   )
   // rollback bo'lsa - orqaga qaytamiz
   .on(rollback, (list, { id, prev }) =>
      list.map(t => (t.id === id ? { ...t, completed: prev } : t))
   )
   // serverdan qaytgan natijani ham uyg'unlashtiramiz (xohlovga ko'ra)
   .on(toggleCompletedFx.doneData, (list, { id, completed }) =>
      list.map(t => (t.id === id ? { ...t, completed } : t))
   );

// Har bir todo uchun "pending" holati
export const $pendingById = createStore<Record<number, boolean>>({})
   .on(applyOptimistic, (map, { id }) => ({ ...map, [id]: true }))
   .on(clearForId, (map, { id }) => {
      const { [id]: _, ...rest } = map;
      return rest;
   });

// Rollback uchun "prev" qiymatni vaqtincha saqlab turamiz
export const $prevCompletedById = createStore<Record<number, boolean>>({})
   .on(applyOptimistic, (map, { id, prev }) => ({ ...map, [id]: prev }))
   .on(clearForId, (map, { id }) => {
      const { [id]: _, ...rest } = map;
      return rest;
   });

// Xatoni ko'rsatish uchun (ixtiyoriy)
export const $lastError = createStore<string | null>(null)
   .on(toggleCompletedFx.failData, (_, err) =>
      err instanceof Error ? err.message : String(err)
   )
   .reset(toggleCompletedFx.done);

// ==== Orkestratsiya ====

// UI: load → fetch
sample({
   clock: loadTodos,
   target: fetchTodosFx,
});

// Optimistik qo'llash uchun oldingi qiymatni hisoblab olamiz
sample({
   source: $todos,
   clock: toggleRequested, // UI shuni bosadi
   fn: (list, { id, completed }) => {
      const prev = list.find(t => t.id === id)?.completed ?? false;
      return { id, next: completed, prev };
   },
   target: applyOptimistic,
});

// Optimistik bilan bir vaqtda PATCH yuboramiz
sample({
   clock: toggleRequested,
   target: toggleCompletedFx,
});

// PATCH muvaffaqiyatli tugasa: pending/prev ni tozalaymiz
sample({
   clock: toggleCompletedFx.done,
   fn: ({ params }) => ({ id: params.id }),
   target: clearForId,
});

// PATCH muvaffaqiyatsiz bo'lsa: rollback (prev ga qayt)
sample({
   source: $prevCompletedById,
   clock: toggleCompletedFx.fail, // { params, error }
   fn: (prevMap, { params }) => ({ id: params.id, prev: prevMap[params.id] }),
   target: rollback,
});

// Rollback'dan keyin ham pending/prev ni tozalaymiz
sample({
   clock: rollback,
   fn: ({ id }) => ({ id }),
   target: clearForId,
});
