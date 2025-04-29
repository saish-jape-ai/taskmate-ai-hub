
import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { CreditCard, DollarSign, Check, Star, Brain, Users, MessageSquare, User } from 'lucide-react';

const Settings = () => {
  const { currentUser } = useAuth();
  // In a real app with Stripe integration, these would come from your subscription context
  const [subscriptionActive, setSubscriptionActive] = useState(false);
  const [selectedBillingCycle, setSelectedBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = () => {
    setLoading(true);
    // This would call your Stripe checkout endpoint
    setTimeout(() => {
      setLoading(false);
      toast.success('Subscription management coming soon!');
    }, 1500);
  };

  const handleCancel = () => {
    setLoading(true);
    // This would call your Stripe customer portal endpoint
    setTimeout(() => {
      setLoading(false);
      toast.success('Subscription management coming soon!');
    }, 1500);
  };

  // Dummy subscription details
  const subscriptionDetails = {
    plan: 'Premium',
    price: selectedBillingCycle === 'monthly' ? 29 : 290,
    billingCycle: selectedBillingCycle,
    nextBilling: 'May 29, 2025',
    cardLast4: '4242'
  };

  return (
    <AppLayout title="Settings">
      <div className="container mx-auto">
        <Tabs defaultValue="account" className="space-y-4">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your account information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue={currentUser?.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={currentUser?.email} />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Change Password</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="subscription">
            <div className="space-y-6">
              {/* Subscription Status Card */}
              {subscriptionActive ? (
                <Card className="border-l-4 border-l-green-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Current Subscription</CardTitle>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                        <Star className="h-3 w-3 mr-1" /> Active
                      </span>
                    </div>
                    <CardDescription>
                      You're subscribed to the {subscriptionDetails.plan} plan
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Billing Cycle</p>
                        <p className="text-sm text-muted-foreground capitalize">{subscriptionDetails.billingCycle}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Amount</p>
                        <p className="text-sm text-muted-foreground">
                          ${subscriptionDetails.price}/{subscriptionDetails.billingCycle === 'monthly' ? 'month' : 'year'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Next Billing Date</p>
                        <p className="text-sm text-muted-foreground">{subscriptionDetails.nextBilling}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Payment Method</p>
                        <p className="text-sm text-muted-foreground">Card ending in {subscriptionDetails.cardLast4}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                    <Button className="w-full sm:w-auto" disabled={loading} onClick={handleCancel}>
                      <CreditCard className="h-4 w-4 mr-2" /> Manage Payment Method
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full sm:w-auto border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700" 
                      disabled={loading}
                      onClick={handleCancel}
                    >
                      Cancel Subscription
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Premium</CardTitle>
                    <CardDescription>
                      Unlock full access to all TaskMate features
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
                        <Button
                          variant={selectedBillingCycle === 'monthly' ? 'default' : 'outline'}
                          className={selectedBillingCycle === 'monthly' ? 'bg-taskmate-purple hover:bg-taskmate-purple/90' : ''}
                          onClick={() => setSelectedBillingCycle('monthly')}
                        >
                          Monthly - $29/month
                        </Button>
                        <Button
                          variant={selectedBillingCycle === 'yearly' ? 'default' : 'outline'}
                          className={selectedBillingCycle === 'yearly' ? 'bg-taskmate-purple hover:bg-taskmate-purple/90' : ''}
                          onClick={() => setSelectedBillingCycle('yearly')}
                        >
                          Yearly - $290/year (Save 16%)
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-taskmate-purple shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">Advanced Analytics</p>
                            <p className="text-sm text-muted-foreground">Gain deeper insights into team performance</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-taskmate-purple shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">AI Task Generation</p>
                            <p className="text-sm text-muted-foreground">Let AI suggest optimal task assignments</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-taskmate-purple shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">Growth Dashboard</p>
                            <p className="text-sm text-muted-foreground">Track employee development effectively</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-taskmate-purple shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">Full Team Chat</p>
                            <p className="text-sm text-muted-foreground">Unlimited messaging and file sharing</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-taskmate-purple shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">Personal AI Assistant</p>
                            <p className="text-sm text-muted-foreground">Get personalized help with tasks</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-taskmate-purple shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">Priority Support</p>
                            <p className="text-sm text-muted-foreground">Get faster responses when you need help</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-taskmate-purple hover:bg-taskmate-purple/90" 
                      disabled={loading}
                      onClick={handleSubscribe}
                    >
                      <DollarSign className="h-4 w-4 mr-2" />
                      Subscribe Now - ${selectedBillingCycle === 'monthly' ? '29/month' : '290/year'}
                    </Button>
                  </CardFooter>
                </Card>
              )}
              
              {/* Subscription Features Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Premium Features</CardTitle>
                  <CardDescription>Everything included in your subscription</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col items-center text-center p-4">
                      <div className="h-12 w-12 rounded-full bg-taskmate-purple/20 flex items-center justify-center mb-3">
                        <Brain className="h-6 w-6 text-taskmate-purple" />
                      </div>
                      <h3 className="font-medium">AI Task Generation</h3>
                      <p className="text-sm text-muted-foreground mt-1">Smart task assignments based on skills and workload</p>
                    </div>
                    
                    <div className="flex flex-col items-center text-center p-4">
                      <div className="h-12 w-12 rounded-full bg-taskmate-purple/20 flex items-center justify-center mb-3">
                        <Users className="h-6 w-6 text-taskmate-purple" />
                      </div>
                      <h3 className="font-medium">Growth Dashboard</h3>
                      <p className="text-sm text-muted-foreground mt-1">Track employee development and progress</p>
                    </div>
                    
                    <div className="flex flex-col items-center text-center p-4">
                      <div className="h-12 w-12 rounded-full bg-taskmate-purple/20 flex items-center justify-center mb-3">
                        <MessageSquare className="h-6 w-6 text-taskmate-purple" />
                      </div>
                      <h3 className="font-medium">Full Team Chat</h3>
                      <p className="text-sm text-muted-foreground mt-1">Unlimited messaging with file sharing</p>
                    </div>
                    
                    <div className="flex flex-col items-center text-center p-4">
                      <div className="h-12 w-12 rounded-full bg-taskmate-purple/20 flex items-center justify-center mb-3">
                        <User className="h-6 w-6 text-taskmate-purple" />
                      </div>
                      <h3 className="font-medium">Personal AI Assistant</h3>
                      <p className="text-sm text-muted-foreground mt-1">Get help with drafting and organizing</p>
                    </div>
                    
                    <div className="flex flex-col items-center text-center p-4">
                      <div className="h-12 w-12 rounded-full bg-taskmate-purple/20 flex items-center justify-center mb-3">
                        <CreditCard className="h-6 w-6 text-taskmate-purple" />
                      </div>
                      <h3 className="font-medium">Priority Support</h3>
                      <p className="text-sm text-muted-foreground mt-1">Fast responses when you need help</p>
                    </div>
                    
                    <div className="flex flex-col items-center text-center p-4">
                      <div className="h-12 w-12 rounded-full bg-taskmate-purple/20 flex items-center justify-center mb-3">
                        <Star className="h-6 w-6 text-taskmate-purple" />
                      </div>
                      <h3 className="font-medium">Early Access</h3>
                      <p className="text-sm text-muted-foreground mt-1">Be the first to try new features</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Configure how you receive notifications.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Notification preferences UI would go here */}
                  <p className="text-muted-foreground">Notification settings coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Settings;
