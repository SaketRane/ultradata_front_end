
import React from "react";
import { useNavigate } from "react-router-dom";
import { CardFooter } from "@/components/ui/card";

/**
 * Footer component for the login form
 * Contains additional links and information
 */
const LoginFooter: React.FC = () => {
  const navigate = useNavigate();
  
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
          onClick={() => navigate("/dashboard")}
          className="text-primary-600 hover:text-primary-500 font-medium"
        >
          Go to Dashboard
        </button>
      </div>
    </CardFooter>
  );
};

export default LoginFooter;

