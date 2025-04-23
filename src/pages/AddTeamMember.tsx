
import AppLayout from "@/components/AppLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, UserPlus, CheckCircle2, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const AddTeamMember = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("employee");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Here you would integrate member creation logic (API)
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Team member added", {
        description: `${name} has been added to your team.`,
        action: {
          label: "View Profile",
          onClick: () => navigate(`/member-profile/new-member-id`)
        }
      });
      navigate("/team-members");
    }, 1500);
  }
  
  // Generate avatar preview when name changes
  const generateAvatar = () => {
    if (name) {
      setPreviewAvatar(`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=9b87f5&color=fff`);
    }
  };

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
          <div className="h-10 w-10 rounded-xl bg-taskmate-purple/10 flex items-center justify-center">
            <UserPlus className="h-5 w-5 text-taskmate-purple" />
          </div>
          <h1 className="text-2xl font-bold">Add Team Member</h1>
        </div>

        <Card className="p-6">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Avatar className="h-20 w-20 border-4 border-taskmate-purple/20">
                {previewAvatar ? (
                  <AvatarImage src={previewAvatar} alt={name || "New member"} />
                ) : (
                  <AvatarFallback className="bg-taskmate-purple/20 text-taskmate-purple text-xl">
                    {name ? name.charAt(0).toUpperCase() : <UserPlus className="h-8 w-8" />}
                  </AvatarFallback>
                )}
              </Avatar>
              {previewAvatar && (
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full border border-border"
                  onClick={() => setPreviewAvatar("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <Input
                  id="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onBlur={generateAvatar}
                  required
                  placeholder="Enter full name"
                  className="pl-9 border-taskmate-purple/25 focus-visible:ring-taskmate-purple"
                />
                <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="Enter email address"
                className="border-taskmate-purple/25 focus-visible:ring-taskmate-purple"
              />
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Enter phone number"
                className="border-taskmate-purple/25 focus-visible:ring-taskmate-purple"
              />
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="role">Role</Label>
              <Select 
                value={role} 
                onValueChange={setRole}
              >
                <SelectTrigger className="border-taskmate-purple/25 focus:ring-taskmate-purple">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employee">Employee</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="contractor">Contractor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Separator className="my-2" />
            
            <div className="flex gap-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/team-members')}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-taskmate-purple hover:bg-taskmate-purple/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Add Member
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </AppLayout>
  );
};

export default AddTeamMember;
