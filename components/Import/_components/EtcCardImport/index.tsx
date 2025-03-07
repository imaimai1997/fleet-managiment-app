import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import dayjs from "dayjs";

type EtcCard = {
  id: number;
  number: string;
  name: string;
  period: Date;
};

const EtcCardImport = () => {
  const [etcCardData, setEtcCardData] = useState<EtcCard[]>([]);
  const [createName, setCreateName] = useState("");
  const [createNumber, setCreateNumber] = useState("");
  const [createPeriod, setCreatePeriod] = useState("");

  const fetchEtcCard = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/select/etc`,
        {
          cache: "no-store",
        }
      );

      const data = await res.json();

      setEtcCardData(data.etc_cards);
    } catch (error) {
      console.error("Error fetching etcCard:", error);
      setEtcCardData([]);
    }
  };

  const handleCreate = async () => {
    try {
      toast.loading("wating...", { id: "1" });
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/select/etc`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: createName,
            number: createNumber,
            period: new Date(createPeriod),
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
        fetchEtcCard();
        setCreateName("");
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

  const handleChangeName = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedData = etcCardData.map((item) =>
      item.id === id ? { ...item, name: e.target.value } : item
    );
    setEtcCardData(updatedData);
  };
  const handleChangeNumber = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedData = etcCardData.map((item) =>
      item.id === id ? { ...item, number: e.target.value } : item
    );
    setEtcCardData(updatedData);
  };
  const handleChangePeriod = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedData = etcCardData.map((item) =>
      item.id === id ? { ...item, period: new Date(e.target.value) } : item
    );
    setEtcCardData(updatedData);
  };
  const handleEdit = async (id: number) => {
    const editEtcCard = etcCardData.find((item) => item.id == id);
    console.log(id, editEtcCard);
    try {
      toast.loading("wating...", { id: "1" });
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/select/etc/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            name: editEtcCard?.name,
            number: editEtcCard?.number,
            period: editEtcCard?.period,
          }),
        }
      );
      if (res.ok) {
        toast.success("データを編集しました", { id: "1" });

        fetchEtcCard();
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/select/etc/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        toast.success("データを削除しました", { id: "1" });
        fetchEtcCard();
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
    fetchEtcCard();
  }, []);

  return etcCardData.length > 0 ? (
    <>
      <Toaster />
      <div>
        <input
          type="text"
          value={createName}
          placeholder="ETCカード名"
          onChange={(e) => setCreateName(e.target.value)}
          className=" w-60 mt-8 p-2 border-2 border-primary-700"
        />
        <input
          type="text"
          value={createNumber}
          placeholder="ETCカード番号"
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
      <p className="pt-8 font-bold">ETCカードデータ</p>
      <div className="py-2 flex flex-col">
        {etcCardData.map((data) => (
          <div key={data.id}>
            <input
              type="text"
              value={data.name}
              onChange={(e) => handleChangeName(data.id, e)}
              className="border-2 p-2  w-60"
            />
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

export default EtcCardImport;
