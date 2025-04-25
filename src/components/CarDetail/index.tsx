"use client";
import React, { useEffect, useRef, useState } from "react";
import { CarData } from "@/type/CarData";
import { FaRegTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useForm, FieldErrors } from "react-hook-form";
import { CarForm } from "@/type/CarForm";
import { deletePDF, uploadPDF } from "@/utils/supabase/uploadPDF";
import { useAuthContext } from "@/context/authContext";
import { Button } from "../Button";
import { FaCarSide } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaRegBuilding } from "react-icons/fa";
import { MdHomeRepairService } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
import { AiOutlineInsurance } from "react-icons/ai";
import { RiGasStationLine } from "react-icons/ri";
import { CiCreditCard1 } from "react-icons/ci";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { Box } from "../Box";
import { Input } from "../Input";
import { Select } from "../Select";
import {
  CarType,
  Employee,
  EtcCard,
  LeasingCompany,
  Place,
  RefuelingCard,
} from "@/type/Car";

type Props = {
  data?: CarData;
  id?: string;
  carTypes: CarType[];
  places: Place[];
  employees: Employee[];
  leasingCompanies: LeasingCompany[];
  refuelingCards: RefuelingCard[];
  etcCards: EtcCard[];
};

const CarDetail = ({
  data,
  id,
  carTypes,
  places,
  employees,
  leasingCompanies,
  refuelingCards,
  etcCards,
}: Props) => {
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
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    console.log(e.target.files);
    const file = e.target.files?.[0];
    setInspectionUploadFile(file);

    if (file) {
      setInspectionFileName(file.name);
    }
  };
  const handleInsuaranceFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
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
    ref: React.RefObject<HTMLInputElement>,
  ) => {
    e.preventDefault();
    ref.current?.click();
  };

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
        headers: { "Content-Type": "application/json" },
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
        { method: "DELETE", headers: { "Content-Type": "application/json" } },
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
          headers: { "Content-Type": "application/json" },
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
        },
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

  // 読み取り専用項目の自動表示
  useEffect(() => {
    const selected = employees.find((e) => e.name === watch("employeeName"));
    if (selected) {
      setValue("employeeEmail", selected.email);
    }
  }, [watch("employeeName")]);

  useEffect(() => {
    const selected = refuelingCards.find(
      (r) => r.number === watch("refueling_cardNumber"),
    );
    if (selected) {
      setValue("refueling_cardPeriod", formatDate(selected.period));
    }
  }, [watch("refueling_cardNumber")]);

  useEffect(() => {
    const selected = etcCards.find((e) => e.name === watch("etc_cardName"));
    if (selected) {
      setValue("etc_cardPeriod", formatDate(selected.period));
      setValue("etc_cardNumber", selected.number);
    }
  }, [watch("etc_cardName")]);

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit(handleCreateCar, onError)}>
        <div className="grid grid-cols-2 gap-4 m-4 [&_input]:w-full [&_select]:w-full [&_input]:border-2 [&_input]:border-gray-200 [&_input]:p-2 [&_input]:mb-2 [&_select]:border-2 [&_select]:border-gray-200 [&_select]:p-2 [&_select]:mb-2 ">
          <Box
            title="車両情報"
            icon={<FaCarSide size={20} className="text-primary-700 mr-2" />}
          >
            <div className="grid grid-cols-2 gap-x-2">
              <Input
                label="車両番号"
                required
                {...register("label", {
                  required: "車両番号を入力してください。",
                })}
                type="text"
              />
              <Select
                label="車種"
                required
                options={
                  carTypes?.map((carType) => ({
                    key: carType.id,
                    value: carType.name,
                  })) || []
                }
                {...register("carTypeName", {
                  required: "車種を選択してください。",
                })}
                value={watch("carTypeName")}
              />
            </div>

            <Select
              label="使用場所"
              required
              options={
                places?.map((place) => ({
                  key: place.id,
                  value: place.name,
                })) || []
              }
              {...register("placeName", {
                required: "使用場所を選択してください。",
              })}
              value={watch("placeName")}
            />
          </Box>
          <Box
            title="管理者情報"
            icon={<FaUser size={20} className="text-primary-700 mr-2" />}
          >
            <Select
              required
              label="管理者"
              options={
                employees?.map((employee) => ({
                  key: employee.id,
                  value: employee.name,
                })) || []
              }
              {...register("employeeName", {
                required: "車種を選択してください。",
              })}
              value={watch("employeeName")}
            />
            <Input
              label="管理者アドレス"
              required
              {...register("employeeEmail")}
              type="text"
              disabled
              className="bg-gray-200"
            />
          </Box>
          <Box
            title="リース情報"
            icon={<FaRegBuilding size={20} className="text-primary-700 mr-2" />}
          >
            <div className="grid grid-cols-2 gap-x-2">
              <Select
                label="リース会社"
                required
                options={
                  leasingCompanies?.map((leasingCompany) => ({
                    key: leasingCompany.id,
                    value: leasingCompany.name,
                  })) || []
                }
                {...register("leasingName", {
                  required: "リース会社を選択してください。",
                })}
                value={watch("leasingName")}
              />
              <Input
                label="初度登録"
                required
                {...register("first_registration_date", {
                  required: "初度登録を入力してください。",
                })}
                type="date"
              />
            </div>
            <div className="grid grid-cols-2 gap-x-2">
              <Input
                label="リース開始日"
                required
                {...register("leasing_start_date", {
                  required: "リース開始日を入力してください。",
                })}
                type="date"
              />
              <Input
                label="リース終了日"
                required
                {...register("leasing_finish_date", {
                  required: "リース終了日を入力してください。",
                })}
                type="date"
              />
            </div>
          </Box>
          <Box
            title="点検情報"
            icon={
              <MdHomeRepairService
                size={20}
                className="text-primary-700 mr-2"
              />
            }
          >
            <Select
              label="6カ月点検日"
              required
              options={[
                { key: "1月・7月", value: "1月・7月" },
                { key: "2月・8月", value: "2月・8月" },
                { key: "3月・9月", value: "3月・9月" },
                { key: "4月・10月", value: "4月・10月" },
                { key: "5月・11月", value: "5月・11月" },
                { key: "6月・12月", value: "6月・12月" },
              ]}
              {...register("harf_year_inspection", {
                required: "6カ月点検日を選択してください。",
              })}
              value={watch("harf_year_inspection")}
            />
            <Select
              label="タイヤ交換有無"
              options={[
                { key: 0, value: "有り" },
                { key: 1, value: "無し" },
              ]}
              {...register("tire_change", {})}
              value={
                watch("tire_change") === null
                  ? ""
                  : watch("tire_change") === "true"
                    ? "true"
                    : "false"
              }
            />
          </Box>

          <Box
            title="車検情報"
            icon={<CiCalendar size={20} className="text-primary-700 mr-2" />}
          >
            <div className="grid grid-cols-2 gap-x-2">
              <Input
                label="車検満了日"
                required
                {...register("inspection_expires_date", {
                  required: "車検日を入力してください。",
                })}
                type="date"
              />
              <div>
                <p>車検PDF</p>
                <div className=" border-2 border-gray-200 p-2 flex justify-between items-center">
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
            </div>
          </Box>
          <Box
            title="保険情報"
            icon={
              <AiOutlineInsurance size={20} className="text-primary-700 mr-2" />
            }
          >
            <div className="grid grid-cols-2 gap-x-2">
              <Input
                label="保険満了日"
                required
                {...register("insuarance_expires_date", {
                  required: "保険満了日を入力してください。",
                })}
                type="date"
              />
              <div>
                <p>保険PDF</p>
                <div className="border-2 relative border-gray-200 p-2 flex justify-between items-center ">
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
            </div>
          </Box>
          <Box
            title="給油カード情報"
            icon={
              <RiGasStationLine size={20} className="text-primary-700 mr-2" />
            }
          >
            <Select
              label="給油カード番号"
              options={
                refuelingCards?.map((refuelingCard) => ({
                  key: refuelingCard.id,
                  value: refuelingCard.number,
                })) || []
              }
              {...register("refueling_cardNumber")}
              value={watch("refueling_cardNumber")}
            />

            <Input
              label="給油カード期限"
              {...register("refueling_cardPeriod")}
              type="date"
              disabled
              className="bg-gray-200"
            />
          </Box>
          <Box
            title="ETCカード情報"
            icon={<CiCreditCard1 size={20} className="text-primary-700 mr-2" />}
          >
            <Select
              label="ETCカード名"
              options={
                etcCards?.map((etcCard) => ({
                  key: etcCard.id,
                  value: etcCard.name,
                })) || []
              }
              {...register("etc_cardName")}
              value={watch("etc_cardName")}
            />

            <div className="grid grid-cols-2 gap-x-2">
              <Input
                label="ETCカード番号"
                {...register("etc_cardNumber")}
                type="text"
                disabled
                className="bg-gray-200"
              />
              <Input
                label="ETCカード期限"
                {...register("etc_cardPeriod")}
                type="date"
                disabled
                className="bg-gray-200"
              />
            </div>
          </Box>
        </div>
        <Box
          title="備考欄"
          icon={
            <MdOutlineStickyNote2 size={20} className="text-primary-700 mr-2" />
          }
          className="mx-4 mt-4 mb-16"
        >
          <div>
            <textarea
              {...register("notes", {})}
              className="h-24 w-full border-2 border-gray-200 p-2"
            />
          </div>
        </Box>

        {!data && (
          <div className="w-[calc(100vw-240px)] fixed bottom-0 py-2 bg-white shadow-inner">
            <div className="flex justify-end max-w-5xl mx-auto">
              <Button rounded="full">追加</Button>
            </div>
          </div>
        )}
      </form>
      {data && userRole == "管理者" && (
        <div className="w-[calc(100vw-240px)] fixed bottom-0 py-2 bg-white shadow-inner">
          <div className="flex justify-end gap-4 max-w-5xl mx-auto">
            <Button
              onClick={handleDeleteCar}
              variant="secondary"
              rounded="full"
              className="flex gap-2 items-center justify-center"
            >
              削除
              <FaRegTrashAlt />
            </Button>
            <Button onClick={handleUpdateCar} rounded="full">
              保存
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default CarDetail;
