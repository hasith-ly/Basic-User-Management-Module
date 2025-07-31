import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-[#343E4E]  px-6 py-4 flex items-center justify-between">
      <h1 className="text-white font-bold text-xl">User Management Dashboard</h1>
      <Link href="/users/create">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
          + Add User
        </button>
      </Link>
    </nav>
  );
}
