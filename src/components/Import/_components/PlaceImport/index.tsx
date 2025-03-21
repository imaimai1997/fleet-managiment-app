import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type Place = {
  id: number;
  name: string;
};

const PlaceImport = () => {
  const [placeData, setPlaceData] = useState<Place[]>([]);
  const [createData, setCreateData] = useState("");

  const fetchPlace = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/select/place`,
        {
          cache: "no-store",
        },
      );

      const data = await res.json();
      setPlaceData(data.places);
    } catch (error) {
      console.error("Error fetching place:", error);
      setPlaceData([]);
    }
  };

  const handleCreate = async () => {
    try {
      if (createData == "") {
        toast.error("データを入力してください", {
          id: "1",
        });
        return;
      }
      toast.loading("wating...", { id: "1" });
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/select/place`,
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
        fetchPlace();
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
    const updatedData = placeData.map((item) =>
      item.id === id ? { ...item, name: e.target.value } : item,
    );
    setPlaceData(updatedData);
  };
  const handleEdit = async (id: number) => {
    const editPlaceName = placeData.find((item) => item.id == id);
    try {
      if (editPlaceName?.name == "") {
        toast.error("データを入力してください", {
          id: "1",
        });
        return;
      }
      toast.loading("wating...", { id: "1" });
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/select/place/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            name: editPlaceName?.name,
          }),
        },
      );
      if (res.ok) {
        toast.success("データを編集しました", { id: "1" });

        fetchPlace();
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/select/place/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (res.ok) {
        toast.success("データを削除しました", { id: "1" });

        fetchPlace();
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
    fetchPlace();
  }, []);

  return placeData.length > 0 ? (
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
        {placeData.map((data) => (
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

export default PlaceImport;
