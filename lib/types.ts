export interface ContentBlock {
  type: "image" | "text"
  id: string
  content: string
}

export interface News {
  id: string
  title: string
  excerpt: string
  category: "Annonce" | "Événement" | "Urgence" | "Résultats" | "Maintenance"
  date: string // ISO string
  featuredImage: string
  images: string[] // pour images locales / supplémentaires
  content: ContentBlock[]
  published: boolean
}
