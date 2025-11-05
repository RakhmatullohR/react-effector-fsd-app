// Counter logikasi: eventlar + storelar shu yerda.
// UI faqat event chaqiradi va storelarni o'qiydi.
import { combine, createEvent, createStore } from '../../shared/lib/effector';

// --- Events
export const increment = createEvent();
export const decrement = createEvent();
export const reset = createEvent<number | void>();

// --- State (store)
const defaultCount = 0;
export const $count = createStore<number>(defaultCount)
   .on(increment, s => s + 1)
   .on(decrement, s => s - 1)
   .on(reset, (s, payload) => {
      console.log('s :>> ', s);
      return typeof payload === 'number' ? payload : 0;
   });

// --- Derived state (hisob-kitobni modelda saqlaymiz)
export const $isEven = combine($count, n => n % 2 === 0);
