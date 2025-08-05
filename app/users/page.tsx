'use client';
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import UserListTable from "../../components/UserListTable";
import PaginationBar from "@/components/PaginationBar";
import api from "../../lib/api";
import { User } from "../../types/user";

export default function UserListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0); // Spring Boot pages are 0-indexed
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get('/users', { params: { page, size: 10 } }) // can change page size
      .then(res => {
        setUsers(res.data.content || []);
        setTotalPages(res.data.totalPages || 1);
      })
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div className="max-w-7xl mx-auto">
      <NavBar />
      {loading ? (
        <div className="p-6 text-center">Loading...</div>
      ) : (
        <>
          <UserListTable users={users} />
          <div className="flex justify-end mt-8">
            <PaginationBar
              current={page + 1}
              total={totalPages}
              onPageChange={(newPage) => setPage(newPage - 1)} // convert to 0-index
            />
          </div>
        </>
      )}
    </div>
  );
}
