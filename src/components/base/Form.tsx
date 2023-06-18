import { FC } from "react";

interface FormProps {
  children: React.ReactNode;
  onSubmit(event: React.FormEvent<HTMLFormElement>): void;
}

const Form: FC<FormProps> = ({ children, onSubmit }) => {
  return (
    <form className="form" onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
