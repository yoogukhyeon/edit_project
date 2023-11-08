  const [convertedImg, setConvertedImg] = useState<string | null>(null);

  const convertToPNG = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (ctx) {
          canvas.width = img.width;
          canvas.height = img.height;

          // Draw the image on the canvas
          ctx.drawImage(img, 0, 0);

          // Convert the canvas content to a data URL with PNG format
          const pngDataUrl = canvas.toDataURL('image/png');

          // Set the converted PNG to state
          setConvertedImg(pngDataUrl);
        }
      };
    };

    reader.readAsDataURL(file);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];

      // Check if the selected file is an image (you can add more checks)
      if (file.type.startsWith('image/')) {
        convertToPNG(file);
      } else {
        alert('Please select an image file.');
      }
    }
  };
