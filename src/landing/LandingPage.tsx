import './landing.css'
import { Suspense, lazy, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

import type { CourseLeadSelection } from './crmLead'
import { CourseSection } from './components/CourseSection'
import { FaqSection } from './components/FaqSection'
import { Header } from './components/Header'
import { HeroSection } from './components/HeroSection'

const EnrollmentPopup = lazy(() =>
  import('./components/EnrollmentPopup').then((module) => ({ default: module.EnrollmentPopup })),
)
const DeferredLandingSections = lazy(() =>
  import('./components/DeferredLandingSections').then((module) => ({
    default: module.DeferredLandingSections,
  })),
)

const HERO_COURSE_SELECTION: CourseLeadSelection = {
  courseType: 'graduacao',
  courseValue: 'graduacao-enfermagem',
  courseLabel: 'Graduação em Enfermagem Presencial',
}

export function LandingPage() {
  const [popupSelection, setPopupSelection] = useState<CourseLeadSelection | null>(null)
  const [shouldRenderDeferredSections, setShouldRenderDeferredSections] = useState(false)
  const deferredSectionsAnchorRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const resetScrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }

    const nextUrl = `${window.location.pathname}${window.location.search}`
    if (window.location.hash) {
      window.history.replaceState(null, '', nextUrl)
    }

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    resetScrollToTop()

    const frameId = window.requestAnimationFrame(() => {
      resetScrollToTop()
    })

    window.addEventListener('pageshow', resetScrollToTop)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('pageshow', resetScrollToTop)
    }
  }, [])

  useEffect(() => {
    if (shouldRenderDeferredSections) {
      return
    }

    const anchorElement = deferredSectionsAnchorRef.current
    if (!anchorElement || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setShouldRenderDeferredSections(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldRenderDeferredSections(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '720px 0px',
      },
    )

    observer.observe(anchorElement)

    return () => {
      observer.disconnect()
    }
  }, [shouldRenderDeferredSections])

  const openHeroPopup = useCallback(() => {
    setPopupSelection(HERO_COURSE_SELECTION)
  }, [])

  const openCoursePopup = useCallback((selection: CourseLeadSelection) => {
    setPopupSelection(selection)
  }, [])

  const closePopup = useCallback(() => {
    setPopupSelection(null)
  }, [])

  return (
    <main className="lp-page">
      <Header onOpenPopup={openHeroPopup} />
      <HeroSection onOpenPopup={openHeroPopup} />
      <CourseSection />
      <FaqSection onOpenPopup={openHeroPopup} />
      <div ref={deferredSectionsAnchorRef} aria-hidden="true" />
      {shouldRenderDeferredSections ? (
        <Suspense fallback={null}>
          <DeferredLandingSections
            onOpenPopup={openHeroPopup}
            onOpenCoursePopup={openCoursePopup}
          />
        </Suspense>
      ) : null}
      {popupSelection ? (
        <Suspense fallback={null}>
          <EnrollmentPopup
            key={`${popupSelection.courseValue}-${popupSelection.courseId ?? 0}`}
            isOpen
            selection={popupSelection}
            onClose={closePopup}
          />
        </Suspense>
      ) : null}
    </main>
  )
}
