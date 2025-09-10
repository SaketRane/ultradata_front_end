import UpdatePasswordForm from '@/components/Auth/UpdatePasswordForm';
import React, { useEffect } from 'react';

const UpdatePassword: React.FC = () => {
  useEffect(() => {
    document.title = 'UltraData | Update Password';
  }, []);

  return (
    <div className="w-full flex items-center justify-center h-screen">
      <UpdatePasswordForm />
    </div>
  );
};

export default UpdatePassword;
