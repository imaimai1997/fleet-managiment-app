import React from "react";
import { UseFormRegister } from "react-hook-form";
import { CarForm } from "@/types/CarForm";
import { Box } from "@/components/ui/Box";
import { Input } from "@/components/ui/Input";
import { CiCalendar } from "react-icons/ci";

type Props = {
  register: UseFormRegister<CarForm>;
  inspectionFileName: string | undefined;
  inspectionFileURL: string | undefined;
  inspectionFileRef: React.RefObject<HTMLInputElement>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onShowFolder: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const CarInspectionSection = ({
  register,
  inspectionFileName,
  inspectionFileURL,
  inspectionFileRef,
  onFileChange,
  onShowFolder,
}: Props) => (
  <Box title="車検情報" icon={<CiCalendar size={20} className="text-primary-700 mr-2" />}>
    <div className="grid grid-cols-2 gap-x-2">
      <Input
        label="車検満了日"
        required
        {...register("inspection_expires_date", { required: "車検日を入力してください。" })}
        type="date"
      />
      <div>
        <p>車検PDF</p>
        <div className="border-2 border-gray-200 p-2 flex justify-between items-center">
          <div className="w-4/5">
            <input
              type="file"
              ref={inspectionFileRef}
              accept="application/pdf"
              onChange={onFileChange}
              className="hidden"
            />
            <a href={inspectionFileURL} target="_blank" rel="noopener noreferrer">
              <p className="truncate">{inspectionFileName}</p>
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

export default CarInspectionSection;
