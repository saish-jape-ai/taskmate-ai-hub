
import AppLayout from "@/components/AppLayout";
import { teams, users } from "@/data/mockData";
import { Users, Info } from "lucide-react";

const Teams = () => {
  return (
    <AppLayout title="Teams">
      <div className="space-y-7">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Users className="h-6 w-6 text-bloom-purple" />
              Teams Management
            </h2>
            <p className="text-muted-foreground mt-1">
              View all project teams, their leaders, members, and key metrics.
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Team Name</th>
                <th className="py-2">Team Leader</th>
                <th className="py-2">Members</th>
                <th className="py-2">Performance (%)</th>
                <th className="py-2">Growth</th>
              </tr>
            </thead>
            <tbody>
              {teams.map(team => {
                const leader = users.find(u => u.id === team.leaderId);
                return (
                  <tr key={team.id} className="border-b hover:bg-bloom-purple/10 transition">
                    <td className="py-2 font-semibold">{team.name}</td>
                    <td className="py-2">
                      {leader ? (
                        <span className="flex items-center gap-2">
                          <img src={leader.avatar} alt={leader.name} className="h-7 w-7 rounded-full" />
                          {leader.name}
                        </span>
                      ) : "--"}
                    </td>
                    <td className="py-2">
                      {team.members.length}
                      <span className="ml-2 text-xs text-muted-foreground">
                        {team.members.map(id => {
                          const user = users.find(u => u.id === id);
                          return user?.name?.split(" ")[0];
                        }).join(", ")}
                      </span>
                    </td>
                    <td className="py-2">{team.performanceScore}%</td>
                    <td className="py-2 text-green-600 font-medium">{team.growth > 0 ? `+${team.growth}` : team.growth}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <section className="bg-bloom-purple/10 rounded-lg p-5 mt-8 flex items-start gap-3">
          <Info className="h-7 w-7 text-bloom-purple flex-shrink-0" />
          <div>
            <div className="font-semibold mb-1">About Teams</div>
            <div className="text-sm text-muted-foreground">
              Each team is led by a Team Leader and consists of multiple members. Super Admins can oversee all teams, check performance,
              and analyze team growth. To add or manage teams, visit Settings or contact your system administrator.
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default Teams;
