const marketCards = [
  {
    image: '/landing/saude_publica.webp',
    alt: 'Atendimento em saúde pública com profissional de enfermagem e família',
    salary: 'MÉDIA SALARIAL: R$ 4.000,00 A R$ 7.500,00',
    title: 'Saúde Pública',
    description:
      'Preste assistência integral em Clínicas, Unidades Básicas de Saúde e programas de prevenção.',
  },
  {
    image: '/landing/enfermeiro_de_resgate.webp',
    alt: 'Equipe de enfermagem atuando em resgate e primeiros socorros',
    salary: 'MÉDIA SALARIAL: R$ 4.750,00 A R$ 6.500,00',
    title: 'Enfermeiro de Resgate',
    description:
      'Integre equipes de Urgência para salvar vidas em ocorrências críticas e desastres.',
  },
  {
    image: '/landing/enfermeiro_pediatrico.webp',
    alt: 'Enfermeiro pediátrico em atendimento infantil',
    salary: 'MÉDIA SALARIAL: R$ 3.800,00 A R$ 7.000,00',
    title: 'Enfermeiro Pediátrico',
    description: 'Monitore o desenvolvimento infantil e realize cuidados especializados.',
  },
]

export function MarketSection() {
  return (
    <section id="mercado-trabalho" className="lp-market">
      <div className="lp-market__inner">
        <h2 className="lp-market__title">MERCADO DE TRABALHO</h2>

        <div className="lp-market__grid">
          {marketCards.map((card) => (
            <article key={card.image} className="lp-market__card">
              <img
                className="lp-market__cover"
                src={card.image}
                alt={card.alt}
                width={392}
                height={240}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
              />
              <div className="lp-market__salary">
                <img
                  className="lp-market__salary-icon"
                  src="/landing/market-salary-paid.svg"
                  alt=""
                  aria-hidden="true"
                />
                <span className="lp-market__salary-text">{card.salary}</span>
              </div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
