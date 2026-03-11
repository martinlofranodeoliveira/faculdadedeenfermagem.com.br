type HeaderProps = {
  onOpenPopup: () => void
}

export function Header({ onOpenPopup }: HeaderProps) {
  return (
    <header className="lp-header">
      <div className="lp-header__inner">
        <div className="lp-header__brand-group" aria-label="Marcas institucionais">
          <a className="lp-logo" href="#inicio" aria-label="Faculdade de Enfermagem">
            <img
              className="lp-logo__image"
              src="/landing/faculdade-de-enfermagem-logo.webp"
              alt="Faculdade de Enfermagem"
              width={162}
              height={46}
            />
          </a>

          <div className="lp-header__partner-row">
            <img
              className="lp-header__partner-logo lp-header__partner-logo--fasul-group"
              src="/landing/logo-grupo-fasul-educacional.webp"
              alt="Grupo FASUL Educacional"
              width={206}
              height={44}
            />

            <span className="lp-header__brand-divider" aria-hidden="true" />

            <img
              className="lp-header__partner-logo lp-header__partner-logo--unicesp"
              src="/landing/logo-faculdade-unicesp.webp"
              alt="Faculdade Unicesp"
              width={126}
              height={44}
            />

            <span className="lp-header__brand-divider" aria-hidden="true" />

            <img
              className="lp-header__partner-logo lp-header__partner-logo--paulista"
              src="/landing/logo-faculdade-paulista.webp"
              alt="Faculdade Paulista"
              width={141}
              height={44}
            />

            <span className="lp-header__brand-divider" aria-hidden="true" />

            <img
              className="lp-header__partner-logo lp-header__partner-logo--psicologia"
              src="/landing/logo-faculdade-de-psicologia.webp"
              alt="Faculdade de Psicologia"
              width={185}
              height={44}
            />
          </div>
        </div>

        <button type="button" className="lp-header__cta" onClick={onOpenPopup}>
          QUERO ME MATRICULAR
        </button>
      </div>
    </header>
  )
}
