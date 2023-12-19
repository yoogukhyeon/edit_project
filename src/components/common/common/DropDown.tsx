import React from 'react';
import { Dropdown } from 'flowbite-react';
import { FaGithub } from 'react-icons/fa';
import { TbBrandBlogger } from 'react-icons/tb';
import { MdSportsSoccer } from 'react-icons/md';

const DropDown = () => {
  return (
    <Dropdown label="ABOUT ME" style={{ width: '200px', color: 'skyblue' }}>
      <Dropdown.Header>
        <span className="block text-sm">유국현</span>
        <span className="block truncate text-sm font-medium">rnrgus5897@gmail.com</span>
      </Dropdown.Header>
      <Dropdown.Item as="a" href="https://flowbite.com/" target="_blank" icon={FaGithub}>
        Git
      </Dropdown.Item>
      <Dropdown.Item as="a" href="https://flowbite.com/" target="_blank" icon={TbBrandBlogger}>
        blog
      </Dropdown.Item>
      <Dropdown.Item as="a" href="https://flowbite.com/" target="_blank" icon={MdSportsSoccer}>
        business
      </Dropdown.Item>
    </Dropdown>
  );
};

export default DropDown;
