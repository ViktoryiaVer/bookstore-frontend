import { FC } from "react";
import Header from "./base/header";

interface UsersProps {}

const Users: FC<UsersProps> = () => {
  return (
    <>
      <Header text="Users" />
    </>
  );
};

export default Users;
