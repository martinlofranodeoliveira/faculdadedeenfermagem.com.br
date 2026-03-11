import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useEffect, useMemo, useState, type FormEvent } from 'react'

import {
  formatPhoneMask,
  normalizeName,
  sendLeadToCrm,
  validateEmail,
  validateFullName,
  validatePhone,
  type CourseLeadSelection,
} from '../crmLead'

type EnrollmentPopupProps = {
  isOpen: boolean
  selection: CourseLeadSelection | null
  onClose: () => void
}

type FieldErrors = {
  workload?: string
  fullName?: string
  email?: string
  phone?: string
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

function normalizePopupCourseLabel(selection: CourseLeadSelection): string {
  const normalizedLabel = selection.courseLabel.trim()
  const isGraduation =
    selection.courseType === 'graduacao' || selection.courseValue === 'graduacao-enfermagem'

  if (!isGraduation) {
    return normalizedLabel
  }

  const cleanedLabel = normalizedLabel
    .replace(/\((?:semipresencial|presencial|ead)\)/gi, ' ')
    .replace(/\b(?:semipresencial|presencial|ead)\b/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  return cleanedLabel || normalizedLabel
}

export function EnrollmentPopup({ isOpen, selection, onClose }: EnrollmentPopupProps) {
  const [selectedWorkload, setSelectedWorkload] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  const firstErrorMessage = useMemo(() => {
    return errors.workload ?? errors.fullName ?? errors.email ?? errors.phone ?? ''
  }, [errors])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    setSelectedWorkload('')
    setFullName('')
    setEmail('')
    setPhone('')
    setErrors({})
    setSubmitStatus('idle')
    setSubmitMessage('')
  }, [isOpen, selection?.courseValue])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen || !selection) {
    return null
  }

  const isPostGraduation =
    selection.courseType === 'pos' || selection.courseValue.toLowerCase().startsWith('pos-')
  const topImageSrc = isPostGraduation
    ? '/landing/posgraduacao-em-enfermagem-topo-popup-formulario.webp'
    : '/landing/graduacao-em-enfermagem-topo-popup-formulario.webp'
  const workloadOptions =
    selection.workloadOptions && selection.workloadOptions.length > 0
      ? selection.workloadOptions
      : selection.workloadSummary
        ? [selection.workloadSummary]
        : []
  const resolvedCourseLabel = normalizePopupCourseLabel(selection)
  const resolvedWorkloadText = isPostGraduation
    ? selectedWorkload ||
      (workloadOptions.length === 0 ? selection.workloadSummary || selection.workloadLabel || '' : '')
    : selection.workloadLabel || selection.workloadSummary || ''
  const popupPriceText = selection.coursePrice ?? ''
  const popupNoteLines = selection.noteLines ?? []

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors: FieldErrors = {
      workload:
        isPostGraduation && !selectedWorkload ? 'Selecione uma carga horária para continuar.' : undefined,
      fullName: validateFullName(fullName),
      email: validateEmail(email),
      phone: validatePhone(phone),
    }
    setErrors(nextErrors)

    if (nextErrors.workload || nextErrors.fullName || nextErrors.email || nextErrors.phone) {
      setSubmitStatus('error')
      setSubmitMessage('')
      return
    }

    setSubmitStatus('submitting')
    setSubmitMessage('Enviando seus dados...')

    try {
      await sendLeadToCrm({
        fullName,
        email,
        phone,
        selection: {
          ...selection,
          courseLabel: resolvedCourseLabel,
          workloadLabel: selectedWorkload || selection.workloadLabel,
          workloadSummary: selectedWorkload || selection.workloadSummary,
        },
      })

      window.location.assign('/obrigado')
      return
    } catch (error) {
      console.error('Erro ao enviar lead para o CRM:', error)
      setSubmitStatus('error')
      setSubmitMessage('Não foi possível enviar agora. Tente novamente em instantes.')
    }
  }

  return (
    <div
      className="lp-enroll-popup"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lp-enroll-popup-title"
      onClick={onClose}
    >
      <div className="lp-enroll-popup__panel" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className="lp-enroll-popup__close"
          onClick={onClose}
          aria-label="Fechar formulário de inscrição"
        >
          <span aria-hidden="true">&times;</span>
        </button>

        <img
          className="lp-enroll-popup__top-image"
          src={topImageSrc}
          alt=""
          aria-hidden="true"
          width={513}
          height={124}
        />

        <div className="lp-enroll-popup__content">
          <h2
            id="lp-enroll-popup-title"
            className={isPostGraduation ? 'lp-sr-only' : 'lp-enroll-popup__title'}
          >
            Curso: {resolvedCourseLabel}
          </h2>

          <p className="lp-enroll-popup__subtitle">
            Preencha o formulário para receber mais informações
          </p>

          <form className="lp-enroll-popup__form" onSubmit={handleSubmit} noValidate>
            {isPostGraduation && workloadOptions.length > 0 ? (
              <div className={`lp-enroll-popup__meta ${errors.workload ? 'is-invalid' : ''}`}>
                <Select
                  value={selectedWorkload}
                  onValueChange={(value) => {
                    setSelectedWorkload(value)
                    setErrors((currentErrors) => ({
                      ...currentErrors,
                      workload: undefined,
                    }))
                  }}
                >
                  <SelectTrigger
                    className="lp-enroll-popup__meta-select-trigger"
                    aria-label="Selecione a carga horária do curso"
                    aria-invalid={errors.workload ? 'true' : 'false'}
                  >
                    <SelectValue placeholder="Selecione a carga horária" />
                  </SelectTrigger>
                  <SelectContent
                    className="lp-enroll-popup__select-content"
                    position="popper"
                    sideOffset={6}
                  >
                    {workloadOptions.map((option) => (
                      <SelectItem key={option} value={option} className="lp-enroll-popup__select-item">
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : null}

            <input
              type="text"
              name="name"
              placeholder="Nome"
              autoComplete="name"
              value={fullName}
              onChange={(event) => setFullName(normalizeName(event.target.value))}
              className={errors.fullName ? 'is-invalid' : ''}
              aria-invalid={errors.fullName ? 'true' : 'false'}
            />
            <input
              type="email"
              name="email"
              placeholder="Seu melhor email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={errors.email ? 'is-invalid' : ''}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Telefone"
              autoComplete="tel"
              value={phone}
              onChange={(event) => setPhone(formatPhoneMask(event.target.value))}
              className={errors.phone ? 'is-invalid' : ''}
              aria-invalid={errors.phone ? 'true' : 'false'}
            />

            <button type="submit" disabled={submitStatus === 'submitting'}>
              {submitStatus === 'submitting' ? 'ENVIANDO...' : 'CONTINUAR'}
            </button>
          </form>

          {isPostGraduation ? (
            <div className="lp-enroll-popup__summary">
              <h3 className="lp-enroll-popup__summary-title">Curso: {resolvedCourseLabel}</h3>
              {resolvedWorkloadText ? (
                <p className="lp-enroll-popup__summary-workload">{resolvedWorkloadText}</p>
              ) : null}
              {popupPriceText ? (
                <p className="lp-enroll-popup__summary-price">{popupPriceText}</p>
              ) : null}
            </div>
          ) : null}

          {isPostGraduation && selection.noteTitle && popupNoteLines.length > 0 ? (
            <div className="lp-enroll-popup__note" role="note">
              <p className="lp-enroll-popup__note-title">{selection.noteTitle}</p>
              <ul className="lp-enroll-popup__note-list">
                {popupNoteLines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {submitStatus === 'error' && firstErrorMessage ? (
            <p className="lp-enroll-popup__status lp-enroll-popup__status--error">
              {firstErrorMessage}
            </p>
          ) : null}

          {submitMessage ? (
            <p
              className={`lp-enroll-popup__status ${
                submitStatus === 'error' ? 'lp-enroll-popup__status--error' : ''
              }`}
            >
              {submitMessage}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
