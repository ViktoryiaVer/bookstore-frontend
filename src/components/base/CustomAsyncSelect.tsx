import { FC } from "react";
import {
  ActionMeta,
  GetOptionLabel,
  GetOptionValue,
  MultiValue,
} from "react-select";
import AsyncSelect from "react-select/async";

interface CustomAsyncSelectProps {
  label: string;
  id: string;
  className: string;
  isMulti: boolean;
  value?: any;
  getOptionLabel?: GetOptionLabel<any>;
  getOptionValue?: GetOptionValue<any>;
  placeholder?: string;
  onChange(
    newValue: MultiValue<any>,
    actionMeta: ActionMeta<any>
  ): void | undefined;
  loadOptions: any;
  error: string;
}

const CustomAsyncSelect: FC<CustomAsyncSelectProps> = ({
  label,
  id,
  className,
  error,
  ...rest
}) => {
  return (
    <div className={className}>
      <label htmlFor={id}>{label}</label>
      <AsyncSelect id={id} className={className} {...rest} />
      {error && <div className="alert alert-danger p-2 m-0">{error}</div>}
    </div>
  );
};

export default CustomAsyncSelect;
