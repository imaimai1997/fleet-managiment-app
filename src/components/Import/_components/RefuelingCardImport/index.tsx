import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import dayjs from "dayjs";

type RefuelingCard = {
  id: number;
  number: string;
  period: Date;
};

const RefuelingCardImport = () => {
  const [refuelingCardData, setRefuelingCardData] = useState<RefuelingCard[]>(
    [],
  );
  const [createNumber, setCreateNumber] = useState("");
  const [createPeriod, setCreatePeriod] = useState("");

  const fetchRefuelingCard = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/select/refueling`,
        {
          cache: "no-store",
        },
      );

      const data = await res.json();

      setRefuelingCardData(data.refueling_cards);
    } catch (error) {
      console.error("Error fetching refuelingCard:", error);
      setRefuelingCardData([]);
    }
  };

  const handleCreate = async () => {
    try {
      if (createNumber == "" || createPeriod == "") {
        toast.error("データを入力してください", {
          id: "1",
        });
        return;
      }
      toast.loading("wating...", { id: "1" });
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/select/refueling`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            number: createNumber,
            period: new Date(createPeriod),
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
        fetchRefuelingCard();
        setCreateNumber("");
        setCreatePeriod("");
      }
    } catch (err) {
      toast.error("データを追加できませんでした", {
        id: "1",
      });
      console.error("Error:", err);
    }
  };

  const handleChangeNumber = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const updatedData = refuelingCardData.map((item) =>
      item.id === id ? { ...item, number: e.target.value } : item,
    );
    setRefuelingCardData(updatedData);
  };
  const handleChangePeriod = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const updatedData = refuelingCardData.map((item) =>
      item.id === id ? { ...item, period: new Date(e.target.value) } : item,
    );
    setRefuelingCardData(updatedData);
  };
  const handleEdit = async (id: number) => {
    const editRefuelingCard = refuelingCardData.find((item) => item.id == id);
    try {
      if (
        editRefuelingCard?.number == "" ||
        editRefuelingCard?.period == null
      ) {
        toast.error("データを入力してください", {
          id: "1",
        });
        return;
      }
      toast.loading("wating...", { id: "1" });
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/select/refueling/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            number: editRefuelingCard?.number,
            period: editRefuelingCard?.period,
          }),
        },
      );
      if (res.ok) {
        toast.success("データを編集しました", { id: "1" });

        fetchRefuelingCard();
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/select/refueling/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (res.ok) {
        toast.success("データを削除しました", { id: "1" });
        fetchRefuelingCard();
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
    fetchRefuelingCard();
  }, []);

  return refuelingCardData.length > 0 ? (
    <>
      <Toaster />
      <div>
        <input
          type="text"
          value={createNumber}
          placeholder="給油カード番号"
          onChange={(e) => setCreateNumber(e.target.value)}
          className=" w-60 mt-8 p-2 border-2 border-primary-700"
        />
        <input
          type="date"
          value={createPeriod}
          placeholder="カード有効期限"
          onChange={(e) => setCreatePeriod(e.target.value)}
          className=" w-40 mt-8 p-2 border-2 border-primary-700"
        />
        <button
          className="mt-8 p-2 border-2 border-primary-700 bg-primary-700 text-white font-bold"
          onClick={handleCreate}
        >
          ＋
        </button>
      </div>
      <p className="pt-8 font-bold">給油カードデータ</p>
      <div className="py-2 flex flex-col">
        {refuelingCardData.map((data) => (
          <div key={data.id}>
            <input
              type="text"
              value={data.number}
              onChange={(e) => handleChangeNumber(data.id, e)}
              className="border-2 p-2  w-60"
            />
            <input
              type="date"
              value={dayjs(data.period).format("YYYY-MM-DD")}
              onChange={(e) => handleChangePeriod(data.id, e)}
              className="border-2 p-2 w-40"
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

export default RefuelingCardImport;
