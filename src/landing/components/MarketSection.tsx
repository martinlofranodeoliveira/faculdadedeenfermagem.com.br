const marketCards = [
  {
    image: '/landing/saude_publica.webp',
    alt: 'Atendimento em sa\u00fade p\u00fablica com profissional de enfermagem e fam\u00edlia',
    salary: 'M\u00c9DIA SALARIAL: R$ 4.000,00 A R$ 7.500,00',
    title: 'Sa\u00fade P\u00fablica',
    description:
      'Preste assist\u00eancia integral em Cl\u00ednicas, Unidades B\u00e1sicas de Sa\u00fade e programas de preven\u00e7\u00e3o.',
  },
  {
    image: '/landing/enfermeiro_de_resgate.webp',
    alt: 'Equipe de enfermagem atuando em resgate e primeiros socorros',
    salary: 'M\u00c9DIA SALARIAL: R$ 4.750,00 A R$ 6.500,00',
    title: 'Enfermeiro de Resgate',
    description:
      'Integre equipes de Urg\u00eancia para salvar vidas em ocorr\u00eancias cr\u00edticas e desastres.',
  },
  {
    image: '/landing/enfermeiro_pediatrico.webp',
    alt: 'Enfermeiro pedi\u00e1trico em atendimento infantil',
    salary: 'M\u00c9DIA SALARIAL: R$ 3.800,00 A R$ 7.000,00',
    title: 'Enfermeiro Pedi\u00e1trico',
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
              <img className="lp-market__cover" src={card.image} alt={card.alt} width={392} height={240} />
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
