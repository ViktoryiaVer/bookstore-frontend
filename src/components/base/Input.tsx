import { FC } from "react";

interface InputProps {
  type: string;
  label: string;
  name: string;
  value: string | number;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  error?: string;
}

const Input: FC<InputProps> = ({ label, name, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input className="form-control" id={name} name={name} {...rest} />
      {error && <div className="alert alert-danger p-2 mb-0">{error}</div>}
    </div>
  );
};

export default Input;
