import { ballClass } from 'utill/lottoGen';

type Props = { n: number | string; size?: 'sm' | 'md' };

// 동행복권 색상 규칙을 따르는 로또 공 (1~10 노랑, 11~20 파랑, 21~30 빨강, 31~40 회색, 41~45 초록)
const LottoBall = ({ n, size = 'md' }: Props) => (
  <span
    className={`inline-flex shrink-0 items-center justify-center rounded-full font-bold shadow-sm ${ballClass(Number(n))} ${
      size === 'sm' ? 'h-7 w-7 text-xs' : 'h-10 w-10 text-base max-sm:h-9 max-sm:w-9 max-sm:text-sm'
    }`}
  >
    {n}
  </span>
);

export default LottoBall;
