'use client';
import NavBar from "../../../components/NavBar";
import UserForm from "../../../components/UserForm";
import api from "../../../lib/api";
import { useRouter } from "next/navigation";
import { UserFormValues } from "../../../types/user";

export default function CreateUserPage() {
  const router = useRouter();

  const handleCreate = async (values: UserFormValues) => {
    try {
      await api.post('/users', values);
      alert('User created!');
      router.push('/users');
    } catch (err: any) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="max-w-7xl mx-auto ">
      
      <NavBar />
      <UserForm onSubmit={handleCreate} submitLabel="Create User" />
    </div>
  );
}


// 'use client';

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import api from "../../../lib/api";
// import { UserFormValues, UserRole } from "../../../types/user";
// import Link from "next/link";

// export default function CreateUserPage() {
//   const router = useRouter();

//   // Manage roles as button group
//   const [selectedRole, setRole] = useState<UserRole>("USER");

//   // Manage status toggle
//   const [active, setActive] = useState(true);

//   // Form state
//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [errors, setErrors] = useState<{ [k: string]: string }>({});

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm(f => ({ ...f, [e.target.name]: e.target.value }));
//   };

//   function validateForm() {
//     let errs: { [k: string]: string } = {};
//     if (!form.firstName || form.firstName.length < 2 || form.firstName.length > 30) errs.firstName = "First name 2-30 letters";
//     if (!form.lastName || form.lastName.length < 2 || form.lastName.length > 30) errs.lastName = "Last name 2-30 letters";
//     if (!form.username || form.username.length < 4 || form.username.length > 20) errs.username = "Username 4-20 chars";
//     if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Valid email required";
//     if (!form.password || form.password.length < 8) errs.password = "Password min 8 chars";
//     if (!/[A-Z]/.test(form.password)) errs.password = "Must contain an uppercase letter";
//     if (!/\d/.test(form.password)) errs.password = "Must contain a number";
//     if (form.password !== form.confirmPassword) errs.confirmPassword = "Passwords don't match";
//     return errs;
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const errs = validateForm();
//     if (Object.keys(errs).length > 0) {
//       setErrors(errs);
//       return;
//     }
//     setErrors({});
//     try {
//       await api.post("/users", {
//         ...form,
//         roles: selectedRole,
//         status: active ? "ACTIVE" : "INACTIVE",
//       });
//       alert("User created!");
//       router.push("/users");
//     } catch (err: any) {
//       alert("Error: " + (err.response?.data?.message || err.message));
//     }
//   };

//   const handleReset = () => {
//     setForm({
//       firstName: "",
//       lastName: "",
//       username: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     });
//     setRole("USER");
//     setActive(true);
//     setErrors({});
//   };

//   return (
//       <div className="max-w-6xl mx-auto  bg-[#F9F9F9] mt-8 shadow-md rounded-2xl overflow-hidden">
//         {/* Header Bar */}
//         <div className="flex items-center justify-between bg-[#343E4E] p-5">
//           <Link href="/users">
//             <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors">Back To Dashboard</button>
//           </Link>
//           <div className=" px-4 py-2 flex flex-col">
//             <h2 className="text-white font-bold text-xl leading-tight">Add New User</h2>
//             <div className="text-xs text-[#E6E6E6]">Create a new user account</div>
//           </div>
//           <div></div> {/* Empty for symmetry */}
//         </div>

//         {/* Form */}
//         <form className="p-8" onSubmit={handleSubmit}>
//           <div className="mb-6">
//             <h3 className="text-center font-bold text-2xl text-[#212529] mb-1">User Information</h3>
//             <p className="text-center text-sm text-gray-500 mb-4">Fill in the details below to create a new user account</p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* First Column */}
//             <div>
//               {/* First Name */}
//               <label className="block font-semibold mb-1">
//                 First Name <span className="text-red-500">*</span>
//               </label>
//               <input name="firstName" className="input" value={form.firstName} onChange={handleChange} />
//               {errors.firstName && <div className="text-red-500 text-sm">{errors.firstName}</div>}

//               {/* Username */}
//               <label className="block font-semibold mt-4 mb-1">
//                 Username <span className="text-red-500">*</span>
//               </label>
//               <input name="username" className="input" value={form.username} onChange={handleChange} />
//               {errors.username && <div className="text-red-500 text-sm">{errors.username}</div>}

//               {/* Password */}
//               <label className="block font-semibold mt-4 mb-1">
//                 Password <span className="text-red-500">*</span>
//               </label>
//               <input name="password" className="input" type="password" value={form.password} onChange={handleChange} autoComplete="new-password" />
//               {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}

//               {/* Roles */}
//               <label className="block font-semibold mt-4 mb-1">
//                 Roles <span className="text-red-500">*</span>
//               </label>
//               <div className="flex gap-4 mt-1">
//                 {["ADMIN", "USER", "GUEST"].map(role => (
//                   <button type="button" key={role}
//                     className={`font-medium border px-5 py-1.5 rounded-lg ${selectedRole === role ? 'bg-blue-600 text-white border-blue-600' : 'bg-[#f2f4f6] text-gray-900 border-gray-300'} transition`}
//                     onClick={() => setRole(role as UserRole)}
//                   >
//                     {role.charAt(0) + role.slice(1).toLowerCase()}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Second Column */}
//             <div>
//               {/* Last Name */}
//               <label className="block font-semibold mb-1">
//                 Last Name <span className="text-red-500">*</span>
//               </label>
//               <input name="lastName" className="input" value={form.lastName} onChange={handleChange} />
//               {errors.lastName && <div className="text-red-500 text-sm">{errors.lastName}</div>}

//               {/* Email */}
//               <label className="block font-semibold mt-4 mb-1">
//                 Email <span className="text-red-500">*</span>
//               </label>
//               <input name="email" className="input" type="email" value={form.email} onChange={handleChange} />
//               {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}

//               {/* Confirm Password */}
//               <label className="block font-semibold mt-4 mb-1">
//                 Confirm Password <span className="text-red-500">*</span>
//               </label>
//               <input name="confirmPassword" className="input" type="password" value={form.confirmPassword} onChange={handleChange} autoComplete="new-password" />
//               {errors.confirmPassword && <div className="text-red-500 text-sm">{errors.confirmPassword}</div>}

//               {/* Status */}
//               <label className="block font-semibold mt-4 mb-1">
//                 Status <span className="text-red-500">*</span>
//               </label>
//               <div className="flex items-center mt-2">
//                 <button
//                   type="button"
//                   onClick={() => setActive(a => !a)}
//                   className={`relative w-12 h-6 bg-gray-300 rounded-full transition-colors duration-300 focus:outline-none ${active ? 'bg-blue-500' : ''}`}
//                 >
//                   <span className={
//                     `absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ${active ? 'translate-x-6' : ''}`
//                   } />
//                 </button>
//                 <span className="ml-3 text-sm font-semibold">{active ? "Active" : "Inactive"}</span>
//               </div>
//             </div>
//           </div>

//           {/* Button Row */}
//           <div className="flex gap-4 justify-end mt-8">
//             <button
//               type="button"
//               className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold border border-gray-400 hover:bg-gray-300"
//               onClick={handleReset}
//             >
//               Reset Form
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded-lg font-semibold"
//             >
//               Create User
//             </button>
//           </div>
//         </form>
//       </div>
//   );
// }

