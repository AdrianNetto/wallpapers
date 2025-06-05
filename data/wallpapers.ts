interface Wallpaper {
  id: string;
  url: string;
}

export type Wallpapers = Wallpaper;

const GITHUB_API_URL = 'https://api.github.com/repos/kitsunebishi/Wallpapers/contents/images';
const RAW_BASE_URL = 'https://raw.githubusercontent.com/kitsunebishi/Wallpapers/main/images/';

async function fetchWallpapers(): Promise<Wallpaper[]> {
  const response = await fetch(GITHUB_API_URL);
  const files = await response.json();

  const wallpapers: Wallpaper[] = files
    .filter((file: any) => /\.(png|jpe?g)$/i.test(file.name))
    .map((file: any, index: number) => ({
      id: index.toString(),
      url: `${RAW_BASE_URL}${file.name}`,
    }));

  return wallpapers;
}

export const wallpapers = await fetchWallpapers();
export default fetchWallpapers;