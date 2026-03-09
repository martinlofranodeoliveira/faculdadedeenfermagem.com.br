export function FooterBottomSection() {
  return (
    <footer id="rodape" className="lp-footer-bottom">
      <div className="lp-footer-bottom__inner">
        <div className="lp-footer-bottom__top">
          <section className="lp-footer-brand">
            <img
              className="lp-footer-brand__logo"
              src="/landing/faculdade-de-enfermagem-logo-rodape.webp"
              alt="Faculdade de Enfermagem"
            />

            <p className="lp-footer-brand__description">
              Excelência no ensino superior com foco na inovação e na empregabilidade dos
              nossos alunos.
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
                  Local: Rua Dr. Diogo de Faria, 66 - Vila Mariana, São Paulo - SP, CEP:
                  04037-000
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
            <h3>Localização</h3>

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

        <section className="lp-footer-group" aria-label="Grupo FASUL Educacional">
          <h3 className="lp-footer-group__title">Grupo FASUL Educacional</h3>

          <div className="lp-footer-group__logos">
            <div className="lp-footer-group__logo-card lp-footer-group__logo-card--fasul">
              <img src="/landing/logo-rodape-fasul.webp" alt="FASUL Educacional" />
            </div>
            <div className="lp-footer-group__logo-card lp-footer-group__logo-card--unicesp">
              <img src="/landing/logo-rodape-unicesp.webp" alt="UNICESP" />
            </div>
            <div className="lp-footer-group__logo-card lp-footer-group__logo-card--paulista">
              <img src="/landing/logo-rodape-faculdade-paulista.webp" alt="Faculdade Paulista" />
            </div>
            <div className="lp-footer-group__logo-card lp-footer-group__logo-card--psicologia">
              <img src="/landing/logo-rodape-psicologia.webp" alt="Faculdade de Psicologia" />
            </div>
          </div>
        </section>

        <div className="lp-footer-bottom__bar">
          <small>(c) 2026 Faculdade de Enfermagem. Todos os direitos reservados.</small>

          <div className="lp-footer-bottom__links">
            <a href="/politica-de-privacidade">Política de Privacidade</a>
            <a href="/termos-de-uso">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
