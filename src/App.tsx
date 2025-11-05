import { Counter } from './entities/counter/ui';
import { TodosList } from './entities/todos/ui';

export default function App() {
   return (
      <main style={{ padding: 20, fontFamily: 'sans-serif' }}>
         <h1>React + TypeScript + Effector (FSD)</h1>
         <Counter />

         <hr />

         <h2>Todos</h2>
         <TodosList />
      </main>
   );
}
