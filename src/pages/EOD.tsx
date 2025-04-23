
import AppLayout from "@/components/AppLayout";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import { FileText, Sparkles, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const EOD = () => {
  const { currentUser } = useAuth();
  const [eod, setEod] = useState("");
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [todayActivities, setTodayActivities] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // In production, replace with real API call
    setTimeout(() => {
      setLoading(false);
      setEod("");
      toast({ 
        title: "EOD Submitted", 
        description: "Your End Of Day update has been sent to your manager." 
      });
      setTodayActivities("");
    }, 800);
  };

  const generateEOD = async () => {
    if (!todayActivities.trim()) {
      toast({ 
        title: "Error", 
        description: "Please enter your activities for today",
        variant: "destructive" 
      });
      return;
    }

    setGenerating(true);
    // Simulated AI generation - replace with actual AI integration
    setTimeout(() => {
      const generatedEOD = `Based on today's activities, here's a detailed EOD report:

1. Tasks Completed:
${todayActivities.split('\n').map(activity => `- ${activity}`).join('\n')}

2. Key Achievements:
- Successfully completed assigned tasks within timeline
- Collaborated effectively with team members

3. Next Steps:
- Continue working on ongoing projects
- Follow up on pending items tomorrow

4. Blockers/Challenges:
- No major blockers encountered today`;

      setEod(generatedEOD);
      setGenerating(false);
    }, 1500);
  };

  return (
    <AppLayout title="Submit EOD">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-taskmate-purple/20 flex items-center justify-center mx-auto">
                <FileText className="h-8 w-8 text-taskmate-purple" />
              </div>
              <h2 className="text-2xl font-bold mt-4">End Of Day (EOD) Update</h2>
              <p className="text-muted-foreground mt-1">Share your daily accomplishments with your team</p>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Generate EOD with AI</h3>
            <div className="space-y-4">
              <Textarea
                placeholder="List your activities for today (e.g., 'Worked on dashboard UI', 'Fixed login bug', etc.)"
                value={todayActivities}
                onChange={(e) => setTodayActivities(e.target.value)}
                className="min-h-[100px]"
              />
              <Button
                type="button"
                onClick={generateEOD}
                disabled={generating}
                className="w-full"
                variant="outline"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                {generating ? "Generating..." : "Generate EOD with AI"}
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-semibold mb-2">Your EOD Report</label>
              <Textarea
                value={eod}
                onChange={e => setEod(e.target.value)}
                required
                placeholder="Describe your work, achievements, blockers, or anything to highlight..."
                disabled={loading}
                className="min-h-[200px]"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-taskmate-purple hover:bg-taskmate-purple/90"
              disabled={loading || !eod.trim()}
            >
              <Send className="mr-2 h-4 w-4" />
              {loading ? "Sending..." : "Send EOD to Manager"}
            </Button>
          </form>
        </Card>
      </div>
    </AppLayout>
  );
};

export default EOD;
