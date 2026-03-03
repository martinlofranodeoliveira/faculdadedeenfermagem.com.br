type FaqSectionProps = {
  onOpenPopup: () => void
}

export function FaqSection({ onOpenPopup }: FaqSectionProps) {
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
              <span>R. Júlio de Castilhos, 777 - Metrô Belém, São Paulo - SP, 03059-005</span>
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

        <div className="lp-program__media">
          <img
            src="/landing/graduacao-section-image.png"
            alt="Equipe de enfermagem atendendo paciente em ambiente hospitalar"
            width={736}
            height={403}
          />
        </div>
      </div>

      <div className="lp-program__mobile-tabs-image">
        <img
          src="/landing/graduacao-section-image-mobile.png"
          alt="Aluna de enfermagem no laboratório da graduação"
          width={390}
          height={247}
        />
      </div>
    </section>
  )
}
