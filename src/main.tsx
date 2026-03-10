import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'
import './index.css'

const clarityProjectId = import.meta.env.VITE_CLARITY_PROJECT_ID?.trim()

if (clarityProjectId) {
  let hasStartedClarity = false

  const startClarity = () => {
    if (hasStartedClarity) return
    hasStartedClarity = true

    const loadClarity = () => {
      void import('@microsoft/clarity').then(({ default: Clarity }) => {
        Clarity.init(clarityProjectId)
      })
    }

    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(loadClarity, { timeout: 2000 })
      return
    }

    window.setTimeout(loadClarity, 0)
  }

  const scheduleClarity = () => {
    const interactionEvents: Array<keyof WindowEventMap> = [
      'pointerdown',
      'keydown',
      'touchstart',
    ]

    const cleanup = () => {
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, handleInteraction)
      })
    }

    const handleInteraction = () => {
      cleanup()
      startClarity()
    }

    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, handleInteraction, { passive: true, once: true })
    })

    window.setTimeout(() => {
      cleanup()
      startClarity()
    }, 60000)
  }

  if (document.readyState === 'complete') {
    scheduleClarity()
  } else {
    window.addEventListener('load', scheduleClarity, { once: true })
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
