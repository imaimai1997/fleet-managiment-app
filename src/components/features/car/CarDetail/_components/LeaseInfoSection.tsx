import { UseFormRegister } from "react-hook-form";
import { CarForm } from "@/types/CarForm";
import { LeasingCompany } from "@/types/Car";
import { Box } from "@/components/ui/Box";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { FaRegBuilding } from "react-icons/fa";

type Props = {
  register: UseFormRegister<CarForm>;
  leasingCompanies: LeasingCompany[];
};

const LeaseInfoSection = ({ register, leasingCompanies }: Props) => (
  <Box title="リース情報" icon={<FaRegBuilding size={20} className="text-primary-700 mr-2" />}>
    <div className="grid grid-cols-2 gap-x-2">
      <Select
        label="リース会社"
        required
        options={leasingCompanies?.map((l) => ({ key: l.id, value: l.name })) || []}
        {...register("leasingName", { required: "リース会社を選択してください。" })}
      />
      <Input
        label="初度登録"
        required
        {...register("first_registration_date", { required: "初度登録を入力してください。" })}
        type="date"
      />
    </div>
    <div className="grid grid-cols-2 gap-x-2">
      <Input
        label="リース開始日"
        required
        {...register("leasing_start_date", { required: "リース開始日を入力してください。" })}
        type="date"
      />
      <Input
        label="リース終了日"
        required
        {...register("leasing_finish_date", { required: "リース終了日を入力してください。" })}
        type="date"
      />
    </div>
  </Box>
);

export default LeaseInfoSection;
