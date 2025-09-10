/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Mail } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { resetPassword } from '@/services/auth-service';

const ResetPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      resetPassword(email).then((response) => {
        if (response.success) {
          setIsSubmitted(true);
          toast.success('Password reset instructions sent to your email');
        }
      });
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg glass animate-fade-up">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center font-bold">
          Reset your password
        </CardTitle>
        <CardDescription className="text-center">
          Enter your email and we'll send you instructions to reset your
          password
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isSubmitted ? (
          <div className="space-y-4">
            <Alert className="bg-primary-50 border-primary-200">
              <AlertDescription>
                We've sent password reset instructions to your email. Please
                check your inbox.
              </AlertDescription>
            </Alert>
            <Button
              type="button"
              className="w-full"
              onClick={() => navigate('/login')}
            >
              Return to login
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Reset Instructions'}
            </Button>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-center text-sm text-muted-foreground">
          Remember your password?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-primary-600 hover:text-primary-500 font-medium"
          >
            Back to login
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ResetPasswordForm;
