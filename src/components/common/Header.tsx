import React from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';
import ThemeButton from './ThemeButton';

const Header = () => {
  return (
    <div className="pt-3">
      <div className="flex justify-between items-center">
        <h1>웹툴 모음집</h1>
        <ThemeButton />
      </div>

      <div>
        <nav className="py-4 text-sm font-medium">
          <ul className="flex space-x-3">
            <Li>
              <NavLink to="/" className="block px-5 py-4 rounded-md bg-slate-50">
                PDF
              </NavLink>
            </Li>
            <Li>
              <NavLink to="/test" className="block px-5 py-4 rounded-md bg-slate-50">
                PDF to IMG
              </NavLink>
            </Li>
            <Li>
              <NavLink to="/test2" className="block px-5 py-4 rounded-md bg-slate-50">
                IMG to PNG
              </NavLink>
            </Li>
            <Li>
              <NavLink to="/test3" className="block px-5 py-4 rounded-md bg-slate-50">
                IMG to JPG
              </NavLink>
            </Li>
          </ul>
        </nav>
      </div>
      <div>
        <nav className="py-4 text-sm font-medium">
          <ul className="flex space-x-3">
            <Li>
              <NavLink to="/text" className="block px-5 py-4 rounded-md bg-slate-50">
                HTML 태그 제거기
              </NavLink>
            </Li>
            <Li>
              <NavLink to="/text1" className="block px-5 py-4 rounded-md bg-slate-50">
                영어 대문자 소문자 변환
              </NavLink>
            </Li>
            <Li>
              <NavLink to="/text2" className="block px-5 py-4 rounded-md bg-slate-50">
                글자수 문자수 계산기
              </NavLink>
            </Li>
            <Li>
              <NavLink to="/text3" className="block px-5 py-4 rounded-md bg-slate-50">
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
