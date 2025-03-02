import React, { useRef, useState } from "react";
// import { RxUpload } from "react-icons/rx";
import { CiImport } from "react-icons/ci";
import Papa from "papaparse";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import Dropzone from "react-dropzone";
import ImportButton from "../../../ImportButton";
import ImportSubButton from "../../../ImportSubButton";

type CsvRow = {
  利用日変換: string; // 日付列
  カード番号: number;
  合計: number; // 合計金額
  数量変換: number; // 給油量
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
            const yearMonth = dayjs(row["利用日変換"]).format("YYYY-MM");
            const key = `${yearMonth}-${row["カード番号"]}`;

            if (sumData[key]) {
              sumData[key].合計 += row["合計"];
              sumData[key].数量変換 += row["数量変換"];
            } else {
              sumData[key] = {
                カード番号: row["カード番号"],
                利用日変換: yearMonth,
                合計: row["合計"],
                数量変換: row["数量変換"],
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

const FeeImport = () => {
  const [parsedData, setParsedData] = useState<CsvRow[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);

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
  const showFolder = (
    e: React.MouseEvent<HTMLButtonElement>,
    ref: React.RefObject<HTMLInputElement>
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
        setParsedData(data);
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
      <Dropzone onDrop={(acceptedFiles) => handleDragFileParser(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className="w-1/2 h-40 mt-4 flex flex-col justify-center items-center bg-gray-200 border-2 border-primary-700"
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
          <ImportButton name="給油料金取込" onClick={handleImport} />
        ) : (
          <ImportSubButton name="給油料金取込" />
        )}
        {fileName && <ImportButton name="クリア" onClick={handleClear} />}
      </div>

      <div className="flex items-center">
        <p>csv入力ルール</p>
        {/* <p className="text-primary-700 pl-2">テンプレートをダウンロード</p>
        <RxUpload /> 
        */}
      </div>
      <table className="text-left border-2 mb-4">
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
          <tr>
            <th scope="row" className="px-6 py-2">
              数量変換
            </th>
            <td>給油量</td>
            <td>必須</td>
            <td>半角数字</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default FeeImport;
