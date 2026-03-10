import { useEffect, useState } from 'react'

type FaqSectionProps = {
  onOpenPopup: () => void
}

const MOBILE_PROGRAM_QUERY = '(max-width: 640px)'

export function FaqSection({ onOpenPopup }: FaqSectionProps) {
  const [isMobileLayout, setIsMobileLayout] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }

    return window.matchMedia(MOBILE_PROGRAM_QUERY).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const queryList = window.matchMedia(MOBILE_PROGRAM_QUERY)
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

  return (
    <section id="graduacao" className="lp-program">
      <div className="lp-program__inner">
        <div className="lp-program__content">
          <div className="lp-program__location">
            <img
              className="lp-program__location-icon"
              src="/landing/graduacao-location-on.svg"
              alt=""
              aria-hidden="true"
            />
            <p className="lp-program__location-text">
              <strong>Local:</strong>{' '}
              <span>Rua Dr. Diogo de Faria, 66 - Vila Mariana, São Paulo - SP, CEP: 04037-000</span>
            </p>
          </div>

          <h1 className="lp-program__title">GRADUAÇÃO PRESENCIAL EM ENFERMAGEM</h1>
          <p className="lp-program__subtitle">
            Formando profissionais de excelência no cuidado com os pacientes.
          </p>

          <div className="lp-program__meta">
            <div className="lp-program__meta-item">
              <div className="lp-program__meta-icon-wrap">
                <img
                  className="lp-program__meta-icon"
                  src="/landing/graduacao-auto-stories.svg"
                  alt=""
                  aria-hidden="true"
                />
              </div>
              <div className="lp-program__meta-text">
                <strong>Modalidade:</strong>
                <span>Presencial</span>
              </div>
            </div>

            <div className="lp-program__meta-item">
              <div className="lp-program__meta-icon-wrap">
                <img
                  className="lp-program__meta-icon"
                  src="/landing/graduacao-calendar-month.svg"
                  alt=""
                  aria-hidden="true"
                />
              </div>
              <div className="lp-program__meta-text">
                <strong>Início das aulas:</strong>
                <span>01/07/26</span>
              </div>
            </div>
          </div>

          <button type="button" className="lp-program__cta" onClick={onOpenPopup}>
            Saiba mais
          </button>
        </div>

        {!isMobileLayout ? (
          <div className="lp-program__media">
            <img
              src="/landing/graduacao-presencial-em-enfermagem.webp"
              alt="Equipe de enfermagem atendendo paciente em ambiente hospitalar"
              width={736}
              height={403}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
          </div>
        ) : null}
      </div>

      {isMobileLayout ? (
        <div className="lp-program__mobile-tabs-image">
          <img
            src="/landing/graduacao-presencial-em-enfermagem-mobile.webp"
            alt="Aluna de enfermagem no laboratório da graduação"
            width={585}
            height={321}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
          />
        </div>
      ) : null}
    </section>
  )
}
