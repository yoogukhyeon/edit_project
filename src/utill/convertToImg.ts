import { Dispatch, SetStateAction } from 'react';

export const convertToPNG = (file: File, setFile: Dispatch<SetStateAction<string>>, type: string) => {
  // FlieReader 객체를 이용하여 업로드된 파일을 읽을 수 있다.
  // 비동기적으로 데이터를 읽어 file or blob 객체를 이용해 파일의 내용을 읽고 파싱할 수있다.
  const reader = new FileReader();

  /**
     * load 이벤트의 핸들러. 이 이벤트는 읽기 동작이 성공적으로 완료되었을 때마다 발생한다.
        비동기이므로 원하는 동작을 위해 CALLBACK 함수를 이용하는 것이 좋다.
     * 
     */
  reader.onload = (e) => {
    const img = new Image();
    img.src = e.target?.result as string;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (ctx) {
        canvas.width = img.width;
        canvas.height = img.height;

        // 캔버스에 이미지를 그린다.
        ctx.drawImage(img, 0, 0);

        const pngDataUrl = canvas.toDataURL(type);

        setFile(pngDataUrl);
      }
    };
  };

  reader.readAsDataURL(file);
};
