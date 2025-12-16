"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, MoreHorizontal, Eye, EyeOff, Calendar } from "lucide-react"
import type { News } from "@/lib/types"
import { categoryColors } from "@/lib/constants"

interface NewsTableProps {
  news: News[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onTogglePublish: (id: string) => void
  onPreview?: (id: string) => void
}

export function NewsTable({ news, onEdit, onDelete, onTogglePublish, onPreview }: NewsTableProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString + "T00:00:00")
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-secondary/30">
          <TableRow className="border-border">
            <TableHead className="font-semibold text-foreground">Titre</TableHead>
            <TableHead className="font-semibold text-foreground">Catégorie</TableHead>
            <TableHead className="font-semibold text-foreground">Date</TableHead>
            <TableHead className="font-semibold text-foreground">Contenu</TableHead>
            <TableHead className="font-semibold text-foreground">Statut</TableHead>
            <TableHead className="text-right font-semibold text-foreground">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {news.map((item) => (
            <TableRow key={item.id} className="border-border hover:bg-muted/30 transition-colors">
              <TableCell className="py-4">
                <div className="flex items-start gap-3">
                  {item.featuredImage && (
                    <img
                      src={item.featuredImage || "/placeholder.svg"}
                      alt={item.title}
                      className="w-12 h-12 rounded object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground truncate">{item.title}</p>
                    <p className="text-sm text-muted-foreground truncate line-clamp-2">{item.excerpt}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={`${categoryColors[item.category as keyof typeof categoryColors] || "bg-muted"}`}
                >
                  {item.category}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {formatDate(item.date)}
                </div>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {item.content.length} bloc{item.content.length > 1 ? "s" : ""}
              </TableCell>
              <TableCell>
                <Badge
                  variant={item.published ? "default" : "outline"}
                  className={item.published ? "bg-accent text-accent-foreground" : ""}
                >
                  {item.published ? "🔓 Publié" : "🔒 Brouillon"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {onPreview && (
                      <>
                        <DropdownMenuItem onClick={() => onPreview(item.id)} className="gap-2 cursor-pointer">
                          <Eye className="w-4 h-4" />
                          Aperçu
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem onClick={() => onEdit(item.id)} className="gap-2 cursor-pointer">
                      <Edit className="w-4 h-4" />
                      Modifier
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onTogglePublish(item.id)} className="gap-2 cursor-pointer">
                      {item.published ? (
                        <>
                          <EyeOff className="w-4 h-4" />
                          Dépublier
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4" />
                          Publier
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => onDelete(item.id)}
                      className="gap-2 cursor-pointer text-destructive focus:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
