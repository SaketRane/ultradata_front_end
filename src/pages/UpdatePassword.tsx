
import React, { useEffect } from "react";

const UpdatePassword: React.FC = () => {
  useEffect(() => {
    document.title = "UltraData | Update Password";
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="text-xl font-bold mb-2">Update Password Disabled</div>
      <div className="text-base">Password updates are disabled in this build.</div>
    </div>
  );
};

export default UpdatePassword;
