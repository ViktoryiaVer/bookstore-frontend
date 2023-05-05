import { FC } from "react";
import Header from "./base/header";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  return (
    <>
      <Header text="Welcome to Bookstore App!" />
    </>
  );
};

export default Home;
