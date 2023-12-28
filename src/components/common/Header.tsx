import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import Ip from '@components/ip/Ip';
import FirstLotto from '@components/lotto/FirstLotto';
import ThemeButton from './ThemeButton';
import DropDown from './common/DropDown';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const goToHome = () => {
    navigate('/');
  };

  return (
    <header className="pt-7">
      <div className="flex justify-between items-center">
        <h1 onClick={goToHome} className="cursor-pointer flex gap-3 justify-start items-center text-2xl font-extrabold dark:text-white">
          <img src="/images/logo.png" alt="로고" width={40} height={40} />
          EVERYDAY 웹툴
        </h1>
        <div className="flex justify-center items-center gap-2">
          <DropDown />
          <ThemeButton />
        </div>
      </div>

      <div>
        <nav className="pt-4 text-sm font-medium max-sm:pb-4">
          <ul className="flex gap-3 justify-center items-center max-sm:flex-col">
            <Li className="max-sm: w-full">
              <NavLink to="/" className="block px-2 py-3 rounded-md bg-slate-50 max-sm:text-xs">
                PDF 보기
              </NavLink>
            </Li>
            <Li className="max-sm: w-full">
              <NavLink to="/pdf-img" className="block px-2 py-3 rounded-md bg-slate-50 max-sm:text-xs">
                PDF 이미지 변환
              </NavLink>
            </Li>
            <Li className="max-sm: w-full">
              <NavLink to="/img-png" className="block px-2 py-3 rounded-md bg-slate-50 max-sm:text-xs">
                이미지 PNG 변환
              </NavLink>
            </Li>
            <Li className="max-sm: w-full">
              <NavLink to="/img-jpg" className="block px-2 py-3 rounded-md bg-slate-50 max-sm:text-xs">
                이미지 JPG 변환
              </NavLink>
            </Li>
          </ul>
        </nav>
      </div>
      <div>
        <nav className="pt-4 pb-1 text-sm font-medium max-sm:pt-0">
          <ul className="flex gap-3 justify-center items-center max-sm:flex-col">
            <Li className="max-sm: w-full">
              <NavLink to="/html-remove" className="block px-2 py-3 rounded-md bg-slate-50 max-sm:text-xs">
                HTML 태그 제거기
              </NavLink>
            </Li>
            <Li className="max-sm: w-full">
              <NavLink to="/text-convert" className="block px-2 py-3 rounded-md bg-slate-50 max-sm:text-xs">
                영어 대문자 소문자 변환
              </NavLink>
            </Li>
            <Li className="max-sm: w-full">
              <NavLink to="/counter-char" className="block px-2 py-3 rounded-md bg-slate-50 max-sm:text-xs">
                글자수 문자수 계산기
              </NavLink>
            </Li>
            <Li className="max-sm: w-full">
              <NavLink to="/make-qr" className="block px-2 py-3 rounded-md bg-slate-50 max-sm:text-xs">
                나만의 QR코드 만들기
              </NavLink>
            </Li>
          </ul>
        </nav>
      </div>
      <div>
        <nav className="pt-4 pb-1 text-sm font-medium max-sm:pt-2">
          <ul className="flex gap-3 justify-start items-center max-sm:flex-col">
            <Li className="nav_third">
              <NavLink to="/make-meta" className="block px-2 py-3 rounded-md bg-slate-50 max-sm:text-xs">
                메타태그(SEO) 만들기
              </NavLink>
            </Li>
            <Li className="nav_third">
              <NavLink to="/my-ip" className="block px-2 py-3 rounded-md bg-slate-50 max-sm:text-xs">
                내 아이피 확인(IP address)
              </NavLink>
            </Li>
            <Li className="nav_third">
              <NavLink to="/lotto" className="block px-2 py-3 rounded-md bg-slate-50 max-sm:text-xs">
                로또회차별
              </NavLink>
            </Li>
          </ul>
        </nav>
      </div>
      {location?.pathname === '/lotto' && <FirstLotto />}
      {location?.pathname !== '/lotto' && <Ip />}
    </header>
  );
};

const Li = styled.li`
  &.nav_third {
    width: 30%;
  }
  > a.active {
    background-color: skyblue;
    color: #fff;
  }

  @media (max-width: 640px) {
    &.nav_third {
      width: 100%;
    }
  }
`;

export default Header;
