export function FooterBottomSection() {
  return (
    <footer id="rodape" className="lp-footer-bottom">
      <div className="lp-footer-bottom__inner">
        <div className="lp-footer-bottom__top">
          <section className="lp-footer-brand">
            <div className="lp-footer-brand__logo-wrap">
              <img
                className="lp-footer-brand__logo"
                src="/landing/faculdade-de-enfermagem-logo.webp"
                alt="Faculdade de Enfermagem"
              />
            </div>

            <p className="lp-footer-brand__description">
              {
                'Excel\u00eancia no ensino superior com foco na inova\u00e7\u00e3o e na empregabilidade dos nossos alunos.'
              }
            </p>

            <div className="lp-footer-brand__social">
              <a href="#" aria-label="Facebook">
                <img src="/landing/footer-social-1.svg" alt="" aria-hidden="true" />
              </a>
              <a href="#" aria-label="Instagram">
                <img src="/landing/footer-social-instagram.png" alt="" aria-hidden="true" />
              </a>
            </div>
          </section>

          <section className="lp-footer-contact-block">
            <h3>Contato</h3>

            <ul>
              <li>
                <img src="/landing/footer-icon-location.svg" alt="" aria-hidden="true" />
                <span>
                  {
                    'Rua Dr. Diogo de Faria, 66 - Vila Mariana, S\u00e3o Paulo - SP, CEP: 04037-000'
                  }
                </span>
              </li>
              <li>
                <img src="/landing/footer-icon-phone.svg" alt="" aria-hidden="true" />
                <a href="tel:+551140028922">(11) 4002-8922</a>
              </li>
              <li>
                <img src="/landing/footer-icon-mail.svg" alt="" aria-hidden="true" />
                <a href="mailto:contato@faculdadedeenfermagem.com.br">
                  contato@faculdadedeenfermagem.com.br
                </a>
              </li>
            </ul>
          </section>

          <section className="lp-footer-map-block">
            <h3>{'Localiza\u00e7\u00e3o'}</h3>

            <div className="lp-footer-map-block__card">
              <img src="/landing/footer-map.png" alt="" aria-hidden="true" />
              <a
                href="https://maps.google.com/?q=Rua+Dr.+Diogo+de+Faria,+66+-+Vila+Mariana,+S%C3%A3o+Paulo+-+SP,+CEP:+04037-000"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/landing/footer-icon-maps.svg" alt="" aria-hidden="true" />
                Ver no Maps
              </a>
            </div>
          </section>
        </div>

        <div className="lp-footer-bottom__bar">
          <small>(c) 2025 Faculdade Paulista. Todos os direitos reservados.</small>

          <div className="lp-footer-bottom__links">
            <a href="/politica-de-privacidade">{'Pol\u00edtica de Privacidade'}</a>
            <a href="/termos-de-uso">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
