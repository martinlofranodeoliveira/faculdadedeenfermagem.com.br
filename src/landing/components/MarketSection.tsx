const marketCards = [
  {
    image: '/landing/mercado-card-1.png',
    title: 'Saúde Pública',
    description: 'Presta cuidado a doentes em clínicas, postos, berçários e colégios.',
  },
  {
    image: '/landing/mercado-card-2.png',
    title: 'Enfermeiro de Resgate',
    description:
      'Integra grupos de resgate de pessoas feridas em ocorrências ou em desastres coletivos.',
  },
  {
    image: '/landing/mercado-card-3.png',
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
              <img src={card.image} alt="" aria-hidden="true" width={392} height={240} />
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
