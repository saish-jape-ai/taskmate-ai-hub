
import AppLayout from "@/components/AppLayout";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import { FileText } from "lucide-react";

const EOD = () => {
  const { currentUser } = useAuth();
  const [eod, setEod] = useState("");
  const [loading, setLoading] = useState(false);

  // In production, replace this with real API or db write.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEod("");
      toast({ title: "EOD Submitted", description: "Your End Of Day update has been sent to your manager." });
    }, 800);
  };

  return (
    <AppLayout title="Submit EOD">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-lg shadow p-8">
        <div className="flex items-center gap-3 font-bold text-2xl mb-5">
          <FileText className="h-6 w-6" />
          End Of Day (EOD) Update
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium mb-1">What did you accomplish today?</label>
            <textarea 
              className="w-full border px-3 py-2 rounded min-h-[100px]"
              value={eod}
              onChange={e => setEod(e.target.value)}
              required
              placeholder="Describe your work, blockers, or anything to highlight..."
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-bloom-purple text-white font-semibold rounded py-2 hover:bg-bloom-purple/90"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Send EOD to Manager"}
          </button>
        </form>
      </div>
    </AppLayout>
  );
};

export default EOD;
