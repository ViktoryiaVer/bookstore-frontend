import { FC } from "react";

interface HeaderProps {
  text: string;
}

const Header: FC<HeaderProps> = ({ text }) => {
  return (
    <header>
      <h1 className="header">{text}</h1>
    </header>
  );
};

export default Header;
