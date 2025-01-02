"use client";
import React, { useEffect, useRef, useState } from "react";
import { CarData } from "../../type/CarData";
import PrimaryButton from "../PrimaryButton";
import { FaRegTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { CarForm } from "../../type/CarForm";

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
  const { register, handleSubmit, watch } = useForm<CarForm>({
    defaultValues: {
      label: data?.label || "",
      carTypeName: data?.carType.name || "",
      employeeName: data?.employee.name || "",
      placeName: data?.place.name || "",
      leasingName: data?.leasing.name || "",
      first_registration_date: formatDate(data?.first_registration_date) || "",
      leasing_start_date: formatDate(data?.leasing_start_date) || "",
      leasing_finish_date: formatDate(data?.leasing_finish_date) || "",
      harf_year_inspection: data?.harf_year_inspection || "",
      inspection_expires_date: formatDate(data?.inspection_expires_date) || "",
      inspection_data_name: data?.inspection_data_name || "",
      insuarance_expires_date: formatDate(data?.insuarance_expires_date) || "",
      insuarance_data_name: data?.insuarance_data_name || "",
      refueling_cardNumber: data?.refueling_card.number || "",
      etc_cardName: data?.etc_card.name || "",
      tire_change: data?.tire_change.toString() || null,
      notes: data?.notes || "",
    },
  });

  const inspectionFileRef = useRef<HTMLInputElement>(null);
  const insuaranceFileRef = useRef<HTMLInputElement>(null);
  const [inspectionFileName, setInspectionFileName] = useState<
    string | undefined
  >(data?.inspection_data_name || "選択してください");
  const [inspectionFileURL, setInspectionFileURL] = useState<
    string | undefined
  >(undefined);

  const [insuaranceFileURL, setInsuaranceFileURL] = useState<
    string | undefined
  >(undefined);

  const [insuaranceFileName, setInsuaranceFileName] = useState<
    string | undefined
  >(data?.insuarance_data_name || "選択してください");

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

  const handleCreateCar = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/car", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          label: watch("label"),
          carTypeName: watch("carTypeName"),
          employeeName: watch("employeeName"),
          placeName: watch("placeName"),
          leasingName: watch("leasingName"),
          first_registration_date: watch("first_registration_date"),
          leasing_start_date: watch("leasing_start_date"),
          leasing_finish_date: watch("leasing_finish_date"),
          harf_year_inspection: watch("harf_year_inspection"),
          inspection_expires_date: watch("inspection_expires_date"),
          inspection_data: inspectionFileURL,
          inspection_data_name: inspectionFileName,
          insuarance_expires_date: watch("insuarance_expires_date"),
          insuarance_data: insuaranceFileURL,
          insuarance_data_name: insuaranceFileName,
          refueling_cardNumber: watch("refueling_cardNumber"),
          etc_cardName: watch("etc_cardName"),
          tire_change: watch("tire_change"),
          notes: watch("notes"),
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
      console.log(watch("etc_cardName"));
      console.log(watch("refueling_cardNumber"));
      toast.error("車両情報が登録がうまくいきませんでした。", { id: "1" });
    }
  };
  // const onError = (errors: FieldErrors) => {
  //   if (errors.carNumber?.message) {
  //     toast.error(errors.carNumber?.message);
  //   }
  //   if (errors.email?.message) {
  //     toast.error(errors.email.message);
  //   }
  //   if (errors.password?.message) {
  //     toast.error(errors.password.message);
  //   }
  //   if (errors.userRole?.message) {
  //     toast.error(errors.userRole.message);
  //   }
  // };

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

  const handleUpdateCar = async () => {
    console.log(watch("etc_cardName"));
    try {
      const res = await fetch(`http://localhost:3000/api/car/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          label: watch("label"),
          carTypeName: watch("carTypeName"),
          employeeName: watch("employeeName"),
          placeName: watch("placeName"),
          leasingName: watch("leasingName"),
          first_registration_date: watch("first_registration_date"),
          leasing_start_date: watch("leasing_start_date"),
          leasing_finish_date: watch("leasing_finish_date"),
          harf_year_inspection: watch("harf_year_inspection"),
          inspection_expires_date: watch("inspection_expires_date"),
          inspection_data: inspectionFileURL,
          inspection_data_name: inspectionFileName,
          insuarance_expires_date: watch("insuarance_expires_date"),
          insuarance_data: insuaranceFileURL,
          insuarance_data_name: insuaranceFileName,
          refueling_cardNumber: watch("refueling_cardNumber"),
          etc_cardName: watch("etc_cardName"),
          tire_change: watch("tire_change"),
          notes: watch("notes"),
        }),
      });
      if (!res.ok) throw new Error("Failed to update car data");
      toast.success("車両情報が編集されました", { id: "1" });
      router.push("/");
      router.refresh();
      return res.json();
    } catch (error) {
      console.error(error);
      console.log(watch("etc_cardName"));
      console.log(watch("refueling_cardNumber"));
      toast.error("車両情報が編集できませんでした", { id: "1" });
    }
  };

  useEffect(() => {
    setInspectionFileURL(data?.inspection_data);
    setInspectionFileName(data?.inspection_data_name);
    setInsuaranceFileURL(data?.insuarance_data);
    setInsuaranceFileName(data?.insuarance_data_name);
  }, [data]);
  return (
    <>
      <Toaster />
      <div className="max-w-5xl  mx-auto my-20">
        <form onSubmit={handleSubmit(handleCreateCar)}>
          <div className="w-full grid grid-cols-2 gap-y-4 gap-x-12 *:text-xl [&_input]:w-60 [&_input]:border-2 [&_input]:border-primary-700 [&_input]:p-2  [&>div]:max-w-lg [&>div]:flex [&>div]:justify-between [&>div]:items-center">
            <div>
              <label>車両番号</label>
              <input
                {...register("label", {
                  required: "車両番号を入力してください。",
                })}
                className="focus:bg-gray-200"
                type="text"
              />
            </div>
            <div>
              <label>車種</label>
              <input
                {...register("carTypeName", {
                  required: "車種を入力してください。",
                })}
                type="text"
              />
            </div>
            <div>
              <label>管理者</label>
              <input
                {...register("employeeName", {
                  required: "管理者を入力してください。",
                })}
                type="text"
              />
            </div>
            <div>
              <label>管理者アドレス</label>
              <input type="text" value={data?.employee.email} readOnly />
            </div>
            <div>
              <label>使用場所</label>
              <input
                {...register("placeName", {
                  required: "使用場所を入力してください。",
                })}
                type="text"
              />
            </div>
            <div>
              <label>リース会社</label>
              <input
                {...register("leasingName", {
                  required: "リース会社を入力してください。",
                })}
                type="text"
              />
            </div>
            <div>
              <label>初度登録</label>
              <input
                {...register("first_registration_date", {
                  required: "初度登録を入力してください。",
                })}
                type="date"
              />
            </div>
            <div>
              <label>リース開始日</label>
              <input
                {...register("leasing_start_date", {
                  required: "リース開始日を入力してください。",
                })}
                type="date"
              />
            </div>
            <div>
              <label>リース終了日</label>
              <input
                {...register("leasing_finish_date", {
                  required: "リース終了日を入力してください。",
                })}
                type="date"
              />
            </div>
            <div>
              <label>6カ月点検日</label>
              <input
                {...register("harf_year_inspection", {
                  required: "6カ月点検日を入力してください。",
                })}
                type="text"
              />
            </div>
            <div>
              <label>車検日</label>
              <input
                {...register("inspection_expires_date", {
                  required: "車検日を入力してください。",
                })}
                type="date"
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
                {...register("insuarance_expires_date", {
                  required: "保険満了日を入力してください。",
                })}
                type="date"
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
                {...register("refueling_cardNumber", {
                  required: "給油カード番号を入力してください。",
                })}
                type="text"
              />
            </div>
            <div>
              <label>給油カード期限</label>
              <input
                type="date"
                value={formatDate(data?.refueling_card.period)}
                readOnly
              />
            </div>
            <div>
              <label>ETCカード名</label>
              <input
                {...register("etc_cardName", {
                  required: "ETCカード名を入力してください。",
                  // valueAsNumber: false,
                })}
                type="text"
              />
            </div>
            <div>
              <label>ETCカード番号</label>
              <input type="text" value={data?.etc_card.number} readOnly />
            </div>
            <div>
              <label>ETCカード期限</label>
              <input
                type="date"
                value={formatDate(data?.etc_card.period)}
                readOnly
              />
            </div>
            <div>
              <label>タイヤ交換有無</label>
              <select
                {...register("tire_change", {
                  required: "タイヤ交換有無を入力してください。",
                  setValueAs: (value) => value === "true",
                })}
                className="w-60 border-2 border-primary-700 p-2"
              >
                <option value="" disabled>
                  選択してください
                </option>
                <option value="true">有り</option>
                <option value="false">無し</option>
              </select>
            </div>
          </div>
          <div className=" text-xl mt-6 w-full">
            <label>備考欄</label>
            <div>
              <textarea
                {...register("notes", {
                  required: "備考欄を入力してください。",
                })}
                className="h-24 w-full border-2 border-primary-700 p-2"
              />
            </div>
          </div>

          {!data && (
            <div className="w-5/6 fixed bottom-0 py-2 bg-white shadow-inner">
              <div className="flex justify-end max-w-5xl mx-auto">
                <PrimaryButton name="追加" />
              </div>
            </div>
          )}
        </form>
        {data && (
          <div className="w-5/6 fixed bottom-0 py-2 bg-white shadow-inner">
            <div className="flex justify-between max-w-5xl mx-auto">
              <button
                onClick={handleDeleteCar}
                className="flex items-center py-2 text-slate-500"
              >
                削除
                <FaRegTrashAlt />
              </button>
              <PrimaryButton name="保存" onClick={handleUpdateCar} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CarDetail;
