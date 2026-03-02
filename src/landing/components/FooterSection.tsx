import { useCallback, useEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'

type CourseTab = {
  id: string
  label: string
  targetId: string
}

const courseTabs: CourseTab[] = [
  { id: 'sobre', label: 'Sobre o curso', targetId: 'sobre-curso' },
  { id: 'perfil', label: 'Perfil do profissional', targetId: 'perfil-banner' },
  { id: 'mercado', label: 'Mercado de trabalho', targetId: 'mercado-trabalho' },
  { id: 'grade', label: 'Grade curricular', targetId: 'grade-curricular' },
]

const aboutCourse = {
  title: 'SOBRE O CURSO DE ENFERMAGEM',
  description:
    'A gradua\u00e7\u00e3o em Enfermagem capacita especialistas para trabalhar na preven\u00e7\u00e3o e no incentivo \u00e0 sa\u00fade em diferentes contextos. Com dura\u00e7\u00e3o de cinco anos, habilita para a atua\u00e7\u00e3o conjunta com demais profissionais do setor, aprimorando habilidades em assist\u00eancia, gest\u00e3o de f\u00e1rmacos, obten\u00e7\u00e3o de informa\u00e7\u00f5es cl\u00ednicas e defini\u00e7\u00e3o de condutas.',
  highlight:
    'Oferece forma\u00e7\u00e3o pr\u00e1tica e prepara o aluno para atender \u00e0s demandas sociais com excel\u00eancia.',
  bullets: [
    'Aprenda com imers\u00e3o pr\u00e1tica intensiva desde o in\u00edcio',
    'Atue na preven\u00e7\u00e3o e incentivo \u00e0 sa\u00fade',
    'Pratique em Laborat\u00f3rios pr\u00f3prios com simuladores e tecnologia de ponta',
    'Trabalhe em diferentes contextos e ambientes de sa\u00fade',
  ],
}

type FooterSectionProps = {
  onOpenPopup: () => void
}

export function FooterSection({ onOpenPopup }: FooterSectionProps) {
  const [activeTabId, setActiveTabId] = useState(courseTabs[0].id)
  const [isPinned, setIsPinned] = useState(false)
  const [shellHeight, setShellHeight] = useState(0)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })

  const sectionRef = useRef<HTMLElement | null>(null)
  const shellRef = useRef<HTMLDivElement | null>(null)
  const navRef = useRef<HTMLElement | null>(null)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const pinStartRef = useRef(0)

  const activeIndex = courseTabs.findIndex((tab) => tab.id === activeTabId)

  const measureShell = useCallback(() => {
    const shellElement = shellRef.current
    if (!shellElement) return
    setShellHeight(shellElement.offsetHeight)
  }, [])

  const recalculatePinStart = useCallback(() => {
    const sectionElement = sectionRef.current
    if (!sectionElement) return
    pinStartRef.current = window.scrollY + sectionElement.getBoundingClientRect().top
  }, [])

  const getScrollOffset = useCallback(() => {
    return (shellRef.current?.offsetHeight ?? shellHeight) + 12
  }, [shellHeight])

  const scrollToTarget = useCallback(
    (targetId: string) => {
      const targetElement = document.getElementById(targetId)
      if (!targetElement) return

      const offset = getScrollOffset()
      const top = window.scrollY + targetElement.getBoundingClientRect().top - offset

      window.scrollTo({
        top: Math.max(0, top),
        behavior: 'smooth',
      })
    },
    [getScrollOffset],
  )

  const setActiveByIndex = useCallback(
    (index: number, shouldScroll: boolean) => {
      const normalizedIndex = (index + courseTabs.length) % courseTabs.length
      const nextTab = courseTabs[normalizedIndex]
      const nextButton = tabRefs.current[normalizedIndex]
      if (!nextTab) return

      setActiveTabId(nextTab.id)
      nextButton?.focus()
      nextButton?.scrollIntoView({ inline: 'center', block: 'nearest' })

      if (shouldScroll) {
        scrollToTarget(nextTab.targetId)
      }
    },
    [scrollToTarget],
  )

  const updateIndicator = useCallback(() => {
    const navElement = navRef.current
    const activeButton = tabRefs.current[activeIndex]
    if (!navElement || !activeButton) return

    const navRect = navElement.getBoundingClientRect()
    const buttonRect = activeButton.getBoundingClientRect()

    setIndicatorStyle({
      left: buttonRect.left - navRect.left + navElement.scrollLeft,
      width: buttonRect.width,
    })
  }, [activeIndex])

  const updateActiveTabByScroll = useCallback(() => {
    const offset = getScrollOffset()
    let nextActiveId = courseTabs[0].id

    for (const tab of courseTabs) {
      const sectionElement = document.getElementById(tab.targetId)
      if (!sectionElement) continue

      const sectionTop = sectionElement.getBoundingClientRect().top
      if (sectionTop - offset <= 2) {
        nextActiveId = tab.id
      }
    }

    setActiveTabId((current) => (current === nextActiveId ? current : nextActiveId))
  }, [getScrollOffset])

  const handleTabKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        setActiveByIndex(index + 1, true)
        return
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        setActiveByIndex(index - 1, true)
        return
      }

      if (event.key === 'Home') {
        event.preventDefault()
        setActiveByIndex(0, true)
        return
      }

      if (event.key === 'End') {
        event.preventDefault()
        setActiveByIndex(courseTabs.length - 1, true)
      }
    },
    [setActiveByIndex],
  )

  useEffect(() => {
    const handleScroll = () => {
      setIsPinned(window.scrollY >= pinStartRef.current)
      updateActiveTabByScroll()
    }

    const handleResize = () => {
      measureShell()
      recalculatePinStart()
      updateIndicator()
      handleScroll()
    }

    measureShell()
    recalculatePinStart()
    updateIndicator()
    handleScroll()

    if ('fonts' in document) {
      document.fonts.ready
        .then(() => {
          handleResize()
        })
        .catch(() => undefined)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [measureShell, recalculatePinStart, updateIndicator, updateActiveTabByScroll])

  useEffect(() => {
    updateIndicator()
    const activeButton = tabRefs.current[activeIndex]
    activeButton?.scrollIntoView({ inline: 'center', block: 'nearest' })
  }, [activeIndex, updateIndicator])

  return (
    <section id="contato" ref={sectionRef} className="lp-course-tabs">
      <div
        className="lp-course-tabs__spacer"
        aria-hidden="true"
        style={isPinned && shellHeight ? { height: `${shellHeight}px` } : undefined}
      />

      <div ref={shellRef} className={`lp-course-tabs__shell ${isPinned ? 'is-pinned' : ''}`}>
        <div className="lp-course-tabs__inner">
          <nav ref={navRef} className="lp-course-tabs__nav" aria-label="Navegação de seções do curso">
            {courseTabs.map((tab, index) => (
              <button
                key={tab.id}
                ref={(node) => {
                  tabRefs.current[index] = node
                }}
                type="button"
                className={`lp-course-tabs__tab ${activeTabId === tab.id ? 'is-active' : ''}`}
                aria-current={activeTabId === tab.id ? 'page' : undefined}
                onClick={() => {
                  setActiveByIndex(index, true)
                }}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="lp-course-tabs__track" aria-hidden="true">
            <span className="lp-course-tabs__track-line" />
            <span
              className="lp-course-tabs__indicator"
              style={{
                width: `${indicatorStyle.width}px`,
                transform: `translateX(${indicatorStyle.left}px)`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="lp-course-tabs__content">
        <article id="sobre-curso" className="lp-course-about">
          <div className="lp-course-about__media">
            <img
              src="/landing/course-about-image.png"
              alt="Alunos de enfermagem em treinamento prático"
              width={430}
              height={435}
            />
          </div>

          <div className="lp-course-about__content">
            <h2 className="lp-course-about__title">{aboutCourse.title}</h2>
            <p className="lp-course-about__description">{aboutCourse.description}</p>
            <p className="lp-course-about__highlight">{aboutCourse.highlight}</p>

            <ul className="lp-course-about__bullets">
              {aboutCourse.bullets.map((item) => (
                <li key={item}>
                  <img src="/landing/course-check.svg" alt="" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button type="button" className="lp-course-about__cta" onClick={onOpenPopup}>
              Saiba mais
            </button>
          </div>
        </article>
      </div>
    </section>
  )
}

