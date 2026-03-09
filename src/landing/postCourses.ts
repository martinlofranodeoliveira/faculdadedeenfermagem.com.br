export const POS_COURSES_ENDPOINT =
  import.meta.env.VITE_POS_COURSES_ENDPOINT ??
  '/fasul-courses-api/rotinas/cursos-ia-format-texto-2025-unicesp.php'

export type PostCourse = {
  value: string
  label: string
  url?: string
  courseId?: number
  area: string
  oldInstallmentPrice: string
  currentInstallmentPrice: string
}

const NURSING_POST_COURSE_LABELS = [
  'AUDITORIA EM SERVIÇOS DE ENFERMAGEM',
  'ENFERMAGEM DO TRABALHO',
  'ENFERMAGEM DO TRABALHO E SAÚDE OCUPACIONAL',
  'ENFERMAGEM EM CARDIOLOGIA',
  'ENFERMAGEM EM CENTRO CIRÚRGICO',
  'ENFERMAGEM EM CLÍNICA MÉDICA',
  'ENFERMAGEM EM CUIDADOS PALIATIVOS',
  'ENFERMAGEM EM EMERGÊNCIAS RESPIRATÓRIAS',
  'ENFERMAGEM EM HOME CARE',
  'ENFERMAGEM EM INFECTOLOGIA',
  'ENFERMAGEM EM NEFROLOGIA',
  'ENFERMAGEM EM SAÚDE MENTAL',
  'ENFERMAGEM EM UNIDADE DE TERAPIA INTENSIVA',
  'ENFERMAGEM ESTÉTICA',
  'ENFERMAGEM GERIÁTRICA E GERONTOLÓGICA',
  'ENFERMAGEM GINECOLÓGICA',
  'ENFERMAGEM OBSTÉTRICA',
  'ENFERMAGEM ONCOLÓGICA',
  'ENFERMAGEM PEDIÁTRICA E NEONATAL',
  'GESTÃO DE EQUIPES EM ENFERMAGEM',
  'GESTÃO DE SERVIÇOS DE ENFERMAGEM',
  'GESTÃO EM ENFERMAGEM DE URGÊNCIA E EMERGÊNCIA',
] as const

function normalizeComparableText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function normalizePostLabelForMatch(value: string): string {
  return normalizeComparableText(value).replace(/\bemfermagem\b/g, 'enfermagem')
}

const NURSING_POST_COURSE_ORDER = new Map<string, number>(
  NURSING_POST_COURSE_LABELS.map((label, index) => [normalizePostLabelForMatch(label), index]),
)

function toSlug(value: string): string {
  return normalizeComparableText(value)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function normalizeApiValue(line: string): string {
  const separatorIndex = line.indexOf(':')
  if (separatorIndex < 0) return ''
  return line.slice(separatorIndex + 1).trim()
}

function formatApiInstallmentPrice(value: string): string {
  if (!value) return value

  return value
    .replace(/\s+/g, ' ')
    .replace(/(\d+)\s*x\s*/i, '$1X ')
    .replace(/R\$\s*/i, 'R$ ')
    .trim()
    .toUpperCase()
}

function fallbackOldInstallmentPrice(): string {
  return '18X R$ 132,00'
}

function fallbackCurrentInstallmentPrice(): string {
  return '18X R$ 66,00'
}

function extractIntegerFromBlock(block: string, patterns: RegExp[]): number | undefined {
  for (const pattern of patterns) {
    const match = block.match(pattern)?.[1]?.trim()
    if (!match) continue

    const parsed = Number.parseInt(match, 10)
    if (Number.isFinite(parsed)) return parsed
  }

  return undefined
}

export function parsePostGraduationCourses(raw: string): PostCourse[] {
  const blocks = raw.split(/\r?\n---\r?\n/g)
  const unique = new Map<string, PostCourse>()

  blocks.forEach((block) => {
    const lines = block
      .split(/\r?\n/g)
      .map((line) => line.trim())
      .filter(Boolean)

    let disponibilidade = ''
    let nivel = ''
    let nomeCurso = ''
    let nomeArea = ''
    let urlCurso = ''
    let precoDe = ''
    let precoPor = ''

    lines.forEach((line) => {
      const normalizedLine = normalizeComparableText(line)

      if (normalizedLine.startsWith('disponibilidade:')) {
        disponibilidade = normalizeApiValue(line)
        return
      }

      if (normalizedLine.startsWith('nivel:') || normalizedLine.startsWith('nivel :')) {
        nivel = normalizeApiValue(line)
        return
      }

      if (normalizedLine.startsWith('nome do curso:')) {
        nomeCurso = normalizeApiValue(line)
        return
      }

      if (normalizedLine.startsWith('nome area:')) {
        nomeArea = normalizeApiValue(line)
        return
      }

      if (normalizedLine.startsWith('url curso:')) {
        urlCurso = normalizeApiValue(line)
        return
      }

      if (normalizedLine.startsWith('de:')) {
        precoDe = normalizeApiValue(line)
        return
      }

      if (normalizedLine.startsWith('por:')) {
        precoPor = normalizeApiValue(line)
      }
    })

    if (!disponibilidade || !nivel || !nomeCurso || !urlCurso) return

    const disponibilidadeNormalizada = normalizeComparableText(disponibilidade)
    const nivelNormalizado = normalizeComparableText(nivel)

    if (!disponibilidadeNormalizada.includes('disponivel')) return
    if (!nivelNormalizado.includes('pos-graduacao') && !nivelNormalizado.includes('pos graduacao')) {
      return
    }

    const courseName = nomeCurso.replace(/\s+/g, ' ').trim()

    let slug = ''
    try {
      const parsedUrl = new URL(urlCurso)
      const segments = parsedUrl.pathname.split('/').filter(Boolean)
      slug = segments[segments.length - 1] ?? ''
    } catch {
      slug = ''
    }

    if (!slug) slug = toSlug(courseName)
    if (!slug) return

    const value = `pos-${slug}`
    const area = (nomeArea || 'GERAL').replace(/\s+/g, ' ').trim().toUpperCase()
    const courseId = extractIntegerFromBlock(block, [
      /ID\s*(?:do\s*)?Curso:\s*(\d+)/i,
      /id\s*curso:\s*(\d+)/i,
      /idcurso:\s*(\d+)/i,
      /curso\s*id:\s*(\d+)/i,
    ])

    if (!unique.has(value)) {
      unique.set(value, {
        value,
        label: courseName,
        url: urlCurso,
        courseId,
        area,
        oldInstallmentPrice: formatApiInstallmentPrice(precoDe) || fallbackOldInstallmentPrice(),
        currentInstallmentPrice:
          formatApiInstallmentPrice(precoPor) || fallbackCurrentInstallmentPrice(),
      })
    }
  })

  return [...unique.values()].sort((a, b) => a.label.localeCompare(b.label, 'pt-BR'))
}

export function isHealthArea(area: string): boolean {
  return normalizeComparableText(area).includes('saude')
}

export function filterNursingPostCourses(courses: PostCourse[]): PostCourse[] {
  const seenValues = new Set<string>()

  return courses
    .filter((course) => isHealthArea(course.area))
    .filter((course) => NURSING_POST_COURSE_ORDER.has(normalizePostLabelForMatch(course.label)))
    .filter((course) => {
      if (seenValues.has(course.value)) {
        return false
      }

      seenValues.add(course.value)
      return true
    })
    .sort((a, b) => {
      const indexA = NURSING_POST_COURSE_ORDER.get(normalizePostLabelForMatch(a.label)) ?? Number.MAX_SAFE_INTEGER
      const indexB = NURSING_POST_COURSE_ORDER.get(normalizePostLabelForMatch(b.label)) ?? Number.MAX_SAFE_INTEGER

      if (indexA !== indexB) {
        return indexA - indexB
      }

      return a.label.localeCompare(b.label, 'pt-BR')
    })
}

export function getNursingPostCourseFallback(): PostCourse[] {
  return NURSING_POST_COURSE_LABELS.map((label) => ({
    value: `pos-${toSlug(label)}`,
    label,
    area: 'SAÚDE',
    oldInstallmentPrice: fallbackOldInstallmentPrice(),
    currentInstallmentPrice: fallbackCurrentInstallmentPrice(),
  }))
}
