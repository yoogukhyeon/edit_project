// 운월관(todaylucks.com, 직접 운영) 연동. 링크마다 UTM을 붙여 운월관 GA에서 유입·전환을 확인할 수 있게 한다.
const BASE = 'https://todaylucks.com';

export const todayLucksUrl = (path: string, content: string) =>
  `${BASE}${path}?utm_source=everyday-webtool&utm_medium=referral&utm_campaign=invest-lucky&utm_content=${content}`;

type Service = { path: string; key: string; label: string; desc: string; price?: string };

const SERVICES: Service[] = [
  { path: '/', key: 'today', label: '오늘의 운세', desc: '생년월일로 보는 재물·직장·연애운', price: '무료' },
  { path: '/quick-fortune', key: 'quick', label: '1분 운세', desc: '생일 몰라도, 로그인 없이 바로', price: '무료' },
  { path: '/saju', key: 'saju', label: '정통사주', desc: '타고난 성향·재물운·직업운 풀이', price: '900원' },
  { path: '/love', key: 'love', label: '연애운', desc: '솔로·커플 오늘의 관계 흐름', price: '900원' },
  { path: '/chemistry', key: 'chemistry', label: '궁합', desc: '두 사람의 감정·대화 방식 분석' },
  { path: '/dream', key: 'dream', label: '꿈 해몽', desc: '어젯밤 꿈의 의미와 상징 풀이' },
];

const track = (key: string, url: string) => {
  // GA4로 어떤 서비스 링크를 눌렀는지 집계 (public/index.html의 gtag)
  (window as any).gtag?.('event', 'click_todaylucks', { service: key, link_url: url });
};

const TodayLucksPromo = () => {
  const mainUrl = todayLucksUrl('/', 'hero');

  return (
    <section className="mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-5 text-white shadow-lg max-sm:p-4">
      <p className="text-xs font-semibold tracking-wide text-white/80">오늘의 운세 · 사주 운월관</p>
      <h2 className="mt-1 text-xl font-bold max-sm:text-lg">오늘의 재물·투자운, 운월관에서 무료로 확인하세요</h2>
      <p className="mt-1 text-sm text-white/85">생년월일만 입력하면 오늘의 재물운과 직장운, 연애운을 쉽게 풀이해드립니다.</p>

      <a
        href={mainUrl}
        target="_blank"
        rel="noopener"
        onClick={() => track('hero', mainUrl)}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-base font-bold text-purple-700 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-white/50"
      >
        무료 오늘의 운세 보기
        <span aria-hidden="true">→</span>
      </a>

      <ul className="mt-4 grid grid-cols-3 gap-2 max-sm:grid-cols-2">
        {SERVICES.map((service) => {
          const url = todayLucksUrl(service.path, service.key);
          return (
            <li key={service.key}>
              <a
                href={url}
                target="_blank"
                rel="noopener"
                onClick={() => track(service.key, url)}
                className="block h-full rounded-xl bg-white/20 p-3 transition hover:bg-white/30"
              >
                <span className="flex items-center justify-between gap-1">
                  <span className="text-sm font-semibold">{service.label}</span>
                  {service.price && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                        service.price === '무료' ? 'bg-emerald-400 text-emerald-950' : 'bg-yellow-300 text-yellow-950'
                      }`}
                    >
                      {service.price}
                    </span>
                  )}
                </span>
                <span className="mt-1 block text-xs leading-5 text-white/85">{service.desc}</span>
              </a>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-center text-xs text-white/70">todaylucks.com으로 이동합니다 (새 창)</p>
    </section>
  );
};

export default TodayLucksPromo;
