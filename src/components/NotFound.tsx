import { FC } from "react";
import Header from "./base/Header";
interface NotFoundProps {}

const NotFound: FC<NotFoundProps> = () => {
  return (
    <>
      <Header text="Not Found" />
    </>
  );
};

export default NotFound;
