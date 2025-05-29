import type { ReadonlyURLSearchParams } from 'next/navigation'

declare module 'next' {
  interface PageProps {
    params: Record<string, string>
    searchParams: Record<string, string | string[] | undefined>
  }
}

interface Wallpaper {
  id: string
  url: string
}
