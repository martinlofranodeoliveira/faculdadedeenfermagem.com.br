export type PostCourseMetadata = {
  durationLabel: string
  workloadSummary: string
  workloadOptions: string[]
  noteTitle?: string
  noteLines?: string[]
}

type PostCourseMetadataEntry = PostCourseMetadata & {
  aliases: string[]
}

const OPTIONS_360_460_720 = [
  '360h (sem prática)',
  '460h (com prática)',
  '720h (com prática)',
]

const OPTIONS_360_420 = ['360h', '420h']
const OPTIONS_360_460 = ['360h (sem prática)', '460h (com prática)']
const OPTIONS_420 = ['420h']
const OPTIONS_600 = ['600h']

const DEFAULT_POST_COURSE_METADATA: PostCourseMetadata = {
  durationLabel: '360 A 720 HORAS',
  workloadSummary: '360h a 720h',
  workloadOptions: OPTIONS_360_460_720,
}

function normalizeComparableText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[()*]/g, ' ')
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .trim()
}

const POST_COURSE_METADATA_ENTRIES: PostCourseMetadataEntry[] = [
  {
    aliases: ['Auditoria em Servicos de Enfermagem', 'Auditoria em Servicos de Saude'],
    durationLabel: '360 A 720 HORAS',
    workloadSummary: '360h (sem prática), 460h ou 720h (com prática)',
    workloadOptions: OPTIONS_360_460_720,
  },
  {
    aliases: ['Enfermagem do Trabalho', 'Enfermagem do Trabalho e Saude Ocupacional'],
    durationLabel: '360 A 720 HORAS',
    workloadSummary: '360h (sem prática), 460h ou 720h (com prática)',
    workloadOptions: OPTIONS_360_460_720,
  },
  {
    aliases: ['Enfermagem em Cardiologia'],
    durationLabel: '360 A 720 HORAS',
    workloadSummary: '360h (sem prática), 460h ou 720h (com prática)',
    workloadOptions: OPTIONS_360_460_720,
  },
  {
    aliases: ['Enfermagem em Centro Cirurgico'],
    durationLabel: '420 HORAS',
    workloadSummary: '420h',
    workloadOptions: OPTIONS_420,
  },
  {
    aliases: ['Enfermagem em Clinica Medica'],
    durationLabel: '360 A 720 HORAS',
    workloadSummary: '360h (sem prática), 460h ou 720h (com prática)',
    workloadOptions: OPTIONS_360_460_720,
  },
  {
    aliases: ['Enfermagem em Cuidados Paliativos'],
    durationLabel: '420 HORAS',
    workloadSummary: '420h',
    workloadOptions: OPTIONS_420,
  },
  {
    aliases: ['Enfermagem em Emergencias Respiratorias'],
    durationLabel: '360 A 720 HORAS',
    workloadSummary: '360h (sem prática), 460h ou 720h (com prática)',
    workloadOptions: OPTIONS_360_460_720,
  },
  {
    aliases: ['Enfermagem em Home Care', 'Enfermagem em Infectologia'],
    durationLabel: '360 A 420 HORAS',
    workloadSummary: '360h ou 420h',
    workloadOptions: OPTIONS_360_420,
  },
  {
    aliases: ['Enfermagem em Nefrologia', 'Enfermagem em Nefrologia e Urologia'],
    durationLabel: '360 A 460 HORAS',
    workloadSummary: '360h (sem prática) ou 460h (com prática)',
    workloadOptions: OPTIONS_360_460,
  },
  {
    aliases: ['Enfermagem em Saude Mental'],
    durationLabel: '360 A 720 HORAS',
    workloadSummary: '360h (sem prática), 460h ou 720h (com prática)',
    workloadOptions: OPTIONS_360_460_720,
  },
  {
    aliases: ['Enfermagem Estetica'],
    durationLabel: '420 HORAS',
    workloadSummary: '420h',
    workloadOptions: OPTIONS_420,
  },
  {
    aliases: [
      'Enfermagem Geriatrica e Gerontologica',
      'Enfermagem Ginecologica',
      'Enfermagem Oncologica',
    ],
    durationLabel: '360 A 720 HORAS',
    workloadSummary: '360h (sem prática), 460h ou 720h (com prática)',
    workloadOptions: OPTIONS_360_460_720,
  },
  {
    aliases: ['Enfermagem Pediatrica e Neonatal'],
    durationLabel: '420 HORAS',
    workloadSummary: '420h',
    workloadOptions: OPTIONS_420,
  },
  {
    aliases: [
      'Gestao de Equipes em Enfermagem',
      'Gestao de Servicos de Enfermagem',
      'Gestao em Enfermagem de Urgencia e Emergencia',
    ],
    durationLabel: '360 A 420 HORAS',
    workloadSummary: '360h ou 420h',
    workloadOptions: OPTIONS_360_420,
  },
  {
    aliases: [
      'Enfermagem em Unidade de Terapia Intensiva',
      'Enfermagem em Unidade de Terapia Intensiva UTI',
    ],
    durationLabel: '420 HORAS',
    workloadSummary: '420h',
    workloadOptions: OPTIONS_420,
  },
  {
    aliases: ['Enfermagem Obstetrica'],
    durationLabel: '600 HORAS',
    workloadSummary: '600h',
    workloadOptions: OPTIONS_600,
  },
]

const POST_COURSE_METADATA_MAP = new Map<string, PostCourseMetadata>()

POST_COURSE_METADATA_ENTRIES.forEach(({ aliases, ...metadata }) => {
  aliases.forEach((alias) => {
    POST_COURSE_METADATA_MAP.set(normalizeComparableText(alias), metadata)
  })
})

export function getPostCourseMetadata(courseLabel: string): PostCourseMetadata {
  return (
    POST_COURSE_METADATA_MAP.get(normalizeComparableText(courseLabel)) ??
    DEFAULT_POST_COURSE_METADATA
  )
}
