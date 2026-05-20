import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { CarForm } from "@/types/CarForm";
import { CarType, Place } from "@/types/Car";
import { Box } from "@/components/ui/Box";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { FaCarSide } from "react-icons/fa";

type Props = {
  register: UseFormRegister<CarForm>;
  watch: UseFormWatch<CarForm>;
  carTypes: CarType[];
  places: Place[];
};

const CarInfoSection = ({ register, watch, carTypes, places }: Props) => (
  <Box title="車両情報" icon={<FaCarSide size={20} className="text-primary-700 mr-2" />}>
    <div className="grid grid-cols-2 gap-x-2">
      <Input
        label="車両番号"
        required
        {...register("label", { required: "車両番号を入力してください。" })}
        type="text"
      />
      <Select
        label="車種"
        required
        options={carTypes?.map((c) => ({ key: c.id, value: c.name })) || []}
        {...register("carTypeName", { required: "車種を選択してください。" })}
        value={watch("carTypeName")}
      />
    </div>
    <Select
      label="使用場所"
      required
      options={places?.map((p) => ({ key: p.id, value: p.name })) || []}
      {...register("placeName", { required: "使用場所を選択してください。" })}
      value={watch("placeName")}
    />
  </Box>
);

export default CarInfoSection;
