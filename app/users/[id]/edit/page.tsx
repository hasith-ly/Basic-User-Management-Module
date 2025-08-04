'use client';
import NavBar from "../../../../components/NavBar";
import UserForm from "../../../../components/UserForm";
import api from "../../../../lib/api";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { User, UserFormValues } from "../../../../types/user";

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params?.id as string;
  const [initialValues, setInitialValues] = useState<User | null>(null);

  useEffect(() => {
    if (userId) {
      api.get(`/users/${userId}`).then(res => setInitialValues(res.data));
    }
  }, [userId]);

  const handleUpdate = async (values: UserFormValues) => {
    try {
      await api.put(`/users/${userId}`, values);
      alert('User updated!');
      router.push('/users');
    } catch (err: any) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  if (!initialValues) return <div className="max-w-6xl mx-auto mt-8"><NavBar /><div className="p-6 text-center">Loading...</div></div>;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <NavBar />
      <UserForm initialValues={initialValues} onSubmit={handleUpdate} submitLabel="Update User" />
    </div>
  );
}





// 'use client';
// import { useState } from "react";
// import NavBar from "../../../../components/NavBar";
// import UserForm from "../../../../components/UserForm";
// import { useRouter, useParams } from "next/navigation";
// import { User, UserFormValues } from "../../../../types/user";
// import EditNav from "@/components/EditNav";

// const DUMMY_USER: User = {
//   id: "1",
//   firstName: "Jane",
//   lastName: "Doe",
//   username: "janedoe",
//   email: "jane@example.com",
//   roles: "USER",
//   status: "ACTIVE"
// };

// export default function EditUserPage() {
//   const router = useRouter();
//   // const params = useParams(); // If you want ID awareness

//   // No useEffect! Just hardcode the user.
//   const [user] = useState<User>(DUMMY_USER);

//   const handleUpdate = async (values: UserFormValues) => {
//     alert(JSON.stringify(values, null, 2));
//     // You can also navigate back or show a toast
//     router.push('/users');
//   };

//   return (
//     <div className="max-w-7xl mx-auto">
//       <EditNav />
//       <UserForm initialValues={user} onSubmit={handleUpdate} submitLabel="Update User" />
//     </div>
//   );
// }
