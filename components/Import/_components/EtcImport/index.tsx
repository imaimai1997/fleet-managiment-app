import React, { useRef, useState } from "react";
// import { RxUpload } from "react-icons/rx";
// import { CiImport } from "react-icons/ci";
import PrimaryButton from "../../../PrimaryButton";
import Papa from "papaparse";
import toast from "react-hot-toast";
import dayjs from "dayjs";

type CsvRow = {
  usageDate: string;
  cardNumber: number;
  etcFee: number;
};

type CsvRowRaw = {
  ご利用日: string;
  カード番号: number;
  "ご利用金額(円)": number;
};

//ETC料金csv取込
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
            const usageDate = row["ご利用日"];
            const cardNumber = row["カード番号"];
            const etcFee = row["ご利用金額(円)"];

            const yearMonth = dayjs(usageDate).format("YYYY-MM");
            const key = `${yearMonth}-${cardNumber}`;

            if (sumData[key]) {
              sumData[key].etcFee += etcFee;
            } else {
              sumData[key] = {
                usageDate: yearMonth,
                cardNumber,
                etcFee,
              };
            }
          });
          resolve(Object.values(sumData));
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

const EtcImport = () => {
  const [parsedData, setParsedData] = useState<CsvRow[]>([]);
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/fee/etc`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parsedData),
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      toast.success("ETC料金が登録されました", { id: "1" });
    } catch (err) {
      console.error("Error:", err);
      toast.error("ETCの登録がうまくいきませんでした。", { id: "1" });
    }
  };

  const fileRef = useRef<HTMLInputElement>(null);
  // const showFolder = (
  //   e: React.MouseEvent<HTMLButtonElement>,
  //   ref: React.RefObject<HTMLInputElement>
  // ) => {
  //   e.preventDefault();
  //   ref.current?.click();
  // };

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
      <input
        className="mt-6"
        type="file"
        ref={fileRef}
        onChange={handleFileParser}
      />
      {/* <div className="w-full h-40 flex flex-col justify-center items-center bg-gray-200 border-2 border-dotted border-primary-700">
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
      </div> */}
      <div className="my-8">
        <PrimaryButton name="ETC料金取込" onClick={handleImport} />
      </div>
      <div className="flex items-center">
        <p>csv入力ルール</p>
        {/* <p className="text-primary-700 pl-2">テンプレートをダウンロード</p>
        <RxUpload /> 
        */}
      </div>
      <table className="text-left border-2">
        <thead className="[&_th]:border-2 border-white">
          <tr>
            <th scope="col" className=" bg-gray-400 px-6 py-3">
              項目名
            </th>
            <th scope="col" className=" bg-gray-400 px-6 py-3">
              説明
            </th>
            <th scope="col" className=" bg-gray-400 px-6 py-3">
              必須有無
            </th>
            <th scope="col" className=" bg-gray-400 px-6 py-3">
              入力ルール
            </th>
          </tr>
        </thead>
        <tbody className="[&_th]:border-2 [&_td]:border-2 [&_td]:px-6 [&_td]:py-2">
          <tr>
            <th scope="row" className="px-6 py-2 border-2">
              ご利用日
            </th>
            <td>ETCカードを利用した日付</td>
            <td>必須</td>
            <td>日付形式。20XX/XX/XX</td>
          </tr>
          <tr>
            <th scope="row" className="px-6 py-2">
              カード番号
            </th>
            <td>使用したETCカード番号</td>
            <td>必須</td>
            <td>半角数字。登録されている番号しか取り込めません</td>
          </tr>
          <tr>
            <th scope="row" className="px-6 py-2">
              ご利用金額(円)
            </th>
            <td>利用金額</td>
            <td>必須</td>
            <td>半角数字</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default EtcImport;
