"use client";
import { createContext, useState } from "react";

export const UserContext = createContext<any>(undefined);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userType, setUserType] = useState<string>("");
  function getUserType(userType: string) {
    setUserType(userType);
  }
  return (
    <UserContext.Provider value={{ userType, getUserType }}>
      {children}
    </UserContext.Provider>
  );
};
