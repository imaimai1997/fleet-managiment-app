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
      <Header />

      <div className="flex h-[calc(100vh-56px)]">
        <div>
          <Sidebar />
        </div>
        <div className="w-full h-full overflow-y-scroll bg-gray-100">
          <AuthProvider>{children}</AuthProvider>
        </div>
      </div>
    </>
  );
};
export default DashboardLayout;
