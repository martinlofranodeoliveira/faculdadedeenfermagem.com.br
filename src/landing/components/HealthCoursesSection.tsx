import { useEffect, useState } from 'react'

import type { CourseLeadSelection } from '../crmLead'
import {
  POS_COURSES_ENDPOINT,
  filterNursingPostCourses,
  getNursingPostCourseFallback,
  parsePostGraduationCourses,
  type PostCourse,
} from '../postCourses'

type HealthCourse = {
  id: string
  title: string
  currentPrice: string
  oldPrice: string
  showCoren: boolean
  selection: CourseLeadSelection
}

type HealthCoursesSectionProps = {
  onOpenCoursePopup: (selection: CourseLeadSelection) => void
}

const MOBILE_HEALTH_COURSES_QUERY = '(max-width: 640px)'
const MOBILE_HEALTH_PAGE_SIZE = 6
const DESKTOP_HEALTH_PAGE_SIZE = 6

function normalizeText(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

function normalizeUpperText(value: string): string {
  return normalizeText(value).toUpperCase()
}

function formatCurrentPriceForCard(value: string): string {
  const normalized = normalizeUpperText(value)
  if (!normalized) return '18X R$ 66,00/MÊS'

  const valueWithMonthAccent = normalized.replace(/\/MES/gi, '/MÊS')
  if (/\/M[EÊ]S/i.test(valueWithMonthAccent)) {
    return valueWithMonthAccent
  }

  return `${valueWithMonthAccent}/MÊS`
}

function formatOldPriceForCard(oldValue: string, currentValueWithSuffix: string): string {
  const normalizedOld = normalizeUpperText(oldValue)
  if (!normalizedOld) return ''

  const normalizedCurrent = normalizeUpperText(currentValueWithSuffix.replace(/\/M[EÊ]S$/i, ''))
  if (normalizedOld === normalizedCurrent) return ''

  return normalizedOld
}

function mapPostCourseToHealthCard(course: PostCourse): HealthCourse {
  const currentPrice = formatCurrentPriceForCard(course.currentInstallmentPrice)
  const oldPrice = formatOldPriceForCard(course.oldInstallmentPrice, currentPrice)

  return {
    id: course.value,
    title: normalizeUpperText(course.label),
    currentPrice,
    oldPrice,
    showCoren: true,
    selection: {
      courseType: 'pos',
      courseValue: course.value,
      courseLabel: course.label,
      courseId: course.courseId,
    },
  }
}

const fallbackHealthCourses: HealthCourse[] = getNursingPostCourseFallback().map(
  mapPostCourseToHealthCard,
)

const HEALTH_COURSES_NOTICE =
  'Os cursos atendem às normativas e exigências estabelecidas pelo COREN, assegurando conformidade com a legislação profissional vigente.'

function getVisiblePageNumbers(currentPage: number, totalPages: number): number[] {
  if (totalPages <= 3) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const firstPage = Math.max(1, Math.min(currentPage - 1, totalPages - 2))
  return [firstPage, firstPage + 1, firstPage + 2]
}

export function HealthCoursesSection({ onOpenCoursePopup }: HealthCoursesSectionProps) {
  const [healthCourses, setHealthCourses] = useState<HealthCourse[]>(fallbackHealthCourses)
  const [isMobileLayout, setIsMobileLayout] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const abortController = new AbortController()
    let isMounted = true

    const loadCourses = async () => {
      try {
        const response = await fetch(POS_COURSES_ENDPOINT, {
          method: 'GET',
          signal: abortController.signal,
          headers: {
            Accept: 'text/plain, */*',
          },
        })

        if (!response.ok) {
          return
        }

        const rawText = await response.text()
        const parsedHealthCourses = filterNursingPostCourses(
          parsePostGraduationCourses(rawText),
        ).map(mapPostCourseToHealthCard)

        if (!isMounted || parsedHealthCourses.length === 0) {
          return
        }

        setHealthCourses(parsedHealthCourses)
      } catch {
        // Keeps fallback cards if API is unavailable.
      }
    }

    void loadCourses()

    return () => {
      isMounted = false
      abortController.abort()
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const queryList = window.matchMedia(MOBILE_HEALTH_COURSES_QUERY)
    const handleQueryChange = (event: MediaQueryListEvent) => {
      setIsMobileLayout(event.matches)
    }

    setIsMobileLayout(queryList.matches)

    if (typeof queryList.addEventListener === 'function') {
      queryList.addEventListener('change', handleQueryChange)
      return () => queryList.removeEventListener('change', handleQueryChange)
    }

    queryList.addListener(handleQueryChange)
    return () => queryList.removeListener(handleQueryChange)
  }, [])

  const pageSize = isMobileLayout ? MOBILE_HEALTH_PAGE_SIZE : DESKTOP_HEALTH_PAGE_SIZE
  const totalPages = Math.max(1, Math.ceil(healthCourses.length / pageSize))

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const firstVisibleCourseIndex = (currentPage - 1) * pageSize
  const visibleCourses = healthCourses.slice(firstVisibleCourseIndex, firstVisibleCourseIndex + pageSize)
  const visibleCourseCount = Math.min(firstVisibleCourseIndex + visibleCourses.length, healthCourses.length)
  const visiblePageNumbers = getVisiblePageNumbers(currentPage, totalPages)

  return (
    <section id="cursos-saude" className="lp-health">
      <div className="lp-health__inner">
        <div className="lp-health__banner">
          <picture className="lp-health__banner-picture">
            <source media="(max-width: 640px)" srcSet="/landing/pos-graduacao-ead-banner-mobile.webp" />
            <img
              className="lp-health__banner-image"
              src="/landing/pos-graduacao-ead-banner.webp"
              alt="PÓS EAD NA ÁREA DA SAÚDE ENFERMEIROS ESPECIALIZADOS RECEBEM SALÁRIOS ATÉ 2X MAIORES"
              width={1236}
              height={316}
            />
          </picture>
        </div>

        <div className="lp-health__list-wrap">
          <div className="lp-health__list">
            {visibleCourses.map((course) => (
              <article key={course.id} className="lp-health-card">
                <div className="lp-health-card__content">
                  <div className="lp-health-card__tags">
                    {course.showCoren ? (
                      <span className="lp-health-tag lp-health-tag--coren">
                        <img src="/landing/course-tag-verified.svg" alt="" aria-hidden="true" />
                        RECONHECIDO PELO MEC
                      </span>
                    ) : null}

                    <span className="lp-health-tag lp-health-tag--video">
                      <img src="/landing/course-tag-video.svg" alt="" aria-hidden="true" />
                      COM VIDEOAULAS
                    </span>
                  </div>

                  <h3 className="lp-health-card__name">{course.title}</h3>

                  <p className="lp-health-card__price">
                    <strong>{course.currentPrice}</strong>
                    {course.oldPrice ? <span>{course.oldPrice}</span> : null}
                  </p>
                </div>

                <button
                  type="button"
                  className="lp-health-card__cta"
                  onClick={() => onOpenCoursePopup(course.selection)}
                >
                  INSCREVA-SE
                </button>
              </article>
            ))}
          </div>
        </div>

        {totalPages > 1 ? (
          <nav className="lp-health__pager" aria-label="Paginação dos cursos de pós-graduação">
            <div className="lp-health__pager-controls">
              <button
                type="button"
                className="lp-health__pager-arrow"
                onClick={() => setCurrentPage((previousPage) => Math.max(1, previousPage - 1))}
                disabled={currentPage === 1}
                aria-label="Página anterior"
              >
                <span aria-hidden="true">‹</span>
              </button>

              <div className="lp-health__pager-pages">
                {visiblePageNumbers.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    className={`lp-health__pager-page${pageNumber === currentPage ? ' is-active' : ''}`}
                    onClick={() => setCurrentPage(pageNumber)}
                    aria-current={pageNumber === currentPage ? 'page' : undefined}
                    aria-label={`Ir para página ${pageNumber}`}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="lp-health__pager-arrow lp-health__pager-arrow--next"
                onClick={() => setCurrentPage((previousPage) => Math.min(totalPages, previousPage + 1))}
                disabled={currentPage === totalPages}
                aria-label="Próxima página"
              >
                <span aria-hidden="true">›</span>
              </button>
            </div>

            <p className="lp-health__pager-status" aria-live="polite">
              {visibleCourseCount} de {healthCourses.length} cursos
            </p>
          </nav>
        ) : null}

        <aside className="lp-health__notice" role="note" aria-label="Aviso sobre regulamentação dos cursos">
          <img
            className="lp-health__notice-icon"
            src="/landing/course-alert.svg"
            alt=""
            aria-hidden="true"
          />
          <p className="lp-health__notice-text">{HEALTH_COURSES_NOTICE}</p>
        </aside>
      </div>
    </section>
  )
}
