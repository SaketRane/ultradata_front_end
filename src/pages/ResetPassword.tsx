
import React, { useEffect } from "react";

const ResetPassword: React.FC = () => {
  useEffect(() => {
    document.title = "UltraData | Reset Password";
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="text-xl font-bold mb-2">Reset Password Disabled</div>
      <div className="text-base">Password resets are disabled in this build.</div>
    </div>
  );
};

export default ResetPassword;
