import ToolHeader from '@components/common/ToolHeader';
import Comment from '@components/common/common/Comment';
import SEOContent from '@components/common/SEOContent';
import QRCode from 'qrcode.react';
import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import SEOMetaTag from 'seo/SEOMetaTag';

type Mode = 'url' | 'text' | 'wifi';

const inputClass =
  'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white';

// 와이파이 QR 형식에서 특수문자(\ ; , : ")는 역슬래시로 이스케이프해야 한다.
const escapeWifi = (value: string) => value.replace(/([\\;,:"])/g, '\\$1');

const MakeQr = () => {
  const [mode, setMode] = useState<Mode>('url');
  const [url, setUrl] = useState('https://webtool.everyday-365.com/');
  const [text, setText] = useState('');
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [security, setSecurity] = useState('WPA');
  const [fg, setFg] = useState('#000000');
  const [bg, setBg] = useState('#ffffff');
  const downloadRef = useRef<HTMLDivElement>(null);

  const value = {
    url: url.trim(),
    text: text.trim(),
    wifi: ssid
      ? `WIFI:T:${security === 'nopass' ? 'nopass' : security};S:${escapeWifi(ssid)};P:${security === 'nopass' ? '' : escapeWifi(password)};;`
      : '',
  }[mode];

  const onDownload = () => {
    if (!value) {
      toast.error('QR코드에 넣을 내용을 먼저 입력해주세요.');
      return;
    }
    // 화면용 QR과 별개로 1000px 고해상도 QR을 숨겨서 그려두고 그것을 저장한다.
    const canvas = downloadRef.current?.querySelector('canvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    // 파일 이름에 쓸 수 없는 문자는 _로 바꾼다
    link.download = mode === 'wifi' ? `wifi-qr-${ssid.replace(/[^\w가-힣-]/g, '_')}.png` : 'qrcode.png';
    link.click();
  };

  const tabClass = (active: boolean) =>
    `min-h-[40px] flex-1 rounded-lg px-3 py-2 text-sm font-medium ${
      active ? 'bg-sky-600 text-white' : 'bg-slate-100 text-gray-700 dark:bg-slate-700 dark:text-gray-200'
    }`;

  return (
    <div>
      <SEOMetaTag />
      <ToolHeader title="나만의 QR코드 만들기">
        링크·텍스트·와이파이 정보를 입력하면 QR코드가 바로 만들어집니다. 와이파이 QR은 휴대폰 카메라로 찍으면 비밀번호 입력 없이 연결됩니다.
      </ToolHeader>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <div className="mb-4 flex gap-2">
            {(
              [
                ['url', '링크(URL)'],
                ['text', '텍스트'],
                ['wifi', '와이파이'],
              ] as [Mode, string][]
            ).map(([key, label]) => (
              <button key={key} type="button" onClick={() => setMode(key)} className={tabClass(mode === key)}>
                {label}
              </button>
            ))}
          </div>

          {mode === 'url' && (
            <>
              <label htmlFor="qr-url" className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
                유튜브·카카오톡·웹사이트 주소
              </label>
              <input
                id="qr-url"
                type="url"
                inputMode="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://"
                className={inputClass}
              />
            </>
          )}
          {mode === 'text' && (
            <>
              <label htmlFor="qr-text" className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
                텍스트 (연락처, 안내 문구 등)
              </label>
              <textarea id="qr-text" rows={4} value={text} maxLength={1000} onChange={(e) => setText(e.target.value)} className={inputClass} />
            </>
          )}
          {mode === 'wifi' && (
            <div className="space-y-3">
              <div>
                <label htmlFor="qr-ssid" className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
                  와이파이 이름 (SSID)
                </label>
                <input id="qr-ssid" value={ssid} onChange={(e) => setSsid(e.target.value)} placeholder="예: MyHome_5G" className={inputClass} />
              </div>
              <div>
                <label htmlFor="qr-security" className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
                  보안 방식
                </label>
                <select id="qr-security" value={security} onChange={(e) => setSecurity(e.target.value)} className={inputClass}>
                  <option value="WPA">WPA/WPA2/WPA3 (대부분의 공유기)</option>
                  <option value="WEP">WEP (오래된 공유기)</option>
                  <option value="nopass">비밀번호 없음</option>
                </select>
              </div>
              {security !== 'nopass' && (
                <div>
                  <label htmlFor="qr-password" className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
                    비밀번호
                  </label>
                  <input id="qr-password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
                </div>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400">
                입력한 와이파이 정보는 서버로 전송되지 않고 이 화면에서만 QR코드로 만들어집니다.
              </p>
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
              QR 색상
              <input
                type="color"
                value={fg}
                onChange={(e) => setFg(e.target.value)}
                className="h-9 w-12 cursor-pointer rounded border border-gray-300"
              />
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
              배경색
              <input
                type="color"
                value={bg}
                onChange={(e) => setBg(e.target.value)}
                className="h-9 w-12 cursor-pointer rounded border border-gray-300"
              />
            </label>
            <button
              type="button"
              onClick={() => {
                setFg('#000000');
                setBg('#ffffff');
              }}
              className="min-h-[36px] rounded-md border border-gray-300 px-2.5 text-xs text-gray-700 dark:border-gray-600 dark:text-gray-200"
            >
              기본색
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">QR 색은 배경보다 충분히 진해야 카메라가 잘 인식합니다.</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="rounded-xl border border-gray-200 bg-white p-3 dark:border-gray-600">
            {value ? (
              <QRCode value={value} size={240} fgColor={fg} bgColor={bg} level="M" includeMargin />
            ) : (
              <div className="flex h-[240px] w-[240px] items-center justify-center text-center text-sm text-gray-400">
                내용을 입력하면
                <br />
                QR코드가 표시됩니다
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={onDownload}
            className="mt-4 min-h-[44px] rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-6 py-2.5 text-base font-medium text-white hover:bg-gradient-to-bl"
          >
            QR코드 이미지 저장 (PNG)
          </button>
          {/* 저장용 고해상도 QR (화면에는 보이지 않음) */}
          <div ref={downloadRef} className="hidden" aria-hidden="true">
            {value && <QRCode value={value} size={1000} fgColor={fg} bgColor={bg} level="M" includeMargin />}
          </div>
        </div>
      </div>

      <section className="mt-10 space-y-4">
        <div>
          <h2 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">QR코드란?</h2>
          <p className="text-sm leading-7 text-gray-600 dark:text-gray-300">
            QR(Quick Response)코드는 정사각형 격자 무늬에 정보를 담는 2차원 코드로, 1994년 일본 덴소웨이브에서 개발했습니다. 숫자는 최대 7,089자,
            영문·숫자 혼합은 최대 4,296자까지 담을 수 있어 웹사이트 주소, 연락처, 와이파이 정보 등을 작은 코드 하나로 전달할 수 있습니다.
          </p>
        </div>
        <div>
          <h2 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">QR코드 스캔하는 방법</h2>
          <p className="text-sm leading-7 text-gray-600 dark:text-gray-300">
            휴대폰 기본 카메라 앱을 켜고 QR코드를 비추면 화면에 링크가 나타납니다. 링크를 누르면 QR코드에 담긴 주소로 이동하고, 와이파이 QR은 연결
            버튼이 나타납니다.
          </p>
        </div>
      </section>

      <SEOContent page="makeQr" />
      <Comment pathname="makeQr" />
    </div>
  );
};

export default MakeQr;
