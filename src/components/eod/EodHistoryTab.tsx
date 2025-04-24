
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileText, ChevronDown, ChevronUp, Paperclip, Calendar, Clock, BarChart } from "lucide-react";

// Mock EOD history data
const eodHistory = [
  {
    id: "eod1",
    date: "2025-04-23",
    time: "17:45",
    content: `Based on today's activities, here's a detailed EOD report:

1. Tasks Completed:
- Fixed login page validation bug
- Implemented dashboard analytics charts
- Updated user profile UI components

2. Key Achievements:
- Successfully completed assigned tasks within timeline
- Collaborated effectively with design team on UI components

3. Next Steps:
- Continue working on notification system
- Follow up on pending API integration

4. Blockers/Challenges:
- None reported today`,
    attachments: [
      { name: "dashboard-wireframe.pdf", type: "application/pdf", size: 1200000 },
      { name: "meeting-notes.docx", type: "application/docx", size: 350000 }
    ],
    aiScore: 95,
    aiAnalysis: "Excellent EOD report with detailed task descriptions matching assigned work. Clear next steps and comprehensive reporting."
  },
  {
    id: "eod2",
    date: "2025-04-22",
    time: "18:10",
    content: `Today's EOD update:

1. Tasks Completed:
- Started work on login page fixes
- Research on chart libraries
- Team sync meeting

2. Next Steps:
- Complete login page fixes
- Start implementing dashboard charts

3. Blockers:
- Waiting for design assets from design team`,
    attachments: [],
    aiScore: 82,
    aiAnalysis: "Good report but missing quantitative progress metrics. Task alignment is good but more specific time allocations recommended."
  },
  {
    id: "eod3",
    date: "2025-04-21",
    time: "17:55",
    content: `EOD Report:
- Worked on user research
- Prepared presentation for tomorrow's meeting
- Fixed minor styling issues`,
    attachments: [
      { name: "user-research.xlsx", type: "application/xlsx", size: 580000 }
    ],
    aiScore: 73,
    aiAnalysis: "Brief report lacking detail. Tasks mentioned match assignments but more elaboration on specific progress would improve report quality."
  }
];

interface EodHistoryTabProps {
  userId: string;
}

export const EodHistoryTab = ({ userId }: EodHistoryTabProps) => {
  const [expandedEods, setExpandedEods] = useState<string[]>([eodHistory[0]?.id]);
  
  const toggleExpand = (eodId: string) => {
    setExpandedEods(prev => 
      prev.includes(eodId) 
        ? prev.filter(id => id !== eodId) 
        : [...prev, eodId]
    );
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    if (score >= 75) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
    return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
  };
  
  const getFileSizeDisplay = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    else return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FileText className="h-5 w-5 text-taskmate-purple" />
        EOD Reports History
      </h3>
      
      {eodHistory.length > 0 ? (
        <div className="space-y-4">
          {eodHistory.map((eod) => {
            const isExpanded = expandedEods.includes(eod.id);
            
            return (
              <div key={eod.id} className="border rounded-lg overflow-hidden">
                <div 
                  className="flex justify-between items-center p-4 cursor-pointer hover:bg-muted/50"
                  onClick={() => toggleExpand(eod.id)}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-normal">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(eod.date).toLocaleDateString()}
                      </Badge>
                      <Badge variant="outline" className="font-normal">
                        <Clock className="h-3 w-3 mr-1" />
                        {eod.time}
                      </Badge>
                      <Badge className={getScoreColor(eod.aiScore)}>
                        <BarChart className="h-3 w-3 mr-1" />
                        Score: {eod.aiScore}%
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                
                {isExpanded && (
                  <div className="p-4 border-t bg-muted/20">
                    <div className="whitespace-pre-wrap bg-card p-3 rounded-md text-sm">
                      {eod.content}
                    </div>
                    
                    {eod.attachments.length > 0 && (
                      <div className="mt-4">
                        <div className="text-sm font-medium mb-2 flex items-center gap-1.5">
                          <Paperclip className="h-4 w-4" />
                          Attachments ({eod.attachments.length})
                        </div>
                        <div className="space-y-2">
                          {eod.attachments.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-card rounded border text-sm">
                              <div className="flex items-center space-x-2 overflow-hidden">
                                <FileText className="h-4 w-4 text-taskmate-purple flex-shrink-0" />
                                <div className="truncate">
                                  <p className="font-medium truncate">{file.name}</p>
                                  <p className="text-xs text-muted-foreground">{getFileSizeDisplay(file.size)}</p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">View</Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-4 bg-taskmate-purple/5 p-3 rounded-md border border-taskmate-purple/20">
                      <div className="text-sm font-medium mb-1 flex items-center gap-1.5">
                        <BarChart className="h-4 w-4 text-taskmate-purple" />
                        AI Analysis
                      </div>
                      <p className="text-sm">{eod.aiAnalysis}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <FileText className="h-10 w-10 mx-auto mb-3 opacity-40" />
          <p>No EOD reports found for this employee</p>
        </div>
      )}
    </Card>
  );
};
