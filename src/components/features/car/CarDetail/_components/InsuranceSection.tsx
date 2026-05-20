import React from "react";
import { UseFormRegister } from "react-hook-form";
import { CarForm } from "@/types/CarForm";
import { Box } from "@/components/ui/Box";
import { Input } from "@/components/ui/Input";
import { AiOutlineInsurance } from "react-icons/ai";

type Props = {
  register: UseFormRegister<CarForm>;
  insuaranceFileName: string | undefined;
  insuaranceFileURL: string | undefined;
  insuaranceFileRef: React.RefObject<HTMLInputElement>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onShowFolder: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const InsuranceSection = ({
  register,
  insuaranceFileName,
  insuaranceFileURL,
  insuaranceFileRef,
  onFileChange,
  onShowFolder,
}: Props) => (
  <Box title="保険情報" icon={<AiOutlineInsurance size={20} className="text-primary-700 mr-2" />}>
    <div className="grid grid-cols-2 gap-x-2">
      <Input
        label="保険満了日"
        required
        {...register("insuarance_expires_date", { required: "保険満了日を入力してください。" })}
        type="date"
      />
      <div>
        <p>保険PDF</p>
        <div className="border-2 relative border-gray-200 p-2 flex justify-between items-center">
          <div className="w-4/5">
            <input
              type="file"
              ref={insuaranceFileRef}
              accept="application/pdf"
              onChange={onFileChange}
              className="hidden"
            />
            <a href={insuaranceFileURL} target="_blank" rel="noopener noreferrer">
              <p className="truncate">{insuaranceFileName}</p>
            </a>
          </div>
          <button type="button" onClick={onShowFolder} className="bg-gray-200">
            選択
          </button>
        </div>
      </div>
    </div>
  </Box>
);

export default InsuranceSection;
