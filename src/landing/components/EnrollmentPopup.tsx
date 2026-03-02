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
  fullName?: string
  email?: string
  phone?: string
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

export function EnrollmentPopup({ isOpen, selection, onClose }: EnrollmentPopupProps) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  const firstErrorMessage = useMemo(() => {
    return errors.fullName ?? errors.email ?? errors.phone ?? ''
  }, [errors])

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors: FieldErrors = {
      fullName: validateFullName(fullName),
      email: validateEmail(email),
      phone: validatePhone(phone),
    }
    setErrors(nextErrors)

    if (nextErrors.fullName || nextErrors.email || nextErrors.phone) {
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
        selection,
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
          src="/landing/graduacao-em-enfermagem-topo-popup-formulario.webp"
          alt=""
          aria-hidden="true"
          width={513}
          height={124}
        />

        <div className="lp-enroll-popup__content">
          <h2 id="lp-enroll-popup-title" className="lp-enroll-popup__title">
            Curso: {selection.courseLabel}
          </h2>
          <p className="lp-enroll-popup__subtitle">
            Preencha o formulário para receber mais informações
          </p>

          <form className="lp-enroll-popup__form" onSubmit={handleSubmit} noValidate>
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
              {submitStatus === 'submitting' ? 'ENVIANDO...' : 'ENVIAR'}
            </button>
          </form>

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
