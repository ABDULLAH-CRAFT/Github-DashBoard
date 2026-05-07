import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { User } from "src/api/users";

interface UsersResponse {
  users: User[];
}

const fetchUsers = async (): Promise<UsersResponse> => {
  const res = await fetch("https://dummyjson.com/users");

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
};

const Users = () => {
  const [search, setSearch] = useState("");
  const [selectedGender, setSelectedGender] = useState("All");

  const {
    data,
    isLoading,
    error,
  } = useQuery<UsersResponse, Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60,
  });

  const users = data?.users ?? [];

  const filtered = users.filter((u) => {
    const matchSearch =
      `${u.firstName} ${u.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());

    const matchGender =
      selectedGender === "All" || u.gender === selectedGender;

    return matchSearch && matchGender;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        ⚠️ {error.message}
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* Search */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search users..."
        className="border p-2 rounded"
      />

      {/* Gender filter */}
      <select
        value={selectedGender}
        onChange={(e) => setSelectedGender(e.target.value)}
        className="border p-2 rounded ml-2"
      >
        <option value="All">All</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      {/* Users */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {filtered.map((user) => (
          <div key={user.id} className="border p-3 rounded">
            <p>{user.firstName} {user.lastName}</p>
            <p>{user.email}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Users;