import { FC } from "react";
import Header from "../base/Header";

interface OrdersProps {}

const Orders: FC<OrdersProps> = () => {
  return (
    <>
      <Header text="Orders" />
    </>
  );
};

export default Orders;
