
import AppLayout from "@/components/AppLayout";
import { Users } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { users } from "@/data/mockData";

const TeamMembers = () => {
  const { currentUser } = useAuth();
  const teamMembers = users.filter(
    (user) => user.teamId === currentUser?.teamId && user.role !== "team_leader"
  );

  return (
    <AppLayout title="Team Members">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 font-bold text-2xl mb-7">
          <Users className="h-7 w-7" />
          Team Members
        </div>
        <ul className="space-y-5">
          {teamMembers.map((member) => (
            <li key={member.id} className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 flex items-center gap-4">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-12 h-12 rounded-full border-2 border-bloom-purple"
              />
              <div>
                <div className="font-semibold">{member.name}</div>
                <div className="text-sm text-muted-foreground">{member.email}</div>
                <div className="text-xs text-gray-400 capitalize">{member.role.replace('_', ' ')}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AppLayout>
  );
};

export default TeamMembers;
