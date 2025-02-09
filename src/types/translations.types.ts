export interface Translations {
  headerTitle: string
  pages: Pages
}

export interface Pages {
  [key: string]: {
    title: string
    sections: Section[]
  }
}

export interface Section {
  id: number
  title: string
  content: string
}
