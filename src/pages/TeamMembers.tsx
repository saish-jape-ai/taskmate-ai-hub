
import AppLayout from "@/components/AppLayout";
import { Users, Plus, Search, MessageSquare, Eye, Filter, GridIcon, LayoutList } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { users } from "@/data/mockData";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

const TeamMembers = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [filterRole, setFilterRole] = useState<string>("all");

  const teamMembers = users.filter(
    (user) => user.teamId === currentUser?.teamId && user.role !== "team_leader"
  );

  const filteredMembers = teamMembers.filter(
    (member) => {
      // First apply text search
      const matchesSearch = 
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Then apply role filter
      const matchesRole = filterRole === "all" || member.role === filterRole;
      
      return matchesSearch && matchesRole;
    }
  );

  const handleAddMember = () => {
    navigate("/add-team-member");
  };

  const handleViewProfile = (memberId: string) => {
    navigate(`/member-profile/${memberId}`);
  };

  const handleChatWithMember = (memberId: string) => {
    navigate(`/chat/${memberId}`);
  };
  
  // Random performance data for demo
  const getRandomPerformance = () => {
    return Math.floor(Math.random() * 20) + 80; // 80-100%
  };
  
  // Random last active time for demo
  const getRandomLastActive = () => {
    const hours = Math.floor(Math.random() * 5);
    return hours === 0 ? 'Online now' : `${hours}h ago`;
  };

  return (
    <AppLayout title="Team Members">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-taskmate-purple/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-taskmate-purple" />
            </div>
            <h1 className="font-bold text-2xl">Team Members</h1>
          </div>
          <Button onClick={handleAddMember} className="bg-taskmate-purple hover:bg-taskmate-purple/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Team Member
          </Button>
        </div>

        <div className="bg-white dark:bg-card rounded-lg p-4 mb-6 border border-border">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <TabsList>
                  <TabsTrigger value="all">All Members</TabsTrigger>
                  <TabsTrigger value="active">Active Now</TabsTrigger>
                  <TabsTrigger value="new">Recently Added</TabsTrigger>
                </TabsList>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center border rounded-md overflow-hidden">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className={`rounded-none h-9 w-9 ${viewType === 'grid' ? 'bg-muted' : ''}`}
                    onClick={() => setViewType('grid')}
                  >
                    <GridIcon className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className={`rounded-none h-9 w-9 ${viewType === 'list' ? 'bg-muted' : ''}`}
                    onClick={() => setViewType('list')}
                  >
                    <LayoutList className="h-4 w-4" />
                  </Button>
                </div>
                
                <Select value={filterRole} onValueChange={setFilterRole}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="employee">Employee</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="relative flex-1 mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search members by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <TabsContent value="all">
              <div className={viewType === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}>
                {filteredMembers.map((member) => (
                  viewType === 'grid' ? (
                    // Grid View
                    <Card key={member.id} className="overflow-hidden">
                      <div className="pt-6 px-6 text-center">
                        <div className="relative mx-auto mb-4">
                          <img
                            src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=9b87f5&color=fff`}
                            alt={member.name}
                            className="w-24 h-24 rounded-full border-4 border-taskmate-purple/20 object-cover mx-auto"
                          />
                          <div className="absolute bottom-0 right-[32%] w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <h3 className="font-semibold text-lg">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                        <div className="mt-2 flex items-center justify-center gap-2">
                          <Badge variant="outline" className="text-xs capitalize border-taskmate-purple/20 bg-taskmate-purple/5">
                            {member.role.replace('_', ' ')}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-900/20 dark:text-amber-400">
                            {getRandomLastActive()}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="px-6 py-4 mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm">Performance</span>
                          <span className="text-sm font-medium">{getRandomPerformance()}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                          <div 
                            className="bg-taskmate-purple h-1.5 rounded-full" 
                            style={{ width: `${getRandomPerformance()}%` }}
                          ></div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mt-4">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleChatWithMember(member.id)}
                            className="border-taskmate-purple/25 hover:bg-taskmate-purple/5"
                          >
                            <MessageSquare className="h-4 w-4 mr-1 text-taskmate-purple" />
                            Chat
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleViewProfile(member.id)}
                            className="border-taskmate-purple/25 hover:bg-taskmate-purple/5"
                          >
                            <Eye className="h-4 w-4 mr-1 text-taskmate-purple" />
                            Profile
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ) : (
                    // List View
                    <Card key={member.id} className="p-4 bg-white dark:bg-card hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img
                              src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=9b87f5&color=fff`}
                              alt={member.name}
                              className="w-12 h-12 rounded-full border-2 border-taskmate-purple/20 object-cover"
                            />
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">{member.name}</div>
                            <div className="text-sm text-muted-foreground">{member.email}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs capitalize border-taskmate-purple/20 bg-taskmate-purple/5">
                                {member.role.replace('_', ' ')}
                              </Badge>
                              <Badge variant="outline" className="text-xs border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-900/20 dark:text-amber-400">
                                {getRandomLastActive()}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="hidden md:flex items-center gap-2">
                          <div className="mr-8">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-muted-foreground">Performance</span>
                              <span className="text-xs font-medium">{getRandomPerformance()}%</span>
                            </div>
                            <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                              <div 
                                className="bg-taskmate-purple h-1.5 rounded-full" 
                                style={{ width: `${getRandomPerformance()}%` }}
                              ></div>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleChatWithMember(member.id)}
                            className="border-taskmate-purple/25 hover:bg-taskmate-purple/5"
                          >
                            <MessageSquare className="h-4 w-4 mr-1 text-taskmate-purple" />
                            Chat
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleViewProfile(member.id)}
                            className="border-taskmate-purple/25 hover:bg-taskmate-purple/5"
                          >
                            <Eye className="h-4 w-4 mr-1 text-taskmate-purple" />
                            Profile
                          </Button>
                        </div>
                        <div className="md:hidden">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => handleViewProfile(member.id)}
                            className="h-8 w-8 border-taskmate-purple/25 hover:bg-taskmate-purple/5"
                          >
                            <Eye className="h-4 w-4 text-taskmate-purple" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  )
                ))}
              </div>
              
              {filteredMembers.length === 0 && (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-30" />
                  <h3 className="text-lg font-medium mb-1">No team members found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="active">
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-30" />
                <h3 className="text-lg font-medium mb-1">Active members view</h3>
                <p className="text-muted-foreground">
                  View only currently active team members
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="new">
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-30" />
                <h3 className="text-lg font-medium mb-1">Recently added members</h3>
                <p className="text-muted-foreground">
                  View team members who joined recently
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
};

export default TeamMembers;
