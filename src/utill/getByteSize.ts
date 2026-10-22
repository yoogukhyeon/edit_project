// eslint-disable-next-line consistent-return
export const getByteSize = (size: any) => {
  const byteUnits = ['KB', 'MB', 'GB', 'TB'];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < byteUnits.length; i++) {
    // eslint-disable-next-line no-param-reassign
    size = Math.floor(size / 1024);

    if (size < 1024) return size + byteUnits[i];
  }
};

// 압축 전후 비교용: 소수점 한 자리까지 표시
export const formatBytes = (size: number) => {
  if (size < 1024) return `${size}B`;
  if (size < 1024 ** 2) return `${(size / 1024).toFixed(1)}KB`;
  return `${(size / 1024 ** 2).toFixed(1)}MB`;
};

export const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
