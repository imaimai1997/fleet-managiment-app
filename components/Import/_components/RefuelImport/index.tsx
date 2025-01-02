import React, { useRef, useState } from "react";
import { RxUpload } from "react-icons/rx";
import { CiImport } from "react-icons/ci";
import PrimaryButton from "../../../PrimaryButton";
import Papa from "papaparse";
import toast from "react-hot-toast";

type CsvRow = {
  利用日変換: string; // 日付列
  カード番号: number;
  合計: number; // 合計金額
};

//給油料金csv取込
const fileParser = (file: File): Promise<CsvRow[]> => {
  const sumData: Record<string, CsvRow> = {};
  return new Promise((resolve, reject) => {
    Papa.parse<CsvRow>(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => {
        try {
          results.data.forEach((row) => {
            const yearMonth = new Date(row["利用日変換"])
              .toISOString()
              .slice(0, 7);
            const key = `${yearMonth}-${row["カード番号"]}`;

            if (sumData[key]) {
              sumData[key].合計 += row["合計"];
            } else {
              sumData[key] = {
                カード番号: row["カード番号"],
                利用日変換: yearMonth,
                合計: row["合計"],
              };
            }
          });

          resolve(Object.values(sumData));
          // resolve(results?.data);
          console.log(results?.data);
          // const data =  Object.values(sumData);
          // return data;
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

const FeeImport = () => {
  const [parsedData, setParsedData] = useState<CsvRow[]>([]);
  const handleImport = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (parsedData.length === 0) {
      toast.error("データがありません。ファイルを選択してください", {
        id: "1",
      });
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/api/fee/refueling", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      toast.success("給油料金が登録されました", { id: "1" });
    } catch (err) {
      console.error("Error:", err);
      toast.error("給油料金の登録がうまくいきませんでした。", { id: "1" });
    }
  };

  const fileRef = useRef<HTMLInputElement>(null);
  const showFolder = (
    e: React.MouseEvent<HTMLButtonElement>,
    ref: React.RefObject<HTMLInputElement>
  ) => {
    e.preventDefault();
    ref.current?.click();
  };

  const handleFileParser = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      try {
        const data = await fileParser(file);
        setParsedData(data);
      } catch (error) {
        toast.error("csvが読み取れません。データが間違っているようです", {
          id: "1",
        });
        console.error("Error parsing file:", error);
      }
    }
  };
  return (
    <>
      <div className="flex items-center mt-6 text-primary-700 ">
        <p>テンプレートをダウンロード</p>
        <RxUpload />
      </div>

      <div className="w-full h-40 flex flex-col justify-center items-center bg-gray-200 border-2 border-dotted border-primary-700">
        <input
          type="file"
          ref={fileRef}
          className="hidden"
          onChange={handleFileParser}
        />
        <button onClick={(e) => showFolder(e, fileRef)}>
          ここにファイルをドラッグ＆ドロップ　またはクリックしてファイルを選択
        </button>
        <CiImport size={36} />
      </div>
      <div className="my-8">
        <PrimaryButton name="給油料金取込" onClick={handleImport} />
      </div>
    </>
  );
};

export default FeeImport;
