import { FC } from "react";
import Button from "./Button";

interface DeleteButtonProps {
  className: string;
  onClick(): void;
}

const DeleteButton: FC<DeleteButtonProps> = ({ className, onClick }) => {
  return (
    <Button
      type="button"
      className={className}
      onClick={onClick}
      text="Delete"
    ></Button>
  );
};

export default DeleteButton;
