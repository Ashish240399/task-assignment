"use client";
import Admin from "@/components/admin/Admin";
import Employee from "@/components/employee/Employee";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedUserRole = localStorage.getItem("user-role");
      setUserRole(storedUserRole);
    }
  }, []);
  console.log(userRole);
  return (
    <div className="w-[100vw] h-[100vh]">
      {userRole == "admin" ? (
        <Admin />
      ) : (
        <div className="flex justify-center items-center h-full w-full">
          <Link href="/login">
            <div className="bg-slate-500 text-white px-5 py-2 rounded">
              Please Login
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
