import { FC } from "react";
import Header from "./base/header";

interface PaymentsProps {}

const Payments: FC<PaymentsProps> = () => {
  return (
    <>
      <Header text="Payments" />
    </>
  );
};

export default Payments;
