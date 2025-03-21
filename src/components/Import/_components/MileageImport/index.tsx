import React, { useRef, useState } from "react";
import { CiImport } from "react-icons/ci";
import Papa from "papaparse";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import Dropzone from "react-dropzone";
import ImportButton from "../../../ImportButton";
import ImportSubButton from "../../../ImportSubButton";
import Modal from "../../../Modal";
import { RxDoubleArrowDown } from "react-icons/rx";

type CsvRow = {
  usageDate: string;
  carNumber: string;
  mileage: number;
};

type CsvRowRaw = {
  走行開始: string;
  車両名: string;
  "走行距離(km)": number;
};

type label = {
  label: string;
};

//走行距離csv取込
const fileParser = (file: File): Promise<CsvRow[]> => {
  const sumData: Record<string, CsvRow> = {};

  return new Promise((resolve, reject) => {
    Papa.parse<CsvRowRaw>(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => {
        try {
          results.data.forEach((row) => {
            const usageDate = row["走行開始"];
            const carNumber = row["車両名"];
            const mileage = row["走行距離(km)"];

            const yearMonth = dayjs(usageDate).format("YYYY-MM");
            const key = `${yearMonth}-${carNumber}`;

            if (sumData[key]) {
              sumData[key].mileage += mileage;
            } else {
              sumData[key] = {
                usageDate: yearMonth,
                carNumber,
                mileage,
              };
            }
          });
          resolve(Object.values(sumData));
          console.log(Object.values(sumData));
        } catch (error) {
          reject(error); // エラーを reject
        }
      },
      error: () => {
        reject(new Error("csv parse err"));
      },
    });
  });
};

const fetchCarLabel = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/fee/mileage`,
    {
      cache: "no-store",
    },
  );
  const data = await res.json();
  return data.cars;
};

// csvデータの車両番号を正式な車両番号に書き換え
const changeLabel = async (data: CsvRow[]) => {
  const labelData = await fetchCarLabel();
  const updatedData = data.map((car) => {
    const changelabel = labelData.find((item: label) =>
      item.label.includes(car.carNumber.split(" ")[0]),
    );
    return changelabel ? { ...car, carNumber: changelabel.label } : car;
  });
  return updatedData;
};

const MileageImport = () => {
  const [parsedData, setParsedData] = useState<CsvRow[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleImport = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toast.loading("waiting...", { id: "1" });
    if (parsedData.length === 0) {
      toast.error("データがありません。ファイルを選択してください", {
        id: "1",
      });
      return;
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/fee/mileage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parsedData),
        },
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      toast.success("走行距離が登録されました", { id: "1" });
    } catch (err) {
      console.error("Error:", err);
      toast.error("走行距離の登録がうまくいきませんでした。", { id: "1" });
    }
  };

  const fileRef = useRef<HTMLInputElement>(null);
  const showFolder = (
    e: React.MouseEvent<HTMLButtonElement>,
    ref: React.RefObject<HTMLInputElement>,
  ) => {
    e.preventDefault();
    ref.current?.click();
  };

  const handleDragFileParser = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (file) {
      try {
        const data = await fileParser(file);
        setParsedData(data);
        setFileName(file.name);
      } catch (error) {
        toast.error("csvが読み取れません。データが間違っているようです", {
          id: "1",
        });
        console.error("Error parsing file:", error);
      }
    }
  };
  const handleFileParser = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      toast.loading("waiting...", { id: "1" });

      try {
        const data = await fileParser(file);
        const updateData = await changeLabel(data);
        setParsedData(updateData);
        setFileName(file.name);
        toast.success("データを読み込みました。取込ボタンを押してください", {
          id: "1",
        });
      } catch (error) {
        toast.error("csvが読み取れません。データが間違っているようです", {
          id: "1",
        });
        console.error("Error parsing file:", error);
      }
    }
  };
  const handleClear = () => {
    setParsedData([]);
    setFileName("");
  };
  return (
    <>
      <Modal
        open={isModalOpen}
        name="走行距離csv取込ルール"
        onCancel={() => setIsModalOpen(false)}
      >
        <table className="text-left border-2">
          <thead className="[&_th]:border-2 border-white">
            <tr>
              <th scope="col" className=" bg-gray-400 px-6 py-3 min-w-[150px]">
                項目名
              </th>
              <th scope="col" className=" bg-gray-400 px-6 py-3 min-w-[200px]">
                説明
              </th>
              <th scope="col" className=" bg-gray-400 px-6 py-3 min-w-[120px]">
                必須有無
              </th>
              <th scope="col" className=" bg-gray-400 px-6 py-3 min-w-[200px]">
                入力ルール
              </th>
            </tr>
          </thead>
          <tbody className="[&_th]:border-2 [&_td]:border-2 [&_td]:px-6 [&_td]:py-2 [&_th]:text-sm [&_td]:text-sm">
            <tr>
              <th scope="row" className="px-6 py-2 border-2">
                走行開始
              </th>
              <td>走行日付</td>
              <td>必須</td>
              <td>日付形式。20XX/XX/XX</td>
            </tr>
            <tr>
              <th scope="row" className="px-6 py-2">
                車両名
              </th>
              <td>車両番号</td>
              <td>必須</td>
              <td>半角数字。登録されている番号しか取り込めません</td>
            </tr>
            <tr>
              <th scope="row" className="px-6 py-2">
                走行距離(km)
              </th>
              <td>走行距離</td>
              <td>必須</td>
              <td>半角数字</td>
            </tr>
          </tbody>
        </table>
      </Modal>
      <button
        className=" mt-4 text-primary-700 font-semibold flex items-center"
        onClick={() => setIsModalOpen(true)}
      >
        csv入力ルール
        <RxDoubleArrowDown />
      </button>
      <Dropzone onDrop={(acceptedFiles) => handleDragFileParser(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className="w-1/2 h-40 flex flex-col justify-center items-center bg-gray-200 border-2 border-primary-700"
          >
            <input
              {...getInputProps()}
              type="file"
              ref={fileRef}
              className="hidden"
              onChange={handleFileParser}
            />
            {fileName ? (
              <button
                className="w-full h-full text-gray-700 font-bold"
                onClick={(e) => showFolder(e, fileRef)}
              >
                選択ファイル ： 【 {fileName} 】
              </button>
            ) : (
              <button
                className="w-full h-full text-gray-700 font-bold"
                onClick={(e) => showFolder(e, fileRef)}
              >
                ここにcsvをドラッグ＆ドロップ　またはクリックしてファイルを選択
                <CiImport size={36} className="mx-auto" />
              </button>
            )}
          </div>
        )}
      </Dropzone>
      <div className="my-8">
        {fileName ? (
          <ImportButton name="走行距離取込" onClick={handleImport} />
        ) : (
          <ImportSubButton name="走行距離取込" />
        )}
        {fileName && <ImportButton name="クリア" onClick={handleClear} />}
      </div>
    </>
  );
};

export default MileageImport;
