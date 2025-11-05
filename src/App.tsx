// UI root (pages/widgets bo'lmagani uchun hozircha sodda).
// Keyinchalik Router qo'shsak, bu yerga <Router> bilan joylaymiz.
import { Counter } from './entities/counter/ui';

export default function App() {
   return (
      <main style={{ padding: 20, fontFamily: 'sans-serif' }}>
         <h1 style={{ marginTop: 0 }}>
            React + TypeScript + Effector (FSD minimal)
         </h1>
         <p style={{ marginTop: 0, opacity: 0.8 }}>
            Komponent faqat <b>event</b> chaqiradi, state esa <b>model</b>da.
         </p>

         <Counter />
      </main>
   );
}
