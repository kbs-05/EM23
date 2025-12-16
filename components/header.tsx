"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface HeaderProps {
  onAddNews: () => void
  showForm: boolean
}

export function Header({ onAddNews, showForm }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-primary to-secondary shadow-md border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-foreground">📚 Université</h1>
            <p className="text-primary-foreground/80 mt-1 text-sm sm:text-base">
              Tableau de bord d'administration - Gestion des actualités
            </p>
          </div>
          <Button
            onClick={onAddNews}
            className={`gap-2 transition-all ${
              showForm ? "bg-destructive hover:bg-destructive/90" : "bg-accent hover:bg-accent/90"
            }`}
            size="lg"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">{showForm ? "Annuler" : "Nouvelle actualité"}</span>
            <span className="sm:hidden">{showForm ? "Annuler" : "Ajouter"}</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
