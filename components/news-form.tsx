"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { CATEGORIES } from "@/lib/constants"
import type { News, ContentBlock } from "@/lib/types"
import { X, Trash2, Type } from "lucide-react"
import { ImageUpload } from "./image-upload"

// Crée un type qui correspond aux catégories définies dans CATEGORIES
type CategoryType = (typeof CATEGORIES)[number]

interface NewsFormProps {
  onSave: (data: Omit<News, "id">) => void
  onCancel: () => void
  editingNews?: News
}

export function NewsForm({ onSave, onCancel, editingNews }: NewsFormProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    category: "Annonce" as CategoryType,
    date: new Date().toISOString().split("T")[0],
    featuredImage: "",
    images: [] as string[],
    content: [] as ContentBlock[],
    published: false,
  })

  useEffect(() => {
    if (editingNews) {
      setFormData({
        title: editingNews.title,
        excerpt: editingNews.excerpt,
        category: editingNews.category as CategoryType,
        date: editingNews.date,
        featuredImage: editingNews.featuredImage,
        images: editingNews.images || [],
        content: editingNews.content,
        published: editingNews.published,
      })
    }
  }, [editingNews])

  const addTextBlock = () => {
    const newBlock: ContentBlock = {
      type: "text",
      id: Date.now().toString(),
      content: "",
    }
    setFormData({
      ...formData,
      content: [...formData.content, newBlock],
    })
  }

  const updateContentBlock = (id: string, content: string) => {
    setFormData({
      ...formData,
      content: formData.content.map((block) => (block.id === id ? { ...block, content } : block)),
    })
  }

  const removeContentBlock = (id: string) => {
    setFormData({
      ...formData,
      content: formData.content.filter((block) => block.id !== id),
    })
  }

  const buildContent = () => {
    const builtContent: ContentBlock[] = []

    // Add uploaded images as content blocks
    formData.images.forEach((image, index) => {
      builtContent.push({
        type: "image",
        id: `img-${index}`,
        content: image,
      })
    })

    // Add text blocks
    formData.content.forEach((block) => {
      if (block.type === "text") {
        builtContent.push(block)
      }
    })

    return builtContent
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      toast({
        title: "Erreur",
        description: "Le titre est obligatoire",
        variant: "destructive",
      })
      return
    }

    if (!formData.excerpt.trim()) {
      toast({
        title: "Erreur",
        description: "Le résumé est obligatoire",
        variant: "destructive",
      })
      return
    }

    if (formData.images.length === 0) {
      toast({
        title: "Erreur",
        description: "Ajoutez au moins une image",
        variant: "destructive",
      })
      return
    }

    const finalContent = buildContent()

    onSave({
      title: formData.title,
      excerpt: formData.excerpt,
      category: formData.category,
      date: formData.date,
      featuredImage: formData.featuredImage || formData.images[0],
      images: formData.images,
      content: finalContent,
      published: formData.published,
    })

    toast({
      title: "Succès",
      description: editingNews ? "Actualité mise à jour avec succès" : "Actualité créée avec succès",
    })

    if (!editingNews) {
      setFormData({
        title: "",
        excerpt: "",
        category: "Annonce" as CategoryType,
        date: new Date().toISOString().split("T")[0],
        featuredImage: "",
        images: [],
        content: [],
        published: false,
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          {editingNews ? "✏️ Modifier l'actualité" : "➕ Nouvelle actualité"}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Titre */}
        <div className="md:col-span-2">
          <Label htmlFor="title" className="text-sm font-semibold text-foreground mb-2 block">
            Titre *
          </Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Entrez le titre de l'actualité"
            className="bg-background border-border"
          />
        </div>

        {/* Résumé */}
        <div className="md:col-span-2">
          <Label htmlFor="excerpt" className="text-sm font-semibold text-foreground mb-2 block">
            Résumé *
          </Label>
          <Textarea
            id="excerpt"
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            placeholder="Entrez un court résumé de l'actualité"
            rows={2}
            className="bg-background border-border resize-none"
          />
        </div>

        {/* Catégorie */}
        <div>
          <Label htmlFor="category" className="text-sm font-semibold text-foreground mb-2 block">
            Catégorie
          </Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value as CategoryType })}
          >
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Sélectionnez une catégorie" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date */}
        <div>
          <Label htmlFor="date" className="text-sm font-semibold text-foreground mb-2 block">
            Date
          </Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="bg-background border-border"
          />
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <ImageUpload
          onImagesChange={(images) => setFormData({ ...formData, images })}
          maxImages={10}
          currentImages={formData.images}
        />
      </div>

      {/* Text content blocks */}
      <div className="border-t border-border pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Paragraphes de texte</h3>
          <Button type="button" variant="outline" size="sm" onClick={addTextBlock} className="gap-2 bg-transparent">
            <Type className="w-4 h-4" />
            Ajouter un paragraphe
          </Button>
        </div>

        <div className="space-y-4">
          {formData.content
            .filter((block) => block.type === "text")
            .map((block, index) => (
              <div key={block.id} className="p-4 border border-border rounded-lg bg-secondary/5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-foreground">📝 Paragraphe #{index + 1}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeContentBlock(block.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <Textarea
                  value={block.content}
                  onChange={(e) => updateContentBlock(block.id, e.target.value)}
                  placeholder="Entrez votre paragraphe de texte..."
                  rows={5}
                  className="bg-background border-border resize-none"
                />
              </div>
            ))}
        </div>
      </div>

      {/* Checkbox Publié */}
      <div className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg border border-border">
        <Checkbox
          id="published"
          checked={formData.published}
          onCheckedChange={(checked) => setFormData({ ...formData, published: checked as boolean })}
        />
        <Label htmlFor="published" className="text-sm font-medium text-foreground cursor-pointer flex-1">
          Publier cette actualité
          <span className="block text-xs text-muted-foreground mt-1">
            Cochez pour rendre l'actualité visible aux étudiants
          </span>
        </Label>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          size="lg"
          className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
        >
          {editingNews ? "✓ Mettre à jour" : "✓ Créer l'actualité"}
        </Button>
        <Button type="button" variant="outline" size="lg" onClick={onCancel} className="flex-1 bg-transparent">
          Annuler
        </Button>
      </div>
    </form>
  )
}
