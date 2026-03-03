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

export function HealthCoursesSection({ onOpenCoursePopup }: HealthCoursesSectionProps) {
  const [healthCourses, setHealthCourses] = useState<HealthCourse[]>(fallbackHealthCourses)

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

  return (
    <section id="cursos-saude" className="lp-health">
      <div className="lp-health__inner">
        <header className="lp-health__header">
          <h2 className="lp-health__title">PÓS EAD NA ÁREA DA SAÚDE</h2>
          <p className="lp-health__subtitle">
            <span className="lp-health__subtitle-highlight">ENFERMEIROS PÓS-GRADUADOS </span>
            <strong>RECEBEM SALÁRIOS ATÉ 2X MAIORES</strong>
          </p>
        </header>

        <div className="lp-health__list-wrap">
          <div className="lp-health__list">
            {healthCourses.map((course) => (
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
