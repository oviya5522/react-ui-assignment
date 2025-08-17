import { useState } from "react";
import { InputField } from "./components/InputField";
import DataTable from "./components/DataTable";

interface User {
  name: string;
  email: string;
  age: number;
  [key: string]: unknown;
}

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const users: User[] = [
    { id: 1, name: "Alice", email: "alice@example.com", age: 25 },
    { id: 2, name: "jenni", email: "jenni@example.com", age: 30 },
    { id: 3, name: "Charlie", email: "charlie@example.com", age: 22 },
  ];

  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-8">
      <div className="max-w-md mx-auto space-y-4">
        <InputField
          label="Username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          helperText="This is your public username"
          size="md"
          variant="outlined"
          onClear={() => setUsername("")}
        />

        <InputField
          label="Password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          helperText="Use a strong password"
          size="md"
          variant="filled"
          type="password"
          onClear={() => setPassword("")}
        />

        <InputField
          label="Disabled Field"
          placeholder="Can't type here"
          disabled
        />

        <InputField
          label="Invalid Field"
          placeholder="Enter something"
          invalid
          errorMessage="This field is required"
        />
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">User Table</h2>
        <DataTable<User>
          data={users}
          columns={[
            { key: "name", title: "Name", dataIndex: "name", sortable: true },
            { key: "email", title: "Email", dataIndex: "email" },
            { key: "age", title: "Age", dataIndex: "age", sortable: true },
          ]}
          selectable
          rowKey="email"
          onRowSelect={(rows) => setSelectedUsers(rows)}
          loading={false}
        />

        {selectedUsers.length > 0 && (
          <div className="mt-4">
            Selected Users: {selectedUsers.map((user) => user.name).join(", ")}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
