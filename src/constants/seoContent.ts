export type SEOPageKey =
  | 'main'
  | 'pdfToImg'
  | 'imgToPng'
  | 'imgToJpg'
  | 'htmlTagRemove'
  | 'textConvert'
  | 'counterChar'
  | 'makeQr'
  | 'metaTag'
  | 'myIp'
  | 'lotto'
  | 'investLucky'
  | 'urlEncoded'
  | 'imgCompress'
  | 'pdfMerge'
  | 'pdfSplit'
  | 'ageCalc'
  | 'dday';

type FAQ = {
  question: string;
  answer: string;
};

type RelatedLink = {
  label: string;
  path: string;
};

export type SEOContentItem = {
  path: string;
  category: string;
  title: string;
  intro: string;
  sections: {
    heading: string;
    body: string;
  }[];
  faqs: FAQ[];
  related: RelatedLink[];
};

export const seoContent: Record<SEOPageKey, SEOContentItem> = {
  main: {
    path: '/',
    category: 'PDF',
    title: 'PDF 보기 도구를 사용할 때 좋은 상황',
    intro: 'EVERYDAY 웹툴의 PDF 보기는 프로그램 설치 없이 브라우저에서 PDF 파일을 확인할 수 있는 무료 PDF 미리보기 도구입니다.',
    sections: [
      {
        heading: '설치 없이 PDF를 확인할 수 있습니다',
        body: '메일이나 메신저로 받은 PDF 파일을 빠르게 열어보고 싶을 때 유용합니다. 파일을 선택하면 브라우저 안에서 페이지 너비에 맞춰 문서를 확인할 수 있습니다.',
      },
      {
        heading: 'PDF 관련 작업을 이어서 할 수 있습니다',
        body: 'PDF를 확인한 뒤 이미지로 변환해야 한다면 PDF 이미지 변환 도구로 이동해 페이지별 이미지를 압축 파일로 내려받을 수 있습니다.',
      },
    ],
    faqs: [
      { question: 'PDF 보기 도구는 무료인가요?', answer: '네. 별도 회원가입이나 설치 없이 브라우저에서 무료로 사용할 수 있습니다.' },
      { question: '업로드한 PDF는 서버에 저장되나요?', answer: 'PDF 미리보기는 브라우저에서 선택한 파일을 화면에 표시하는 방식으로 동작합니다.' },
      { question: '모바일에서도 PDF를 볼 수 있나요?', answer: '가능합니다. 다만 큰 PDF 파일은 기기 성능에 따라 로딩 시간이 길어질 수 있습니다.' },
    ],
    related: [
      { label: 'PDF 이미지 변환', path: '/pdf-img' },
      { label: '이미지 JPG 변환', path: '/img-jpg' },
      { label: '이미지 PNG 변환', path: '/img-png' },
    ],
  },
  pdfToImg: {
    path: '/pdf-img',
    category: 'PDF',
    title: 'PDF 이미지 변환이 필요한 경우',
    intro: 'PDF 이미지 변환 도구는 PDF 문서를 이미지 파일로 바꿔 공유하거나 보관하고 싶을 때 사용할 수 있는 무료 변환 도구입니다.',
    sections: [
      {
        heading: '문서 페이지를 이미지로 저장합니다',
        body: 'PDF 안의 각 페이지를 이미지로 변환해 압축 파일로 내려받을 수 있습니다. 문서 내용을 이미지 게시물, 썸네일, 자료 화면으로 활용할 때 편리합니다.',
      },
      {
        heading: '브라우저에서 바로 변환합니다',
        body: '별도의 PDF 변환 프로그램을 설치하지 않아도 파일을 선택해 변환을 시작할 수 있습니다. 큰 파일은 변환 시간이 길어질 수 있으니 5MB 이하 파일 사용을 권장합니다.',
      },
    ],
    faqs: [
      { question: 'PDF를 JPG로 변환할 수 있나요?', answer: 'PDF 페이지를 이미지로 변환한 뒤 ZIP 파일로 내려받을 수 있습니다.' },
      { question: '여러 페이지 PDF도 변환되나요?', answer: '네. PDF의 각 페이지를 순서대로 이미지로 변환합니다.' },
      {
        question: 'PDF 이미지 변환이 안 될 때는 어떻게 하나요?',
        answer: '파일 용량과 PDF 파일 형식을 확인하고, 브라우저를 새로고침한 뒤 다시 시도해 보세요.',
      },
    ],
    related: [
      { label: 'PDF 보기', path: '/' },
      { label: '이미지 JPG 변환', path: '/img-jpg' },
      { label: '이미지 PNG 변환', path: '/img-png' },
    ],
  },
  imgToPng: {
    path: '/img-png',
    category: '이미지 변환',
    title: '이미지 PNG 변환 사용법',
    intro: '이미지 PNG 변환 도구는 JPG, GIF, SVG 등 다양한 이미지 파일을 PNG 형식으로 바꾸는 무료 온라인 이미지 변환기입니다.',
    sections: [
      {
        heading: 'PNG가 필요한 상황',
        body: 'PNG는 선명한 이미지와 투명 배경이 필요한 디자인 자료, 웹 이미지, 캡처 이미지에 자주 사용됩니다. 이미지 품질을 유지하면서 PNG 파일로 바꾸고 싶을 때 적합합니다.',
      },
      {
        heading: '간단한 변환 과정',
        body: '이미지 파일을 선택하거나 업로드 영역을 클릭하면 변환이 진행됩니다. 변환 후 미리보기와 파일 정보를 확인하고 PNG 이미지를 내려받을 수 있습니다.',
      },
    ],
    faqs: [
      { question: 'JPG를 PNG로 변환할 수 있나요?', answer: '네. JPG 이미지를 선택하면 PNG 형식으로 변환할 수 있습니다.' },
      { question: 'PNG 변환 시 용량 제한이 있나요?', answer: '장당 20MB 이하 이미지를 한 번에 최대 20장까지 변환할 수 있습니다.' },
      {
        question: '투명 배경도 유지되나요?',
        answer: '원본 이미지에 투명 정보가 있으면 PNG 변환 시 유지될 수 있습니다. 원본에 투명이 없으면 새로 생성되지는 않습니다.',
      },
    ],
    related: [
      { label: '이미지 JPG 변환', path: '/img-jpg' },
      { label: 'PDF 이미지 변환', path: '/pdf-img' },
      { label: 'HTML 태그 제거기', path: '/html-remove' },
    ],
  },
  imgToJpg: {
    path: '/img-jpg',
    category: '이미지 변환',
    title: '이미지 JPG 변환 사용법',
    intro: '이미지 JPG 변환 도구는 PNG, GIF, SVG 등 이미지 파일을 JPG 형식으로 바꾸는 무료 온라인 이미지 변환기입니다.',
    sections: [
      {
        heading: 'JPG가 필요한 상황',
        body: 'JPG는 블로그, 쇼핑몰, 문서 첨부, 일반 사진 공유에 많이 쓰이는 이미지 형식입니다. 투명 배경이 필요 없고 호환성이 좋은 이미지가 필요할 때 적합합니다.',
      },
      {
        heading: '브라우저에서 바로 다운로드',
        body: '파일을 선택하면 변환된 이미지를 미리보고 다운로드할 수 있습니다. 설치형 프로그램 없이 간단한 이미지 형식 변경에 사용할 수 있습니다.',
      },
    ],
    faqs: [
      { question: 'PNG를 JPG로 변환할 수 있나요?', answer: '네. PNG 파일을 선택하면 JPG 이미지로 변환할 수 있습니다.' },
      {
        question: 'JPG 변환 후 투명 배경은 어떻게 되나요?',
        answer: 'JPG는 투명 배경을 지원하지 않으므로 투명 영역은 배경색으로 처리될 수 있습니다.',
      },
      { question: '이미지 변환은 무료인가요?', answer: '네. EVERYDAY 웹툴의 이미지 변환 기능은 무료로 사용할 수 있습니다.' },
    ],
    related: [
      { label: '이미지 PNG 변환', path: '/img-png' },
      { label: 'PDF 이미지 변환', path: '/pdf-img' },
      { label: 'QR코드 만들기', path: '/make-qr' },
    ],
  },
  htmlTagRemove: {
    path: '/html-remove',
    category: '텍스트 도구',
    title: 'HTML 태그 제거기가 필요한 경우',
    intro: 'HTML 태그 제거기는 HTML 코드에서 태그를 제거하고 순수한 텍스트만 추출할 때 사용하는 무료 텍스트 정리 도구입니다.',
    sections: [
      {
        heading: '복사한 HTML을 읽기 쉬운 텍스트로 바꿉니다',
        body: '웹페이지 소스, 에디터 HTML, 게시판 코드에서 태그가 섞여 있을 때 내용을 깔끔한 텍스트로 정리할 수 있습니다.',
      },
      {
        heading: '글 작성과 데이터 정리에 활용할 수 있습니다',
        body: '블로그 원고 정리, 메일 내용 정리, 크롤링 결과 확인처럼 HTML 태그 없이 본문만 확인해야 하는 상황에 유용합니다.',
      },
    ],
    faqs: [
      { question: 'HTML 태그만 제거되나요?', answer: '입력한 HTML 문자열에서 태그를 제거하고 텍스트 중심으로 변환합니다.' },
      { question: '줄바꿈도 유지할 수 있나요?', answer: '줄바꿈 유지 옵션을 사용하면 변환 결과에서 문단 구분을 더 쉽게 확인할 수 있습니다.' },
      { question: '스크립트 코드도 정리되나요?', answer: 'HTML 태그 제거 목적의 도구이므로 복잡한 스크립트 정제에는 별도 확인이 필요합니다.' },
    ],
    related: [
      { label: '글자수 문자수 계산기', path: '/counter-char' },
      { label: '영어 대문자 소문자 변환', path: '/text-convert' },
      { label: 'URL 인코더 디코더', path: '/encode-decode' },
    ],
  },
  textConvert: {
    path: '/text-convert',
    category: '텍스트 도구',
    title: '영어 대문자 소문자 변환 활용법',
    intro: '영어 대문자 소문자 변환 도구는 입력한 영어 문장을 대문자, 소문자, 첫 글자 대문자 형태로 바꾸는 무료 텍스트 변환기입니다.',
    sections: [
      {
        heading: '문서 제목과 문장을 빠르게 정리합니다',
        body: '영문 제목, 파일명, 버튼 문구, 안내 문장을 작성할 때 대소문자 스타일을 빠르게 맞출 수 있습니다.',
      },
      {
        heading: '반복 입력 작업을 줄입니다',
        body: '긴 문장을 직접 다시 입력하지 않아도 붙여넣기 후 버튼을 눌러 원하는 대소문자 형태로 변환할 수 있습니다.',
      },
    ],
    faqs: [
      { question: '소문자를 대문자로 바꿀 수 있나요?', answer: '네. 입력한 영어 문장을 전체 대문자로 변환할 수 있습니다.' },
      { question: '대문자를 소문자로 바꿀 수 있나요?', answer: '네. 전체 소문자 변환도 지원합니다.' },
      { question: '첫 글자만 대문자로 만들 수 있나요?', answer: '입력한 문장을 첫 글자 대문자 형태로 변환할 수 있습니다.' },
    ],
    related: [
      { label: '글자수 문자수 계산기', path: '/counter-char' },
      { label: 'HTML 태그 제거기', path: '/html-remove' },
      { label: 'URL 인코더 디코더', path: '/encode-decode' },
    ],
  },
  counterChar: {
    path: '/counter-char',
    category: '텍스트 도구',
    title: '글자수 문자수 계산기를 써야 할 때',
    intro: '글자수 문자수 계산기는 블로그 글, 자기소개서, 이력서, SEO 문구의 길이를 확인할 때 사용하는 무료 텍스트 계산 도구입니다.',
    sections: [
      {
        heading: '공백 포함과 제외 기준을 확인합니다',
        body: '작성한 문장의 글자 수와 문자 수를 빠르게 확인해 제출 기준이나 검색엔진 문구 길이에 맞출 수 있습니다.',
      },
      {
        heading: '바이트 기준 확인에 도움이 됩니다',
        body: '문자 수뿐 아니라 바이트 기준을 함께 확인하면 제목, 설명문, 입력 제한이 있는 양식을 작성할 때 편리합니다.',
      },
    ],
    faqs: [
      { question: '공백 포함 글자수를 계산할 수 있나요?', answer: '네. 입력한 문장의 공백 포함 기준과 관련 수치를 확인할 수 있습니다.' },
      { question: '자기소개서 글자수 확인에 쓸 수 있나요?', answer: '네. 자기소개서, 이력서, 에세이, 블로그 원고 작성 시 사용할 수 있습니다.' },
      { question: 'SEO 문구 길이 확인에도 도움이 되나요?', answer: '네. 제목과 설명문을 작성할 때 너무 길지 않은지 확인하는 데 도움이 됩니다.' },
    ],
    related: [
      { label: '메타태그 SEO 만들기', path: '/make-meta' },
      { label: 'HTML 태그 제거기', path: '/html-remove' },
      { label: '영어 대문자 소문자 변환', path: '/text-convert' },
    ],
  },
  makeQr: {
    path: '/make-qr',
    category: 'QR 코드',
    title: 'QR코드 만들기 활용법',
    intro: 'QR코드 만들기 도구는 URL이나 텍스트를 입력해 브라우저에서 바로 QR코드를 생성하는 무료 QR 생성기입니다.',
    sections: [
      {
        heading: '링크 공유를 간단하게 만듭니다',
        body: '웹사이트 주소, 유튜브 링크, 카카오톡 오픈채팅, 지도 링크 등을 QR코드로 만들어 인쇄물이나 화면에 사용할 수 있습니다.',
      },
      {
        heading: '스마트폰으로 바로 스캔할 수 있습니다',
        body: '생성된 QR코드는 스마트폰 카메라로 스캔해 입력한 주소나 텍스트에 접근할 수 있습니다.',
      },
    ],
    faqs: [
      { question: 'URL QR코드를 만들 수 있나요?', answer: '네. URL을 입력하면 해당 주소로 연결되는 QR코드를 만들 수 있습니다.' },
      { question: 'QR코드 생성은 무료인가요?', answer: '네. 별도 설치 없이 무료로 QR코드를 생성할 수 있습니다.' },
      { question: '한글 텍스트도 QR코드로 만들 수 있나요?', answer: '입력 가능한 범위 안에서 한글 텍스트도 QR코드로 만들 수 있습니다.' },
    ],
    related: [
      { label: 'URL 인코더 디코더', path: '/encode-decode' },
      { label: '이미지 PNG 변환', path: '/img-png' },
      { label: '메타태그 SEO 만들기', path: '/make-meta' },
    ],
  },
  metaTag: {
    path: '/make-meta',
    category: 'SEO',
    title: '메타태그 SEO 만들기 사용법',
    intro: '메타태그 SEO 만들기 도구는 웹페이지의 title, description, Open Graph, canonical, robots 태그를 생성하는 무료 SEO 도구입니다.',
    sections: [
      {
        heading: '검색 결과 제목과 설명을 준비합니다',
        body: '페이지 제목과 설명문을 입력해 검색엔진과 소셜 공유에 필요한 기본 메타태그를 만들 수 있습니다.',
      },
      {
        heading: '대표 URL과 robots 설정을 정리합니다',
        body: 'canonical 주소와 robots 값을 함께 생성하면 중복 URL 관리와 색인 허용 여부를 더 명확히 전달할 수 있습니다.',
      },
    ],
    faqs: [
      { question: 'SEO 메타태그는 왜 필요한가요?', answer: '검색엔진과 소셜 플랫폼이 페이지의 제목, 설명, 대표 URL을 이해하는 데 도움을 줍니다.' },
      { question: 'description은 몇 자가 좋나요?', answer: '정답은 없지만 페이지 내용을 자연스럽고 구체적으로 요약하는 짧은 문장이 좋습니다.' },
      { question: 'canonical 태그도 만들 수 있나요?', answer: '네. 대표 URL을 입력하면 canonical 링크 태그를 함께 생성합니다.' },
    ],
    related: [
      { label: '글자수 문자수 계산기', path: '/counter-char' },
      { label: 'HTML 태그 제거기', path: '/html-remove' },
      { label: 'URL 인코더 디코더', path: '/encode-decode' },
    ],
  },
  myIp: {
    path: '/my-ip',
    category: '개발 도구',
    title: '내 아이피 확인이 필요한 경우',
    intro: '내 아이피 확인 도구는 현재 접속한 환경의 IP 주소와 브라우저 정보를 빠르게 확인할 수 있는 무료 웹툴입니다.',
    sections: [
      {
        heading: '공인 IP 주소를 확인합니다',
        body: '인터넷 연결 문제를 점검하거나 접속 환경을 확인할 때 현재 사용 중인 IP 주소 정보를 확인할 수 있습니다.',
      },
      {
        heading: '브라우저 정보를 함께 확인합니다',
        body: 'User Agent 정보를 통해 사용 중인 브라우저와 기기 환경을 확인할 수 있어 개발 및 문의 대응에 도움이 됩니다.',
      },
    ],
    faqs: [
      { question: '내 IP 주소를 바로 확인할 수 있나요?', answer: '네. 페이지 상단에서 현재 접속 환경의 IP 정보를 확인할 수 있습니다.' },
      { question: 'User Agent는 무엇인가요?', answer: '브라우저와 운영체제 등 접속 환경을 설명하는 문자열입니다.' },
      { question: 'IP 주소가 바뀔 수 있나요?', answer: '네. 네트워크, 통신사, 공유기, VPN 사용 여부에 따라 IP 주소는 달라질 수 있습니다.' },
    ],
    related: [
      { label: 'URL 인코더 디코더', path: '/encode-decode' },
      { label: '메타태그 SEO 만들기', path: '/make-meta' },
      { label: 'QR코드 만들기', path: '/make-qr' },
    ],
  },
  lotto: {
    path: '/lotto',
    category: '생활 정보',
    title: '로또 회차별 당첨번호 확인 방법',
    intro: '로또 회차별 당첨번호 페이지에서는 최근 로또 당첨번호, 보너스 번호, 1등 당첨자 수, 1등 당첨금액, 발표일을 확인할 수 있습니다.',
    sections: [
      {
        heading: '최근 회차 정보를 한눈에 봅니다',
        body: '회차별 번호와 발표일을 표 형태로 제공해 지난 당첨번호를 빠르게 비교할 수 있습니다.',
      },
      {
        heading: '보너스 번호와 당첨금액도 확인합니다',
        body: '당첨번호 외에도 보너스 번호, 1등 당첨자 수, 1등 당첨금액을 함께 확인할 수 있습니다.',
      },
    ],
    faqs: [
      { question: '로또 당첨번호를 회차별로 볼 수 있나요?', answer: '네. 최근 회차별 로또 당첨번호와 발표일을 표로 확인할 수 있습니다.' },
      { question: '보너스 번호도 표시되나요?', answer: '네. 당첨번호와 함께 보너스 번호도 확인할 수 있습니다.' },
      {
        question: '로또 정보가 보이지 않으면 어떻게 하나요?',
        answer: '외부 데이터 로딩 상태에 따라 시간이 걸릴 수 있으니 새로고침 후 다시 확인해 보세요.',
      },
    ],
    related: [
      { label: '오늘의 투자운세', path: '/invest-lucky' },
      { label: '내 아이피 확인', path: '/my-ip' },
      { label: '글자수 문자수 계산기', path: '/counter-char' },
    ],
  },
  investLucky: {
    path: '/invest-lucky',
    category: '생활 정보',
    title: '오늘의 투자운세 활용법',
    intro: '오늘의 투자운세는 띠별 운세를 가볍게 확인할 수 있는 페이지입니다. 실제 투자 판단은 신중한 정보 확인과 함께 해야 합니다.',
    sections: [
      {
        heading: '가벼운 참고용 운세 콘텐츠입니다',
        body: '투자운세는 재미와 참고 목적으로 제공됩니다. 투자 결정은 운세가 아니라 개인의 판단과 충분한 정보 확인을 바탕으로 해야 합니다.',
      },
      {
        heading: '매일 간단히 확인할 수 있습니다',
        body: '띠별 운세 형식으로 오늘의 분위기를 확인하고 하루를 시작하는 가벼운 콘텐츠로 활용할 수 있습니다.',
      },
    ],
    faqs: [
      { question: '투자운세는 투자 조언인가요?', answer: '아닙니다. 재미와 참고용 콘텐츠이며 실제 투자 조언이나 수익 보장을 의미하지 않습니다.' },
      { question: '띠별 운세를 볼 수 있나요?', answer: '네. 페이지 안에서 띠별 오늘의 투자운세를 확인할 수 있습니다.' },
      { question: '매일 확인할 수 있나요?', answer: '네. 오늘의 운세 형식으로 가볍게 확인할 수 있습니다.' },
    ],
    related: [
      { label: '로또 회차별 당첨번호', path: '/lotto' },
      { label: '내 아이피 확인', path: '/my-ip' },
      { label: 'QR코드 만들기', path: '/make-qr' },
    ],
  },
  urlEncoded: {
    path: '/encode-decode',
    category: '개발 도구',
    title: 'URL 인코더 디코더 사용법',
    intro: 'URL 인코더 디코더는 한글, 공백, 특수문자가 포함된 문자열을 URL에 안전하게 사용할 수 있도록 인코딩하거나 다시 디코딩하는 무료 웹툴입니다.',
    sections: [
      {
        heading: 'URL에 사용할 문자열을 안전하게 변환합니다',
        body: '쿼리 문자열, 검색어, 한글 주소, 특수문자 값을 URL에 넣어야 할 때 인코딩 결과를 확인할 수 있습니다.',
      },
      {
        heading: '인코딩된 문자열을 다시 읽기 쉽게 바꿉니다',
        body: '퍼센트 인코딩된 URL 값을 디코딩해 원래 문자열을 확인할 수 있어 개발, 테스트, 문서 작성에 편리합니다.',
      },
    ],
    faqs: [
      { question: 'URL 인코딩은 언제 필요한가요?', answer: '한글, 공백, 특수문자를 URL 쿼리나 주소 일부로 안전하게 전달해야 할 때 필요합니다.' },
      { question: 'URL 디코딩도 가능한가요?', answer: '네. 인코딩된 문자열을 다시 사람이 읽기 쉬운 형태로 디코딩할 수 있습니다.' },
      { question: '개발 테스트에 사용할 수 있나요?', answer: '네. API 쿼리, 링크 생성, 브라우저 주소 확인 등 개발 테스트에 활용할 수 있습니다.' },
    ],
    related: [
      { label: 'QR코드 만들기', path: '/make-qr' },
      { label: 'HTML 태그 제거기', path: '/html-remove' },
      { label: '메타태그 SEO 만들기', path: '/make-meta' },
    ],
  },
  imgCompress: {
    path: '/img-compress',
    category: '이미지',
    title: '이미지 용량 줄이기 사용법',
    intro:
      '이미지 용량 줄이기는 JPG, PNG, WebP 사진의 화질과 크기를 조절해 파일 용량을 줄이는 무료 이미지 압축 도구입니다. 여러 장을 한 번에 압축하고 ZIP으로 내려받을 수 있습니다.',
    sections: [
      {
        heading: '업로드 용량 제한이 있을 때 유용합니다',
        body: '관공서 서류 제출, 쇼핑몰 상품 등록, 블로그 업로드처럼 이미지 용량 제한이 있는 곳에 사진을 올려야 할 때 화질을 조금 낮추거나 가로 크기를 줄이면 용량이 크게 줄어듭니다. 스마트폰 사진은 1920px, 화질 70%로도 대부분 충분합니다.',
      },
      {
        heading: '서버에 업로드하지 않고 브라우저에서 처리합니다',
        body: '선택한 이미지는 서버로 전송되지 않고 사용 중인 브라우저 안에서 바로 압축됩니다. 개인 사진이나 업무 자료도 외부에 저장될 걱정 없이 사용할 수 있습니다.',
      },
      {
        heading: 'JPG, WebP, PNG 중 형식을 고를 수 있습니다',
        body: '사진은 JPG나 WebP가 용량이 가장 작습니다. 로고처럼 투명 배경이 필요한 이미지는 PNG를 선택하세요. JPG로 저장하면 투명한 부분은 흰색 배경으로 바뀝니다.',
      },
      {
        heading: '여러 장을 한 번에 압축합니다',
        body: '최대 20장까지 한 번에 선택해 같은 설정으로 압축할 수 있습니다. 압축 전후 용량과 감소율을 확인한 뒤 개별 다운로드하거나 전체를 ZIP 파일로 받을 수 있습니다.',
      },
    ],
    faqs: [
      {
        question: '이미지 용량을 줄이면 화질이 많이 떨어지나요?',
        answer:
          '화질 70~80% 정도에서는 눈으로 차이를 느끼기 어려운 경우가 많습니다. 결과 미리보기를 확인한 뒤 원하는 화질로 다시 압축할 수 있습니다.',
      },
      {
        question: 'PNG 파일은 왜 용량이 잘 안 줄어드나요?',
        answer: 'PNG는 무손실 형식이라 화질 설정이 적용되지 않습니다. PNG 용량을 줄이려면 최대 가로 크기를 줄이거나 JPG, WebP로 저장하세요.',
      },
      {
        question: '압축 후 용량이 오히려 커질 수 있나요?',
        answer: '이미 강하게 압축된 이미지를 높은 화질로 다시 저장하면 커질 수 있습니다. 이 경우 화질을 낮추거나 원본을 그대로 사용하세요.',
      },
      { question: '사진이 서버에 저장되나요?', answer: '아니요. 모든 처리는 브라우저 안에서 이루어지며 파일이 서버로 전송되지 않습니다.' },
    ],
    related: [
      { label: '이미지 JPG 변환', path: '/img-jpg' },
      { label: '이미지 PNG 변환', path: '/img-png' },
      { label: 'PDF 이미지 변환', path: '/pdf-img' },
    ],
  },
  pdfMerge: {
    path: '/pdf-merge',
    category: 'PDF',
    title: 'PDF 합치기 사용법',
    intro:
      'PDF 합치기는 여러 개의 PDF 파일을 원하는 순서대로 하나의 PDF로 병합하는 무료 도구입니다. 프로그램 설치나 회원가입 없이 브라우저에서 바로 사용할 수 있습니다.',
    sections: [
      {
        heading: '흩어진 서류를 하나의 파일로 제출합니다',
        body: '입사 지원 서류, 증빙 자료, 계약서처럼 여러 PDF를 한 파일로 제출해야 할 때 유용합니다. 파일을 추가한 뒤 위아래 버튼으로 순서를 정하고 합치기를 누르면 merged.pdf 파일이 내려받아집니다.',
      },
      {
        heading: '파일이 외부로 전송되지 않습니다',
        body: 'PDF 병합은 브라우저 안에서 처리되어 서버에 파일이 업로드되지 않습니다. 개인정보가 담긴 서류도 안심하고 합칠 수 있습니다.',
      },
      {
        heading: '원본 품질 그대로 합칩니다',
        body: '페이지를 이미지로 바꾸지 않고 PDF 구조 그대로 복사하므로 글자 선택, 검색, 화질이 원본과 동일하게 유지됩니다.',
      },
    ],
    faqs: [
      {
        question: '몇 개까지 합칠 수 있나요?',
        answer: '한 번에 최대 20개의 PDF를 합칠 수 있습니다. 파일이 매우 크면 기기 성능에 따라 시간이 걸릴 수 있습니다.',
      },
      {
        question: '암호가 걸린 PDF도 합칠 수 있나요?',
        answer: '암호로 보호된 PDF는 읽을 수 없어 합칠 수 없습니다. 암호를 해제한 뒤 다시 시도해주세요.',
      },
      {
        question: '특정 페이지만 골라서 합치고 싶어요.',
        answer: 'PDF 나누기 도구에서 필요한 페이지만 추출한 뒤, 추출한 파일들을 PDF 합치기로 병합하면 됩니다.',
      },
    ],
    related: [
      { label: 'PDF 나누기', path: '/pdf-split' },
      { label: 'PDF 이미지 변환', path: '/pdf-img' },
      { label: 'PDF 보기', path: '/' },
    ],
  },
  pdfSplit: {
    path: '/pdf-split',
    category: 'PDF',
    title: 'PDF 나누기 사용법',
    intro: 'PDF 나누기는 PDF에서 필요한 페이지만 추출하거나, 한 페이지씩 또는 원하는 페이지 수 단위로 파일을 분할하는 무료 PDF 분할 도구입니다.',
    sections: [
      {
        heading: '필요한 페이지만 추출합니다',
        body: '"1-3, 5, 8-"처럼 페이지 범위를 입력하면 해당 페이지만 모아 새 PDF로 저장합니다. "8-"은 8페이지부터 마지막 페이지까지를 뜻합니다. 긴 보고서에서 일부만 공유할 때 편리합니다.',
      },
      {
        heading: '한 페이지씩 또는 N페이지씩 나눕니다',
        body: '모든 페이지를 각각의 PDF로 나누거나, 2페이지·10페이지처럼 정한 단위로 분할할 수 있습니다. 나눈 파일은 ZIP 파일 하나로 내려받습니다.',
      },
      {
        heading: '브라우저에서 안전하게 처리합니다',
        body: 'PDF 파일은 서버에 업로드되지 않고 브라우저 안에서만 처리됩니다. 원본 PDF 구조를 그대로 복사하므로 화질 저하가 없습니다.',
      },
    ],
    faqs: [
      {
        question: '페이지 범위는 어떻게 입력하나요?',
        answer: '쉼표로 구분해 "1-3, 5, 8-"처럼 입력합니다. 하이픈 뒤를 비우면 마지막 페이지까지 포함합니다.',
      },
      {
        question: '페이지 순서를 바꿔서 추출할 수 있나요?',
        answer: '입력한 순서대로 추출됩니다. 예를 들어 "5, 1-2"를 입력하면 5, 1, 2페이지 순서의 PDF가 만들어집니다.',
      },
      { question: '암호가 걸린 PDF도 나눌 수 있나요?', answer: '암호로 보호된 PDF는 읽을 수 없어 나눌 수 없습니다.' },
    ],
    related: [
      { label: 'PDF 합치기', path: '/pdf-merge' },
      { label: 'PDF 이미지 변환', path: '/pdf-img' },
      { label: 'PDF 보기', path: '/' },
    ],
  },
  ageCalc: {
    path: '/age-calc',
    category: '계산기',
    title: '만 나이 계산 방법',
    intro: '만 나이 계산기는 생년월일만 입력하면 만 나이, 연 나이, 세는 나이와 다음 생일까지 남은 날짜를 한 번에 계산해주는 무료 나이 계산기입니다.',
    sections: [
      {
        heading: '만 나이 계산법',
        body: '만 나이는 태어난 날을 0세로 시작해 생일이 지날 때마다 한 살씩 더합니다. 올해 생일이 지났다면 "올해 연도 - 출생 연도", 아직 지나지 않았다면 거기서 1을 뺀 값이 만 나이입니다.',
      },
      {
        heading: '만 나이 통일법 시행',
        body: '2023년 6월 28일부터 행정·민사상 나이는 원칙적으로 만 나이로 표시합니다. 다만 병역, 청소년 보호, 초등학교 입학처럼 일부 법령은 여전히 연 나이(현재 연도 - 출생 연도)를 기준으로 합니다.',
      },
      {
        heading: '연 나이와 세는 나이의 차이',
        body: '연 나이는 생일과 관계없이 현재 연도에서 출생 연도를 뺀 나이이고, 세는 나이(한국식 나이)는 태어나자마자 1살이 되어 새해마다 한 살씩 더하는 방식입니다.',
      },
      {
        heading: '2월 29일생의 만 나이',
        body: '윤년 2월 29일에 태어난 경우, 평년에는 3월 1일부터 나이가 한 살 늘어난 것으로 계산합니다.',
      },
    ],
    faqs: [
      { question: '만 나이는 어떻게 계산하나요?', answer: '현재 연도에서 출생 연도를 빼고, 올해 생일이 아직 지나지 않았다면 1을 더 뺍니다.' },
      { question: '생일 당일에는 나이가 바뀌나요?', answer: '네. 생일 당일부터 만 나이가 한 살 늘어난 것으로 계산합니다.' },
      { question: '띠는 어떤 기준인가요?', answer: '양력 출생 연도 기준입니다. 음력 설 이전(1~2월)에 태어났다면 전년도 띠일 수 있습니다.' },
      { question: '특정 날짜 기준 나이도 계산할 수 있나요?', answer: '기준일을 바꾸면 과거나 미래의 특정 날짜 기준 만 나이를 계산할 수 있습니다.' },
    ],
    related: [
      { label: 'D-day 계산기', path: '/d-day' },
      { label: '글자수 계산기', path: '/counter-char' },
      { label: '로또 당첨번호', path: '/lotto' },
    ],
  },
  dday: {
    path: '/d-day',
    category: '계산기',
    title: 'D-day 날짜 계산 방법',
    intro:
      'D-day 계산기는 목표일까지 남은 날짜, 시작일로부터 며칠째인지, 100일·1000일 같은 기념일 날짜, 그리고 특정 날짜에서 N일 후의 날짜를 계산하는 무료 날짜 계산기입니다.',
    sections: [
      {
        heading: 'D-day 계산',
        body: '목표 날짜를 입력하면 오늘 기준으로 남은 일수를 D-숫자로 보여줍니다. 수능, 자격증 시험, 전역일, 출산 예정일처럼 날짜를 세어야 할 때 활용하세요. 이미 지난 날짜는 D+로 표시됩니다.',
      },
      {
        heading: '기념일 계산은 시작일을 1일로 셉니다',
        body: '연애 기념일은 보통 사귄 첫날을 1일로 계산합니다. 그래서 100일은 시작일로부터 99일 뒤입니다. 1주년은 다음 해의 같은 날짜입니다.',
      },
      {
        heading: 'N일 후 날짜 계산',
        body: '기준일과 일수를 입력하면 그 날짜가 무슨 요일인지까지 알려줍니다. 계약 기간, 반품 기한, 복용 기간처럼 날짜를 더하거나 빼야 할 때 편리합니다. 음수를 입력하면 이전 날짜를 계산합니다.',
      },
    ],
    faqs: [
      { question: 'D-day 당일은 어떻게 표시되나요?', answer: '목표일 당일은 D-DAY로, 다음 날부터는 D+1, D+2처럼 표시됩니다.' },
      { question: '100일은 시작일로부터 100일 뒤인가요?', answer: '아니요. 시작일을 1일로 세기 때문에 시작일로부터 99일 뒤가 100일째입니다.' },
      { question: '윤년도 반영되나요?', answer: '네. 실제 달력 기준으로 계산하므로 윤년과 월별 일수가 모두 반영됩니다.' },
    ],
    related: [
      { label: '만 나이 계산기', path: '/age-calc' },
      { label: '글자수 계산기', path: '/counter-char' },
      { label: 'QR코드 만들기', path: '/make-qr' },
    ],
  },
};
