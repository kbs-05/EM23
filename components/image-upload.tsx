"use client"

import type React from "react"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Trash2, Upload } from "lucide-react"

interface ImageUploadProps {
  onImagesChange: (images: string[]) => void
  maxImages: number
  currentImages: string[]
}

export function ImageUpload({ onImagesChange, maxImages, currentImages }: ImageUploadProps) {
  const [previews, setPreviews] = useState<string[]>(currentImages)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (!files) return

    if (previews.length + files.length > maxImages) {
      alert(`Vous pouvez ajouter maximum ${maxImages} images au total. Vous en avez déjà ${previews.length}.`)
      return
    }

    const newPreviews = [...previews]
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          newPreviews.push(e.target.result as string)
          if (newPreviews.length <= maxImages) {
            setPreviews([...newPreviews])
            onImagesChange([...newPreviews])
          }
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = (index: number) => {
    const updated = previews.filter((_, i) => i !== index)
    setPreviews(updated)
    onImagesChange(updated)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-semibold text-foreground">
          Images de contenu ({previews.length}/{maxImages})
        </Label>
        <span className="text-xs text-muted-foreground">{maxImages - previews.length} image(s) restante(s)</span>
      </div>

      {/* Upload zone */}
      <div className="border-2 border-dashed border-border rounded-lg p-6 hover:border-accent/50 transition-colors">
        <input
          type="file"
          id="image-upload"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          disabled={previews.length >= maxImages}
          className="hidden"
        />
        <label
          htmlFor="image-upload"
          className={`flex flex-col items-center justify-center gap-3 cursor-pointer ${
            previews.length >= maxImages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <Upload className="w-8 h-8 text-muted-foreground" />
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">Cliquez pour ajouter des images</p>
            <p className="text-xs text-muted-foreground">ou glissez-les ici (PNG, JPG, etc.)</p>
          </div>
        </label>
      </div>

      {/* Image previews */}
      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {previews.map((preview, index) => (
            <div
              key={index}
              className="relative group rounded-lg overflow-hidden border border-border hover:border-accent transition-colors"
            >
              <img
                src={preview || "/placeholder.svg"}
                alt={`Preview ${index + 1}`}
                className="w-full h-24 object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                <Trash2 className="w-5 h-5 text-white" />
              </button>
              <span className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded">
                {index + 1}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
