import { useState } from "react";
import { User, UserFormValues, UserRole } from "../types/user";

interface Props {
  initialValues?: Partial<User>;
  onSubmit: (values: UserFormValues) => void;
  submitLabel: string;
}

export default function UserForm({ initialValues = {}, onSubmit, submitLabel }: Props) {
  // State for role and status UI
  const [roles, setRoles] = useState<UserRole>(initialValues.roles || "USER");
  const [status, setStatus] = useState(initialValues.status === "INACTIVE" ? false : true);

  // Manual field states for more control
  const [form, setForm] = useState({
    firstName: initialValues.firstName || "",
    lastName: initialValues.lastName || "",
    username: initialValues.username || "",
    email: initialValues.email || "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  // Handlers
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }
  function validate() {
    let e: { [k: string]: string } = {};
    if (!form.firstName || form.firstName.length < 2 || form.firstName.length > 30) e.firstName = "2-30 letters";
    if (!form.lastName || form.lastName.length < 2 || form.lastName.length > 30) e.lastName = "2-30 letters";
    if (!form.username || form.username.length < 4 || form.username.length > 20) e.username = "4-20 chars";
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) e.email = "valid email required";
    if (!form.password || form.password.length < 8) e.password = "Min 8 chars";
    if (!/[A-Z]/.test(form.password)) e.password = "Must have uppercase";
    if (!/\d/.test(form.password)) e.password = "Must have number";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords don't match";
    return e;
  }
  function handleReset() {
    setForm({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setRoles("USER");
    setStatus(true);
    setErrors({});
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const eObj = validate();
    setErrors(eObj);
    if (Object.keys(eObj).length === 0) {
      onSubmit({
        firstName: form.firstName,
        lastName: form.lastName,
        username: form.username,
        password: form.password,
        email: form.email,
        roles,
        status: status ? "ACTIVE" : "INACTIVE",
      });
    }
  }

  return (
    <form className="bg-white rounded-xl shadow p-8 w-full max-w-6xl mx-auto mt-8"
      onSubmit={handleSubmit}>
      {/* Grid for two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Col */}
        <div>
          {/* First Name */}
          <label className="font-semibold mb-1 block">
            First Name <span className="text-red-500">*</span>
          </label>
          <input name="firstName" className="input" value={form.firstName} onChange={handleChange} />
          {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName}</span>}

          {/* Username */}
          <label className="font-semibold mb-1 mt-4 block">
            Username <span className="text-red-500">*</span>
          </label>
          <input name="username" className="input" value={form.username} onChange={handleChange} />
          {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}

          {/* Password */}
          <label className="font-semibold mb-1 mt-4 block">
            Password <span className="text-red-500">*</span>
          </label>
          <input name="password" className="input" type="password" value={form.password} onChange={handleChange} autoComplete="new-password" />
          {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}

          {/* Roles */}
          <label className="font-semibold mb-1 mt-4 block">
            Roles <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-3 mt-1">
            {(["ADMIN", "USER", "GUEST"] as const).map((role) => (
              <button
                key={role}
                type="button"
                className={`px-5 py-2 rounded-lg font-semibold border 
                  ${roles === role ? "bg-blue-600 text-white border-blue-600" : "bg-gray-100 border-gray-300 text-gray-900"} 
                  shadow-sm transition`}
                onClick={() => setRoles(role)}
              >
                {role.charAt(0) + role.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Right Col */}
        <div>
          {/* Last Name */}
          <label className="font-semibold mb-1 block">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input name="lastName" className="input" value={form.lastName} onChange={handleChange} />
          {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}

          {/* Email */}
          <label className="font-semibold mb-1 mt-4 block">
            Email <span className="text-red-500">*</span>
          </label>
          <input name="email" className="input" value={form.email} onChange={handleChange} />
          {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}

          {/* Confirm Password */}
          <label className="font-semibold mb-1 mt-4 block">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <input name="confirmPassword" className="input" type="password" value={form.confirmPassword} onChange={handleChange} autoComplete="new-password" />
          {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}

          {/* Status */}
          <label className="font-semibold mb-1 mt-4 block">
            Status <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center mt-2">
            <button
              type="button"
              aria-label="Toggle status"
              onClick={() => setStatus(s => !s)}
              className={`w-12 h-6 rounded-full border transition-colors duration-300 ${status ? "bg-blue-500 border-blue-500" : "bg-gray-300 border-gray-300"}`}
            >
              <span className={
                `block w-5 h-5 rounded-full bg-white border border-gray-400 shadow transform transition-transform duration-300 ${status ? "translate-x-6" : ""}`
              } />
            </button>
            <span className="ml-3 font-medium">{status ? "Active" : "Inactive"}</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-10">
        <button type="button"
          onClick={handleReset}
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold border border-gray-400 hover:bg-gray-300">
          Reset Form
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded-lg font-semibold"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

/* In your globals.css, ensure:
.input {
  @apply border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-300;
}
*/
