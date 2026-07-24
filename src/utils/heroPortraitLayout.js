export const HERO_PORTRAIT_IMAGE_X = 0;
export const HERO_PORTRAIT_IMAGE_Y = -280;
export const HERO_PORTRAIT_IMAGE_SCALE = 1;

export function getHeroPortraitWidth(viewportWidth) {
  if (viewportWidth < 640) {
    return Math.min(Math.max(0.72 * viewportWidth, 220), 360);
  }
  return Math.min(Math.max(0.32 * viewportWidth, 280), 520);
}

export function getHeroPortraitRect({
  imageX = HERO_PORTRAIT_IMAGE_X,
  imageY = HERO_PORTRAIT_IMAGE_Y,
  imageScale = HERO_PORTRAIT_IMAGE_SCALE,
  viewportWidth = typeof window !== "undefined" ? window.innerWidth : 1280,
  viewportHeight = typeof window !== "undefined" ? window.innerHeight : 800,
} = {}) {
  const width = getHeroPortraitWidth(viewportWidth) * imageScale;
  const height = viewportHeight * imageScale;
  const centerX = viewportWidth / 2 + imageX;
  const centerY = viewportHeight / 2 + imageY;

  return {
    left: centerX - width / 2,
    top: centerY - height / 2,
    width,
    height,
  };
}
