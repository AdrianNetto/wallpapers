import { notFound } from 'next/navigation'
import Image from 'next/image'
import { FiChevronLeft } from 'react-icons/fi'
import Link from 'next/link'
import { wallpapersPromise } from '@/data/wallpapers'
import DownloadButton from '@/components/DownloadButton'

export async function generateStaticParams() {
  const wallpapers = await wallpapersPromise
  return wallpapers.map((wallpaper) => ({
    id: wallpaper.id,
  }))
}

export default async function WallpaperDetail({ params }: {params: Promise<{ id: string }>}) {
  const { id } = await params
  const wallpapers = await wallpapersPromise

  const isValidId = /^\d{5}$/.test(id)
  if (!isValidId) {
    notFound()
  }

  const wallpaper = wallpapers.find((wp) => wp.id === id)

  if (!wallpaper) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center text-pink-400 hover:text-pink-300 mb-6 transition-colors"
        >
          <FiChevronLeft className="mr-1" /> Back to gallery
        </Link>

        <div className="bg-gray-800 rounded-xl overflow-hidden border-2 border-purple-600">
          <div className="p-4">
            <div className="relative" style={{ paddingBottom: '56.25%' }}>
              <Image
                src={wallpaper.url}
                alt={`Wallpaper ${wallpaper.id}`}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
          </div>
          <div className="p-6 border-t border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-2xl font-bold text-purple-300 font-mono">
                {wallpaper.id}
              </h2>
              <DownloadButton wallpaper={wallpaper}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}