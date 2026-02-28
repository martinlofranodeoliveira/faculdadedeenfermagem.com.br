export type NavItem = {
  id: string
  label: string
}

export type CourseCard = {
  name: string
  modality: 'EAD' | 'Presencial' | 'Semipresencial'
  duration: string
}

export type FaqItem = {
  question: string
  answer: string
}

export type FormCourseOption = {
  value: string
  label: string
}

export type FormCourseGroup = {
  label: string
  options: FormCourseOption[]
}

export const navItems: NavItem[] = [
  { id: 'inicio', label: 'Início' },
  { id: 'cursos', label: 'Cursos' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contato', label: 'Contato' },
]

export const featuredCourses: CourseCard[] = [
  { name: 'Bacharelado em Enfermagem', modality: 'Presencial', duration: '10 semestres' },
  { name: 'Pós em Urgência e Emergência', modality: 'EAD', duration: '12 meses' },
  { name: 'Pós em Enfermagem do Trabalho', modality: 'Semipresencial', duration: '12 meses' },
]

export const formCourseGroups: FormCourseGroup[] = [
  {
    label: 'Graduação',
    options: [
      {
        value: 'graduacao-analise-desenvolvimento-sistemas',
        label: 'Análise e Desenvolvimento de Sistemas EAD',
      },
      {
        value: 'graduacao-gestao-tecnologia-informacao',
        label: 'Gestão da Tecnologia da Informação EAD',
      },
      { value: 'graduacao-marketing-digital', label: 'Marketing Digital EAD' },
      { value: 'graduacao-administracao', label: 'Administração EAD' },
      { value: 'graduacao-enfermagem', label: 'Enfermagem Presencial' },
      { value: 'graduacao-psicologia', label: 'Psicologia Presencial' },
      { value: 'graduacao-ciencias-contabeis', label: 'Ciências Contábeis EAD' },
      { value: 'graduacao-processos-gerenciais', label: 'Processos Gerenciais EAD' },
      {
        value: 'graduacao-gestao-recursos-humanos',
        label: 'Gestão de Recursos Humanos EAD',
      },
      { value: 'graduacao-logistica', label: 'Logística EAD' },
      { value: 'graduacao-marketing', label: 'Marketing EAD' },
      { value: 'graduacao-gestao-comercial', label: 'Gestão Comercial EAD' },
      { value: 'graduacao-gestao-financeira', label: 'Gestão Financeira EAD' },
      { value: 'graduacao-negocios-imobiliarios', label: 'Negócios Imobiliários EAD' },
      { value: 'graduacao-pedagogia', label: 'Pedagogia (Semipresencial)' },
      { value: 'graduacao-servico-social', label: 'Serviço Social (Semipresencial)' },
      { value: 'graduacao-gestao-publica', label: 'Gestão Pública EAD' },
      { value: 'graduacao-seguranca-publica', label: 'Segurança Pública EAD' },
    ],
  },
]

export const faqItems: FaqItem[] = [
  {
    question: 'Quando abre o próximo processo seletivo?',
    answer:
      'A estrutura está pronta para inserir a agenda real. Enquanto isso, este bloco funciona como placeholder de conteúdo.',
  },
  {
    question: 'Posso estudar em modalidade EAD?',
    answer:
      'Sim. A base já prevê blocos para cursos presenciais, semipresenciais e EAD. Você poderá substituir os dados finais quando quiser.',
  },
  {
    question: 'Como envio meus dados para contato?',
    answer:
      'O formulário final será integrado ao CRM usando as variáveis de ambiente já preparadas neste projeto.',
  },
]
