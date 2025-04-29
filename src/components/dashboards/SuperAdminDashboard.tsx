import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, DollarSign, Users, Star, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  // In a real application, this would come from your subscription context
  const [subscriptionPlan, setSubscriptionPlan] = useState('free');

  return (
    <div className="space-y-6">
      {/* Subscription Status Card */}
      <Card className={`border-l-4 ${subscriptionPlan === 'premium' ? 'border-l-green-500' : 'border-l-amber-500'}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">
              {subscriptionPlan === 'premium' ? 'Premium Plan' : 'Free Plan'}
            </CardTitle>
            {subscriptionPlan === 'premium' ? (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                <Star className="h-3 w-3 mr-1" /> Active
              </span>
            ) : (
              <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">Limited</span>
            )}
          </div>
          <CardDescription>
            {subscriptionPlan === 'premium' 
              ? 'You have access to all premium features' 
              : 'Upgrade to unlock premium features'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {subscriptionPlan === 'premium' ? (
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Next billing cycle: May 29, 2025</p>
                <div className="mt-4 flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-sm"
                    onClick={() => navigate('/settings')}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Manage Subscription
                  </Button>
                </div>
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold">$29</span>
                <span className="text-muted-foreground text-sm">/month</span>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Upgrade to access premium features</p>
                <ul className="text-xs text-muted-foreground list-disc list-inside space-y-1">
                  <li>Advanced Analytics</li>
                  <li>AI Task Generation</li>
                  <li>Unlimited Team Members</li>
                </ul>
              </div>
              <Button 
                className="bg-taskmate-purple hover:bg-taskmate-purple/90"
                onClick={() => navigate('/settings')}
              >
                <DollarSign className="h-4 w-4 mr-2" /> Upgrade Now
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Existing Dashboard Content */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Teams</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.4%</div>
            <p className="text-xs text-muted-foreground">+2.3% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+5 from last month</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Rest of the dashboard content */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[200px] w-full bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center text-muted-foreground">
              Performance Chart
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Performing Teams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-full">
                  <p className="text-sm font-medium">Engineering</p>
                  <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full mt-1">
                    <div className="h-full bg-taskmate-purple rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
                <span className="ml-2 text-sm font-medium">94%</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-full">
                  <p className="text-sm font-medium">Sales</p>
                  <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full mt-1">
                    <div className="h-full bg-taskmate-purple rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <span className="ml-2 text-sm font-medium">92%</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-full">
                  <p className="text-sm font-medium">Marketing</p>
                  <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full mt-1">
                    <div className="h-full bg-taskmate-purple rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
                <span className="ml-2 text-sm font-medium">88%</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-full">
                  <p className="text-sm font-medium">Customer Success</p>
                  <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full mt-1">
                    <div className="h-full bg-taskmate-purple rounded-full" style={{ width: '84%' }}></div>
                  </div>
                </div>
                <span className="ml-2 text-sm font-medium">84%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
