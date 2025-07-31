import Link from "next/link";
import { User } from "../types/user";

interface Props {
  users: User[];
}

export default function UserListTable({ users }: Props) {
  return (
    <div className="bg-white rounded-b-xl shadow px-4 pt-2 pb-6">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">First Name</th>
            <th className="py-2">Last Name</th>
            <th className="py-2">Username</th>
            <th className="py-2">Email</th>
            <th className="py-2">Status</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b last:border-none">
              <td className="py-2">{user.firstName}</td>
              <td className="py-2">{user.lastName}</td>
              <td className="py-2">{user.username}</td>
              <td className="py-2">{user.email}</td>
              <td className="py-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.status === 'ACTIVE' ? 'bg-gray-200 text-gray-900' : 'bg-gray-300 text-gray-600'}`}>
                  {user.status === 'ACTIVE' ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="py-2 flex gap-2 items-center">
                <Link href={`/users/${user.id}/edit`}>
                  <button title="Edit">
                    <svg className="w-5 h-5 text-gray-600 hover:text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 21h4l12-12a2.828 2.828 0 10-4-4L4 17v4z" /></svg>
                  </button>
                </Link>
                <button title="Delete" onClick={() => alert('Soft-delete not implemented yet!')}>
                  <svg className="w-5 h-5 text-gray-600 hover:text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M9 6V4h6v2m2 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" /></svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
