import ResetPasswordForm from '@/components/Auth/ResetPasswordForm';
import React, { useEffect } from 'react';

const ResetPassword: React.FC = () => {
  useEffect(() => {
    document.title = 'UltraData | Reset Password';
  }, []);

  return (
    <div className="w-full flex items-center justify-center h-screen">
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPassword;
