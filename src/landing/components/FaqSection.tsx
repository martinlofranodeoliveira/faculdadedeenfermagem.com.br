export function FaqSection() {
  return (
    <section id="graduacao" className="lp-program">
      <div className="lp-program__inner">
        <div className="lp-program__content">
          <h2 className="lp-program__title">GRADUAÇÃO PRESENCIAL EM ENFERMAGEM</h2>
          <p className="lp-program__subtitle">Cuidando de você com atenção e excelência.</p>

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
                <strong>Data de início:</strong>
                <span>00/00/2026</span>
              </div>
            </div>
          </div>

          <div className="lp-program__knowledge">
            <strong>Área de conhecimento:</strong>
            <div className="lp-program__tags">
              <span className="lp-program__tag lp-program__tag--strong">Destaque</span>
              <span className="lp-program__tag lp-program__tag--medium">Destaque</span>
              <span className="lp-program__tag lp-program__tag--soft">Destaque</span>
            </div>
          </div>
        </div>

        <div className="lp-program__media">
          <img
            src="/landing/graduacao-section-image.png"
            alt="Equipe de enfermagem em ambiente hospitalar"
            width={1300}
            height={866}
          />
        </div>
      </div>
    </section>
  )
}
