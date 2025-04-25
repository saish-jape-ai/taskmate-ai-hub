import AppLayout from "@/components/AppLayout";
import { ApiKeySettings } from "@/components/settings/ApiKeySettings";

const Settings = () => {
  return (
    <AppLayout title="Settings">
      <div className="max-w-4xl mx-auto space-y-6 p-4">
        <ApiKeySettings />
      </div>
    </AppLayout>
  );
};

export default Settings;
