export const copyFnc = async (text: string, setCopy: any) => {
  try {
    await navigator.clipboard.writeText(text);
    setCopy(true);
  } catch (e) {
    console.error('Error', e);
  }
};
