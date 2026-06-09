import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerLinks = [
    { label: 'PDF 이미지 변환', path: '/pdf-img' },
    { label: '이미지 PNG 변환', path: '/img-png' },
    { label: '글자수 계산기', path: '/counter-char' },
    { label: 'HTML 태그 제거기', path: '/html-remove' },
    { label: 'QR코드 만들기', path: '/make-qr' },
    { label: 'URL 인코더', path: '/encode-decode' },
  ];

  return (
    <footer className="w-full space-y-3  text-center max-w-screen-xl mx-auto p-6 mb-10 md:py-8">
      <nav className="flex flex-wrap justify-center gap-3 text-sm" aria-label="주요 웹툴">
        {footerLinks.map((link) => (
          <Link key={link.path} className="text-gray-500 hover:text-sky-600 dark:text-gray-300 dark:hover:text-sky-300" to={link.path}>
            {link.label}
          </Link>
        ))}
      </nav>
      <span className="block text-base max-sm:text-xs text-gray-500  dark:text-white">
        © Copyright 2023 👤 <span className="font-bold dark:text-sky-400">유국현</span> All Rights Reserved.
      </span>
      <span className="block text-base max-sm:text-xs text-gray-500  dark:text-white">
        Contact US : <span className="font-bold dark:text-sky-400">rnrgus5897@gmail.com</span>
      </span>
    </footer>
  );
};

export default Footer;
