
import { useState, useEffect } from "react";
import { format, isSameDay } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Sparkles, CalendarClock, ArrowUp, ArrowDown, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface DailySummaryProps {
  date: Date;
}

export const DailySummary = ({ date }: DailySummaryProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [tomorrowPlan, setTomorrowPlan] = useState<string | null>(null);
  const [showFullSummary, setShowFullSummary] = useState(false);
  
  const isPast = new Date() > date;
  const isToday = isSameDay(new Date(), date);
  
  // Mock API call to Gemini API for getting summary
  const generateAISummary = async () => {
    setIsLoading(true);
    
    // In a real app, this would be an actual API call to Gemini
    // const apiKey = "AIzaSyCG90NNFEDkEDHHRObPaZb69iNpZlGbWk4"; 
    // const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`...
    
    // Simulate API delay
    setTimeout(() => {
      // Mock response for demo purposes
      if (isPast || isToday) {
        setSummary(`Based on your activities today (${format(date, "MMM d")}), you spent most of your time working on UI research tasks (3.5 hours) and wireframing (2 hours). Your productivity score is 8.2/10, which is 15% higher than your average. You completed 2 tasks and submitted your EOD report on time.`);
        
        if (isToday) {
          setTomorrowPlan(`For tomorrow, priority should be on completing the wireframe revisions (estimated 2 hours) and starting the dashboard UI implementation (estimated 3 hours). Based on your productivity patterns, scheduling focused work between 9-11am would be optimal.`);
        }
      } else {
        // Future date
        setSummary(null);
        setTomorrowPlan(null);
      }
      
      setIsLoading(false);
    }, 1500);
  };
  
  // Generate summary when date changes or on first load
  useEffect(() => {
    if (isPast || isToday) {
      generateAISummary();
    } else {
      setSummary(null);
      setTomorrowPlan(null);
    }
  }, [date]);
  
  const handleRefreshSummary = () => {
    toast.success("Refreshing AI summary...");
    generateAISummary();
  };
  
  if (!isPast && !isToday) {
    return null; // Don't show the summary card for future dates
  }
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-md flex items-center justify-between">
          <div className="flex items-center">
            <Sparkles className="h-4 w-4 mr-2 text-taskmate-purple" />
            <span>AI Insights</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleRefreshSummary}
            disabled={isLoading}
          >
            <span className="text-xs">Refresh</span>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-taskmate-purple"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Today's Summary */}
            {summary && (
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  <Badge variant="outline" className="bg-purple-50 text-purple-800">Daily Summary</Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-800">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    15% Productivity
                  </Badge>
                </div>
                
                <p className="text-sm">
                  {showFullSummary ? summary : `${summary.slice(0, 100)}${summary.length > 100 ? '...' : ''}`}
                </p>
                
                {summary.length > 100 && (
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-xs text-taskmate-purple"
                    onClick={() => setShowFullSummary(!showFullSummary)}
                  >
                    {showFullSummary ? 'Show less' : 'Read more'}
                  </Button>
                )}
              </div>
            )}
            
            {/* Tomorrow's Plan - only show for today */}
            {isToday && tomorrowPlan && (
              <div className="space-y-2 pt-2 border-t">
                <div className="flex items-start gap-2">
                  <CalendarClock className="h-4 w-4 text-taskmate-purple mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">Tomorrow's Plan</h4>
                    <p className="text-sm text-muted-foreground">{tomorrowPlan}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Tips & Insights */}
            <div className="bg-amber-50 dark:bg-amber-950 p-3 rounded-md">
              <div className="flex items-start gap-2">
                <Lightbulb className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm text-amber-800 dark:text-amber-300">Productivity Tip</h4>
                  <p className="text-xs text-amber-700 dark:text-amber-300">
                    Based on your work patterns, your most productive hours are between 9-11 AM. Consider scheduling your most important tasks during this time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
