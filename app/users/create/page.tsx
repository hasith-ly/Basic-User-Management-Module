'use client';
import UserForm from "../../../components/UserForm";
import api from "../../../lib/api";
import { useRouter } from "next/navigation";
import { UserFormValues } from "../../../types/user";
import AddNewNav from "@/components/AddNewNav";

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
      <AddNewNav/>
      <UserForm onSubmit={handleCreate} submitLabel="Create User" />
    </div>
  );
}
