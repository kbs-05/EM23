"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Calendar } from "lucide-react"
import type { News } from "@/lib/types"
import { categoryColors } from "@/lib/constants"

interface NewsPreviewProps {
  news: News
  onClose: () => void
}

export function NewsPreview({ news, onClose }: NewsPreviewProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString + "T00:00:00")
    return date.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-background rounded-lg shadow-xl my-8">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Aperçu de l'actualité</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto max-h-[80vh]">
          {news.featuredImage && (
            <div className="mb-6 rounded-lg overflow-hidden border border-border">
              <img src={news.featuredImage} alt={news.title} className="w-full h-80 object-cover" />
            </div>
          )}

          <h1 className="text-3xl font-bold text-foreground mb-3">{news.title}</h1>
          <p className="text-lg text-muted-foreground mb-4">{news.excerpt}</p>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge
              variant="secondary"
              className={`${categoryColors[news.category as keyof typeof categoryColors] || "bg-muted"}`}
            >
              {news.category}
            </Badge>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              {formatDate(news.date)}
            </div>
          </div>

          <div className="border-t border-border pt-6 space-y-4">
            {news.content.map(block => (
              <div key={block.id}>
                {block.type === "image" ? (
                  <div className="rounded-lg overflow-hidden border border-border">
                    <img
                      src={block.content}
                      alt="Article content"
                      className="w-full h-96 object-cover"
                      onError={e => { e.currentTarget.src = "/image-indisponible.jpg" }}
                    />
                  </div>
                ) : (
                  <p className="text-base leading-relaxed text-foreground whitespace-pre-wrap">{block.content}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 sm:p-6 border-t border-border flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose}>Fermer</Button>
        </div>
      </div>
    </div>
  )
}
