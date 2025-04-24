
import { useState, useRef } from "react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { FileUp, Mic, FileText, Send, Sparkles, X, PaperclipIcon, File, Volume2 } from "lucide-react";
import { toast } from "sonner";

interface Attachment {
  name: string;
  type: string;
  size: number;
  url: string;
}

interface EODSubmissionModalProps {
  date: Date;
  onClose: () => void;
}

export const EODSubmissionModal = ({ date, onClose }: EODSubmissionModalProps) => {
  const [eodContent, setEodContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [todayActivities, setTodayActivities] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleGenerateEOD = () => {
    if (!todayActivities.trim()) {
      toast.error("Please enter your activities for today");
      return;
    }
    
    setIsGenerating(true);
    
    // In a real app, this would call the Gemini API
    // const apiKey = "AIzaSyCG90NNFEDkEDHHRObPaZb69iNpZlGbWk4";
    // const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`...
    
    // Simulate API delay
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

      setEodContent(generatedEOD);
      setIsGenerating(false);
      toast.success("EOD content generated successfully!");
    }, 1500);
  };
  
  const handleVoiceToText = () => {
    // In a real app, this would use the Web Speech API
    setIsRecording(true);
    
    toast("Listening to your voice input...");
    
    // Simulate voice recording
    setTimeout(() => {
      setIsRecording(false);
      setTodayActivities(prevState => 
        prevState + (prevState ? '\n' : '') + "Completed UI research and wireframe design for the dashboard"
      );
      toast.success("Voice input captured successfully!");
    }, 3000);
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const newAttachments: Attachment[] = [];
    
    Array.from(e.target.files).forEach(file => {
      // Create object URL for preview
      const url = URL.createObjectURL(file);
      
      newAttachments.push({
        name: file.name,
        type: file.type,
        size: file.size,
        url
      });
    });
    
    setAttachments([...attachments, ...newAttachments]);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const removeAttachment = (index: number) => {
    const newAttachments = [...attachments];
    
    // Revoke object URL to avoid memory leaks
    URL.revokeObjectURL(newAttachments[index].url);
    
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };
  
  const getFileSizeDisplay = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    else return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };
  
  const handleSubmitEOD = () => {
    if (!eodContent.trim()) {
      toast.error("Please add content to your EOD report");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call to submit EOD
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("EOD report submitted successfully!");
      onClose();
    }, 1000);
  };
  
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-taskmate-purple" />
            <span>Submit EOD Report - {format(date, "MMMM d, yyyy")}</span>
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="write" className="mt-2">
          <TabsList>
            <TabsTrigger value="write">Write EOD</TabsTrigger>
            <TabsTrigger value="generate">AI Generate</TabsTrigger>
            <TabsTrigger value="voice">Voice Input</TabsTrigger>
          </TabsList>
          
          <TabsContent value="write" className="mt-4 space-y-4">
            <div>
              <Label htmlFor="eod-content">Your EOD Report</Label>
              <Textarea
                id="eod-content"
                placeholder="Describe your work, achievements, and any challenges faced today..."
                className="min-h-[200px] mt-2"
                value={eodContent}
                onChange={(e) => setEodContent(e.target.value)}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="generate" className="mt-4 space-y-4">
            <div>
              <Label htmlFor="activities">List Today's Activities</Label>
              <Textarea
                id="activities"
                placeholder="List your activities for today (e.g., 'Worked on dashboard UI', 'Fixed login bug', etc.), one per line..."
                className="min-h-[120px] mt-2"
                value={todayActivities}
                onChange={(e) => setTodayActivities(e.target.value)}
              />
            </div>
            
            <Button
              onClick={handleGenerateEOD}
              disabled={isGenerating || !todayActivities.trim()}
              className="w-full bg-taskmate-purple hover:bg-taskmate-purple/90"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {isGenerating ? "Generating..." : "Generate EOD with AI"}
            </Button>
            
            {eodContent && (
              <div className="mt-4">
                <Label htmlFor="generated-eod">Generated EOD</Label>
                <Textarea
                  id="generated-eod"
                  className="min-h-[200px] mt-2"
                  value={eodContent}
                  onChange={(e) => setEodContent(e.target.value)}
                />
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="voice" className="mt-4 space-y-4">
            <div className="text-center p-6 border rounded-md bg-gray-50">
              <Button
                onClick={handleVoiceToText}
                disabled={isRecording}
                variant={isRecording ? "destructive" : "outline"}
                size="lg"
                className="h-16 w-16 rounded-full flex items-center justify-center"
              >
                {isRecording ? <X className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
              </Button>
              <p className="mt-3 text-sm">
                {isRecording ? "Recording... Click to stop" : "Click to start speaking"}
              </p>
            </div>
            
            <div>
              <Label htmlFor="voice-activities">Captured Activities</Label>
              <Textarea
                id="voice-activities"
                placeholder="Your spoken activities will appear here..."
                className="min-h-[100px] mt-2"
                value={todayActivities}
                onChange={(e) => setTodayActivities(e.target.value)}
              />
            </div>
            
            {todayActivities && (
              <Button
                onClick={handleGenerateEOD}
                disabled={isGenerating}
                className="w-full"
              >
                <FileText className="mr-2 h-4 w-4" />
                Convert to EOD
              </Button>
            )}
            
            {eodContent && (
              <div className="mt-4">
                <Label htmlFor="voice-generated-eod">Generated EOD</Label>
                <Textarea
                  id="voice-generated-eod"
                  className="min-h-[200px] mt-2"
                  value={eodContent}
                  onChange={(e) => setEodContent(e.target.value)}
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <Separator className="my-4" />
        
        {/* Attachments Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Attachments</Label>
            <Button 
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <PaperclipIcon className="mr-2 h-4 w-4" />
              Add Files
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt,.xls,.xlsx"
            />
          </div>
          
          {attachments.length > 0 ? (
            <div className="space-y-2 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
              {attachments.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded border">
                  <div className="flex items-center space-x-3">
                    <File className="h-5 w-5 text-taskmate-purple" />
                    <div>
                      <p className="text-sm font-medium truncate max-w-xs">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{getFileSizeDisplay(file.size)}</p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => removeAttachment(index)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-dashed rounded-md p-6 text-center">
              <FileUp className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Drag and drop files here or click "Add Files" to attach supporting documents
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Supported formats: PDF, Word, Excel, Images
              </p>
            </div>
          )}
        </div>
        
        {/* AI Suggestions Card */}
        <Card className="p-3 mt-4 bg-blue-50 border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-taskmate-purple" />
            <h4 className="text-sm font-medium text-blue-700">AI Suggestions</h4>
          </div>
          <p className="text-xs text-blue-700">
            Your EOD is well-structured. Consider adding more details about the challenges 
            you faced with the user research task and how you overcame them.
          </p>
        </Card>
        
        <DialogFooter className="flex items-center justify-between mt-4">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitEOD}
              disabled={isSubmitting || !eodContent.trim()}
              className="bg-taskmate-purple hover:bg-taskmate-purple/90"
            >
              <Send className="mr-2 h-4 w-4" />
              {isSubmitting ? "Submitting..." : "Submit EOD"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
