// Ilovani ishga tushiradigan joy (root).
// Bu yerda faqat React DOM render bo'ladi.
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../App';

const container = document.getElementById('root');
if (!container) {
   throw new Error('#root element topilmadi');
}
const root = createRoot(container);

root.render(
   // StrictMode ixtiyoriy (debug payti foydali)
   <React.StrictMode>
      <App />
   </React.StrictMode>
);
