'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import type { Locale } from '@/locales/hr'

interface FormProps {
  t: Locale
}

const schema = z.object({
  recipient: z.string().min(1, 'Odaberite koga želite iznenaditi'),
  occasion: z.string().min(1, 'Odaberite prigodu'),
  age: z
    .string()
    .min(1, 'Unesite dob osobe')
    .refine((v) => {
      const n = parseInt(v)
      return !isNaN(n) && n >= 1 && n <= 120
    }, 'Unesite ispravnu dob (1–120)'),
  budget: z.number().min(50),
  deliveryDate: z.string().min(1, 'Odaberite datum'),
  description: z
    .string()
    .min(20, 'Ispričajte nam nešto o osobi (min. 20 znakova)'),
  name: z.string().min(1, 'Unesite vaše ime'),
  email: z.string().email('Unesite ispravnu email adresu'),
  contactPermission: z.boolean(),
})

type Schema = z.infer<typeof schema>

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-1.5 text-sm text-red-500"
    >
      {message}
    </motion.p>
  )
}

export default function Form({ t }: FormProps) {
  const f = t.form
  const router = useRouter()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [budget, setBudget] = useState(200)
  const budgetMax = f.fields.budget.max

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: { budget: 200, contactPermission: false },
  })

  const onSubmit = async (data: Schema) => {
    setSubmitError(null)
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, age: parseInt(data.age) }),
      })
      if (!res.ok) throw new Error('Server error')
      router.push('/hvala')
    } catch {
      setSubmitError(f.errors.submit)
    }
  }

  const budgetDisplay =
    budget >= budgetMax ? f.fields.budget.aboveMax : `${budget}€`

  const today = new Date().toISOString().split('T')[0]

  return (
    <section id="forma" className="py-28 md:py-36 px-6 bg-naro-sand">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="section-label mb-4">{f.label}</p>
          <h2 className="font-serif text-4xl md:text-5xl text-naro-text mb-4">
            {f.headline}
          </h2>
          <p className="prose-warm">{f.subheadline}</p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="card p-8 md:p-12 shadow-sm"
        >
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Row 1: Recipient + Occasion */}
            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="label-base">
                  {f.fields.recipient.label}
                </label>
                <select
                  {...register('recipient')}
                  className="input-base appearance-none"
                  defaultValue=""
                >
                  <option value="" disabled>
                    {f.fields.recipient.placeholder}
                  </option>
                  {f.fields.recipient.options.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <FieldError message={errors.recipient?.message} />
              </div>

              <div>
                <label className="label-base">{f.fields.occasion.label}</label>
                <select
                  {...register('occasion')}
                  className="input-base appearance-none"
                  defaultValue=""
                >
                  <option value="" disabled>
                    {f.fields.occasion.placeholder}
                  </option>
                  {f.fields.occasion.options.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <FieldError message={errors.occasion?.message} />
              </div>
            </div>

            {/* Row 2: Age + Delivery date */}
            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="label-base">{f.fields.age.label}</label>
                <input
                  {...register('age')}
                  type="number"
                  min={1}
                  max={120}
                  placeholder={f.fields.age.placeholder}
                  className="input-base"
                />
                <FieldError message={errors.age?.message} />
              </div>

              <div>
                <label className="label-base">
                  {f.fields.deliveryDate.label}
                </label>
                <input
                  {...register('deliveryDate')}
                  type="date"
                  min={today}
                  className="input-base"
                />
                <FieldError message={errors.deliveryDate?.message} />
              </div>
            </div>

            {/* Budget slider */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <label className="label-base mb-0">
                  {f.fields.budget.label}
                </label>
                <span className="font-serif text-2xl text-naro-accent">
                  {budgetDisplay}
                </span>
              </div>
              <input
                type="range"
                min={f.fields.budget.min}
                max={budgetMax}
                step={f.fields.budget.step}
                value={budget}
                className="w-full"
                style={{
                  background: `linear-gradient(to right, #B8714E ${
                    ((budget - f.fields.budget.min) /
                      (budgetMax - f.fields.budget.min)) *
                    100
                  }%, #E2D9CE ${
                    ((budget - f.fields.budget.min) /
                      (budgetMax - f.fields.budget.min)) *
                    100
                  }%)`,
                }}
                onChange={(e) => {
                  const val = parseInt(e.target.value)
                  setBudget(val)
                  setValue('budget', val)
                }}
              />
              <div className="flex justify-between text-xs text-naro-muted mt-1.5">
                <span>{f.fields.budget.min}€</span>
                <span>{f.fields.budget.aboveMax}</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="label-base">
                {f.fields.description.label}
              </label>
              <textarea
                {...register('description')}
                rows={6}
                placeholder={f.fields.description.placeholder}
                className="input-base resize-none leading-relaxed"
              />
              <FieldError message={errors.description?.message} />
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-naro-border" />
              <span className="text-xs text-naro-muted tracking-wider uppercase">
                O vama
              </span>
              <div className="flex-1 h-px bg-naro-border" />
            </div>

            {/* Row 3: Name + Email */}
            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="label-base">{f.fields.name.label}</label>
                <input
                  {...register('name')}
                  type="text"
                  placeholder={f.fields.name.placeholder}
                  className="input-base"
                />
                <FieldError message={errors.name?.message} />
              </div>

              <div>
                <label className="label-base">{f.fields.email.label}</label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder={f.fields.email.placeholder}
                  className="input-base"
                />
                <FieldError message={errors.email?.message} />
              </div>
            </div>

            {/* Contact permission */}
            <label className="flex items-start gap-3 cursor-pointer group mb-8">
              <input
                {...register('contactPermission')}
                type="checkbox"
                className="mt-1 w-4 h-4 rounded border-naro-border text-naro-accent focus:ring-naro-accent focus:ring-offset-0 cursor-pointer"
              />
              <span className="text-sm text-naro-warm leading-relaxed group-hover:text-naro-text transition-colors">
                {f.fields.contactPermission.label}
              </span>
            </label>

            {/* Submit error */}
            {submitError && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600"
              >
                {submitError}
              </motion.div>
            )}

            {/* Submit */}
            <div className="flex flex-col items-center gap-4">
              <Button
                type="submit"
                size="lg"
                loading={isSubmitting}
                className="w-full sm:w-auto min-w-[280px]"
              >
                {isSubmitting ? f.ctaLoading : f.cta}
                {!isSubmitting && (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                )}
              </Button>
              <p className="text-xs text-naro-muted text-center max-w-xs">
                {f.privacy}
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
