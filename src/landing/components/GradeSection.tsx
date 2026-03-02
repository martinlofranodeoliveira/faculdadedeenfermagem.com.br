import { useState } from 'react'

type GradeItem = {
  term: string
  semesterName: string
  totalHours: string
  disciplines: string[]
}

const gradeItems: GradeItem[] = [
  {
    term: '1º semestre',
    semesterName: 'Bases Biológicas e Sociais para o Cuidar da Enfermagem',
    totalHours: '360h',
    disciplines: [
      'Anatomia Humana',
      'Bioquímica',
      'História da Enfermagem',
      'Metodologia Científica',
      'Biologia Celular e Genética',
      'Saúde e Sociedade',
      'Práticas Integradoras',
    ],
  },
  {
    term: '2º semestre',
    semesterName: 'Bases Biológicas e Sociais para o Cuidar da Enfermagem',
    totalHours: '360h',
    disciplines: [
      'Histologia e Embriologia',
      'Ética e Bioética',
      'Parasitologia Geral',
      'Microbiologia',
      'Imunologia',
      'Fisiologia Humana',
      'Práticas Integradoras',
    ],
  },
  {
    term: '3º semestre',
    semesterName: 'Bases Biológicas e Sociais para o Cuidar da Enfermagem',
    totalHours: '360h',
    disciplines: [
      'Enfermagem na Saúde da Coletividade',
      'Nutrição',
      'Patologia Geral e Aplicada',
      'Farmacologia Geral e Aplicada',
      'Saúde Ambiental',
      'Ações Educativas em Saúde',
      'Práticas Integradoras',
    ],
  },
  {
    term: '4º semestre',
    semesterName: 'Fundamentação para o Cuidar da Enfermagem',
    totalHours: '360h',
    disciplines: [
      'Suporte Básico de Vida',
      'Bioestatística',
      'Psicologia e Desenvolvimento',
      'Deontologia e Legislação em Enfermagem',
      'Semiologia e Semiotécnica para Enfermagem',
      'Epidemiologia',
      'Práticas Integradoras',
    ],
  },
  {
    term: '5º semestre',
    semesterName: 'Fundamentação para o Cuidar da Enfermagem',
    totalHours: '360h',
    disciplines: [
      'Enfermagem na Atenção Primária em Saúde',
      'Fundamentos e Práticas de Enfermagem',
      'Cuidar de Enfermagem nas Doenças Infecciosas e Parasitárias',
      'Sistematização da Assistência de Enfermagem',
      'Enfermagem Baseada em Evidências',
      'Práticas Integradoras',
    ],
  },
  {
    term: '6º semestre',
    semesterName: 'Processo de Cuidar da Enfermagem nos Ciclos da Vida',
    totalHours: '410h',
    disciplines: [
      'Assistência de Enfermagem à Saúde da Mulher e Neonato',
      'Assistência de Enfermagem à Saúde da Criança e do Adolescente',
      'Enfermagem em Saúde Mental',
      'Práticas Integradoras',
      'Atividades Complementares',
    ],
  },
  {
    term: '7º semestre',
    semesterName: 'Processo de Cuidar da Enfermagem nos Ciclos da Vida',
    totalHours: '410h',
    disciplines: [
      'Enfermagem na Atenção à Saúde da Família',
      'Assistência de Enfermagem à Saúde do Adulto',
      'Assistência de Enfermagem à Saúde do Idoso',
      'Gestão dos Serviços de Saúde na Atenção Básica',
      'Práticas Integradoras',
      'Atividades Complementares',
    ],
  },
  {
    term: '8º semestre',
    semesterName: 'Processo de Cuidar da Enfermagem nos Ciclos da Vida',
    totalHours: '360h',
    disciplines: [
      'Enfermagem na Atenção à Saúde do Trabalhador',
      'Assistência de Enfermagem ao Paciente Crítico',
      'Trabalho de Conclusão de Curso I',
      'Assistência de Enfermagem ao Paciente Cirúrgico',
      'Gestão dos Serviços de Saúde na Atenção Hospitalar',
      'Práticas Integradoras',
    ],
  },
  {
    term: '9º semestre',
    semesterName: 'Vivência no Processo de Cuidar da Enfermagem',
    totalHours: '508h',
    disciplines: [
      'Estágio Curricular Supervisionado I',
      'Trabalho de Conclusão de Curso II',
      'Terapias Complementares',
    ],
  },
  {
    term: '10º semestre',
    semesterName: 'Vivência no Processo de Cuidar da Enfermagem',
    totalHours: '560h',
    disciplines: [
      'Estágio Curricular Supervisionado II',
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
                aria-label={`${item.term} - ${item.semesterName} - ${item.totalHours}`}
                aria-expanded={openTerm === item.term}
                aria-controls={`grade-panel-${item.term.replace(/\s+/g, '-')}`}
                onClick={() => setOpenTerm((current) => (current === item.term ? null : item.term))}
              >
                <span className="lp-grade__term">{item.term}</span>
                <span className="lp-grade__subject">{item.semesterName}</span>
                <span className="lp-grade__workload">{item.totalHours}</span>
                <span className="lp-grade__icon-wrap" aria-hidden="true">
                  <img src="/landing/grade-chevron.svg" alt="" />
                </span>
              </button>

              <div
                id={`grade-panel-${item.term.replace(/\s+/g, '-')}`}
                className={`lp-grade__panel ${openTerm === item.term ? 'is-open' : ''}`}
                hidden={openTerm !== item.term}
              >
                <h3 className="lp-grade__panel-title">Disciplinas</h3>
                <ul>
                  {item.disciplines.map((detail) => (
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
