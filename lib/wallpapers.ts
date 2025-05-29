import fs from 'fs'
import path from 'path'

const EXTENSIONS = ['png', 'jpg', 'jpeg'] as const

export interface Wallpaper {
  id: string
  filename: string
  url: string
}

export async function getAllWallpapers(): Promise<Wallpaper[]> {
  const imagesDir = path.join(process.cwd(), 'public/images')
  const files = fs.readdirSync(imagesDir)

  return files
    .filter((file) =>
      EXTENSIONS.some((ext) => file.toLowerCase().endsWith(`.${ext}`))
    )
    .map((file) => {
      const id = file.split('.')[0]
      return {
        id,
        filename: file,
        url: `/images/${file}`,
      }
    })
}
