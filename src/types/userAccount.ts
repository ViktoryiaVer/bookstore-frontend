import { Role } from "./enums/role";
import Login from "./login";

type UserAccount = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: Role;
  login: Login;
};

export default UserAccount;
