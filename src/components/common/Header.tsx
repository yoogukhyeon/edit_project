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
      <Ip />
      <div>
        <nav className="py-4 text-sm font-medium ">
          <ul className="flex gap-3 justify-center items-center max-sm:flex-col">
            <Li className="max-sm: w-full">
              <NavLink to="/" className="block px-2 py-3 rounded-md bg-slate-50 max-sm:text-xs">
                PDF
              </NavLink>
            </Li>
            <Li className="max-sm: w-full">
              <NavLink to="/pdf-img" className="block px-2 py-3 rounded-md bg-slate-50 max-sm:text-xs">
                PDF to IMG
              </NavLink>
            </Li>
            <Li className="max-sm: w-full">
              <NavLink to="/img-png" className="block px-2 py-3 rounded-md bg-slate-50 max-sm:text-xs">
                IMG to PNG
              </NavLink>
            </Li>
            <Li className="max-sm: w-full">
              <NavLink to="/img-jpg" className="block px-2 py-3 rounded-md bg-slate-50 max-sm:text-xs">
                IMG to JPG
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
              <NavLink to="/text3" className="block px-2 py-3 rounded-md bg-slate-50 max-sm:text-xs">
                내아이피
              </NavLink>
            </Li>
          </ul>
        </nav>
      </div>
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
