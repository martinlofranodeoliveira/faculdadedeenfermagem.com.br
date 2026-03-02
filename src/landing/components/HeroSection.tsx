type HeroSectionProps = {
  onOpenPopup: () => void
}

export function HeroSection({ onOpenPopup }: HeroSectionProps) {
  return (
    <section id="inicio" className="lp-hero">
      <button
        type="button"
        className="lp-hero__trigger"
        onClick={onOpenPopup}
        aria-label="Abrir formulario de inscricao da Graduacao em Enfermagem Presencial"
      >
        <picture className="lp-hero__picture">
          <source
            media="(max-width: 640px)"
            srcSet="/landing/graduacao-presencial-enfermagem-mobile.webp"
          />
          <img
            className="lp-hero__image"
            src="/landing/graduacao-presencial-enfermagem.webp"
            alt="Graduacao presencial em Enfermagem"
            width={1918}
            height={616}
            fetchPriority="high"
          />
        </picture>
      </button>
    </section>
  )
}
