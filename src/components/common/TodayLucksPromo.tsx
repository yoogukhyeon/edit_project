const LINK = 'https://todaylucks.com';

const FEATURES = [
  { label: '오늘의 운세', price: '무료', desc: '재물·직장·연애운을 매일 확인' },
  { label: '정통사주', price: '900원', desc: '생년월일로 보는 쉬운 사주 풀이' },
  { label: '애정운', price: '900원', desc: '연애·궁합 흐름을 자세히' },
];

// 오늘의 투자운세 페이지 상단의 운월관(todaylucks.com) 소개 카드
const TodayLucksPromo = () => {
  const onClick = () => {
    // GA4로 클릭 수 집계 (public/index.html의 gtag)
    (window as any).gtag?.('event', 'click_todaylucks', { link_url: LINK });
  };

  return (
    <section className="mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-5 text-white shadow-lg max-sm:p-4">
      <p className="text-xs font-semibold tracking-wide text-white/80">오늘의 운세 · 사주 운월관</p>
      <h2 className="mt-1 text-xl font-bold max-sm:text-lg">투자운 다음엔, 내 사주와 애정운까지 확인해보세요</h2>

      <ul className="mt-4 grid grid-cols-3 gap-2 max-sm:grid-cols-1">
        {FEATURES.map((feature) => (
          <li key={feature.label} className="rounded-xl bg-white/20 p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-semibold">{feature.label}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                  feature.price === '무료' ? 'bg-emerald-400 text-emerald-950' : 'bg-yellow-300 text-yellow-950'
                }`}
              >
                {feature.price}
              </span>
            </div>
            <p className="mt-1 text-xs text-white/85">{feature.desc}</p>
          </li>
        ))}
      </ul>

      <a
        href={LINK}
        target="_blank"
        rel="noopener"
        onClick={onClick}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-base font-bold text-purple-700 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-white/50"
      >
        무료 운세 보러 가기
        <span aria-hidden="true">→</span>
      </a>
      <p className="mt-2 text-center text-xs text-white/70">todaylucks.com으로 이동합니다 (새 창)</p>
    </section>
  );
};

export default TodayLucksPromo;
