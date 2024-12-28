"use client";
import React, { useRef, useState } from "react";
import { CarData } from "../../type/CarData";
import PrimaryButton from "../PrimaryButton";
import { FaRegTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  data?: CarData;
  id?: string;
};

const CarDetail = ({ data, id }: Props) => {
  const formatDate = (cardate: Date | undefined) => {
    if (!cardate) return ""; // 初期値がない場合
    const date = new Date(cardate);
    return isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10); // 有効なら変換
  };
  const router = useRouter();
  const [carNumber, setCarNumber] = useState(data?.label || "");
  const [carType, setCarType] = useState(data?.carType.name || "");
  const [carEmployee, setCarEmployee] = useState(data?.employee.name || "");
  const [carEmployeeEmail, setCarEmployeeEmail] = useState(
    data?.employee.email || ""
  );
  const [carPlace, setCarPlace] = useState(data?.place.name || "");
  const [carLeasing, setCarLeasing] = useState(data?.leasing.name || "");
  const [dateFirstRegistration, setDateFirstRegistration] = useState(
    formatDate(data?.first_registration_date)
  );
  const [dateLeasingStart, setDateLeasingStart] = useState(
    formatDate(data?.leasing_start_date)
  );
  const [dateLeasingFinish, setDateLeasingFinish] = useState(
    formatDate(data?.leasing_finish_date)
  );
  const [dateHarfYearInspection, setDateHarfYearInspection] = useState(
    data?.harf_year_inspection || ""
  );
  const [dateInspectionExpires, setDateInspectionExpires] = useState(
    formatDate(data?.inspection_expires_date)
  );
  const [dateInsuaranceExpires, setDateInsuaranceExpires] = useState(
    formatDate(data?.insuarance_expires_date)
  );
  const [refuelingCardName, setRefuelingCardName] = useState<number | string>(
    data?.refueling_card.id ? Number(data.refueling_card.id) : ""
  );
  const [refuelingCardPeriod, setRefuelingCardPeriod] = useState(
    formatDate(data?.refueling_card.period)
  );
  const [etcCardNumber, setEtcCardNumber] = useState(data?.etc_card.id || "");
  const [etcCardName, setEtcCardName] = useState(data?.etc_card.name || "");
  const [etcCardPeriod, setEtcCardPeriod] = useState(
    formatDate(data?.etc_card.period)
  );

  const [isTireChange, setIsTireChange] = useState<boolean | null>(
    data?.tire_change || null
  );

  const [carNote, setCarNote] = useState(data?.notes || "");

  const ChangeCarNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCarNumber(e.target.value);
  };
  const ChangeCarType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCarType(e.target.value);
  };
  const ChangeCarEmployee = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCarEmployee(e.target.value);
  };
  const ChangeCarEmployeeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCarEmployeeEmail(e.target.value);
  };
  const ChangeCarPlace = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCarPlace(e.target.value);
  };
  const ChangeCarLeasing = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCarLeasing(e.target.value);
  };
  const ChangeDateFirstRegistration = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDateFirstRegistration(e.target.value);
  };
  const ChangeDateLeasingStart = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateLeasingStart(e.target.value);
  };
  const ChangeDateLeasingFinish = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateLeasingFinish(e.target.value);
  };
  const ChangeDateHarfYearInspection = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDateHarfYearInspection(e.target.value);
  };
  const ChangeDateInspectionExpires = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDateInspectionExpires(e.target.value);
  };
  const ChangeDateInsuaranceExpires = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDateInsuaranceExpires(e.target.value);
  };
  const ChangeRefuelingCardName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value))) {
      setRefuelingCardName(Number(value));
    } else {
      console.error("Invalid input: expected a number.");
    }
  };
  const ChangeRefuelingCardPeriod = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRefuelingCardPeriod(e.target.value);
  };
  const ChangeEtcCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEtcCardNumber(e.target.value);
  };
  const ChangeEtcCardName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEtcCardName(e.target.value);
  };
  const ChangeEtcCardPeriod = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEtcCardPeriod(e.target.value);
  };
  const ChangeIsTireChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsTireChange(e.target.value === "true");
  };
  const ChangeCarNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCarNote(e.target.value);
  };
  const inspectionFileRef = useRef<HTMLInputElement>(null);
  const insuaranceFileRef = useRef<HTMLInputElement>(null);
  const [inspectionFileName, setInspectionFileName] = useState(
    data?.inspection_data_name || "選択してください"
  );
  const [inspectionFileURL, setInspectionFileURL] = useState<
    string | undefined
  >(undefined);

  const [insuaranceFileURL, setInsuaranceFileURL] = useState<
    string | undefined
  >(undefined);

  const [insuaranceFileName, setInsuaranceFileName] = useState(
    data?.insuarance_data_name || "選択してください"
  );

  const handleInspectionFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(e.target.files);
    const file = e.target.files?.[0];
    if (file) {
      setInspectionFileName(file.name);
      const fileURL = URL.createObjectURL(file);
      setInspectionFileURL(fileURL);
    }
  };
  const handleInsuaranceFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(e.target.files);
    const file = e.target.files?.[0];
    if (file) {
      setInsuaranceFileName(file.name);
      const fileURL = URL.createObjectURL(file);
      setInsuaranceFileURL(fileURL);
    }
  };
  const showFolder = (
    e: React.MouseEvent<HTMLButtonElement>,
    ref: React.RefObject<HTMLInputElement>
  ) => {
    e.preventDefault();
    ref.current?.click();
  };

  const handleCreateCar = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/car", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          label: carNumber,
          carTypeName: carType,
          employeeName: carEmployee,
          placeName: carPlace,
          leasingName: carLeasing,
          first_registration_date: dateFirstRegistration,
          leasing_start_date: dateLeasingStart,
          leasing_finish_date: dateLeasingFinish,
          harf_year_inspection: dateHarfYearInspection,
          inspection_expires_date: dateInspectionExpires,
          inspection_data: inspectionFileURL,
          inspection_data_name: inspectionFileName,
          insuarance_expires_date: dateInsuaranceExpires,
          insuarance_data: insuaranceFileURL,
          insuarance_data_name: insuaranceFileName,
          refueling_cardId: refuelingCardName,
          etc_cardName: etcCardName,
          tire_change: isTireChange,
          notes: carNote,
        }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      toast.success("車両情報が登録されました", { id: "1" });

      router.push("/");
      router.refresh();

      return data;
    } catch (err) {
      console.error("Error:", err);
      toast.error("車両情報が登録がうまくいきませんでした。", { id: "1" });
    }
  };

  const handleDeleteCar = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/car/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("車両情報が削除されました", { id: "1" });
      router.push("/");
      router.refresh();
      return res.json();
    } catch (error) {
      console.error(error);
      toast.error("車両情報が削除できませんでした", { id: "1" });
    }
  };

  return (
    <>
      <Toaster />
      <div className="max-w-5xl  mx-auto my-20">
        <form>
          <div className="w-full grid grid-cols-2 gap-y-4 gap-x-12 *:text-xl [&_input]:w-60 [&_input]:border-2 [&_input]:border-primary-700 [&_input]:p-2  [&>div]:max-w-lg [&>div]:flex [&>div]:justify-between [&>div]:items-center">
            <div>
              <label>車両番号</label>
              <input
                className="focus:bg-gray-200"
                type="text"
                value={carNumber}
                onChange={ChangeCarNumber}
              />
            </div>
            <div>
              <label>車種</label>
              <input type="text" value={carType} onChange={ChangeCarType} />
            </div>
            <div>
              <label>管理者</label>
              <input
                type="text"
                value={carEmployee}
                onChange={ChangeCarEmployee}
              />
            </div>
            <div>
              <label>管理者アドレス</label>
              <input
                type="text"
                value={carEmployeeEmail}
                onChange={ChangeCarEmployeeEmail}
              />
            </div>
            <div>
              <label>使用場所</label>
              <input type="text" value={carPlace} onChange={ChangeCarPlace} />
            </div>
            <div>
              <label>リース会社</label>
              <input
                type="text"
                value={carLeasing}
                onChange={ChangeCarLeasing}
              />
            </div>
            <div>
              <label>初度登録</label>
              <input
                type="date"
                value={dateFirstRegistration}
                onChange={ChangeDateFirstRegistration}
              />
            </div>
            <div>
              <label>リース開始日</label>
              <input
                type="date"
                value={dateLeasingStart}
                onChange={ChangeDateLeasingStart}
              />
            </div>
            <div>
              <label>リース終了日</label>
              <input
                type="date"
                value={dateLeasingFinish}
                onChange={ChangeDateLeasingFinish}
              />
            </div>
            <div>
              <label>6カ月点検日</label>
              <input
                type="text"
                value={dateHarfYearInspection}
                onChange={ChangeDateHarfYearInspection}
              />
            </div>
            <div>
              <label>車検日</label>
              <input
                type="date"
                value={dateInspectionExpires}
                onChange={ChangeDateInspectionExpires}
              />
            </div>
            <div>
              <label>車検PDF</label>
              <div className="w-60 border-2 border-primary-700 p-2 flex justify-between items-center">
                <div className="w-4/5">
                  <input
                    type="file"
                    ref={inspectionFileRef}
                    accept="application/pdf"
                    onChange={handleInspectionFileChange}
                    className="hidden"
                  />
                  <a
                    href={inspectionFileURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <p className="truncate">{inspectionFileName}</p>
                  </a>
                </div>
                <button
                  type="button"
                  onClick={(e) => showFolder(e, inspectionFileRef)}
                  className="bg-gray-200"
                >
                  選択
                </button>
              </div>
            </div>
            <div>
              <label>保険満了日</label>
              <input
                type="date"
                value={dateInsuaranceExpires}
                onChange={ChangeDateInsuaranceExpires}
              />
            </div>
            <div>
              <label>保険PDF</label>
              <div className="w-60 border-2 relative border-primary-700 p-2 flex justify-between items-center ">
                <div className="w-4/5">
                  <input
                    type="file"
                    ref={insuaranceFileRef}
                    accept="application/pdf"
                    onChange={handleInsuaranceFileChange}
                    className="hidden"
                  />

                  <a
                    href={insuaranceFileURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <p className="truncate">{insuaranceFileName}</p>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={(e) => showFolder(e, insuaranceFileRef)}
                  className="bg-gray-200"
                >
                  選択
                </button>
              </div>
            </div>
            <div>
              <label>給油カード番号</label>
              <input
                type="number"
                value={refuelingCardName}
                onChange={ChangeRefuelingCardName}
              />
            </div>
            <div>
              <label>給油カード期限</label>
              <input
                type="date"
                value={refuelingCardPeriod}
                onChange={ChangeRefuelingCardPeriod}
              />
            </div>
            <div>
              <label>ETCカード番号</label>
              <input
                type="text"
                value={etcCardNumber}
                onChange={ChangeEtcCardNumber}
              />
            </div>
            <div>
              <label>ETCカード名</label>
              <input
                type="text"
                value={etcCardName}
                onChange={ChangeEtcCardName}
              />
            </div>
            <div>
              <label>ETCカード期限</label>
              <input
                type="date"
                value={etcCardPeriod}
                onChange={ChangeEtcCardPeriod}
              />
            </div>
            <div>
              <label>タイヤ交換有無</label>
              <select
                value={isTireChange === null ? "" : isTireChange.toString()}
                onChange={ChangeIsTireChange}
                className="w-60 border-2 border-primary-700 p-2"
              >
                {data === undefined && (
                  <option value="" disabled>
                    選択してください
                  </option>
                )}
                <option value="true">有り</option>
                <option value="false">無し</option>
              </select>
            </div>
          </div>
          <div className=" text-xl mt-6 w-full">
            <label>備考欄</label>
            <div>
              <textarea
                className="h-24 w-full border-2 border-primary-700 p-2"
                value={carNote}
                onChange={ChangeCarNote}
              />
            </div>
          </div>
        </form>
      </div>
      {data ? (
        <div className="w-5/6 fixed bottom-0 py-2 bg-white shadow-inner">
          <div className="flex justify-between max-w-5xl mx-auto">
            <button
              onClick={handleDeleteCar}
              className="flex items-center py-2 text-slate-500"
            >
              削除
              <FaRegTrashAlt />
            </button>
            <PrimaryButton name="保存" />
          </div>
        </div>
      ) : (
        <div className="w-5/6 fixed bottom-0 py-2 bg-white shadow-inner">
          <div className="flex justify-end max-w-5xl mx-auto">
            <PrimaryButton name="追加" onClick={handleCreateCar} />
          </div>
        </div>
      )}
    </>
  );
};

export default CarDetail;
