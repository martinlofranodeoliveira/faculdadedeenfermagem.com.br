export function ProfileBannerSection() {
  return (
    <section id="perfil-banner" className="lp-profile-banner">
      <div className="lp-profile-banner__inner">
        <picture className="lp-profile-banner__picture">
          <source
            media="(max-width: 640px)"
            srcSet="/landing/perfil-do-profissional-graduacao-enfermagem-mobile.webp"
          />
          <img
            className="lp-profile-banner__image"
            src="/landing/perfil-do-profissional-graduacao-enfermagem.webp"
            alt="Perfil do profissional de enfermagem"
            width={1240}
            height={178}
          />
        </picture>
      </div>
    </section>
  )
}
