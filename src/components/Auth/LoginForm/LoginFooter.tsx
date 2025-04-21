
import React from "react";
import { useNavigate } from "react-router-dom";
import { CardFooter } from "@/components/ui/card";
import { DEV_MODE } from "@/utils/auth-utils";
import { toast } from "sonner";

/**
 * Footer component for the login form
 * Contains additional links and information
 */
const LoginFooter: React.FC = () => {
  const navigate = useNavigate();

  const handleAdminAccess = () => {
    if (DEV_MODE) {
      // In development mode, immediately bypass auth and navigate
      console.log("DEV_MODE: Forcing navigation to /dashboard as admin.");
      toast.success("DEV MODE: Accessing dashboard as admin");
      // Force replace navigation to ensure history is replaced
      navigate("/dashboard", { replace: true });
    } else {
      // In production, inform user they need to log in first
      toast.info("Please log in with administrator credentials");
      navigate("/dashboard");
    }
  };

  return (
    <CardFooter className="flex flex-col space-y-2">
      <div className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <button 
          onClick={() => navigate("/signup")}
          className="text-primary-600 hover:text-primary-500 font-medium"
        >
          Contact your administrator
        </button>
      </div>
      <div className="text-center text-sm text-muted-foreground">
        Are you an administrator?{" "}
        <button 
          onClick={handleAdminAccess}
          className="text-primary-600 hover:text-primary-500 font-medium"
        >
          Go to Dashboard
        </button>
      </div>
    </CardFooter>
  );
};

export default LoginFooter;
