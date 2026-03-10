import { Suspense, lazy } from 'react'

const LandingPage = lazy(() =>
  import('./landing/LandingPage').then((module) => ({ default: module.LandingPage })),
)
const LegalPage = lazy(() =>
  import('./legal/LegalPage').then((module) => ({ default: module.LegalPage })),
)
const ThankYouPage = lazy(() =>
  import('./thankyou/ThankYouPage').then((module) => ({ default: module.ThankYouPage })),
)

function App() {
  const normalizedPath = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/'

  if (normalizedPath === '/politica-de-privacidade') {
    return (
      <Suspense fallback={null}>
        <LegalPage kind="privacy" />
      </Suspense>
    )
  }

  if (normalizedPath === '/termos-de-uso') {
    return (
      <Suspense fallback={null}>
        <LegalPage kind="terms" />
      </Suspense>
    )
  }

  if (normalizedPath === '/obrigado') {
    return (
      <Suspense fallback={null}>
        <ThankYouPage />
      </Suspense>
    )
  }

  return (
    <Suspense fallback={null}>
      <LandingPage />
    </Suspense>
  )
}

export default App
