import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type CarType = {
  id: number;
  name: string;
};

const CarTypeImport = () => {
  const [carTypeData, setCarTypeData] = useState<CarType[]>([]);
  const [createData, setCreateData] = useState("");

  const fetchCarType = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/select/cartype`,
        {
          cache: "no-store",
        }
      );

      const data = await res.json();
      console.log(data.cartype);

      // data.cartypes が存在するか確認してからセット
      setCarTypeData(data.cartype);
    } catch (error) {
      console.error("Error fetching car types:", error);
      setCarTypeData([]); // エラーが発生した場合も空の配列に設定
    }
  };

  const handleCreate = async () => {
    try {
      console.log(createData);
      toast.loading("wating...", { id: "1" });
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/select/cartype`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: createData,
          }),
        }
      );
      if (!res.ok) {
        toast.error("データを追加できませんでした", {
          id: "1",
        });
        throw new Error(`HTTP error! Status: ${res.status}`);
      } else {
        toast.success("データを追加しました", { id: "1" });
        fetchCarType();
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
    console.log(id, e.target.value);
    const updatedData = carTypeData.map((item) =>
      item.id === id ? { ...item, name: e.target.value } : item
    );
    setCarTypeData(updatedData);
  };
  const handleEdit = async (id: number) => {
    const editCarName = carTypeData.find((item) => item.id == id);
    console.log(id, editCarName);
    try {
      toast.loading("wating...", { id: "1" });
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/select/cartype/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            name: editCarName?.name,
          }),
        }
      );
      if (res.ok) {
        toast.success("データを編集しました", { id: "1" });

        fetchCarType();
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/select/cartype/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        toast.success("データを削除しました", { id: "1" });

        fetchCarType();
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
    fetchCarType();
  }, []);

  return carTypeData.length > 0 ? (
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
      <p className="pt-8 font-bold">車種データ</p>
      <div className="py-2 flex flex-col">
        {carTypeData.map((data) => (
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

export default CarTypeImport;
