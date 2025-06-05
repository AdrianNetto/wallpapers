import Link from 'next/link'
import Image from 'next/image'
import { FiSearch } from 'react-icons/fi'
import { Wallpaper } from '@/types/next'
import { wallpapersPromise } from '@/data/wallpapers'

const ITEMS_PER_PAGE = 24

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string } | undefined>
}) {

  const params = await searchParams
  const page = params?.page ? Number(params.page) : 1
  const search = params?.search ?? ''

  const wallpapers = await wallpapersPromise;

  const filteredWallpapers = search
    ? wallpapers.filter((wp) => wp.id.includes(search))
    : wallpapers

  const totalPages = Math.ceil(filteredWallpapers.length / ITEMS_PER_PAGE)
  const paginatedWallpapers = filteredWallpapers.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  )

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-purple-400">
          Wallpapers Collection
        </h1>

        <div className="relative max-w-md mx-auto mb-12">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-purple-300" />
          </div>
          <form method="get">
            <input
              type="text"
              name="search"
              placeholder="Search by ID (e.g. 00001)..."
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border-2 border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-white"
              defaultValue={search}
            />
          </form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedWallpapers.map((wallpaper: Wallpaper) => (
            <Link
              key={wallpaper.id}
              href={`/wallpaper/${wallpaper.id}`}
              className="group relative overflow-hidden rounded-lg border-2 border-purple-600 hover:border-pink-500 transition-all duration-300 hover:scale-105"
            >
              <div className="aspect-video relative">
              <Image
                  src={wallpaper.url}
                  alt={`Wallpaper ${wallpaper.id}`}
                  fill
                  className="object-cover group-hover:opacity-80 transition-opacity"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                <span className="font-mono text-sm text-pink-300">
                  ID: {wallpaper.id}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-12 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <Link
                key={i + 1}
                href={`/?page=${i + 1}${search ? `&search=${search}` : ''}`}
                className={`px-4 py-2 rounded-md font-medium ${
                  page === i + 1
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {i + 1}
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
