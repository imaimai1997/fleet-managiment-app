import Sidebar from "../../../components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex h-[calc(100vh-56px)]">
        <div className="basis-1/6">
          <Sidebar />
        </div>
        <div className="basis-5/6">{children}</div>
      </div>
    </>
  );
}
