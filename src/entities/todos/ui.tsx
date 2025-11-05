// src/entities/todos/ui.tsx
import { useEffect } from 'react';
import { useUnit } from '../../shared/lib/effector';
import {
   $lastError,
   $pendingById,
   $todos,
   fetchTodosFx,
   loadTodos,
   toggleRequested,
} from './model';
import { Todo } from './types';

export function TodosList() {
   const [todos, pending, load, toggle, pendingMap, lastError] = useUnit([
      $todos,
      fetchTodosFx.pending,
      loadTodos,
      toggleRequested,
      $pendingById,
      $lastError,
   ]);

   useEffect(() => {
      load();
   }, [load]);

   return (
      <section>
         <h3 style={{ marginTop: 0 }}>Todos</h3>

         {pending && <p>Loading todos...</p>}
         {!!lastError && (
            <p style={{ color: 'crimson' }}>
               Error: {lastError} (optimistik o‘zgartirish orqaga qaytarildi)
            </p>
         )}

         <ul
            style={{
               listStyle: 'none',
               padding: 0,
               opacity: pending ? 0.7 : 1,
            }}
         >
            {todos.map((t: Todo) => {
               const isBusy = !!pendingMap[t.id];
               return (
                  <li
                     key={t.id}
                     style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '6px 0',
                        borderBottom: '1px solid #eee',
                     }}
                  >
                     <input
                        type='checkbox'
                        checked={!!t.completed}
                        disabled={isBusy} // PATCH ketyapti — vaqtincha blok
                        onChange={e =>
                           toggle({ id: t.id, completed: e.target.checked })
                        }
                     />
                     <span
                        style={{
                           textDecoration: t.completed
                              ? 'line-through'
                              : 'none',
                           opacity: isBusy ? 0.6 : 1,
                        }}
                     >
                        {t.title}
                     </span>
                     {isBusy && <small>(saving…)</small>}
                  </li>
               );
            })}
         </ul>
      </section>
   );
}
