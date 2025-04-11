"use client";

/* type */
import { FormProps, FormValues } from "./type";

/* library */
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineInsurance } from "react-icons/ai";
import { CiCalendar, CiCreditCard1 } from "react-icons/ci";
import { FaCarSide, FaRegBuilding, FaUser } from "react-icons/fa";
import { MdHomeRepairService, MdOutlineStickyNote2 } from "react-icons/md";
import { RiGasStationLine } from "react-icons/ri";

/* component */
import { Box } from "@/components/Box";
import { Select } from "@/components/Select";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

/* util */
import { uploadPDF } from "@/utils/supabase/uploadPDF";

export const Form = ({
  carTypes,
  places,
  employees,
  leasingCompanies,
  refuelingCards,
  etcCards,
}: FormProps) => {
  const router = useRouter();
  const { register, handleSubmit, watch, setValue } = useForm<FormValues>();
  const inspectionFileRef = useRef<HTMLInputElement>(null);
  const insuaranceFileRef = useRef<HTMLInputElement>(null);
  const [inspectionFileName, setInspectionFileName] = useState<
    string | undefined
  >("選択してください");
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
  >("選択してください");

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

  const formatDate = (cardate: Date | undefined) => {
    if (!cardate) return ""; // 初期値がない場合
    const date = new Date(cardate);
    return isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10); // 有効なら変換
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const inspectionFilePath = inspectionUploadFile
        ? await uploadPDF(inspectionUploadFile)
        : null;
      const insuaranceFilePath = insuaranceUploadFile
        ? await uploadPDF(insuaranceUploadFile)
        : null;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/car`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            first_registration_date: formatDate(new Date()),
            leasing_start_date: formatDate(new Date()),
            leasing_finish_date: formatDate(new Date()),
            inspection_expires_date: formatDate(new Date()),
            inspection_data: null,
            inspection_data_name: null,
            insuarance_expires_date: formatDate(new Date()),
            insuarance_data: null,
            insuarance_data_name: null,
            refueling_cardNumber: null,
            etc_cardName: null,
            tire_change: null,
            notes: null,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      router.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error();
      }
    }
  };

  const onError: SubmitErrorHandler<FormValues> = (errors) => {
    Object.values(errors).forEach((error) => {
      toast.error(error.message!);
    });

    throw new Error();
  };

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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        toast.promise(handleSubmit(onSubmit, onError), {
          loading: "作成中...",
          success: () => "登録が完了しました",
          error: () => "登録に失敗しました",
        });
      }}
    >
      <div className="grid grid-cols-2 gap-4 m-4 [&_input]:w-full [&_select]:w-full [&_input]:border-2 [&_input]:border-gray-200 [&_input]:p-2 [&_input]:mb-2 [&_select]:border-2 [&_select]:border-gray-200 [&_select]:p-2 [&_select]:mb-2 ">
        <Box
          title="車両情報"
          icon={<FaCarSide size={20} className="text-primary-700 mr-2" />}
        >
          <div className="grid grid-cols-2 gap-x-2">
            <Input
              label="車両番号"
              type="text"
              required
              {...register("label", {
                required: "車両番号を入力してください。",
              })}
            />

            <Select
              label="車種"
              required
              options={carTypes.map((carType) => ({
                key: carType.id,
                value: carType.name,
              }))}
              {...register("carTypeName", {
                required: "車種を選択してください。",
              })}
            />
          </div>

          <Select
            label="使用場所"
            required
            options={places.map((place) => ({
              key: place.id,
              value: place.name,
            }))}
            {...register("placeName", {
              required: "使用場所を選択してください。",
            })}
          />
        </Box>

        <Box
          title="管理者情報"
          icon={<FaUser size={20} className="text-primary-700 mr-2" />}
        >
          <Select
            label="管理者"
            required
            options={employees.map((employee) => ({
              key: employee.id,
              value: employee.name,
            }))}
            {...register("employeeName", {
              required: "管理者を選択してください。",
            })}
          />

          <Input
            label="管理者アドレス"
            type="text"
            disabled
            {...register("employeeEmail")}
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
              options={leasingCompanies.map((leasingCompany) => ({
                key: leasingCompany.id,
                value: leasingCompany.name,
              }))}
              {...register("leasingName", {
                required: "リース会社を選択してください。",
              })}
            />

            <Input
              label="初年度登録"
              required
              type="date"
              {...register("first_registration_date", {
                required: "初年度登録を入力してください。",
              })}
            />
          </div>

          <div className="grid grid-cols-2 gap-x-2">
            <Input
              label="リース開始日"
              required
              type="date"
              {...register("leasing_start_date", {
                required: "リース開始日を入力してください。",
              })}
            />

            <Input
              label="リース終了日"
              required
              type="date"
              {...register("leasing_finish_date", {
                required: "リース終了日を入力してください。",
              })}
            />
          </div>
        </Box>

        <Box
          title="点検情報"
          icon={
            <MdHomeRepairService size={20} className="text-primary-700 mr-2" />
          }
        >
          <Select
            label="6ヶ月点検日"
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
              required: "6ヶ月点検日を選択してください。",
            })}
          />

          <Select
            label="タイヤ交換有無"
            options={[
              { key: 0, value: "有り" },
              { key: 1, value: "無し" },
            ]}
            {...register("tire_change")}
          />
        </Box>

        <Box
          title="車検情報"
          icon={<CiCalendar size={20} className="text-primary-700 mr-2" />}
        >
          <Input
            label="車検満了日"
            required
            type="date"
            {...register("inspection_expires_date", {
              required: "車検満了日を入力してください。",
            })}
          />

          <div>
            <p>車検PDF</p>
            <div className="border-2 border-gray-200 p-2 flex justify-between items-center">
              <div className="w-4/5">
                <input
                  type="file"
                  ref={inspectionFileRef}
                  onChange={handleInspectionFileChange}
                  accept=".pdf"
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
                className="bg-gray-200 px-1"
              >
                選択
              </button>
            </div>
          </div>
        </Box>

        <Box
          title="保健情報"
          icon={
            <AiOutlineInsurance size={20} className="text-primary-700 mr-2" />
          }
        >
          <Input
            label="保険満了日"
            required
            type="date"
            {...register("insuarance_expires_date", {
              required: "保険満了日を入力してください。",
            })}
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
        </Box>

        <Box
          title="給油カード情報"
          icon={
            <RiGasStationLine size={20} className="text-primary-700 mr-2" />
          }
        >
          <Select
            label="給油カード番号"
            options={refuelingCards.map((refuelingCard) => ({
              key: refuelingCard.id,
              value: refuelingCard.number,
            }))}
            {...register("refueling_cardNumber")}
          />

          <Input
            label="給油カード期限"
            disabled
            type="date"
            {...register("refueling_cardPeriod")}
          />
        </Box>

        <Box
          title="ETCカード情報"
          icon={<CiCreditCard1 size={20} className="text-primary-700 mr-2" />}
        >
          <Select
            label="ETCカード名"
            options={etcCards.map((etcCard) => ({
              key: etcCard.id,
              value: etcCard.name,
            }))}
            {...register("etc_cardName")}
          />

          <div className="grid grid-cols-2 gap-x-2">
            <Input
              label="ETCカード番号"
              type="text"
              disabled
              {...register("etc_cardNumber")}
            />

            <Input
              label="ETCカード期限"
              type="date"
              disabled
              {...register("etc_cardPeriod")}
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
        <textarea
          {...register("notes")}
          className="h-24 w-full border-2 border-gray-200 p-2"
        />
      </Box>

      <div className="w-[calc(100vw-240px)] fixed bottom-0 py-2 bg-white shadow-inner">
        <div className="flex justify-end max-w-5xl mx-auto">
          <Button rounded="full">追加</Button>
        </div>
      </div>
    </form>
  );
};
