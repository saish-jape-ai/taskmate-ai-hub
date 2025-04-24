
import { useState, useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import { useAuth } from "@/context/AuthContext";
import { SuperAdminCalendarView } from "@/components/calendar/SuperAdminCalendarView";
import { TeamLeaderCalendarView } from "@/components/calendar/TeamLeaderCalendarView";
import { EmployeeCalendarView } from "@/components/calendar/EmployeeCalendarView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Calendar = () => {
  const { currentUser } = useAuth();
  const [view, setView] = useState<"day" | "week" | "month">("month");
  
  // Ensure user is authenticated
  if (!currentUser) {
    return <div>Loading...</div>;
  }

  // Function to render the appropriate calendar view based on user role
  const renderCalendarView = () => {
    switch (currentUser.role) {
      case "super_admin":
        return <SuperAdminCalendarView view={view} />;
      case "team_leader":
        return <TeamLeaderCalendarView view={view} />;
      case "employee":
        return <EmployeeCalendarView view={view} />;
      default:
        return <div>Invalid user role</div>;
    }
  };

  const handleGenerateAIRecommendations = () => {
    toast.success("Generating AI recommendations...");
    // This would be implemented with a real AI API
    setTimeout(() => {
      toast.success("AI recommendations generated successfully!");
    }, 1500);
  };

  return (
    <AppLayout title="Calendar">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Tabs defaultValue="month" className="w-[300px]" onValueChange={(value) => setView(value as "day" | "week" | "month")}>
            <TabsList>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {currentUser.role !== "employee" && (
            <Button 
              onClick={handleGenerateAIRecommendations}
              className="bg-taskmate-purple hover:bg-taskmate-purple/90"
            >
              Generate AI Recommendations
            </Button>
          )}
        </div>
        
        {renderCalendarView()}
      </div>
    </AppLayout>
  );
};

export default Calendar;
