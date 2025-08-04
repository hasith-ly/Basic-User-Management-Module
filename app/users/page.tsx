'use client';
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import UserListTable from "../../components/UserListTable";
import PaginationBar from "../../components/PaginationBar";
import api from "../../lib/api";
import { User } from "../../types/user";

const PAGE_SIZE = 10; // Adjust as needed

export default function UserListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get("/users", {
      params: {
        page,
        limit: PAGE_SIZE,
      },
    })
      .then(res => {
        setUsers(res.data.users || res.data);   // adapt to your API shape!
        setTotalUsers(res.data.total || res.data.length); // adapt as needed
      })
      .finally(() => setLoading(false));
  }, [page]);

  // Total pages calculation
  const totalPages = Math.ceil(totalUsers / PAGE_SIZE);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <NavBar />
      {loading ? (
        <div className="p-6 text-center">Loading...</div>
      ) : (
        <>
          <UserListTable users={users} />
          <PaginationBar
            current={page}
            total={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}




// 'use client';
// import { useState } from "react";
// import NavBar from "../../components/NavBar";
// import UserListTable from "../../components/UserListTable";
// import PaginationBar from "../../components/PaginationBar";
// import { User } from "../../types/user";

// // Generate 50 dummy users:
// function getFakeUsers(count = 50): User[] {
//   return Array.from({ length: count }).map((_, i) => ({
//     id: `${i + 1}`,
//     firstName: `Test${i + 1}`,
//     lastName: `User${i + 1}`,
//     username: `testuser${i + 1}`,
//     email: `test${i + 1}@demo.com`,
//     roles: (i % 3 === 0 ? "ADMIN" : i % 3 === 1 ? "USER" : "GUEST") as User["roles"],
//     status: i % 2 === 0 ? "ACTIVE" : "INACTIVE"
//   }));
// }

// const PAGE_SIZE = 10;
// const fakeUsers = getFakeUsers(50); // adjust N as you want

// export default function UserListPage() {
//   const [page, setPage] = useState(1);

//   // Simulate pagination
//   const paged = fakeUsers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
//   const totalPages = Math.ceil(fakeUsers.length / PAGE_SIZE);

//   return (
//     <div className="max-w-7xl mx-auto">
//       <NavBar />
//       <UserListTable users={paged} />
//       <PaginationBar current={page} total={totalPages} onPageChange={setPage} />
//     </div>
//   );
// }
