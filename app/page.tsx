"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { NewsTable } from "@/components/news-table"
import { NewsPreview } from "@/components/news-preview"
import { FilterBar } from "@/components/filter-bar"
import { Card } from "@/components/ui/card"
import type { News, ContentBlock } from "@/lib/types"
import { db, storage } from "@/lib/firebase"
import { collection, onSnapshot, doc, addDoc, updateDoc, deleteDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 as uuidv4 } from "uuid"

export default function Dashboard() {
  const [news, setNews] = useState<News[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [previewId, setPreviewId] = useState<string | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [blocks, setBlocks] = useState<ContentBlock[]>([])

  // Firestore realtime
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "actualites"),
      snapshot => setNews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as News))),
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

  const handleSaveNews = async (formData: {
    title: string
    excerpt: string
    category: "Annonce" | "Événement" | "Urgence" | "Résultats" | "Maintenance"
    published: boolean
  }) => {
    try {
      let featuredImage = ""

      if (file) {
        const storageRef = ref(storage, `images/${file.name}_${Date.now()}`)
        await uploadBytes(storageRef, file)
        featuredImage = await getDownloadURL(storageRef)
      }

      const dataToSave: Omit<News, "id"> = {
        title: formData.title,
        excerpt: formData.excerpt,
        category: formData.category,
        published: formData.published,
        featuredImage,
        images: [],
        content: blocks.map(b => ({ ...b, id: b.id || uuidv4() })),
        date: new Date().toISOString()
      }

      if (editingId) {
        await updateDoc(doc(db, "actualites", editingId), dataToSave)
        setEditingId(null)
      } else {
        await addDoc(collection(db, "actualites"), dataToSave)
      }

      setShowForm(false)
      setFile(null)
      setBlocks([])
    } catch (err) {
      console.error("Save error:", err)
    }
  }

  const handleDeleteNews = async (id: string) => {
    try {
      await deleteDoc(doc(db, "actualites", id))
    } catch (err) {
      console.error("Delete error:", err)
    }
  }

  const handleTogglePublish = async (id: string) => {
    const item = news.find(n => n.id === id)
    if (!item) return
    try {
      await updateDoc(doc(db, "actualites", id), { published: !item.published })
    } catch (err) {
      console.error("Publish error:", err)
    }
  }

  const editingNews = editingId ? news.find(n => n.id === editingId) : null
  const previewNews = previewId ? news.find(n => n.id === previewId) : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <Header
        onAddNews={() => { setEditingId(null); setShowForm(!showForm) }}
        showForm={showForm}
      />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        {showForm && (
          <Card className="mb-8 p-6 sm:p-8 border border-border shadow-lg">
            <form
              onSubmit={e => {
                e.preventDefault()
                const form = e.currentTarget as HTMLFormElement
                const formData = {
                  title: (form.elements.namedItem("title") as HTMLInputElement).value,
                  excerpt: (form.elements.namedItem("excerpt") as HTMLInputElement).value,
                  category: (form.elements.namedItem("category") as HTMLSelectElement).value as
                    | "Annonce"
                    | "Événement"
                    | "Urgence"
                    | "Résultats"
                    | "Maintenance",
                  published: (form.elements.namedItem("published") as HTMLInputElement).checked
                }
                handleSaveNews(formData)
              }}
              className="space-y-4"
            >
              <input
                name="title"
                placeholder="Titre"
                defaultValue={editingNews?.title || ""}
                required
                className="input"
              />
              <input
                name="excerpt"
                placeholder="Extrait"
                defaultValue={editingNews?.excerpt || ""}
                required
                className="input"
              />

              {/* Ajouter/éditer des blocs texte ou image */}
              <div className="space-y-2">
                {blocks.map((b, i) => (
                  <div key={b.id} className="flex gap-2 items-center">
                    {b.type === "text" ? (
                      <input
                        value={b.content}
                        onChange={e => {
                          const newBlocks = [...blocks]
                          newBlocks[i].content = e.target.value
                          setBlocks(newBlocks)
                        }}
                        className="input flex-1"
                      />
                    ) : (
                      <input
                        type="file"
                        onChange={async e => {
                          const file = e.target.files?.[0]
                          if (!file) return
                          const storageRef = ref(storage, `images/${file.name}_${Date.now()}`)
                          await uploadBytes(storageRef, file)
                          const url = await getDownloadURL(storageRef)
                          const newBlocks = [...blocks]
                          newBlocks[i].content = url
                          setBlocks(newBlocks)
                        }}
                        className="flex-1"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => setBlocks(blocks.filter((_, idx) => idx !== i))}
                      className="btn btn-danger"
                    >
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setBlocks([...blocks, { id: uuidv4(), type: "text", content: "" }])}
                  className="btn btn-secondary"
                >
                  Ajouter texte
                </button>
                <button
                  type="button"
                  onClick={() => setBlocks([...blocks, { id: uuidv4(), type: "image", content: "" }])}
                  className="btn btn-secondary"
                >
                  Ajouter image
                </button>
              </div>

              <select
                name="category"
                defaultValue={editingNews?.category || "Annonce"}
                className="input"
              >
                <option value="Annonce">Annonce</option>
                <option value="Événement">Événement</option>
                <option value="Urgence">Urgence</option>
                <option value="Résultats">Résultats</option>
                <option value="Maintenance">Maintenance</option>
              </select>

              <label className="flex items-center gap-2">
                Publié :{" "}
                <input
                  type="checkbox"
                  name="published"
                  defaultChecked={editingNews?.published || false}
                />
              </label>

              <div className="flex gap-2">
                <button type="submit" className="btn btn-primary">
                  Enregistrer
                </button>
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setEditingId(null); setBlocks([]); setFile(null) }}
                  className="btn btn-secondary"
                >
                  Annuler
                </button>
              </div>
            </form>
          </Card>
        )}

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

        <Card className="border border-border shadow-lg overflow-hidden">
          <NewsTable
            news={filteredNews}
            onEdit={id => { setEditingId(id); setShowForm(true); setBlocks(news.find(n => n.id === id)?.content || []) }}
            onDelete={handleDeleteNews}
            onTogglePublish={handleTogglePublish}
            onPreview={setPreviewId}
          />
        </Card>

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Aucune actualité trouvée</p>
          </div>
        )}
      </main>

      {previewNews && <NewsPreview news={previewNews} onClose={() => setPreviewId(null)} />}
    </div>
  )
}
