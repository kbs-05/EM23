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
import { X, Trash2, Plus, Calendar, Tag, Image as ImageIcon, FileText, Globe, Eye, EyeOff, Save, Sparkles } from "lucide-react"
import { ImageUpload } from "./image-upload"
import { cn } from "@/lib/utils"

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

    formData.images.forEach((image, index) => {
      builtContent.push({
        type: "image",
        id: `img-${index}`,
        content: image,
      })
    })

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
        title: "Champ requis",
        description: "Le titre est obligatoire",
        variant: "destructive",
      })
      return
    }

    if (!formData.excerpt.trim()) {
      toast({
        title: "Champ requis",
        description: "Le résumé est obligatoire",
        variant: "destructive",
      })
      return
    }

    if (formData.images.length === 0) {
      toast({
        title: "Image requise",
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
      description: editingNews ? "Actualité mise à jour" : "Actualité créée",
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 p-4 md:p-6">
      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto">
        {/* Header avec gradient */}
        <div className="relative mb-8 md:mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-3xl blur-xl"></div>
          <div className="relative bg-gradient-to-r from-primary/5 via-background to-background backdrop-blur-sm border border-primary/20 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {editingNews ? (
                      <Sparkles className="h-6 w-6 text-primary" />
                    ) : (
                      <Plus className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                      {editingNews ? "Modifier l'actualité" : "Nouvelle actualité"}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      {editingNews ? "Actualité #" + editingNews.id : "Créez une nouvelle publication pour la communauté"}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  className="gap-2 border-border hover:border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                  Annuler
                </Button>
                <Button
                  type="submit"
                  className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-primary/25"
                >
                  <Save className="h-4 w-4" />
                  {editingNews ? "Mettre à jour" : "Publier"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu principal en deux colonnes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Colonne gauche - Contenu principal */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {/* Section Titre */}
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-1.5 bg-gradient-to-b from-primary to-primary/60 rounded-full"></div>
                  <h2 className="text-lg font-semibold">Titre & description</h2>
                </div>
                
                <div className="space-y-5">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <span className="text-destructive">*</span>
                      Titre de l'actualité
                    </Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Un titre percutant qui attire l'attention..."
                      className="h-12 text-base border-2 border-border/50 focus:border-primary/50 bg-background/50"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <span className="text-destructive">*</span>
                      Résumé
                    </Label>
                    <Textarea
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      placeholder="Décrivez brièvement le contenu de cette actualité..."
                      rows={3}
                      className="resize-none border-2 border-border/50 focus:border-primary/50 bg-background/50"
                    />
                    <p className="text-xs text-muted-foreground">Cette description apparaîtra dans la liste des actualités</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Images */}
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-1.5 bg-gradient-to-b from-primary to-primary/60 rounded-full"></div>
                  <h2 className="text-lg font-semibold">Médias</h2>
                </div>
                
                <ImageUpload
                  onImagesChange={(images) => setFormData({ ...formData, images })}
                  maxImages={10}
                  currentImages={formData.images}
                />
                
                {formData.images.length > 0 && (
                  <div className="pt-4 border-t border-border/50">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">{formData.images.length}</span> image{formData.images.length > 1 ? "s" : ""} sélectionnée{formData.images.length > 1 ? "s" : ""}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Section Contenu */}
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-1.5 bg-gradient-to-b from-primary to-primary/60 rounded-full"></div>
                    <h2 className="text-lg font-semibold">Contenu détaillé</h2>
                  </div>
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addTextBlock}
                    className="gap-2 border-dashed hover:border-primary/50 hover:bg-primary/5"
                  >
                    <Plus className="h-4 w-4" />
                    Ajouter un bloc
                  </Button>
                </div>

                <div className="space-y-6">
                  {formData.content
                    .filter((block) => block.type === "text")
                    .map((block, index) => (
                      <div 
                        key={block.id} 
                        className="group relative border border-border/50 rounded-xl p-5 bg-background/30 hover:bg-background/50 transition-all"
                      >
                        <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => removeContentBlock(block.id)}
                            className="h-8 w-8 rounded-full shadow-lg"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <FileText className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <span className="text-sm font-medium">Bloc de texte #{index + 1}</span>
                            <p className="text-xs text-muted-foreground">Paragraphe détaillé</p>
                          </div>
                        </div>
                        
                        <Textarea
                          value={block.content}
                          onChange={(e) => updateContentBlock(block.id, e.target.value)}
                          placeholder="Saisissez votre contenu ici..."
                          rows={5}
                          className="border-0 bg-transparent focus-visible:ring-0 p-0 text-base resize-none min-h-[120px]"
                        />
                      </div>
                    ))}

                  {formData.content.filter((block) => block.type === "text").length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed border-border/50 rounded-xl">
                      <div className="p-3 bg-primary/10 rounded-full w-12 h-12 mx-auto mb-4">
                        <FileText className="h-6 w-6 text-primary mx-auto" />
                      </div>
                      <h3 className="font-medium text-foreground mb-2">Commencez à rédiger</h3>
                      <p className="text-sm text-muted-foreground mb-4">Ajoutez votre premier bloc de contenu</p>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addTextBlock}
                        className="gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Ajouter du contenu
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Colonne droite - Paramètres */}
          <div className="space-y-6 md:space-y-8">
            {/* Métadonnées */}
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-sm">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Tag className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-lg font-semibold">Paramètres</h2>
                </div>

                <div className="space-y-5">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Catégorie
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value as CategoryType })}
                    >
                      <SelectTrigger className="border-2 border-border/50 focus:ring-primary/50">
                        <SelectValue placeholder="Choisir une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((cat) => (
                          <SelectItem 
                            key={cat} 
                            value={cat}
                            className="focus:bg-primary/10 focus:text-primary"
                          >
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Date de publication
                    </Label>
                    <div className="relative">
                      <Input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="border-2 border-border/50 pl-10"
                      />
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Statut de publication */}
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-sm">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    formData.published 
                      ? "bg-green-500/10" 
                      : "bg-amber-500/10"
                  )}>
                    {formData.published ? (
                      <Eye className="h-5 w-5 text-green-500" />
                    ) : (
                      <EyeOff className="h-5 w-5 text-amber-500" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">Visibilité</h2>
                    <p className="text-sm text-muted-foreground">Contrôlez la visibilité de l'actualité</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-background/30 rounded-xl border border-border/50">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {formData.published ? (
                          <Globe className="h-4 w-4 text-green-500" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-amber-500" />
                        )}
                        <span className="font-medium">
                          {formData.published ? "Publié" : "Brouillon"}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formData.published 
                          ? "Visible par tous les étudiants" 
                          : "Seulement visible par les administrateurs"}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "text-sm font-medium",
                        formData.published ? "text-green-500" : "text-amber-500"
                      )}>
                        {formData.published ? "Public" : "Privé"}
                      </span>
                      <Checkbox
                        checked={formData.published}
                        onCheckedChange={(checked) => setFormData({ ...formData, published: checked as boolean })}
                        className={cn(
                          "h-5 w-5",
                          formData.published 
                            ? "bg-green-500 border-green-500 data-[state=checked]:bg-green-500" 
                            : "border-amber-500"
                        )}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/50">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        type="submit"
                        className="flex-1 gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-primary/25"
                      >
                        <Save className="h-4 w-4" />
                        {editingNews ? "Mettre à jour" : "Publier"}
                      </Button>
                      
                      <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        className="flex-1 gap-2 border-border hover:border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                        Annuler
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Résumé */}
            <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-transparent border border-primary/20 rounded-2xl p-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Résumé</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Titre</span>
                    <span className="font-medium truncate max-w-[200px]">{formData.title || "Non défini"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Catégorie</span>
                    <span className="font-medium">{formData.category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Images</span>
                    <span className="font-medium">{formData.images.length} / 10</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Blocs texte</span>
                    <span className="font-medium">
                      {formData.content.filter(b => b.type === "text").length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}