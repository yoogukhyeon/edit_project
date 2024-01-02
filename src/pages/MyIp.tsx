import Comment from '@components/common/common/Comment';
import SEOMetaTag from 'seo/SEOMetaTag';

const MyIp = () => {
  return (
    <div>
      <SEOMetaTag
        title={'아이피 확인'}
        description={'IP, ip 확인, ip주소 확인, ipconfig, ip 조회, ip 주소를 확인하는 가장 쉬운 방법'}
        url={'https://webtool.everyday-365.com/my-ip'}
        imgsrc={'/images/meta.png'}
      />
      <div className="mt-3 mb-5">
        <div className="mt-5 mb-7 text-center bg-slate-100 p-5 rounded-md">
          <p className="mb-2 text-lg font-medium text-gray-900 ">사용자 브라우저 정보 확인</p>
          <p className="text-gray-500 text-base max-sm:text-sm">{navigator.userAgent}</p>
        </div>
      </div>
      <p className="mb-2 text-lg font-medium text-gray-900 dark:text-white"> IP 주소를 확인하는 가장 쉽고 빠른 방법?</p>
      <p className="text-sm text-gray-500 whitespace-pre-line dark:text-gray-400">
        이 사이트(webtool.everyday-365.com/)에 접속하는 것이 IP주소를 확인하는 가장 쉽고 빠른 방법이다. <br />
        당신의 공인 아이피 주소는 위와 같습니다.
      </p>
      <p className="mb-2 mt-4 text-lg font-medium text-gray-900 dark:text-white"> IP, IP 주소란?</p>
      <p className="text-sm text-gray-500 whitespace-pre-line dark:text-gray-400">
        IP란 인터넷 프로토콜(Internet Protocol)의 약자로 인터넷에 연결되어 있는 장치를 식별하기 위해 각각의 장비에 부여하는 고유 주소입니다. 데이터를
        주고 받기 위해서 데이터를 발신하는 곳과 수신하는 곳이 필요합니다. 통신을 위해 부여한 주소가 IP 주소(Internet Protocol Address)입니다.
      </p>

      <Comment pathname="myIp" />
    </div>
  );
};

export default MyIp;
