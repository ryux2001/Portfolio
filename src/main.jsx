import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import './index.css'
import App from './App.jsx'
import { AccessibilityProvider } from './context/AccessibilityContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <AccessibilityProvider>
        <App />
      </AccessibilityProvider>
    </MotionConfig>
  </StrictMode>,
)
