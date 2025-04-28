
import AppLayout from "@/components/AppLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Check, Users, ArrowLeft, Eye, EyeOff } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { users } from "@/data/mockData";

const CreateTeam = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [selectedLeader, setSelectedLeader] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [description, setDescription] = useState("");
  const [leaderPassword, setLeaderPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Filter users with role team_leader
  const availableLeaders = users.filter(user => user.role === "team_leader");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!teamName.trim() || !selectedLeader || !leaderPassword) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Team created",
        description: `Team "${teamName}" has been created successfully`,
      });
      setLoading(false);
      navigate("/teams");
    }, 1000);
  };

  return (
    <AppLayout title="Create New Team">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => navigate('/teams')}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6 text-taskmate-purple" />
            Create New Team
          </h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Team Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="team-name">Team Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="team-name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Enter team name"
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="team-leader">Team Leader <span className="text-red-500">*</span></Label>
                  <Select
                    value={selectedLeader}
                    onValueChange={setSelectedLeader}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select a team leader" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableLeaders.map((leader) => (
                        <SelectItem key={leader.id} value={leader.id} className="flex items-center">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={leader.avatar} />
                              <AvatarFallback>{leader.name[0]}</AvatarFallback>
                            </Avatar>
                            <span>{leader.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="leader-password">Team Leader Password <span className="text-red-500">*</span></Label>
                  <div className="relative mt-1">
                    <Input
                      id="leader-password"
                      type={showPassword ? "text" : "password"}
                      value={leaderPassword}
                      onChange={(e) => setLeaderPassword(e.target.value)}
                      placeholder="Enter password for team leader"
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="technologies">Technologies & Skills</Label>
                  <Textarea
                    id="technologies"
                    value={technologies}
                    onChange={(e) => setTechnologies(e.target.value)}
                    placeholder="Enter technologies used by the team (e.g., React, Node.js, TypeScript)"
                    className="min-h-[80px] mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Team Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter a brief description about the team's purpose and goals"
                    className="min-h-[100px] mt-1"
                  />
                </div>
              </div>
              
              <div className="pt-4 flex justify-end space-x-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/teams')}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-taskmate-purple hover:bg-taskmate-purple/90"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Team"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default CreateTeam;
