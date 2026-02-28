const marketCards = [
  {
    image: '/landing/mercado-card-1.png',
    title: 'Título',
    description:
      'A cada disciplina, você contará com leituras digitais, slides, videoaulas e podcast.',
  },
  {
    image: '/landing/mercado-card-2.png',
    title: 'Título',
    description:
      'A cada disciplina, você contará com leituras digitais, slides, videoaulas e podcast.',
  },
  {
    image: '/landing/mercado-card-3.png',
    title: 'Título',
    description:
      'A cada disciplina, você contará com leituras digitais, slides, videoaulas e podcast.',
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
