import './thank-you.css'

export function ThankYouPage() {
  return (
    <main className="thanks-page">
      <div className="thanks-shell">
        <section className="thanks-card" aria-labelledby="thanks-title">
          <div className="thanks-brand">
            <img
              className="thanks-brand__mark"
              src="/landing/obrigado-logo-mark.svg"
              alt=""
              aria-hidden="true"
            />
            <div className="thanks-brand__text">
              <span>FACULDADE DE</span>
              <strong>ENFERMAGEM</strong>
            </div>
          </div>

          <h1 id="thanks-title">Obrigado</h1>
          <p>Nossos consultores entrarao em contato em breve!</p>
        </section>

        <div className="thanks-cta-shell">
          <a className="thanks-cta" href="/">
            <span aria-hidden="true">→</span>
            Continuar Navegando
          </a>
        </div>
      </div>
    </main>
  )
}

