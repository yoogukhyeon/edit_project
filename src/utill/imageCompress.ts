// 이미지 파일을 캔버스로 다시 그려 형식 변환·압축·리사이즈한다.
export type OutputType = 'image/jpeg' | 'image/webp' | 'image/png';

const loadImage = (file: File) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = reject;
    img.src = url;
  });

export const compress = async (file: File, type: OutputType, quality: number, maxWidth: number) => {
  const img = await loadImage(file);
  const ratio = maxWidth > 0 && img.width > maxWidth ? maxWidth / img.width : 1;
  const width = Math.round(img.width * ratio);
  const height = Math.round(img.height * ratio);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('canvas');

  // JPG는 투명도를 지원하지 않으므로 흰 배경을 깔아준다.
  if (type === 'image/jpeg') {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);
  }
  ctx.drawImage(img, 0, 0, width, height);

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, type, quality);
  });
  if (!blob) throw new Error('blob');

  return { blob, width, height };
};
