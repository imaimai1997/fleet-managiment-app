"use client";

import React, { useRef, useState } from "react";
import { CiImport } from "react-icons/ci";
import Papa from "papaparse";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import Dropzone from "react-dropzone";
import Modal from "../../../Modal";
import { RxDoubleArrowDown } from "react-icons/rx";
import { Button } from "@/components/Button";

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
      <Modal
        open={isModalOpen}
        name="ETC料金csv取込ルール"
        onCancel={() => setIsModalOpen(false)}
      >
        <table className="text-left border-2  ">
          <thead className="[&_th]:border-2  border-white">
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
          <Button
            onClick={handleImport}
            className={"bg-primary-700 text-white border-2 border-transparent p-2 mr-4 text-sm font-semibold rounded-lg shadow-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 hover:shadow-lg"}
          >
            ETC料金取込
          </Button>
        ) : (
          <Button
            className={"bg-gray-200 p-2 border-2 border-gray-400 text-gray-400 text-sm font-semibold"}
          >
            ETC料金取込
          </Button>
        )}

        {
          fileName &&
          <Button
            onClick={handleClear}
            className={"bg-primary-700 text-white border-2 border-transparent p-2 mr-4 text-sm font-semibold rounded-lg shadow-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 hover:shadow-lg"}
          >
            クリア
          </Button>
        }
      </div>
    </>
  );
};

export default EtcImport;
