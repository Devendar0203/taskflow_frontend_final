import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { mockService } from './services/mock.service';

// Initialize mock data in localStorage
mockService.init();

createRoot(document.getElementById('root')!).render(
  <App />
)
