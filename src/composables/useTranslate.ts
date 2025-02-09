import { ref, watch } from 'vue'
import { DEFAULT_LANGUAGE as defaultLanguage } from '../constants'

import en from '../locales/en.json'
import ru from '../locales/ru.json'
import zh from '../locales/zh.json'
import type { Translations } from '@/types/translations.types'

const selectedLang = localStorage.getItem('language') || defaultLanguage
const lang = ref(selectedLang)

const translations = ref<Translations>(en)

export function useTranslate() {
  const customTranslations = localStorage.getItem('customTranslations')
    ? (localStorage.getItem('customTranslations') as string)
    : ''

  watch(
    lang,
    (newLang) => {
      switch (newLang) {
        case 'ru':
          translations.value = ru
          break
        case 'zh':
          translations.value = zh
          break
        default:
          translations.value = en
          break
      }

      if (customTranslations) {
        const customTranslationsObj: Record<string, Translations> = JSON.parse(customTranslations)

        if (customTranslationsObj?.[lang.value]) {
          translations.value = customTranslationsObj[lang.value]
        }
      }
    },
    { immediate: true },
  )

  const setLanguage = (newLang: string) => {
    lang.value = newLang
    localStorage.setItem('language', newLang)
  }

  return { lang, translations, setLanguage }
}
