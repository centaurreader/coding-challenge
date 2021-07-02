import React, { ChangeEventHandler } from 'react';

const TextInput: React.FC<{
  id: string,
  label: string,
  onChange: ChangeEventHandler<HTMLInputElement>,
  required?: boolean,
  secure?: boolean,
  value: string,
}> = ({
  id,
  label,
  onChange,
  required,
  secure,
  value,
}) => (
  <label htmlFor={id}>
    <span
      className="textinput__label u-pb-xs"
    >
      {label}
    </span>
    <input
      className="textinput__input"
      id={id}
      onChange={onChange}
      required={required}
      type={secure ? 'password' : 'text'}
      value={value}
    />
  </label>
);

export default TextInput;
