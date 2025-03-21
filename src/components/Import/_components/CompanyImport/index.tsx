import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type Company = {
  id: number;
  name: string;
};

const CompanyImport = () => {
  const [companyData, setCompanyData] = useState<Company[]>([]);
  const [createData, setCreateData] = useState("");

  const fetchCompany = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/select/company`,
        {
          cache: "no-store",
        },
      );

      const data = await res.json();

      setCompanyData(data.leasingCompanyes);
    } catch (error) {
      console.error("Error fetching company:", error);
      setCompanyData([]);
    }
  };

  const handleCreate = async () => {
    try {
      toast.loading("wating...", { id: "1" });
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/select/company`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: createData,
          }),
        },
      );
      if (!res.ok) {
        toast.error("データを追加できませんでした", {
          id: "1",
        });
        throw new Error(`HTTP error! Status: ${res.status}`);
      } else {
        toast.success("データを追加しました", { id: "1" });
        fetchCompany();
        setCreateData("");
      }
    } catch (err) {
      toast.error("データを追加できませんでした", {
        id: "1",
      });
      console.error("Error:", err);
    }
  };

  const handleChange = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedData = companyData.map((item) =>
      item.id === id ? { ...item, name: e.target.value } : item,
    );
    setCompanyData(updatedData);
  };
  const handleEdit = async (id: number) => {
    const editCompayName = companyData.find((item) => item.id == id);
    console.log(id, editCompayName);
    try {
      toast.loading("wating...", { id: "1" });
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/select/company/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            name: editCompayName?.name,
          }),
        },
      );
      if (res.ok) {
        toast.success("データを編集しました", { id: "1" });

        fetchCompany();
        return res.json();
      } else {
        toast.error("データを編集できませんでした", {
          id: "1",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("データを編集できませんでした", { id: "1" });
    }
  };
  const handleDelete = async (id: number) => {
    try {
      toast.loading("waiting...", { id: "1" });
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/select/company/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (res.ok) {
        toast.success("データを削除しました", { id: "1" });
        fetchCompany();
        return res.json();
      } else {
        toast.error("データは使用されているため、削除できませんでした", {
          id: "1",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("データを削除できませんでした", { id: "1" });
    }
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  return companyData.length > 0 ? (
    <>
      <Toaster />
      <div>
        <input
          type="text"
          value={createData}
          onChange={(e) => setCreateData(e.target.value)}
          className=" w-80 mt-8 p-2 border-2 border-primary-700"
        />
        <button
          className="mt-8 p-2 border-2 border-primary-700 bg-primary-700 text-white font-bold"
          onClick={handleCreate}
        >
          ＋
        </button>
      </div>
      <p className="pt-8 font-bold">リース会社データ</p>
      <div className="py-2 flex flex-col">
        {companyData.map((data) => (
          <div key={data.id}>
            <input
              type="text"
              value={data.name}
              onChange={(e) => handleChange(data.id, e)}
              className="border-2 p-2  w-80"
            />
            <button
              className="border-2 p-2"
              onClick={() => handleEdit(data.id)}
            >
              編集
            </button>
            <button
              className="border-2 p-2"
              onClick={() => handleDelete(data.id)}
            >
              削除
            </button>
          </div>
        ))}
      </div>
    </>
  ) : (
    <p>Loading...</p>
  );
};

export default CompanyImport;
