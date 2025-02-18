"use client";
import React, { useEffect, useRef, useState } from "react";
import { CarData } from "../../type/CarData";
import PrimaryButton from "../PrimaryButton";
import { FaRegTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useForm, FieldErrors } from "react-hook-form";
import { CarForm } from "../../type/CarForm";
import { Select } from "../../type/Select";
import { deletePDF, uploadPDF } from "@/utils/supabase/uploadPDF";
import { useAuthContext } from "@/context/authContext";

type Props = {
  data?: CarData;
  id?: string;
};

//Selectタグ選択肢
const fetchCarType = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/select/cartype`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data.cartype;
};
const fetchEmployee = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/select/employee`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data.employees;
};

const fetchPlace = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/select/place`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data.places;
};
const fetchCompany = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/select/company`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data.leasingCompanyes;
};
const fetchRefueling = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/select/refueling`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data.refueling_cards;
};
const fetchEtc = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/select/etc`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data.etc_cards;
};

const CarDetail = ({ data, id }: Props) => {
  const formatDate = (cardate: Date | undefined) => {
    if (!cardate) return ""; // 初期値がない場合
    const date = new Date(cardate);
    return isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10); // 有効なら変換
  };
  const { currentUser } = useAuthContext();
  const userRole = currentUser?.roleName;

  const router = useRouter();
  const { register, handleSubmit, watch, setValue } = useForm<CarForm>({
    defaultValues: {
      label: data?.label || "",
      carTypeName: data?.carType.name || "",
      employeeName: data?.employee.name || "",
      employeeEmail: data?.employee.email || "",
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
      refueling_cardNumber: data?.refueling_card?.number || "",
      refueling_cardPeriod: formatDate(data?.refueling_card?.period) || "",
      etc_cardName: data?.etc_card?.name || "",
      etc_cardNumber: data?.etc_card?.number || "",
      etc_cardPeriod: formatDate(data?.etc_card?.period) || "",
      tire_change: data?.tire_change?.toString() || null,
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
  const [inspectionUploadFile, setInspectionUploadFile] = useState<
    File | undefined
  >(undefined);
  const [insuaranceUploadFile, setinsuaranceUploadFile] = useState<
    File | undefined
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
    setInspectionUploadFile(file);

    if (file) {
      setInspectionFileName(file.name);
    }
  };
  const handleInsuaranceFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(e.target.files);
    const file = e.target.files?.[0];
    setinsuaranceUploadFile(file);
    if (file) {
      setInsuaranceFileName(file.name);
    }
  };
  const showFolder = (
    e: React.MouseEvent<HTMLButtonElement>,
    ref: React.RefObject<HTMLInputElement>
  ) => {
    e.preventDefault();
    ref.current?.click();
  };

  const [carType, setCarType] = useState<Select[]>([]);
  const [employee, setEmployee] = useState<Select[]>([]);
  const [place, setPlace] = useState<Select[]>([]);
  const [company, setCompany] = useState<Select[]>([]);
  const [refuelingCard, setRefuelingCard] = useState<Select[]>([]);
  const [etcCard, setEtcCard] = useState<Select[]>([]);

  const handleCreateCar = async () => {
    console.log("作成中");

    toast.loading("waiting...", { id: "1" });
    try {
      const inspectionFilePath = inspectionUploadFile
        ? await uploadPDF(inspectionUploadFile)
        : null;
      const insuaranceFilePath = insuaranceUploadFile
        ? await uploadPDF(insuaranceUploadFile)
        : null;

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/car`, {
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
          inspection_data: inspectionFilePath == "" ? null : inspectionFilePath,
          inspection_data_name:
            inspectionFileName == "" ? null : inspectionFileName,
          insuarance_expires_date: watch("insuarance_expires_date"),
          insuarance_data: insuaranceFilePath == "" ? null : insuaranceFilePath,
          insuarance_data_name:
            insuaranceFileName == "" ? null : insuaranceFileName,
          refueling_cardNumber:
            watch("refueling_cardNumber") == ""
              ? null
              : watch("refueling_cardNumber"),
          etc_cardName:
            watch("etc_cardName") == "" ? null : watch("etc_cardName"),
          tire_change: watch("tire_change") == "" ? null : watch("tire_change"),
          notes: watch("notes") == "" ? null : watch("notes"),
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
  const onError = (errors: FieldErrors<CarForm>) => {
    if (errors.label?.message) {
      toast.error(errors.label.message);
    }
    if (errors.carTypeName?.message) {
      toast.error(errors.carTypeName.message);
    }
    if (errors.employeeName?.message) {
      toast.error(errors.employeeName.message);
    }
    if (errors.placeName?.message) {
      toast.error(errors.placeName.message);
    }
    if (errors.leasingName?.message) {
      toast.error(errors.leasingName.message);
    }
    if (errors.first_registration_date?.message) {
      toast.error(errors.first_registration_date.message);
    }

    if (errors.leasing_start_date?.message) {
      toast.error(errors.leasing_start_date.message);
    }
    if (errors.leasing_finish_date?.message) {
      toast.error(errors.leasing_finish_date.message);
    }
    if (errors.harf_year_inspection?.message) {
      toast.error(errors.harf_year_inspection.message);
    }
    if (errors.inspection_expires_date?.message) {
      toast.error(errors.inspection_expires_date.message);
    }
    if (errors.insuarance_expires_date?.message) {
      toast.error(errors.insuarance_expires_date.message);
    }
  };

  const handleDeleteCar = async () => {
    toast.loading("waiting...", { id: "1" });
    try {
      if (insuaranceFileURL) {
        await deletePDF(insuaranceFileURL);
      }
      if (inspectionFileURL) {
        await deletePDF(inspectionFileURL);
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/car/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
    toast.loading("waiting...", { id: "1" });
    try {
      const inspectionFilePath = inspectionUploadFile
        ? await uploadPDF(inspectionUploadFile)
        : null;
      const insuaranceFilePath = insuaranceUploadFile
        ? await uploadPDF(insuaranceUploadFile)
        : null;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/car/${id}`,
        {
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
            inspection_data:
              inspectionFilePath == "" ? null : inspectionFilePath,
            inspection_data_name:
              inspectionFileName == "" ? null : inspectionFileName,
            insuarance_expires_date: watch("insuarance_expires_date"),
            insuarance_data:
              insuaranceFilePath == "" ? null : insuaranceFilePath,
            insuarance_data_name:
              insuaranceFileName == "" ? null : insuaranceFileName,
            refueling_cardNumber:
              watch("refueling_cardNumber") == ""
                ? null
                : watch("refueling_cardNumber"),
            etc_cardName:
              watch("etc_cardName") == "" ? null : watch("etc_cardName"),
            tire_change:
              watch("tire_change") == "" ? null : watch("tire_change"),
            notes: watch("notes") == "" ? null : watch("notes"),
          }),
        }
      );
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartype = await fetchCarType();
        const employee = await fetchEmployee();
        const place = await fetchPlace();
        const company = await fetchCompany();
        const refueling = await fetchRefueling();
        const etc = await fetchEtc();

        setCarType(cartype);
        setEmployee(employee);
        setPlace(place);
        setCompany(company);
        setRefuelingCard(refueling);
        setEtcCard(etc);
      } catch (error) {
        console.error("Error fetching car type:", error);
      }
    };

    fetchData();
  }, []);

  // 読み取り専用項目の自動表示
  useEffect(() => {
    const selected = employee.find((e) => e.name === watch("employeeName"));
    if (selected) {
      setValue("employeeEmail", selected.email);
    }
  }, [watch("employeeName")]);

  useEffect(() => {
    const selected = refuelingCard.find(
      (r) => r.number === watch("refueling_cardNumber")
    );
    if (selected) {
      setValue("refueling_cardPeriod", formatDate(selected.period));
    }
  }, [watch("refueling_cardNumber")]);

  useEffect(() => {
    const selected = etcCard.find((e) => e.name === watch("etc_cardName"));
    if (selected) {
      setValue("etc_cardPeriod", formatDate(selected.period));
      setValue("etc_cardNumber", selected.number);
    }
  }, [watch("etc_cardName")]);

  return (
    <>
      <Toaster />
      {/* <div className="max-w-5xl  mx-auto my-20"> */}
      <form onSubmit={handleSubmit(handleCreateCar, onError)}>
        <div className="max-w-5xl  mx-auto my-20">
          <div className="w-full grid grid-cols-2 gap-y-4 gap-x-12 *:text-xl [&_input]:w-60 [&_input]:border-2 [&_input]:border-primary-700 [&_input]:p-2  [&>div]:max-w-lg [&>div]:flex [&>div]:justify-between [&>div]:items-center">
            <div>
              <label>車両番号 *</label>
              <input
                {...register("label", {
                  required: "車両番号を入力してください。",
                })}
                className="focus:bg-gray-200"
                type="text"
              />
            </div>
            <div>
              <label>車種 *</label>
              <select
                {...register("carTypeName", {
                  required: "車種を選択してください。",
                })}
                className="w-60 border-2 border-primary-700 p-2"
              >
                <option value="" disabled>
                  選択してください
                </option>
                {carType.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>管理者 *</label>
              <select
                {...register("employeeName", {
                  required: "車種を選択してください。",
                })}
                className="w-60 border-2 border-primary-700 p-2"
              >
                <option value="" disabled>
                  選択してください
                </option>
                {employee.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>管理者アドレス</label>
              <input
                {...register("employeeEmail")}
                type="text"
                readOnly
                className="bg-gray-200"
              />
            </div>
            <div>
              <label>使用場所 *</label>
              <select
                {...register("placeName", {
                  required: "使用場所を選択してください。",
                })}
                className="w-60 border-2 border-primary-700 p-2"
              >
                <option value="" disabled>
                  選択してください
                </option>
                {place.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>リース会社 *</label>
              <select
                {...register("leasingName", {
                  required: "リース会社を選択してください。",
                })}
                className="w-60 border-2 border-primary-700 p-2"
              >
                <option value="" disabled>
                  選択してください
                </option>
                {company.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>初度登録 *</label>
              <input
                {...register("first_registration_date", {
                  required: "初度登録を入力してください。",
                })}
                type="date"
              />
            </div>
            <div>
              <label>リース開始日 *</label>
              <input
                {...register("leasing_start_date", {
                  required: "リース開始日を入力してください。",
                })}
                type="date"
              />
            </div>
            <div>
              <label>リース終了日 *</label>
              <input
                {...register("leasing_finish_date", {
                  required: "リース終了日を入力してください。",
                })}
                type="date"
              />
            </div>
            <div>
              <label>6カ月点検日 *</label>
              <select
                {...register("harf_year_inspection", {
                  required: "6カ月点検日を選択してください。",
                })}
                className="w-60 border-2 border-primary-700 p-2"
              >
                <option value="" disabled>
                  選択してください
                </option>
                <option value="1月・7月">1月・7月</option>
                <option value="2月・8月">2月・8月</option>
                <option value="3月・9月">3月・9月</option>
                <option value="4月・10月">4月・10月</option>
                <option value="5月・11月">5月・11月</option>
                <option value="6月・12月">6月・12月</option>
              </select>
            </div>
            <div>
              <label>車検満了日 *</label>
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
              <label>保険満了日 *</label>
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
              <select
                {...register("refueling_cardNumber")}
                className="w-60 border-2 border-primary-700 p-2"
              >
                <option value="" disabled>
                  選択してください
                </option>
                {refuelingCard.map((item) => (
                  <option key={item.id} value={item.number}>
                    {item.number}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>給油カード期限</label>
              <input
                {...register("refueling_cardPeriod")}
                type="date"
                readOnly
                className="bg-gray-200"
              />
            </div>
            <div>
              <label>ETCカード名</label>
              <select
                {...register("etc_cardName")}
                className="w-60 border-2 border-primary-700 p-2"
              >
                <option value="" disabled>
                  選択してください
                </option>
                {etcCard.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>ETCカード番号</label>
              <input
                {...register("etc_cardNumber")}
                type="text"
                readOnly
                className="bg-gray-200"
              />
            </div>
            <div>
              <label>ETCカード期限</label>
              <input
                {...register("etc_cardPeriod")}
                type="date"
                readOnly
                className="bg-gray-200"
              />
            </div>
            <div>
              <label>タイヤ交換有無</label>
              <select
                {...register("tire_change", {
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
                  // required: "備考欄を入力してください。",
                })}
                className="h-24 w-full border-2 border-primary-700 p-2"
              />
            </div>
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
      {data && userRole == "管理者" && (
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
    </>
  );
};

export default CarDetail;
