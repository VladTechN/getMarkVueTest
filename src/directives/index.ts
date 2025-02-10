import { type DirectiveBinding, type Directive } from 'vue'
import { useTranslate } from '@/composables/useTranslate'

export const vEditText: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { lang, translations } = useTranslate()

    const setTranslation = () => {
      const updatedTranslation = el.innerText.trim() === '' ? '[Empty text content]' : el.innerText
      const translationKeys = binding.value.split('.')

      let valueToTranslate = translations.value

      translationKeys.forEach((key: string, index: number) => {
        if (index === translationKeys.length - 1) {
          valueToTranslate[key] = updatedTranslation
        }

        valueToTranslate = valueToTranslate[key] || {}
      })
    }

    const closeEditor = () => {
      el.setAttribute('contenteditable', 'false')
    }

    const cancelChanges = () => {
      setTranslation()
      closeEditor()
    }

    const keydownEventHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') cancelChanges()

      if (event.key === 'Enter') {
        console.log('el', el)
        const customTranslations = localStorage.getItem('customTranslations')
        const customTranslationsObj = customTranslations ? JSON.parse(customTranslations) : {}

        setTranslation()

        localStorage.setItem(
          'customTranslations',
          JSON.stringify({
            ...customTranslationsObj,
            [lang.value]: translations.value,
          }),
        )

        closeEditor()
      }
    }

    const openTextEditor = () => {
      el.setAttribute('contenteditable', 'true')
      el.focus()
    }

    el.addEventListener('blur', cancelChanges)
    el.addEventListener('dblclick', openTextEditor)
    el.addEventListener('keydown', keydownEventHandler)
  },
}
