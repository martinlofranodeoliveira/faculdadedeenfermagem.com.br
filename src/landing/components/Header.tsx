type HeaderProps = {
  onOpenPopup: () => void
}

export function Header({ onOpenPopup }: HeaderProps) {
  return (
    <header className="lp-header">
      <div className="lp-header__inner">
        <a className="lp-logo" href="#inicio" aria-label="Faculdade de Enfermagem">
          <img
            className="lp-logo__image"
            src="/landing/faculdade-de-enfermagem-logo.webp"
            alt="Faculdade de Enfermagem"
          />
        </a>

        <button
          type="button"
          className="lp-header__cta"
          onClick={onOpenPopup}
          aria-label="Abrir formulario de inscricao da Graduacao em Enfermagem Presencial"
        >
          QUERO ME MATRICULAR
        </button>
      </div>
    </header>
  )
}
