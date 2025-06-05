'use client'

import { FiDownload } from 'react-icons/fi'

async function handleDownload(wallpaper: { id: string; url: string }) {
  try {
    const response = await fetch(wallpaper.url)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `wallpaper-${wallpaper.id}.jpg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Download failed:', error)
  }
}

export default function DownloadButton({
  wallpaper,
}: {
  wallpaper: { id: string; url: string }
}) {
  return (
    <button
      onClick={() => handleDownload(wallpaper)}
      className="flex items-center justify-center gap-2 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-lg transition-colors cursor-pointer"
    >
      <FiDownload /> Download HD
    </button>
  )
}
