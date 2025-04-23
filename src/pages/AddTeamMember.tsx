
import AppLayout from "@/components/AppLayout";
import { useState } from "react";

const AddTeamMember = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Here you would integrate member creation logic (API)
    alert(`Added member: ${name} (${email})`);
    setName("");
    setEmail("");
  }

  return (
    <AppLayout title="Add Team Member">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-6">Add New Team Member</h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              className="w-full border px-3 py-2 rounded"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Email Address</label>
            <input
              className="w-full border px-3 py-2 rounded"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-taskmate-purple text-white font-semibold rounded py-2 hover:bg-taskmate-purple/90">
            Add Member
          </button>
        </form>
      </div>
    </AppLayout>
  );
};

export default AddTeamMember;
