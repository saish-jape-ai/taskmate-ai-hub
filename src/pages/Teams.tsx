
import AppLayout from "@/components/AppLayout";
import { teams, users } from "@/data/mockData";
import { Users, Info, Plus, ChevronDown, Settings, Users2, User, ArrowUpRight, LayoutList, BarChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Teams = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <AppLayout title="Teams">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Users className="h-7 w-7 text-taskmate-purple" />
              Teams Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage teams, their assignments, and performance metrics
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button className="bg-taskmate-purple hover:bg-taskmate-purple/90">
              <Plus className="h-4 w-4 mr-2" />
              Add New Team
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="management">Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {teams.map(team => {
                const leader = users.find(u => u.id === team.leaderId);
                const teamMembers = users.filter(u => team.members.includes(u.id));
                
                return (
                  <Card key={team.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="bg-taskmate-purple/5 pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle>{team.name}</CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Team</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View Tasks</DropdownMenuItem>
                            <DropdownMenuItem>View Analytics</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardDescription className="flex items-center gap-1">
                        <Users2 className="h-3.5 w-3.5 text-muted-foreground" />
                        {teamMembers.length} Members
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      {leader && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-muted-foreground mb-2">Team Leader</p>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={leader.avatar} alt={leader.name} />
                              <AvatarFallback>{leader.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{leader.name}</p>
                              <p className="text-sm text-muted-foreground">{leader.email}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Performance</span>
                            <span className="text-sm font-medium">{team.performanceScore}%</span>
                          </div>
                          <Progress value={team.performanceScore} className="h-2" />
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Badge variant={team.growth >= 0 ? "outline" : "destructive"} className="font-normal">
                              {team.growth >= 0 ? `+${team.growth}%` : `${team.growth}%`}
                            </Badge>
                            <span className="text-sm text-muted-foreground">from last month</span>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => navigate(`/teams/${team.id}`)}>
                            Details
                            <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
                          </Button>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mt-3">
                          {teamMembers.slice(0, 5).map(member => (
                            <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback>{member.name[0]}</AvatarFallback>
                            </Avatar>
                          ))}
                          {teamMembers.length > 5 && (
                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs">
                              +{teamMembers.length - 5}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
          
          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Team Performance Metrics</CardTitle>
                <CardDescription>Compare performance metrics across all teams</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {teams.map(team => (
                    <div key={team.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{team.name}</h3>
                        <Badge variant={team.growth >= 0 ? "outline" : "destructive"} className="font-normal">
                          {team.growth >= 0 ? `+${team.growth}%` : `${team.growth}%`}
                        </Badge>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-muted-foreground">Performance Score</span>
                        <span className="text-sm font-medium">{team.performanceScore}%</span>
                      </div>
                      <Progress value={team.performanceScore} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="management">
            <Card>
              <CardHeader>
                <CardTitle>Team Management</CardTitle>
                <CardDescription>Manage team settings, members, and assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {teams.map(team => {
                    const leader = users.find(u => u.id === team.leaderId);
                    const teamMembers = users.filter(u => team.members.includes(u.id));
                    
                    return (
                      <div key={team.id} className="border p-4 rounded-lg">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                          <h3 className="font-medium text-lg">{team.name}</h3>
                          <div className="flex space-x-2 mt-2 md:mt-0">
                            <Button size="sm" variant="outline">
                              <LayoutList className="h-4 w-4 mr-2" />
                              Tasks
                            </Button>
                            <Button size="sm" variant="outline">
                              <User className="h-4 w-4 mr-2" />
                              Members
                            </Button>
                            <Button size="sm" variant="outline">
                              <Settings className="h-4 w-4 mr-2" />
                              Settings
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium mb-2">Team Leader</p>
                            {leader && (
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={leader.avatar} alt={leader.name} />
                                  <AvatarFallback>{leader.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p>{leader.name}</p>
                                  <p className="text-sm text-muted-foreground">{leader.email}</p>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium mb-2">Team Members ({teamMembers.length})</p>
                            <div className="flex flex-wrap gap-1">
                              {teamMembers.slice(0, 8).map(member => (
                                <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                                  <AvatarImage src={member.avatar} alt={member.name} />
                                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                                </Avatar>
                              ))}
                              {teamMembers.length > 8 && (
                                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs">
                                  +{teamMembers.length - 8}
                                </div>
                              )}
                            </div>
                            <Button size="sm" variant="link" className="mt-2 p-0 h-auto">
                              Manage members
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <section className="bg-taskmate-purple/10 rounded-lg p-5 mt-8 flex items-start gap-3">
          <Info className="h-7 w-7 text-taskmate-purple flex-shrink-0" />
          <div>
            <div className="font-semibold mb-1">About Teams Management</div>
            <div className="text-sm text-muted-foreground">
              As a Super Admin, you can create and manage teams, assign team leaders, and monitor team performance. 
              You can also assign tasks to team leaders, but direct task assignments to employees should be done by their respective team leaders.
              Use the tabs above to switch between different views of your teams.
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default Teams;
