import { useCallback, useEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'

type CourseTab = {
  id: string
  label: string
  title: string
  description: string
  highlight: string
  bullets: string[]
}

const courseTabs: CourseTab[] = [
  {
    id: 'sobre',
    label: 'Sobre o curso',
    title: 'SOBRE O CURSO DE ENFERMAGEM',
    description:
      'A cada disciplina, você contará com leituras digitais, slides, videoaulas e podcasts preparados por professores de destaque na área, que aliam conhecimentos teóricos e discussões sobre a prática profissional, com aprendizagem em foco.',
    highlight:
      'A cada disciplina, você contará com leituras digitais, slides, videoaulas e podcasts preparados por professores de destaque.',
    bullets: [
      'Base teórica e prática equilibrada',
      'Acompanhamento com docentes experientes',
      'Conteúdo atualizado para a área da saúde',
      'Formação orientada para a vida real',
    ],
  },
  {
    id: 'perfil',
    label: 'Perfil do profissional',
    title: 'PERFIL DO PROFISSIONAL',
    description:
      'Ao final da graduação, o egresso estará preparado para atuar com olhar clínico, empatia e responsabilidade, considerando o cuidado integral do paciente em diferentes contextos.',
    highlight:
      'O profissional formado desenvolve liderança, pensamento crítico e capacidade de decisão em cenários complexos.',
    bullets: [
      'Atuação humanizada no cuidado',
      'Visão estratégica em saúde coletiva',
      'Capacidade de liderar equipes multiprofissionais',
      'Postura ética em todas as etapas do cuidado',
    ],
  },
  {
    id: 'mercado',
    label: 'Mercado de trabalho',
    title: 'MERCADO DE TRABALHO',
    description:
      'A enfermagem segue com alta demanda em hospitais, clínicas, unidades básicas, atenção domiciliar e empresas. O mercado valoriza profissionais com boa formação técnica e visão interdisciplinar.',
    highlight:
      'Com uma formação completa, você amplia suas oportunidades de ingresso e crescimento em diferentes frentes da saúde.',
    bullets: [
      'Alta empregabilidade em todo o país',
      'Possibilidade de carreira em gestão',
      'Espaço para atuação pública e privada',
      'Evolução contínua com especializações',
    ],
  },
  {
    id: 'grade',
    label: 'Grade curricular',
    title: 'GRADE CURRICULAR',
    description:
      'A estrutura curricular combina fundamentos biológicos, ciências humanas, prática supervisionada e componentes de inovação em saúde para uma jornada acadêmica progressiva.',
    highlight:
      'A grade foi desenhada para conectar teoria, laboratório e campo prático desde os primeiros períodos.',
    bullets: [
      'Disciplinas organizadas por trilhas',
      'Atividades práticas desde cedo',
      'Integração com projetos interdisciplinares',
      'Progressão clara de competências',
    ],
  },
  {
    id: 'modalidade',
    label: 'Modalidade',
    title: 'MODALIDADE',
    description:
      'Esta graduação é ofertada na modalidade presencial, com experiências práticas e acompanhamento próximo de professores e tutores ao longo de toda a formação.',
    highlight:
      'A vivência presencial fortalece habilidades técnicas, comunicação com pacientes e trabalho em equipe.',
    bullets: [
      'Aulas presenciais com suporte acadêmico',
      'Laboratórios e atividades em campo',
      'Interação direta com professores',
      'Rotina de aprendizado colaborativo',
    ],
  },
]

export function FooterSection() {
  const [activeTabId, setActiveTabId] = useState(courseTabs[0].id)
  const navRef = useRef<HTMLElement | null>(null)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const activeIndex = courseTabs.findIndex((tab) => tab.id === activeTabId)
  const activeTab = courseTabs[activeIndex] ?? courseTabs[0]
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 133 })

  const updateIndicator = useCallback(() => {
    const navElement = navRef.current
    const activeButton = tabRefs.current[activeIndex]
    if (!navElement || !activeButton) {
      return
    }

    const navRect = navElement.getBoundingClientRect()
    const buttonRect = activeButton.getBoundingClientRect()

    setIndicatorStyle({
      left: buttonRect.left - navRect.left + navElement.scrollLeft,
      width: buttonRect.width,
    })
  }, [activeIndex])

  useEffect(() => {
    updateIndicator()

    if ('fonts' in document) {
      document.fonts.ready.then(updateIndicator).catch(() => undefined)
    }

    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [updateIndicator])

  const setActiveByIndex = useCallback((index: number) => {
    const nextTab = courseTabs[index]
    const nextButton = tabRefs.current[index]
    if (!nextTab) {
      return
    }

    setActiveTabId(nextTab.id)
    nextButton?.focus()
  }, [])

  const handleTabKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        setActiveByIndex((index + 1) % courseTabs.length)
        return
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        setActiveByIndex((index - 1 + courseTabs.length) % courseTabs.length)
        return
      }

      if (event.key === 'Home') {
        event.preventDefault()
        setActiveByIndex(0)
        return
      }

      if (event.key === 'End') {
        event.preventDefault()
        setActiveByIndex(courseTabs.length - 1)
      }
    },
    [setActiveByIndex],
  )

  return (
    <section id="contato" className="lp-course-tabs">
      <div className="lp-course-tabs__inner">
        <nav ref={navRef} className="lp-course-tabs__nav" aria-label="Subseções do curso" role="tablist">
          {courseTabs.map((tab, index) => (
            <button
              key={tab.id}
              id={`course-tab-${tab.id}`}
              ref={(node) => {
                tabRefs.current[index] = node
              }}
              type="button"
              role="tab"
              aria-selected={activeTab.id === tab.id}
              aria-controls={`course-panel-${tab.id}`}
              className={`lp-course-tabs__tab ${activeTab.id === tab.id ? 'is-active' : ''}`}
              onClick={() => setActiveTabId(tab.id)}
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

        <article
          id={`course-panel-${activeTab.id}`}
          role="tabpanel"
          aria-labelledby={`course-tab-${activeTab.id}`}
          className="lp-course-about"
        >
          <div className="lp-course-about__media">
            <img
              src="/landing/course-about-image.png"
              alt="Profissional de enfermagem orientando uma paciente"
              width={550}
              height={665}
            />
          </div>

          <div className="lp-course-about__content">
            <h2 className="lp-course-about__title">{activeTab.title}</h2>
            <p className="lp-course-about__description">{activeTab.description}</p>
            <p className="lp-course-about__highlight">{activeTab.highlight}</p>

            <ul className="lp-course-about__bullets">
              {activeTab.bullets.map((item) => (
                <li key={item}>
                  <img src="/landing/course-check.svg" alt="" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </section>
  )
}
