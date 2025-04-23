
import AppLayout from "@/components/AppLayout";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { FileText, Sparkles, Send, Calendar, Loader2, Paperclip, File, X, FileImage, FileArchive, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const EOD = () => {
  const { currentUser } = useAuth();
  const [eod, setEod] = useState("");
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [todayActivities, setTodayActivities] = useState("");
  const [attachments, setAttachments] = useState<{ name: string; type: string; size: string }[]>([]);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isAiDialogOpen, setIsAiDialogOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // In production, replace with real API call
    setTimeout(() => {
      setLoading(false);
      setEod("");
      toast.success("EOD Submitted! Your update has been sent to your manager.");
      setTodayActivities("");
      setAttachments([]);
    }, 800);
  };

  const generateEOD = async () => {
    if (!todayActivities.trim()) {
      toast.error("Please enter your activities for today");
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
  
  const handleAdvancedAiGeneration = () => {
    if (!aiPrompt.trim()) {
      toast.error("Please enter an AI prompt");
      return;
    }
    
    setGenerating(true);
    setIsAiDialogOpen(false);
    
    // Simulated AI generation with more complex prompt
    setTimeout(() => {
      const generatedEOD = `# End of Day Report - ${new Date().toLocaleDateString()}

## Summary
${aiPrompt}

## Detailed Task Breakdown
${todayActivities.split('\n').map(activity => `- Completed: ${activity}`).join('\n')}

## Achievements
- Delivered all planned tasks on schedule
- Resolved critical issues that were potential blockers
- Collaborated with design team to improve UI components

## Key Metrics
- Tasks completed: ${Math.floor(Math.random() * 5) + 3}
- Hours productive: ${Math.floor(Math.random() * 4) + 5}
- Meetings attended: ${Math.floor(Math.random() * 3) + 1}

## Tomorrow's Plan
- Continue development on current project
- Review feedback from today's submissions
- Prepare for weekly team meeting

## Notes
No major blockers encountered. Project is on track for delivery by the end of sprint.`;

      setEod(generatedEOD);
      setGenerating(false);
      toast.success("Advanced EOD generated successfully!");
    }, 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // Process each file
    const newAttachments = Array.from(files).map(file => {
      // Format file size
      let size = "";
      if (file.size < 1024) {
        size = `${file.size} B`;
      } else if (file.size < 1024 * 1024) {
        size = `${(file.size / 1024).toFixed(1)} KB`;
      } else {
        size = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
      }
      
      return {
        name: file.name,
        type: file.type.split('/')[0],
        size
      };
    });
    
    setAttachments([...attachments, ...newAttachments]);
    toast.success(`${newAttachments.length} file(s) attached`);
    
    // Reset the input value to allow re-upload of the same file
    e.target.value = '';
  };
  
  const removeAttachment = (index: number) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };
  
  const renderFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <FileImage className="h-4 w-4" />;
      case 'application':
        return <FileArchive className="h-4 w-4" />;
      default:
        return <File className="h-4 w-4" />;
    }
  };

  return (
    <AppLayout title="Submit EOD">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-taskmate-purple/10 flex items-center justify-center">
            <FileText className="h-5 w-5 text-taskmate-purple" />
          </div>
          <h1 className="text-2xl font-bold">End Of Day (EOD) Update</h1>
        </div>

        <Tabs defaultValue="simple" className="mb-6">
          <TabsList>
            <TabsTrigger value="simple">Simple EOD</TabsTrigger>
            <TabsTrigger value="ai">AI-Assisted</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="simple">
            <Card>
              <CardHeader>
                <CardTitle>Submit EOD Report</CardTitle>
                <CardDescription>
                  Summarize your work accomplishments for today
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block font-medium mb-2">Your EOD Report</label>
                    <Textarea
                      value={eod}
                      onChange={e => setEod(e.target.value)}
                      required
                      placeholder="Describe your work, achievements, blockers, or anything to highlight..."
                      disabled={loading}
                      className="min-h-[200px]"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="simple-file-upload"
                      className="flex items-center gap-1 px-3 py-1.5 border border-input rounded-md bg-background hover:bg-accent text-sm cursor-pointer"
                    >
                      <Paperclip className="h-4 w-4" />
                      Attach Files
                    </label>
                    <input
                      id="simple-file-upload"
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                    />
                  </div>
                  
                  {attachments.length > 0 && (
                    <div className="border rounded-md p-3 space-y-2">
                      <div className="text-sm font-medium">Attachments ({attachments.length})</div>
                      <div className="space-y-1">
                        {attachments.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-muted/50 rounded-md p-2 text-sm">
                            <div className="flex items-center gap-2">
                              {renderFileIcon(file.type)}
                              <span>{file.name}</span>
                              <span className="text-xs text-muted-foreground">{file.size}</span>
                            </div>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6"
                              onClick={() => removeAttachment(index)}
                            >
                              <X className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <Button
                    type="submit"
                    className="w-full bg-taskmate-purple hover:bg-taskmate-purple/90"
                    disabled={loading || !eod.trim()}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send EOD to Manager
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ai">
            <Card>
              <CardHeader>
                <CardTitle>AI-Assisted EOD</CardTitle>
                <CardDescription>
                  Let AI help you create a professional EOD report
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Step 1: List Your Activities</h3>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="List your activities for today (e.g., 'Worked on dashboard UI', 'Fixed login bug', etc.)"
                      value={todayActivities}
                      onChange={(e) => setTodayActivities(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <div className="flex items-center gap-3">
                      <Button
                        type="button"
                        onClick={generateEOD}
                        disabled={generating}
                        className="bg-taskmate-purple hover:bg-taskmate-purple/90 flex-1"
                      >
                        {generating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Generate Simple EOD
                          </>
                        )}
                      </Button>
                      
                      <Dialog open={isAiDialogOpen} onOpenChange={setIsAiDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            className="border-taskmate-purple/40 hover:bg-taskmate-purple/10"
                          >
                            <Sparkles className="mr-2 h-4 w-4" />
                            Advanced AI
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Advanced AI EOD Generation</DialogTitle>
                            <DialogDescription>
                              Customize your EOD generation with specific instructions
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-2">
                            <div className="space-y-2">
                              <label className="font-medium text-sm">AI Instructions</label>
                              <Textarea
                                placeholder="E.g., 'Include details about the challenges I faced' or 'Focus on accomplishments and metrics'"
                                value={aiPrompt}
                                onChange={(e) => setAiPrompt(e.target.value)}
                                className="min-h-[100px]"
                              />
                            </div>
                            <Button 
                              onClick={handleAdvancedAiGeneration}
                              className="w-full bg-taskmate-purple hover:bg-taskmate-purple/90"
                            >
                              Generate Advanced EOD
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <h3 className="text-lg font-semibold mb-2">Step 2: Review and Submit</h3>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block font-medium mb-2">Your EOD Report</label>
                      <Textarea
                        value={eod}
                        onChange={e => setEod(e.target.value)}
                        required
                        placeholder="AI-generated EOD will appear here..."
                        disabled={loading}
                        className="min-h-[200px]"
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="ai-file-upload"
                        className="flex items-center gap-1 px-3 py-1.5 border border-input rounded-md bg-background hover:bg-accent text-sm cursor-pointer"
                      >
                        <Paperclip className="h-4 w-4" />
                        Attach Files
                      </label>
                      <input
                        id="ai-file-upload"
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                      />
                    </div>
                    
                    {attachments.length > 0 && (
                      <div className="border rounded-md p-3 space-y-2">
                        <div className="text-sm font-medium">Attachments ({attachments.length})</div>
                        <div className="space-y-1">
                          {attachments.map((file, index) => (
                            <div key={index} className="flex items-center justify-between bg-muted/50 rounded-md p-2 text-sm">
                              <div className="flex items-center gap-2">
                                {renderFileIcon(file.type)}
                                <span>{file.name}</span>
                                <span className="text-xs text-muted-foreground">{file.size}</span>
                              </div>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-6 w-6"
                                onClick={() => removeAttachment(index)}
                              >
                                <X className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <Button
                      type="submit"
                      className="w-full bg-taskmate-purple hover:bg-taskmate-purple/90"
                      disabled={loading || !eod.trim()}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send EOD to Manager
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>EOD History</CardTitle>
                <CardDescription>
                  Your previous EOD reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, index) => {
                    const date = new Date();
                    date.setDate(date.getDate() - index);
                    return (
                      <div key={index} className="border rounded-md p-4 hover:border-taskmate-purple/30 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-taskmate-purple" />
                            <span className="font-medium">{date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                          </div>
                          <div className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                            <FileCheck className="h-3 w-3" />
                            Submitted
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          Completed dashboard UI redesign, fixed login authentication issues, reviewed pull requests from team members...
                        </p>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-xs text-muted-foreground">Submitted at 6:45 PM</span>
                          <Button variant="ghost" size="sm" className="text-taskmate-purple hover:bg-taskmate-purple/10">
                            View Details
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default EOD;
