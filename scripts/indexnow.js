// 배포 후 실행: sitemap의 모든 URL을 IndexNow로 네이버·빙(+참여 검색엔진)에 즉시 알린다.
// 사용법: npm run indexnow            (전체 URL)
//         npm run indexnow -- /avg-price /pdf-merge   (일부 URL만)
// 소유 확인용 키 파일은 public/<KEY>.txt 로 함께 배포된다.
const { readFileSync } = require('fs');
const { resolve } = require('path');
const routes = require('../src/constants/seoRoutes.json');

const HOST = 'webtool.everyday-365.com';
const KEY = 'db990b564d416b6a0e0f343d85fa40b5';
const ENDPOINTS = ['https://searchadvisor.naver.com/indexnow', 'https://api.indexnow.org/indexnow'];

const keyFile = readFileSync(resolve(__dirname, `../public/${KEY}.txt`), 'utf8').trim();
if (keyFile !== KEY) throw new Error('public/ 키 파일 내용이 KEY와 다릅니다.');

const args = process.argv.slice(2);
const paths = args.length > 0 ? args : routes.map((route) => route.path);
const urlList = paths.map((path) => `https://${HOST}${path === '/' ? '/' : path}`);

(async () => {
  const body = JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList });
  // eslint-disable-next-line no-restricted-syntax
  for (const endpoint of ENDPOINTS) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body });
      // 200/202 = 접수됨, 403 = 키 파일을 아직 찾지 못함(배포 전), 422 = URL이 호스트와 다름
      console.log(`${endpoint} → ${res.status} ${res.statusText} (${urlList.length}개 URL)`);
    } catch (error) {
      console.log(`${endpoint} → 전송 실패: ${error.message}`);
    }
  }
})();
