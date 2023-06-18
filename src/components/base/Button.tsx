import { FC } from "react";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  className: string;
  text: string;
  onClick?(): void;
}

const Button: FC<ButtonProps> = ({ type, className, text, onClick }) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
