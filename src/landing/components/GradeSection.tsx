import { useState } from 'react'

type GradeItem = {
  term: string
  subject: string
  details: string[]
}

const gradeItems: GradeItem[] = [
  {
    term: '1º trimestre',
    subject: 'Fundamentos de administração geral e hospitalar',
    details: [
      'Introdução a processos administrativos em saúde.',
      'Organização de fluxos hospitalares e tomada de decisão.',
    ],
  },
  {
    term: '2º trimestre',
    subject: 'Fundamentos de administração geral e hospitalar',
    details: [
      'Planejamento de equipes e distribuição de recursos.',
      'Indicadores de qualidade e segurança assistencial.',
    ],
  },
  {
    term: '3º trimestre',
    subject: 'Fundamentos de administração geral e hospitalar',
    details: [
      'Gestão de protocolos e melhoria contínua de processos.',
      'Comunicação interdisciplinar e liderança em enfermagem.',
    ],
  },
  {
    term: '4º trimestre',
    subject: 'Fundamentos de administração geral e hospitalar',
    details: [
      'Projeto aplicado de administração em contexto hospitalar.',
      'Análise de desempenho e resultados assistenciais.',
    ],
  },
]

export function GradeSection() {
  const [openTerm, setOpenTerm] = useState<string | null>(null)

  return (
    <section id="grade-curricular" className="lp-grade">
      <div className="lp-grade__inner">
        <h2 className="lp-grade__title">GRADE CURRICULAR</h2>

        <div className="lp-grade__list">
          {gradeItems.map((item) => (
            <article key={item.term} className={`lp-grade__row ${openTerm === item.term ? 'is-open' : ''}`}>
              <button
                type="button"
                className={`lp-grade__item ${openTerm === item.term ? 'is-open' : ''}`}
                aria-label={`${item.term} - ${item.subject}`}
                aria-expanded={openTerm === item.term}
                aria-controls={`grade-panel-${item.term.replace(/\s+/g, '-')}`}
                onClick={() => setOpenTerm((current) => (current === item.term ? null : item.term))}
              >
                <span className="lp-grade__term">{item.term}</span>
                <span className="lp-grade__subject">{item.subject}</span>
                <span className="lp-grade__icon-wrap" aria-hidden="true">
                  <img src="/landing/grade-chevron.svg" alt="" />
                </span>
              </button>

              <div
                id={`grade-panel-${item.term.replace(/\s+/g, '-')}`}
                className={`lp-grade__panel ${openTerm === item.term ? 'is-open' : ''}`}
                hidden={openTerm !== item.term}
              >
                <ul>
                  {item.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
