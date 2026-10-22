import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="py-20 text-center">
      <Helmet>
        <title>페이지를 찾을 수 없습니다</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">페이지를 찾을 수 없습니다</h1>
      <Link to="/" className="text-sky-600 underline">
        홈으로 이동
      </Link>
    </div>
  );
};

export default NotFound;
