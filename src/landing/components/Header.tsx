export function Header() {
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

        <a className="lp-header__cta" href="#contato">
          QUERO ME MATRICULAR
        </a>
      </div>
    </header>
  )
}
