import React, { useRef, useState } from "react";
// import { RxUpload } from "react-icons/rx";
// import { CiImport } from "react-icons/ci";
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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/fee/refueling`,
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
      toast.success("給油料金が登録されました", { id: "1" });
    } catch (err) {
      console.error("Error:", err);
      toast.error("給油料金の登録がうまくいきませんでした。", { id: "1" });
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
        type="file"
        ref={fileRef}
        className="mt-6"
        onChange={handleFileParser}
      />
      <div className="my-8">
        <PrimaryButton name="給油料金取込" onClick={handleImport} />
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
              利用日変換
            </th>
            <td>給油カードを利用した日付</td>
            <td>必須</td>
            <td>日付形式。20XX/XX/XX</td>
          </tr>
          <tr>
            <th scope="row" className="px-6 py-2">
              カード番号
            </th>
            <td>使用した給油カード番号</td>
            <td>必須</td>
            <td>半角数字。登録されている番号しか取り込めません</td>
          </tr>
          <tr>
            <th scope="row" className="px-6 py-2">
              合計
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

export default FeeImport;
