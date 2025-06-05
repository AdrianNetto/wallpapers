import { Wallpaper } from '@/data/wallpapers'
import dynamic from 'next/dynamic'

const WallpaperCard = dynamic(() => import('./WallpaperCard'), {
  loading: () => (
    <div className="bg-gray-200 rounded-lg aspect-video animate-pulse" />
  ),
})

export default function WallpaperGrid({ wallpapers }: { wallpapers: Wallpaper[] }) {
  if (wallpapers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No wallpapers found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {wallpapers.map((wallpaper: Wallpaper) => (
      <WallpaperCard key={wallpaper.id} wallpaper={wallpaper} />
      ))}
    </div>
  )
}
