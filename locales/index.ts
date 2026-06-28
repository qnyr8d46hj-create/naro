import { hr } from './hr'

export const locales = {
  hr,
} as const

export type LocaleKey = keyof typeof locales

export const defaultLocale: LocaleKey = 'hr'

export function getLocale(locale: LocaleKey = defaultLocale) {
  return locales[locale] ?? locales[defaultLocale]
}

export { hr }
