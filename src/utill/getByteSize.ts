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
