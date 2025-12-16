"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Search, Filter } from "lucide-react"
import { CATEGORIES } from "@/lib/constants"

interface FilterBarProps {
  onCategoryChange: (category: string) => void
  onStatusChange: (status: string) => void
  onSearchChange: (search: string) => void
  categoryFilter: string
  statusFilter: string
  searchTerm: string
}

export function FilterBar({
  onCategoryChange,
  onStatusChange,
  onSearchChange,
  categoryFilter,
  statusFilter,
  searchTerm,
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Barre de recherche */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher une actualité..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-card border-border"
        />
      </div>

      {/* Filtre par catégorie */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Catégorie</span>
            {categoryFilter !== "all" && (
              <span className="hidden sm:inline text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                {categoryFilter}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Filtrer par catégorie</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onCategoryChange("all")}>
            {categoryFilter === "all" && "✓ "} Toutes les catégories
          </DropdownMenuItem>
          {CATEGORIES.map((cat) => (
            <DropdownMenuItem key={cat} onClick={() => onCategoryChange(cat)}>
              {categoryFilter === cat && "✓ "} {cat}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Filtre par statut */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Statut</span>
            {statusFilter !== "all" && (
              <span className="hidden sm:inline text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                {statusFilter === "published" ? "Publié" : "Brouillon"}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Filtrer par statut</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onStatusChange("all")}>
            {statusFilter === "all" && "✓ "} Tous les statuts
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onStatusChange("published")}>
            {statusFilter === "published" && "✓ "} Publié
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onStatusChange("draft")}>
            {statusFilter === "draft" && "✓ "} Brouillon
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
