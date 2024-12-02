import Sidebar from "../../../components/Sidebar";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <div className="flex h-[calc(100vh-56px)]">
        <div className="basis-1/6">
          <Sidebar />
        </div>
        <div className="basis-5/6 h-full overflow-y-scroll">{children}</div>
      </div>
    </>
  );
};
export default RootLayout;
