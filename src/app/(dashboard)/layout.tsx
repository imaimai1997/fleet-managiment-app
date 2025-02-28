"use client";

import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import { AuthProvider } from "../../context/authContext";

const RootLayout = ({
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
        <div className="w-screen h-full overflow-y-scroll ml-20">
          <AuthProvider>{children}</AuthProvider>
        </div>
      </div>
    </>
  );
};
export default RootLayout;
