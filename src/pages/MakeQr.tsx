import React, { useCallback, useState } from 'react';
// QRCode 안에는 canvas 속성이 있다
import QRCode from 'qrcode.react';
import styled from 'styled-components';
import { Tilt } from 'react-tilt';
import SEOMetaTag from 'seo/SEOMetaTag';

const defaultOptions = {
  reverse: false,
  max: 35,
  perspective: 1000,
  scale: 1.0,
  speed: 1000,
  transition: true,
  axis: null,
  reset: true,
  easing: 'cubic-bezier(.03,.98,.52,.99)',
};

const MakeQr = () => {
  const [urlValue, setUrlValue] = useState('https://webtool.everyday-365.com/');

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setUrlValue(value);
    },
    [urlValue],
  );
  const handleDownloadClick = () => {
    const canvas = document.querySelector('canvas');
    const url = canvas ? canvas.toDataURL('image/png') : '';
    const link = document.createElement('a');
    link.href = url;
    link.download = `everyday-365.png`;
    link.click();
  };

  return (
    <div>
      <SEOMetaTag
        title={'나만의 QR코드 만들기'}
        description={'나만의 QR코드 만들기 - webtool.everyday-365.com'}
        url={'https://webtool.everyday-365.com/make-qr'}
        imgsrc={'/images/logo.png'}
      />
      <p className="mb-2 text-lg font-medium text-gray-900 dark:text-white">QR코드는?</p>
      <p className="text-sm text-gray-500 whitespace-pre-line dark:text-gray-400">
        직사각형 그리드 패턴에 여러가지 정보를 포함 2차원 구성 코드이다. QR는 퀵 리스폰스의 약어입니다. 최초의 QR코드는 1994년에 전자 제품으로 불리는
        회사에 의해서 개발되었습니다. QR코드에는, 최대 7089글자의 번호, 최대 4296문자의 문자, 최대 1,817글자인 한자를 포함할 수 있습니다. 또,
        QR코드에는, 사진, 비디오, 지도, 명함, 인터넷 주소 등, 풍부한 정보가 포함됩니다. 즉, 2차원 코드를 사용하고, 보다 많은 정보를 작은 코드에
        통합시킬 수 있습니다.
      </p>
      <div className="mt-3 mb-5">
        <p className="mb-2 text-lg font-medium text-gray-900 dark:text-white">QR코드 스캔하는 방법?</p>
        <p className="text-sm text-gray-500 whitespace-pre-line dark:text-gray-400">
          간단합니다. 핸드폰에서 카메라를 연다음, QR코드에 갖다 대면 됩니다. 그러면, QR코드에 입력된 홈페이지로 이동합니다.
        </p>
      </div>
      <div className="mb-5">
        <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          유튜브 or 카카오톡 or 웹사이트 URL을 넣어주세요.
        </label>
        <input
          placeholder="URL을 입력해주세요."
          onChange={onChange}
          value={urlValue}
          type="text"
          id="default-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="grid w-full md:grid-cols-1">
        <QrCodeWrap className="flex justify-center items-center flex-col">
          <Tilt options={defaultOptions}>
            <QRCode value={urlValue} size={600} bgColor={'#ffffff'} fgColor={'#000000'} level={'L'} includeMargin={true} />
          </Tilt>
          <div className="py-4 text-center">
            <button
              onClick={handleDownloadClick}
              className="inline-block text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-base px-5 py-2.5 text-center"
            >
              QR이미지 다운로드
            </button>
          </div>
        </QrCodeWrap>
      </div>
    </div>
  );
};

const QrCodeWrap = styled.div`
  canvas {
    border: 1px solid #eee;
  }

  @media (max-width: 515px) {
    > svg {
      width: 400px;
      height: 400px;
    }
  }
  @media (max-width: 435px) {
    > svg {
      width: 250px;
      height: 250px;
    }
  }
`;

export default MakeQr;
