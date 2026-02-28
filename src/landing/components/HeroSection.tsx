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
        aria-label="Abrir formulário de inscrição da Graduação em Enfermagem Presencial"
      >
        <img
          className="lp-hero__image"
          src="/landing/graduacao-presencial-enfermagem.webp"
          alt="Graduação presencial em Enfermagem"
          width={1918}
          height={616}
          fetchPriority="high"
        />
      </button>
    </section>
  )
}
