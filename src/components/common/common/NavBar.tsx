import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  const [nav, setNav] = useState<boolean>(false);

  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items
  const navItems = [
    // { id: 1, path: '/', title: 'PDF 보기' },
    { id: 2, path: '/pdf-img', title: 'PDF 이미지 변환' },
    { id: 3, path: '/img-png', title: '이미지 PNG 변환' },
    { id: 4, path: '/img-jpg', title: '이미지 JPG 변환' },
    { id: 5, path: '/html-remove', title: 'HTML 태그 제거기' },
    { id: 6, path: '/text-convert', title: '영어 대문자 소문자 변환' },
    { id: 7, path: '/counter-char', title: '글자수 문자수 계산기' },
    { id: 8, path: '/make-qr', title: '나만의 QR코드 만들기' },
    { id: 9, path: '/my-ip', title: '내 아이피 확인(IP address)' },
    { id: 10, path: '/lotto', title: '로또회차별당첨번호' },
    { id: 11, path: '/invest-lucky', title: '오늘의 투자운세' },
    { id: 12, path: '/make-meta', title: 'SEO 만들기' },
  ];

  return (
    <div className=" flex justify-between items-center max-w-[1240px] mx-auto  text-white">
      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose className="dark:white black" size={24} /> : <AiOutlineMenu className="dark:white black" size={24} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        style={{
          zIndex: '9999',
        }}
        className={
          nav
            ? 'fixed md:hidden left-0 top-0 w-[60%] h-full px-2 border-r border-r-gray-900 bg-slate-50'
            : 'w-[60%] fixed top-0 bottom-0 left-[-100%]'
        }
      >
        {/* Mobile Logo */}
        <h1
          onClick={goToHome}
          className="p-4 cursor-pointer text-black flex gap-3 justify-start items-center text-base font-extrabold dark:text-white"
        >
          <img src="/images/logo.png" alt="로고" width={40} height={40} />
          EVERYDAY 웹툴
        </h1>

        {/* Mobile Navigation Items */}
        {navItems.map((item) => (
          <li
            key={item.id}
            className="p-4 border-b text-black rounded-xl hover:bg-sky-100 duration-300 hover:text-black cursor-pointer border-gray-600"
          >
            <NavLink to={item.path} className="block py-1 rounded-md  max-sm:text-xs">
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
