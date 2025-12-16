export const CATEGORIES = ["Annonce", "Événement", "Urgence", "Résultats", "Maintenance"] as const

export const categoryColors: Record<string, string> = {
  Annonce: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Événement: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  Urgence: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  Résultats: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Maintenance: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
}
