
import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setIsLoading(true);

    try {
      // In a real app, this would validate the token and reset the password via API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setIsReset(true);
      toast.success('Password reset successfully');
      
      // Redirect to login after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Password reset error:', error);
      toast.error('Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Token validation (in a real app you'd verify the token with your backend)
  const isValidToken = token && token.length > 10;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-bloom-blue/30 to-bloom-purple/10">
      <div className="w-full max-w-md px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-bloom-dark-purple mb-2">TaskMate</h1>
          <p className="text-gray-600">Reset your password</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>
              {isReset 
                ? "Your password has been reset" 
                : !isValidToken 
                  ? "Invalid or expired reset link"
                  : "Enter your new password"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isReset ? (
              <div className="text-center p-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Your password has been successfully reset.
                </p>
                <p className="text-sm text-muted-foreground">
                  You will be redirected to the login page.
                </p>
              </div>
            ) : !isValidToken ? (
              <div className="text-center p-4">
                <p className="text-sm text-muted-foreground mb-4">
                  The password reset link is invalid or has expired.
                </p>
                <p className="text-sm text-muted-foreground">
                  Please request a new password reset link.
                </p>
                <Button 
                  className="mt-4"
                  onClick={() => navigate('/forgot-password')}
                >
                  Request New Link
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="password">New Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Resetting Password..." : "Reset Password"}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="mt-4 text-center text-sm">
              <p className="text-muted-foreground">
                <Link to="/login" className="text-primary hover:underline">
                  Back to login
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
