'use client';
import NavBar from "../../components/NavBar";
import UserListTable from "../../components/UserListTable";
import { useEffect, useState } from "react";
import api from "../../lib/api";
import { User } from "../../types/user";

export default function UserListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/users')
      .then(res => setUsers(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <NavBar />
      {loading ? (
        <div className="p-6 text-center">Loading...</div>
      ) : (
        <UserListTable users={users} />
      )}
    </div>
  );
}
