
import React from 'react';
import LoginFormModule from './LoginForm/index';

// This component is deprecated in favor of the modular implementation
// Just forwarding to the new implementation for backward compatibility
const LoginForm: React.FC = () => {
  return <LoginFormModule />;
};

export default LoginForm;
