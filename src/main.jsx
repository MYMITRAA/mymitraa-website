import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { LanguageProvider } from './context/LanguageContext'  // ← add
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <LanguageProvider>   {/* ← wrap */}
          <App />
        </LanguageProvider>  {/* ← wrap */}
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
)