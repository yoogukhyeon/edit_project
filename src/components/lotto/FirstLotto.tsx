import { useFirstLottoStore } from 'store/FirstLotto';
import { winningNumbers } from 'utill/lottoData';
import LottoBall from './LottoBall';

// 가장 최근 회차 당첨 결과 배너
const FirstLotto = () => {
  const { lotto } = useFirstLottoStore();
  if (!lotto?.no) return null;

  return (
    <section className="mb-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 p-5 text-center max-sm:px-3 shadow-sm dark:from-slate-700 dark:to-slate-700">
      <p className="text-sm font-semibold text-orange-600 dark:text-orange-300">최신 당첨번호 · {lotto.drwNoDate} 추첨</p>
      <h2 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{lotto.no}회 당첨결과</h2>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 max-sm:gap-1">
        {winningNumbers(lotto).map((n) => (
          <LottoBall key={n} n={n} />
        ))}
        <span className="mx-1 text-xl font-bold text-gray-400 max-sm:mx-0" aria-label="보너스">
          +
        </span>
        <LottoBall n={lotto.bnusNo} />
      </div>
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        1등 당첨금 <span className="font-semibold text-gray-900 dark:text-white">{lotto.firstAccumamnt}</span>
        {lotto.firstPrzwnerCo && <> · 당첨자 {lotto.firstPrzwnerCo}명</>}
      </p>
    </section>
  );
};

export default FirstLotto;
