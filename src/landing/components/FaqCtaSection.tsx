import { useState } from 'react'

type FaqItem = {
  question: string
  answer: string
}

const faqItems: FaqItem[] = [
  {
    question: 'Como funciona o vestibular online?',
    answer:
      'O vestibular é realizado de forma digital, com foco em facilitar o seu acesso ao Ensino Superior. Além da prova online, você pode ingressar utilizando sua nota do ENEM, como Segunda Graduação (aproveitando disciplinas já cursadas) ou via transferência externa de outra Instituição.',
  },
  {
    question: 'Quais são as formas de pagamento?',
    answer:
      'Buscamos facilitar o seu acesso ao Ensino Superior com opções flexíveis. Você pode realizar o pagamento das mensalidades via PIX, garantindo a baixa imediata no sistema, ou através de cartão de crédito, com a possibilidade de parcelamento. Nosso objetivo é que a questão financeira não seja um obstáculo para a sua Formação Profissional.',
  },
  {
    question: 'Quem pode se inscrever no curso de Enfermagem?',
    answer:
      'Qualquer pessoa que tenha concluído o Ensino Médio. Este curso é ideal para quem possui vocação para o cuidado humano, responsabilidade ética e o desejo de liderar equipes de Saúde em ambientes de alta tecnologia.',
  },
  {
    question: 'Como funciona a transferência ou retorno?',
    answer:
      'Para quem vem de outra Instituição, o processo de transferência é focado no aproveitamento de créditos: basta apresentar seu Histórico e as Ementas das Disciplinas cursadas para que nossa Coordenação analise as equivalências. Já para ex-alunos que desejam retomar o sonho da Graduação, o processo é simplificado através de um requerimento de retorno junto à nossa secretaria Acadêmica (sujeito à disponibilidade de vaga na turma correspondente).',
  },
  {
    question: 'O que faz um Enfermeiro e quais são suas áreas de atuação?',
    answer:
      'O Enfermeiro é o pilar central de qualquer sistema de Saúde. Suas funções vão muito além do curativo: ele prescreve cuidados, lidera equipes técnicas, opera tecnologias de suporte à vida e gerencia Unidades inteiras. Você poderá atuar em Hospitais de Alta Complexidade (UTI e Centro Cirúrgico), Saúde Pública (clínicas e postos), Resgate e Emergência (atendimento pré-hospitalar), além de áreas como Auditoria, Docência e Enfermagem Estética.',
  },
  {
    question: 'Quais são as principais disciplinas do curso de Enfermagem',
    answer:
      'A matriz curricular é organizada em eixos que vão das Bases Biológicas (como Anatomia e Fisiologia) até a Fundamentação do Cuidar em áreas críticas. Você estudará disciplinas como Farmacologia, Semiologia, Assistência ao Paciente Crítico e Gestão de Serviços de Saúde. Para conferir a lista completa de disciplinas por semestre e a carga horária detalhada, clique aqui e baixe o PDF da Matriz Curricular.',
  },
  {
    question: 'Como o curso de Enfermagem prepara os alunos para o Mercado de trabalho?',
    answer:
      'O Curso oferece uma Carga Horária de mais de 4.200 horas, equilibrando teoria e prática. Desde o início, você vivencia a rotina profissional em laboratórios modernos e simulações que replicam cenários hospitalares reais, finalizando sua formação com Estágios Curriculares Supervisionados obrigatórios nos últimos semestres para garantir total segurança técnica.',
  },
  {
    question: 'Quais são as oportunidades de carreira para Enfermeiros formados?',
    answer:
      'A Graduação em Enfermagem abre portas para um Mercado com alta empregabilidade. Você poderá atuar como Enfermeiro Assistencial em grandes redes hospitalares, assumir a Gestão de Unidades de Saúde, atuar no Resgate Especializado ou focar em áreas como Pediatria e Neonatologia, sempre com a possibilidade de ascensão para cargos de liderança e direção.',
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
            loading="lazy"
            decoding="async"
          />

          <div className="lp-faq-contact__text">
            <strong>AINDA TEM DÚVIDAS?</strong>
            <p>Fale com nossas consultoras no WhatsApp</p>
          </div>

          <button type="button" className="lp-faq-contact__button">
            CONVERSE CONOSCO
          </button>
        </div>
      </div>
    </section>
  )
}
