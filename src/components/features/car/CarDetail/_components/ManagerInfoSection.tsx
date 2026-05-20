import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { CarForm } from "@/types/CarForm";
import { Employee } from "@/types/Car";
import { Box } from "@/components/ui/Box";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { FaUser } from "react-icons/fa";

type Props = {
  register: UseFormRegister<CarForm>;
  watch: UseFormWatch<CarForm>;
  employees: Employee[];
};

const ManagerInfoSection = ({ register, watch, employees }: Props) => (
  <Box title="管理者情報" icon={<FaUser size={20} className="text-primary-700 mr-2" />}>
    <Select
      required
      label="管理者"
      options={employees?.map((e) => ({ key: e.id, value: e.name })) || []}
      {...register("employeeName", { required: "管理者を選択してください。" })}
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
);

export default ManagerInfoSection;
