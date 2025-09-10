/* eslint-disable @typescript-eslint/no-explicit-any */

import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';

const PrivateGuard = ({ children }: any) => {
  const accessToken = localStorage.getItem('access') || null;
  const decoded = accessToken && jwtDecode(accessToken);

  if (!decoded || Date.now() >= decoded.exp * 1000) {
    return <Navigate to={'/login'} replace />;
  }

  return <div>{children}</div>;
};

export default PrivateGuard;
