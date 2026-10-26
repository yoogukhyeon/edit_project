export type TLotto = {
  bnusNo: string;
  drwNo1: string;
  drwNo2: string;
  drwNo3: string;
  drwNo4: string;
  drwNo5: string;
  drwNo6: string;
  drwNoDate: string;
  firstAccumamnt: string;
  firstPrzwnerCo: string;
  no: string;
};

const text = (el: Element | null) => (el?.textContent ?? '').replace(/\s/g, '');

// 당첨번호 목록 페이지 HTML에서 회차별 정보를 뽑는다 (브라우저 내장 DOMParser 사용).
export const parseLottoHtml = (html: string): TLotto[] => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return Array.from(doc.querySelectorAll('tbody tr'))
    .map((row) => {
      const ball = (i: number) => text(row.querySelector(`td:nth-child(2) > a div:nth-child(${i})`));
      return {
        no: text(row.querySelector('td:nth-child(1)')),
        drwNo1: ball(1),
        drwNo2: ball(2),
        drwNo3: ball(3),
        drwNo4: ball(4),
        drwNo5: ball(5),
        drwNo6: ball(6),
        bnusNo: ball(8),
        firstPrzwnerCo: text(row.querySelector('td:nth-child(3)')),
        firstAccumamnt: text(row.querySelector('td:nth-child(4)')),
        drwNoDate: text(row.querySelector('td:nth-child(5)')),
      };
    })
    .filter((row) => row.no && row.drwNo1);
};

// 최근 회차 당첨번호 (실패하면 null). /api 경로는 vercel.json에서 데이터 출처 사이트로 프록시된다.
export const fetchRecentLotto = async (): Promise<TLotto[] | null> => {
  const url =
    window.location.hostname === 'localhost'
      ? 'http://localhost:3000/lottowinnumber/fo/lottowinnumberlist'
      : '/api/lottowinnumber/fo/lottowinnumberlist';
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const rows = parseLottoHtml(await res.text());
    return rows.length > 0 ? rows : null;
  } catch (error) {
    return null;
  }
};

// 회차 정보에서 당첨번호 6개(보너스 제외)만 숫자 배열로
export const winningNumbers = (draw: TLotto) => [draw.drwNo1, draw.drwNo2, draw.drwNo3, draw.drwNo4, draw.drwNo5, draw.drwNo6].map(Number);
