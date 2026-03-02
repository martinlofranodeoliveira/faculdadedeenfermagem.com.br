export function FaqSection() {
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
              <strong>Local:</strong> <span>200m do Metro Belém | SP</span>
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
                <span>01/07/2026</span>
              </div>
            </div>
          </div>

          <div className="lp-program__knowledge">
            <strong>Área de conhecimento:</strong>
            <div className="lp-program__tags">
              <span className="lp-program__tag">Saúde</span>
              <span className="lp-program__tag">Assistência</span>
              <span className="lp-program__tag">Pessoas</span>
            </div>
          </div>
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
    </section>
  )
}
