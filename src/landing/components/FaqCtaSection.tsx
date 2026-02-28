import { useState } from 'react'

type FaqItem = {
  question: string
  answer: string
}

const faqItems: FaqItem[] = [
  {
    question: 'Como funciona o vestibular online?',
    answer:
      'O processo é realizado em ambiente digital, com orientações em cada etapa e resultado divulgado após a avaliação.',
  },
  {
    question: 'Quais são as formas de pagamento?',
    answer:
      'Você pode pagar com cartão, boleto e opções de parcelamento conforme campanha vigente no momento da matrícula.',
  },
  {
    question: 'O diploma EAD tem a mesma validade?',
    answer:
      'Sim. Cursos reconhecidos pelo MEC possuem a mesma validade legal para diploma, independente da modalidade.',
  },
]

export function FaqCtaSection() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null)

  return (
    <section id="faq-geral" className="lp-faq-cta">
      <div className="lp-faq-cta__inner">
        <h2 className="lp-faq-cta__title">PERGUNTAS FREQUENTES</h2>

        <div className="lp-faq-cta__list">
          {faqItems.map((item) => (
            <article
              key={item.question}
              className={`lp-faq-cta__faq ${openQuestion === item.question ? 'is-open' : ''}`}
            >
              <button
                type="button"
                className="lp-faq-cta__item"
                aria-expanded={openQuestion === item.question}
                aria-controls={`faq-answer-${item.question.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() =>
                  setOpenQuestion((current) => (current === item.question ? null : item.question))
                }
              >
                <span>{item.question}</span>
                <img src="/landing/faq-chevron.svg" alt="" aria-hidden="true" />
              </button>

              <div
                id={`faq-answer-${item.question.replace(/\s+/g, '-').toLowerCase()}`}
                className="lp-faq-cta__answer"
                hidden={openQuestion !== item.question}
              >
                <p>{item.answer}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="lp-faq-contact">
          <img
            className="lp-faq-contact__icon"
            src="/landing/faq-whatsapp.png"
            alt="WhatsApp"
            width={57}
            height={57}
          />

          <div className="lp-faq-contact__text">
            <strong>AINDA TEM DÚVIDAS?</strong>
            <p>O diploma EAD tem a mesma validade?</p>
          </div>

          <button type="button" className="lp-faq-contact__button">
            CONVERSE CONOSCO
          </button>
        </div>
      </div>
    </section>
  )
}
