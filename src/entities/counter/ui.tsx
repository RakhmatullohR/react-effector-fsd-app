// Counter komponenti: faqat event chaqiradi, storelarni o'qiydi.
// Hech qanday hisob-kitob UI'da emas — modelda.
import { useUnit } from '../../shared/lib/effector';
import { $count, $isEven, decrement, increment, reset } from './model';

export function Counter() {
   const [count, isEven, inc, dec, rst] = useUnit([
      $count,
      $isEven,
      increment,
      decrement,
      reset,
   ]);

   return (
      <section
         style={{
            padding: 16,
            display: 'grid',
            gap: 8,
            width: 260,
            border: '1px solid #eee',
            borderRadius: 8,
         }}
      >
         <h3 style={{ margin: 0 }}>Counter: {count}</h3>
         <p style={{ margin: 0, opacity: 0.8 }}>
            Parity: {isEven ? 'even' : 'odd'}
         </p>

         <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={inc}>➕ Increment</button>
            <button onClick={dec}>➖ Decrement</button>
            <button onClick={() => rst()}>↺ Reset</button>
         </div>
      </section>
   );
}
