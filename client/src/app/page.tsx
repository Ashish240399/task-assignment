"use client";
import Admin from "@/components/admin/Admin";
import Employee from "@/components/employee/Employee";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedUserRole = localStorage.getItem("user-role");
      setUserRole(storedUserRole);
    }
  }, []);
  console.log(userRole);
  return <div>{userRole == "admin" ? <Admin /> : <Employee />}</div>;
}
