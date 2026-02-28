import { useEffect, useState } from 'react'

import type { CourseLeadSelection } from '../crmLead'
import {
  POS_COURSES_ENDPOINT,
  isHealthArea,
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

const fallbackHealthCourses: HealthCourse[] = [
  {
    id: 'fallback-pos-urgencia-emergencia',
    title: 'URGÊNCIA E EMERGÊNCIA',
    currentPrice: '18X R$ 66,00/MÊS',
    oldPrice: '18X R$ 132,00',
    showCoren: true,
    selection: {
      courseType: 'pos',
      courseValue: 'pos-urgencia-emergencia',
      courseLabel: 'Urgência e Emergência',
    },
  },
  {
    id: 'fallback-pos-enfermagem-trabalho',
    title: 'ENFERMAGEM DO TRABALHO',
    currentPrice: '18X R$ 66,00/MÊS',
    oldPrice: '18X R$ 132,00',
    showCoren: true,
    selection: {
      courseType: 'pos',
      courseValue: 'pos-enfermagem-trabalho',
      courseLabel: 'Enfermagem do Trabalho',
    },
  },
  {
    id: 'fallback-pos-uti',
    title: 'ENFERMAGEM EM UTI',
    currentPrice: '18X R$ 66,00/MÊS',
    oldPrice: '18X R$ 132,00',
    showCoren: true,
    selection: {
      courseType: 'pos',
      courseValue: 'pos-enfermagem-uti',
      courseLabel: 'Enfermagem em UTI',
    },
  },
]

function normalizeText(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

function normalizeUpperText(value: string): string {
  return normalizeText(value).toUpperCase()
}

function formatCurrentPriceForCard(value: string): string {
  const normalized = normalizeUpperText(value)
  if (!normalized) return '18X R$ 66,00/MÊS'
  if (/\/M[EÊ]S/i.test(normalized)) return normalized
  return `${normalized}/MÊS`
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
        const parsedCourses = parsePostGraduationCourses(rawText)
        const parsedHealthCourses = parsedCourses
          .filter((course) => isHealthArea(course.area))
          .map(mapPostCourseToHealthCard)

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
            Explore nossos cursos e encontre o caminho ideal para sua carreira.
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
                        CHANCELADO COREN
                      </span>
                    ) : null}

                    <div className="lp-health-card__tags-secondary">
                      <span className="lp-health-tag lp-health-tag--video">
                        <img src="/landing/course-tag-video.svg" alt="" aria-hidden="true" />
                        COM VIDEOAULAS
                      </span>

                      <span className="lp-health-tag lp-health-tag--school">
                        <img src="/landing/course-tag-school.svg" alt="" aria-hidden="true" />
                        PÓS-GRADUAÇÃO EAD
                      </span>
                    </div>
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
      </div>
    </section>
  )
}
