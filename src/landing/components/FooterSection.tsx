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
    'A gradua\u00e7\u00e3o em Enfermagem forma profissionais qualificados para atuar na promo\u00e7\u00e3o, preven\u00e7\u00e3o e recupera\u00e7\u00e3o da sa\u00fade em diferentes n\u00edveis de aten\u00e7\u00e3o \u00e0 sa\u00fade. Com dura\u00e7\u00e3o de 5 (cinco) anos, o curso desenvolve compet\u00eancias t\u00e9cnicas, cient\u00edficas e humanas, preparando o estudante para o trabalho interdisciplinar e para a tomada de decis\u00f5es cl\u00ednicas com responsabilidade e seguran\u00e7a.',
  highlight:
    'A forma\u00e7\u00e3o integra teoria e pr\u00e1tica desde os primeiros per\u00edodos, fortalecendo habilidades em assist\u00eancia, gest\u00e3o do cuidado, administra\u00e7\u00e3o de medicamentos, interpreta\u00e7\u00e3o de dados cl\u00ednicos e defini\u00e7\u00e3o de condutas baseadas em evid\u00eancias.',
  bullets: [
    'Aprenda com imers\u00e3o pr\u00e1tica intensiva desde o primeiro per\u00edodo do curso',
    'Laborat\u00f3rios pr\u00f3prios com simuladores e tecnologia de ponta',
    'Atua\u00e7\u00e3o na promo\u00e7\u00e3o, preven\u00e7\u00e3o e cuidado integral \u00e0 sa\u00fade',
    'Prepara\u00e7\u00e3o para atua\u00e7\u00e3o em m\u00faltiplos contextos assistenciais de sa\u00fade',
    'Desenvolvimento de responsabilidade social e postura \u00e9tica',
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
          <nav
            ref={navRef}
            className="lp-course-tabs__nav"
            aria-label="Navega\u00e7\u00e3o de se\u00e7\u00f5es do curso"
          >
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
              src="/landing/sobre-o-curso-de-enfermagem.webp"
              srcSet="/landing/sobre-o-curso-de-enfermagem-mobile.webp 640w, /landing/sobre-o-curso-de-enfermagem.webp 1200w"
              sizes="(max-width: 640px) 100vw, 430px"
              alt="Alunos de enfermagem em treinamento pr\u00e1tico"
              width={430}
              height={435}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
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
          </div>

          <button type="button" className="lp-course-about__cta" onClick={onOpenPopup}>
            Saiba mais
          </button>
        </article>
      </div>
    </section>
  )
}
