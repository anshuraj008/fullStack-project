import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const SignUpButton = ({ variant = 'default', size = 'default', className = '', ...props }) => {
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      asChild
      {...props}
    >
      <Link to="/signup">
        Sign Up
      </Link>
    </Button>
  );
};

export default SignUpButton;
