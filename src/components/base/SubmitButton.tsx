import { FC } from "react";
import Button from "./Button";

interface SubmitButtonProps {
  className: string;
  text: string;
}

const SubmitButton: FC<SubmitButtonProps> = ({ ...rest }) => {
  return <Button type="submit" {...rest}></Button>;
};

export default SubmitButton;
