"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { AuthProvider } from "@/context/authContext";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <div className="flex">
        <Sidebar />

        <div className="w-full">
          <Header />
          <div className="h-[calc(100vh-56px)] overflow-y-scroll bg-gray-100">
            <AuthProvider>{children}</AuthProvider>
          </div>
        </div>
      </div>
    </>
  );
};
export default DashboardLayout;
