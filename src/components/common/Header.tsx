import React from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';

const Header = () => {
  return (
    <div>
      <h1>헤더</h1>
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
