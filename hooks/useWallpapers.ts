'use client'
import { useEffect, useState } from 'react'
import { Wallpaper } from '@/types/wallpaper'

export const useWallpapers = () => {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadWallpapers = async () => {
      try {
        const totalWallpapers = 389
        const loadedWallpapers = Array.from(
          { length: totalWallpapers },
          (_, i) => ({
            id: i + 1,
            filename: `wallpaper${i + 1}.png`,
            url: `/wallpapers/wallpaper${i + 1}.png`,
          })
        )

        setWallpapers(loadedWallpapers)
        setIsLoading(false)
      } catch (err) {
        setError('Failed to load wallpapers')
        setIsLoading(false)
      }
    }

    loadWallpapers()
  }, [])

  return { wallpapers, isLoading, error }
}
