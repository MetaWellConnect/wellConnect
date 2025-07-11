import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import AuthProvider from './hooks/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
