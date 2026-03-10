export function ProfileBannerSection() {
  return (
    <section id="perfil-banner" className="lp-profile-banner">
      <img
        className="lp-profile-banner__background"
        src="/landing/perfil-banner-fundo.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        fetchPriority="low"
      />
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
            loading="lazy"
            decoding="async"
            fetchPriority="low"
          />
        </picture>
      </div>
    </section>
  )
}
