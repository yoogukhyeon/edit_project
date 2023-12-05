import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';
import Ip from '@components/ip/Ip';
import ThemeButton from './ThemeButton';

const Header = () => {
  return (
    <div className="pt-3">
      <div className="flex justify-between items-center">
        <h1>웹툴 모음집</h1>
        <ThemeButton />
      </div>

      <div>
        <nav className="py-4 text-sm font-medium ">
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
      <Ip />
    </div>
  );
};

const Li = styled.li`
  > a.active {
    background-color: skyblue;
    color: #fff;
  }
`;

export default Header;
