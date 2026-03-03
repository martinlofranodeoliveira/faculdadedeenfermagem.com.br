const marketCards = [
  {
    image: '/landing/mercado-card-1.jpg',
    alt: 'Atendimento em saúde pública com profissional de enfermagem e família',
    salary: 'MÉDIA SALARIAL: R$ 4.000,00 A R$ 6.500,00',
    title: 'Saúde Pública',
    description: 'Presta cuidado a doentes em clínicas, postos, berçários e colégios.',
  },
  {
    image: '/landing/mercado-card-2.png',
    alt: 'Equipe de enfermagem atuando em resgate e primeiros socorros',
    salary: 'MÉDIA SALARIAL: R$ 4.750,00 A R$ 5.500,00',
    title: 'Enfermeiro de Resgate',
    description:
      'Integra grupos de resgate de pessoas feridas em ocorrências ou em desastres coletivos.',
  },
  {
    image: '/landing/mercado-card-3.png',
    alt: 'Enfermeiro pediátrico em atendimento infantil',
    salary: 'MÉDIA SALARIAL: R$ 3.800,00 A R$ 6.000,00',
    title: 'Enfermeiro Pediátrico',
    description: 'Monitora e analisa a evolução e o progresso infantil.',
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
              <img src={card.image} alt={card.alt} width={392} height={240} />
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
