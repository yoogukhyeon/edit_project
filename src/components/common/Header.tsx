import { Link } from 'react-router-dom';
import CategoryNav from './CategoryNav';
import ThemeButton from './ThemeButton';
import DropDown from './common/DropDown';
import Navbar from './common/NavBar';

const Header = () => {
  return (
    <header className="pt-6">
      <div className="flex justify-between items-center">
        <Link to="/" className="flex gap-3 justify-start items-center text-2xl font-extrabold dark:text-white max-sm:text-xl">
          <img src="/images/logo.png" alt="로고" width={40} height={40} />
          EVERYDAY 웹툴
        </Link>
        <div className="flex justify-center items-center gap-2">
          <DropDown />
          <ThemeButton />
          <Navbar />
        </div>
      </div>
      <CategoryNav />
    </header>
  );
};

export default Header;
