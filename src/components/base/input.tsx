import { FC } from "react";

interface InputProps {
  type: string;
  label: string;
  name: string;
  value: string | number;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

const Input: FC<InputProps> = ({ label, name, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input className="form-control" id={name} name={name} {...rest} />
    </div>
  );
};

export default Input;
