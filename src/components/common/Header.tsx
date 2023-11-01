import React from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';

const Header = () => {
  return (
    <div>
      <h1>헤더</h1>
      <div>
        <nav className="py-4 px-6 text-sm font-medium">
          <ul className="flex space-x-3">
            <Li>
              <NavLink to="/" className="block px-5 py-4 rounded-md bg-slate-50">
                main
              </NavLink>
            </Li>
            <Li>
              <NavLink to="/test" className="block px-5 py-4 rounded-md bg-slate-50">
                test1
              </NavLink>
            </Li>
            <Li>
              <NavLink to="/test2" className="block px-5 py-4 rounded-md bg-slate-50">
                test2
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
