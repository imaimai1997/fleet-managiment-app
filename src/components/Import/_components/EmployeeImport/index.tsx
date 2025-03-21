import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type Employee = {
  id: number;
  name: string;
  email: string;
};

const EmployeeImport = () => {
  const [employeeData, setEmployeeData] = useState<Employee[]>([]);
  const [createName, setCreateName] = useState("");
  const [createEmail, setCreateEmail] = useState("");

  const fetchCompany = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/select/employee`,
        {
          cache: "no-store",
        },
      );

      const data = await res.json();

      setEmployeeData(data.employees);
    } catch (error) {
      console.error("Error fetching employee:", error);
      setEmployeeData([]);
    }
  };

  const handleCreate = async () => {
    try {
      if (createName == "" || createEmail == "") {
        toast.error("データを入力してください", {
          id: "1",
        });
        return;
      }
      toast.loading("wating...", { id: "1" });
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/select/employee`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: createName,
            email: createEmail,
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
        setCreateName("");
        setCreateEmail("");
      }
    } catch (err) {
      toast.error("データを追加できませんでした", {
        id: "1",
      });
      console.error("Error:", err);
    }
  };

  const handleChangeName = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const updatedData = employeeData.map((item) =>
      item.id === id ? { ...item, name: e.target.value } : item,
    );
    setEmployeeData(updatedData);
  };
  const handleChangeEmail = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const updatedData = employeeData.map((item) =>
      item.id === id ? { ...item, email: e.target.value } : item,
    );
    setEmployeeData(updatedData);
  };
  const handleEdit = async (id: number) => {
    const editEmployee = employeeData.find((item) => item.id == id);
    try {
      if (editEmployee?.name == "" || editEmployee?.email == "") {
        toast.error("データを入力してください", {
          id: "1",
        });
        return;
      }
      toast.loading("wating...", { id: "1" });
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/select/employee/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            name: editEmployee?.name,
            email: editEmployee?.email,
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/select/employee/${id}`,
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

  return employeeData.length > 0 ? (
    <>
      <Toaster />
      <div>
        <input
          type="text"
          value={createName}
          placeholder="車両管理者名"
          onChange={(e) => setCreateName(e.target.value)}
          className=" w-80 mt-8 p-2 border-2 border-primary-700"
        />
        <input
          type="text"
          value={createEmail}
          placeholder="車両管理者メールアドレス"
          onChange={(e) => setCreateEmail(e.target.value)}
          className=" w-80 mt-8 p-2 border-2 border-primary-700"
        />
        <button
          className="mt-8 p-2 border-2 border-primary-700 bg-primary-700 text-white font-bold"
          onClick={handleCreate}
        >
          ＋
        </button>
      </div>
      <p className="pt-8 font-bold">車両管理者データ</p>
      <div className="py-2 flex flex-col">
        {employeeData.map((data) => (
          <div key={data.id}>
            <input
              type="text"
              value={data.name}
              onChange={(e) => handleChangeName(data.id, e)}
              className="border-2 p-2  w-80"
            />
            <input
              type="text"
              value={data.email}
              onChange={(e) => handleChangeEmail(data.id, e)}
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

export default EmployeeImport;
