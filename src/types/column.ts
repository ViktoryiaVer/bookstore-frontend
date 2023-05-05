type Column = {
  path: string;
  label: string;
  content?(item: {}): JSX.Element;
};

export default Column;
