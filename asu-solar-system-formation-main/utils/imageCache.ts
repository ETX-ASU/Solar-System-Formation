import { IMAGE_WIDTH, IMAGE_HEIGHT } from './consts';

class ImageCache {
  private _cache = new Map<string | undefined, HTMLImageElement>();

  get(
    imgPath: string,
    size: { width: number; height: number } = {
      width: IMAGE_WIDTH,
      height: IMAGE_HEIGHT,
    },
    key = imgPath,
  ): HTMLImageElement | undefined {
    if (this._cache.has(key)) {
      return this._cache.get(key);
    }

    return this.addToCache(imgPath, size, key);
  }

  addToCache(
    imgPath: string,
    size: { width: number; height: number } = {
      width: IMAGE_WIDTH,
      height: IMAGE_HEIGHT,
    },
    key = imgPath,
  ): HTMLImageElement | undefined {
    if (this._cache.has(key)) {
      return;
    }

    const image = new Image(size.width, size.height);
    function drawImageActualSize(this: HTMLImageElement) {
      if (this.naturalWidth > this.naturalHeight) {
        this.width = size.width;
        this.height = (size.width / this.naturalWidth) * this.naturalHeight;
      } else {
        this.width = (size.height / this.naturalHeight) * this.naturalWidth;
        this.height = size.height;
      }
    }
    // @ts-expect-error
    image.onload = drawImageActualSize;
    image.src = imgPath;

    this._cache.set(key, image);

    return image;
  }
}

export const imageCache = new ImageCache();
