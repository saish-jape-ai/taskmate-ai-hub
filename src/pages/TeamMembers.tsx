
import AppLayout from "@/components/AppLayout";
import { Users, Plus, Search, MessageSquare, Eye } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { users } from "@/data/mockData";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

const TeamMembers = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const teamMembers = users.filter(
    (user) => user.teamId === currentUser?.teamId && user.role !== "team_leader"
  );

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout title="Team Members">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Users className="h-7 w-7 text-taskmate-purple" />
            <h1 className="font-bold text-2xl">Team Members</h1>
          </div>
          <Button onClick={() => navigate("/add-team-member")} className="bg-taskmate-purple hover:bg-taskmate-purple/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Team Member
          </Button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-5">
          {filteredMembers.map((member) => (
            <Card key={member.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-12 h-12 rounded-full border-2 border-taskmate-purple"
                  />
                  <div>
                    <div className="font-semibold">{member.name}</div>
                    <div className="text-sm text-muted-foreground">{member.email}</div>
                    <div className="text-xs text-gray-400 capitalize">{member.role.replace('_', ' ')}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => navigate(`/chat/${member.id}`)}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Chat
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigate(`/team-members/${member.id}`)}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default TeamMembers;
