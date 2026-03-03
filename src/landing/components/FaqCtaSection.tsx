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
    question: 'Quem pode se inscrever no curso de Enfermagem?',
    answer:
      'Pode se inscrever quem concluiu o ensino médio e deseja ingressar na graduação em Enfermagem.',
  },
  {
    question: 'Como funciona a transferência ou retorno?',
    answer:
      'A transferência e o retorno dependem de análise documental e aproveitamento de disciplinas conforme regulamento acadêmico.',
  },
  {
    question: 'O que faz um Enfermeiro e quais são suas áreas de atuação?',
    answer:
      'O enfermeiro atua no cuidado, prevenção e gestão em hospitais, clínicas, atenção básica, urgência e outras áreas da saúde.',
  },
  {
    question: 'Quais são as principais disciplinas do curso de Enfermagem',
    answer:
      'Entre as principais disciplinas estão fundamentos de Enfermagem, saúde coletiva, clínica médica, urgência e estágio supervisionado.',
  },
  {
    question: 'Como o curso de Enfermagem prepara os alunos para o Mercado de trabalho?',
    answer:
      'A formação combina teoria, prática em laboratório e vivências de estágio para desenvolver competências técnicas e comportamentais.',
  },
  {
    question: 'Quais são as oportunidades de carreira para Enfermeiros formados?',
    answer:
      'Há oportunidades em instituições públicas e privadas, assistência hospitalar, atenção primária, auditoria, docência e gestão em saúde.',
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
