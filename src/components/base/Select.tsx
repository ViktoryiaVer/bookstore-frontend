import { FC } from "react";
import _ from "lodash";

interface SelectProps {
  isMulti: boolean;
  name: string;
  label: string;
  value: any | any[];
  valuePath?: string;
  options: any[];
  onChange(event: React.ChangeEvent<HTMLSelectElement>): void;
  error?: string;
}

const Select: FC<SelectProps> = ({
  name,
  label,
  isMulti,
  options,
  valuePath,
  error,
  ...rest
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        multiple={isMulti}
        {...rest}
        className="form-select"
      >
        <option value="" />
        {options.map((option, index) => (
          <option
            key={getKey(option, index)}
            value={getValue(option, valuePath)}
          >
            {getValue(option, valuePath)}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

const getKey = (item: any, index: number): number => {
  if (item.id) return item.id;
  return index;
};

const getValue = (item: any, valuePath?: string) => {
  if (valuePath) return _.get(item, valuePath);
  return item;
};

export default Select;
