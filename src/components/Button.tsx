import React, { MouseEventHandler, ReactNode } from 'react';

const Button: React.FC<{
  children: ReactNode,
  link?: boolean,
  onClick?: MouseEventHandler<HTMLButtonElement>,
  pill?: boolean,
  pillHollow?: boolean,
  secondary?: boolean,
  type?: 'button' | 'submit',
}> = ({
  children,
  link,
  onClick,
  pill,
  pillHollow,
  secondary,
  type,
}) => {
  const getButtonStyle = () => {
    if (secondary) {
      return 'button--secondary';
    }
    if (link) {
      return 'button--link';
    }
    if (pill) {
      return 'button--pill';
    }
    if (pillHollow) {
      return 'button--pill__hollow';
    }
    return 'button--primary';
  };

  return (
    <button
      className={`button ${getButtonStyle()}`}
      onClick={onClick}
      type={type === 'button' ? 'button' : 'submit'}
    >
      {children}
    </button>
  );
};

export default Button;
