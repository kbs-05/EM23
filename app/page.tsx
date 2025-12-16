"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { NewsTable } from "@/components/news-table"
import { NewsPreview } from "@/components/news-preview"
import { FilterBar } from "@/components/filter-bar"
import { NewsForm } from "@/components/news-form"
import { Card } from "@/components/ui/card"
import type { News, ContentBlock } from "@/lib/types"
import { db, storage } from "@/lib/firebase"
import { collection, onSnapshot, doc, addDoc, updateDoc, deleteDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

export default function Dashboard() {
  const [news, setNews] = useState<News[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [previewId, setPreviewId] = useState<string | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Firestore realtime
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "actualites"),
      snapshot => {
        const newsData: News[] = []
        snapshot.forEach(doc => {
          const data = doc.data()
          newsData.push({
            id: doc.id,
            title: data.title || "",
            excerpt: data.excerpt || "",
            category: data.category || "Annonce",
            date: data.date || new Date().toISOString(),
            featuredImage: data.featuredImage || "",
            images: data.images || [],
            content: data.content || [],
            published: data.published || false
          } as News)
        })
        setNews(newsData)
      },
      error => console.error("Firestore error:", error)
    )
    return () => unsub()
  }, [])

  const filteredNews = news.filter(item => {
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "published" ? item.published : !item.published)
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesStatus && matchesSearch
  })

  const handleSaveNews = async (formData: Omit<News, "id">) => {
    try {
      if (editingId) {
        // Mettre à jour l'actualité existante
        await updateDoc(doc(db, "actualites", editingId), formData)
        setEditingId(null)
      } else {
        // Créer une nouvelle actualité
        await addDoc(collection(db, "actualites"), formData)
      }

      setShowForm(false)
    } catch (err) {
      console.error("Erreur lors de la sauvegarde:", err)
    }
  }

  const handleDeleteNews = async (id: string) => {
    try {
      await deleteDoc(doc(db, "actualites", id))
    } catch (err) {
      console.error("Erreur lors de la suppression:", err)
    }
  }

  const handleTogglePublish = async (id: string) => {
    const item = news.find(n => n.id === id)
    if (!item) return
    try {
      await updateDoc(doc(db, "actualites", id), { published: !item.published })
    } catch (err) {
      console.error("Erreur lors de la publication:", err)
    }
  }

  const handleEditNews = (id: string) => {
    setEditingId(id)
    setShowForm(true)
  }

  const handleAddNews = () => {
    setEditingId(null)
    setShowForm(true)
  }

  // Trouver l'actualité en cours d'édition
  const editingNews = editingId ? news.find(n => n.id === editingId) : undefined
  const previewNews = previewId ? news.find(n => n.id === previewId) : undefined

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <Header
        onAddNews={handleAddNews}
        showForm={showForm}
      />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        {/* Formulaire d'édition/création */}
        {showForm && (
          <Card className="mb-8 p-6 border border-border shadow-lg bg-card">
            <NewsForm
              onSave={handleSaveNews}
              onCancel={() => {
                setShowForm(false)
                setEditingId(null)
              }}
              editingNews={editingNews}  // editingNews est maintenant undefined au lieu de null
            />
          </Card>
        )}

        {/* Barre de filtres */}
        <div className="mb-6">
          <FilterBar
            onCategoryChange={setCategoryFilter}
            onStatusChange={setStatusFilter}
            onSearchChange={setSearchTerm}
            categoryFilter={categoryFilter}
            statusFilter={statusFilter}
            searchTerm={searchTerm}
          />
        </div>

        {/* Tableau des actualités */}
        <Card className="border border-border shadow-lg overflow-hidden">
          <NewsTable
            news={filteredNews}
            onEdit={handleEditNews}
            onDelete={handleDeleteNews}
            onTogglePublish={handleTogglePublish}
            onPreview={setPreviewId}
          />
        </Card>

        {/* Message si aucune actualité */}
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Aucune actualité trouvée</p>
          </div>
        )}
      </main>

      {/* Prévisualisation */}
      {previewNews && <NewsPreview news={previewNews} onClose={() => setPreviewId(null)} />}
    </div>
  )
}