
import AppLayout from "@/components/AppLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, UserPlus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AddTeamMember = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Here you would integrate member creation logic (API)
    toast({
      title: "Team member added", 
      description: `${name} has been added to your team.`
    });
    navigate("/team-members");
  }

  return (
    <AppLayout title="Add Team Member">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => navigate('/team-members')}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Add Team Member</h1>
        </div>

        <Card className="p-6">
          <div className="flex items-center justify-center mb-6">
            <div className="h-16 w-16 rounded-full bg-taskmate-purple/20 flex items-center justify-center">
              <UserPlus className="h-8 w-8 text-taskmate-purple" />
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block font-medium mb-1 text-foreground">Name</label>
              <Input
                value={name}
                onChange={e => setName(e.target.value)}
                required
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-foreground">Email Address</label>
              <Input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="Enter email address"
              />
            </div>
            <Button type="submit" className="w-full bg-taskmate-purple hover:bg-taskmate-purple/90">
              Add Member
            </Button>
          </form>
        </Card>
      </div>
    </AppLayout>
  );
};

export default AddTeamMember;
