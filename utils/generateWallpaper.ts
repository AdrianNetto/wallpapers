import fs from 'fs';
import path from 'path';

const EXTENSIONS = ['png', 'jpg', 'jpeg'] as const;
type Extension = typeof EXTENSIONS[number];

export interface Wallpaper {
  id: string;
  filename: string;
  url: string;
}

export function generateWallpapersFromDisk(imagesDir: string): Wallpaper[] {
  const files = fs.readdirSync(imagesDir);
  const wallpapers: Wallpaper[] = [];

  files.forEach((file) => {
    const ext = path.extname(file).slice(1) as Extension;
    const base = path.basename(file, path.extname(file));

    if (EXTENSIONS.includes(ext)) {
      wallpapers.push({
        id: base,
        filename: file,
        url: `/images/${file}`,
      });
    }
  });

  return wallpapers;
}
