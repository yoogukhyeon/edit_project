import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerLinks = [
    { label: 'PDF 합치기', path: '/pdf-merge' },
    { label: '이미지 용량 줄이기', path: '/img-compress' },
    { label: '글자수 계산기', path: '/counter-char' },
    { label: '물타기 계산기', path: '/avg-price' },
    { label: '만 나이 계산기', path: '/age-calc' },
    { label: 'QR코드 만들기', path: '/make-qr' },
  ];
  return (
    <footer className="w-full space-y-3  text-center max-w-screen-xl mx-auto p-6 mb-10 md:py-8">
      <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm" aria-label="주요 웹툴">
        {footerLinks.map((link) => (
          <Link key={link.path} className="text-gray-500 hover:text-sky-600 dark:text-gray-300 dark:hover:text-sky-300" to={link.path}>
            {link.label}
          </Link>
        ))}
      </nav>
      <span className="block text-base max-sm:text-xs text-gray-500  dark:text-white">
        © 2023–{new Date().getFullYear()} 👤 <span className="font-bold dark:text-sky-400">유국현</span> All Rights Reserved.
      </span>
      <span className="block text-base max-sm:text-xs text-gray-500  dark:text-white">
        Contact US : <span className="font-bold dark:text-sky-400">rnrgus5897@gmail.com</span>
      </span>
    </footer>
  );
};

export default Footer;
