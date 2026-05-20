"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, FieldErrors } from "react-hook-form";
import toast from "react-hot-toast";
import { CarData } from "@/types/CarData";
import { CarForm } from "@/types/CarForm";
import { Employee, RefuelingCard, EtcCard } from "@/types/Car";
import { uploadPDF, deletePDF } from "@/lib/supabase/uploadPDF";

type Props = {
  data?: CarData;
  id?: string;
  employees: Employee[];
  refuelingCards: RefuelingCard[];
  etcCards: EtcCard[];
};

export const formatDate = (cardate: Date | undefined): string => {
  if (!cardate) return "";
  const date = new Date(cardate);
  return isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
};

export const useCarForm = ({ data, id, employees, refuelingCards, etcCards }: Props) => {
  const router = useRouter();

  const { register, handleSubmit, watch, setValue } = useForm<CarForm>({
    defaultValues: {
      label: data?.label || "",
      carTypeName: data?.carType?.name || "",
      employeeName: data?.employee?.name || "",
      employeeEmail: data?.employee?.email || "",
      placeName: data?.place?.name || "",
      leasingName: data?.leasing?.name || "",
      first_registration_date: formatDate(data?.first_registration_date),
      leasing_start_date: formatDate(data?.leasing_start_date),
      leasing_finish_date: formatDate(data?.leasing_finish_date),
      harf_year_inspection: data?.harf_year_inspection || "",
      inspection_expires_date: formatDate(data?.inspection_expires_date),
      inspection_data_name: data?.inspection_data_name || "",
      insuarance_expires_date: formatDate(data?.insuarance_expires_date),
      insuarance_data_name: data?.insuarance_data_name || "",
      refueling_cardNumber: data?.refueling_card?.number || "",
      refueling_cardPeriod: formatDate(data?.refueling_card?.period),
      etc_cardName: data?.etc_card?.name || "",
      etc_cardNumber: data?.etc_card?.number || "",
      etc_cardPeriod: formatDate(data?.etc_card?.period),
      tire_change: data?.tire_change === true ? "有り" : data?.tire_change === false ? "無し" : null,
      notes: data?.notes || "",
    },
  });

  const inspectionFileRef = useRef<HTMLInputElement>(null);
  const insuaranceFileRef = useRef<HTMLInputElement>(null);
  const [inspectionFileName, setInspectionFileName] = useState<string | undefined>(
    data?.inspection_data_name || "選択してください",
  );
  const [inspectionFileURL, setInspectionFileURL] = useState<string | undefined>(undefined);
  const [inspectionUploadFile, setInspectionUploadFile] = useState<File | undefined>(undefined);
  const [insuaranceUploadFile, setInsuaranceUploadFile] = useState<File | undefined>(undefined);
  const [insuaranceFileURL, setInsuaranceFileURL] = useState<string | undefined>(undefined);
  const [insuaranceFileName, setInsuaranceFileName] = useState<string | undefined>(
    data?.insuarance_data_name || "選択してください",
  );

  useEffect(() => {
    setInspectionFileURL(data?.inspection_data);
    setInspectionFileName(data?.inspection_data_name);
    setInsuaranceFileURL(data?.insuarance_data);
    setInsuaranceFileName(data?.insuarance_data_name);
  }, [data]);

  const watchedEmployeeName = watch("employeeName");
  const watchedRefuelingCardNumber = watch("refueling_cardNumber");
  const watchedEtcCardName = watch("etc_cardName");

  useEffect(() => {
    const selected = employees.find((e) => e.name === watchedEmployeeName);
    if (selected) setValue("employeeEmail", selected.email);
  }, [watchedEmployeeName, employees, setValue]);

  useEffect(() => {
    const selected = refuelingCards.find((r) => r.number === watchedRefuelingCardNumber);
    if (selected) setValue("refueling_cardPeriod", formatDate(selected.period));
  }, [watchedRefuelingCardNumber, refuelingCards, setValue]);

  useEffect(() => {
    const selected = etcCards.find((e) => e.name === watchedEtcCardName);
    if (selected) {
      setValue("etc_cardPeriod", formatDate(selected.period));
      setValue("etc_cardNumber", selected.number);
    }
  }, [watchedEtcCardName, etcCards, setValue]);

  const handleInspectionFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setInspectionUploadFile(file);
    if (file) setInspectionFileName(file.name);
  };

  const handleInsuaranceFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setInsuaranceUploadFile(file);
    if (file) setInsuaranceFileName(file.name);
  };

  const showInspectionFolder = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    inspectionFileRef.current?.click();
  };

  const showInsuranceFolder = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    insuaranceFileRef.current?.click();
  };

  // 新規登録・編集で共通のリクエストボディ
  const buildCarBody = (inspectionFilePath: string | null, insuaranceFilePath: string | null) => ({
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
    inspection_data: inspectionFilePath === "" ? null : inspectionFilePath,
    inspection_data_name: inspectionFileName === "" ? null : inspectionFileName,
    insuarance_expires_date: watch("insuarance_expires_date"),
    insuarance_data: insuaranceFilePath === "" ? null : insuaranceFilePath,
    insuarance_data_name: insuaranceFileName === "" ? null : insuaranceFileName,
    refueling_cardNumber: watch("refueling_cardNumber") === "" ? null : watch("refueling_cardNumber"),
    etc_cardName: watch("etc_cardName") === "" ? null : watch("etc_cardName"),
    tire_change: watch("tire_change") === "有り" ? true : watch("tire_change") === "無し" ? false : null,
    notes: watch("notes") === "" ? null : watch("notes"),
  });

  const handleCreateCar = async () => {
    toast.loading("waiting...", { id: "1" });
    try {
      const inspectionFilePath = inspectionUploadFile ? await uploadPDF(inspectionUploadFile) : null;
      const insuaranceFilePath = insuaranceUploadFile ? await uploadPDF(insuaranceUploadFile) : null;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/car`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildCarBody(inspectionFilePath, insuaranceFilePath)),
      });
      const body = await res.json();
      if (!res.ok) {
        toast.error(body.message ?? "車両情報の登録がうまくいきませんでした。", { id: "1" });
        return;
      }
      toast.success("車両情報が登録されました", { id: "1" });
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Error:", err);
      toast.error("車両情報の登録がうまくいきませんでした。", { id: "1" });
    }
  };

  const handleDeleteCar = async () => {
    toast.loading("waiting...", { id: "1" });
    try {
      if (insuaranceFileURL) await deletePDF(insuaranceFileURL);
      if (inspectionFileURL) await deletePDF(inspectionFileURL);
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/car/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      toast.success("車両情報が削除されました", { id: "1" });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("車両情報が削除できませんでした", { id: "1" });
    }
  };

  const handleUpdateCar = async () => {
    toast.loading("waiting...", { id: "1" });
    try {
      const inspectionFilePath = inspectionUploadFile ? await uploadPDF(inspectionUploadFile) : null;
      const insuaranceFilePath = insuaranceUploadFile ? await uploadPDF(insuaranceUploadFile) : null;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/car/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...buildCarBody(inspectionFilePath, insuaranceFilePath) }),
      });
      if (!res.ok) throw new Error("Failed to update car data");
      toast.success("車両情報が編集されました", { id: "1" });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("車両情報が編集できませんでした", { id: "1" });
    }
  };

  const onError = (errors: FieldErrors<CarForm>) => {
    Object.values(errors).forEach((error) => {
      if (error?.message) toast.error(error.message as string);
    });
  };

  return {
    register,
    handleSubmit,
    watch,
    inspectionFileRef,
    insuaranceFileRef,
    inspectionFileName,
    inspectionFileURL,
    insuaranceFileName,
    insuaranceFileURL,
    handleInspectionFileChange,
    handleInsuaranceFileChange,
    showInspectionFolder,
    showInsuranceFolder,
    handleCreateCar,
    handleDeleteCar,
    handleUpdateCar,
    onError,
  };
};
