import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { CarForm } from "@/types/CarForm";
import { Box } from "@/components/ui/Box";
import { Select } from "@/components/ui/Select";
import { MdHomeRepairService } from "react-icons/md";

type Props = {
  register: UseFormRegister<CarForm>;
  watch: UseFormWatch<CarForm>;
};

const HALF_YEAR_OPTIONS = [
  "1月・7月", "2月・8月", "3月・9月",
  "4月・10月", "5月・11月", "6月・12月",
].map((v) => ({ key: v, value: v }));

const MaintenanceSection = ({ register, watch }: Props) => (
  <Box title="点検情報" icon={<MdHomeRepairService size={20} className="text-primary-700 mr-2" />}>
    <Select
      label="6カ月点検日"
      required
      options={HALF_YEAR_OPTIONS}
      {...register("harf_year_inspection", { required: "6カ月点検日を選択してください。" })}
      value={watch("harf_year_inspection")}
    />
    <Select
      label="タイヤ交換有無"
      options={[
        { key: 0, value: "有り" },
        { key: 1, value: "無し" },
      ]}
      {...register("tire_change")}
      value={watch("tire_change") ?? ""}
    />
  </Box>
);

export default MaintenanceSection;
