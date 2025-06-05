import { Wallpaper } from '@/data/wallpapers'
import Image from 'next/image'
import Link from 'next/link'

export default async function WallpaperCard({ wallpaper }: { wallpaper: Wallpaper }) {

  return (
    <Link href={`/wallpaper/${wallpaper.id}`} passHref>
      <div className="group cursor-pointer">
        <div className="relative aspect-video rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
          <Image
            src={wallpaper.url}
            alt={`Wallpaper ${wallpaper.id}`}
            fill
            className="object-cover group-hover:opacity-90 transition-opacity"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
          />
        </div>
        <p className="mt-2 text-sm text-gray-600 truncate">
          {wallpaper.id}
        </p>
      </div>
    </Link>
  )
}
