import Link from "next/link";

export default function EditNav() {
  return (
    <nav className="bg-[#343E4E]  px-6 py-4 flex items-center justify-between">
        <div className="flex items-center justify-between bg-[#343E4E] p-5">
          <Link href="/users">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-xl text-sm mr-3 shadow">Back</button>
          </Link>
          <div>
            <h2 className="text-white font-bold text-xl leading-tight">Update Details</h2>
            <div className="text-xs text-[#E6E6E6]">Update user account</div>
          </div>
          <div></div> {/* Empty for symmetry */}
        </div>
    </nav>
  );
}
