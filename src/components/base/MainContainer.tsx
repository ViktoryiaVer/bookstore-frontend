import { FC } from "react";

interface MainContainerProps {
  children: React.ReactNode;
  className: string;
}

const MainContainer: FC<MainContainerProps> = ({ children, className }) => {
  return <main className={className}>{children}</main>;
};

export default MainContainer;
