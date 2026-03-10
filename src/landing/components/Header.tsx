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
            />
          </a>

          <span className="lp-header__brand-divider" aria-hidden="true" />

          <img className="lp-header__partner-logo lp-header__partner-logo--unicesp" src="/landing/unicesp-logo.webp" alt="Unicesp" />

          <span className="lp-header__brand-divider" aria-hidden="true" />

          <img className="lp-header__partner-logo lp-header__partner-logo--fasul" src="/landing/fasul-logo.webp" alt="Fasul Educacional" />
        </div>

        <button
          type="button"
          className="lp-header__cta"
          onClick={onOpenPopup}
        >
          QUERO ME MATRICULAR
        </button>
      </div>
    </header>
  )
}
