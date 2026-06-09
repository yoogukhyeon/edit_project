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
  | 'urlEncoded';

type FAQ = {
  question: string;
  answer: string;
};

type RelatedLink = {
  label: string;
  path: string;
};

export type SEOContentItem = {
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
      { question: 'PNG 변환 시 용량 제한이 있나요?', answer: '현재 도구는 5MB 이하 이미지 파일 변환에 맞춰져 있습니다.' },
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
};
