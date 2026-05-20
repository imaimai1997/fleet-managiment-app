import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { CarForm } from "@/types/CarForm";
import { RefuelingCard, EtcCard } from "@/types/Car";
import { Box } from "@/components/ui/Box";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { RiGasStationLine } from "react-icons/ri";
import { CiCreditCard1 } from "react-icons/ci";

type Props = {
  register: UseFormRegister<CarForm>;
  watch: UseFormWatch<CarForm>;
  refuelingCards: RefuelingCard[];
  etcCards: EtcCard[];
};

const CardInfoSection = ({ register, watch, refuelingCards, etcCards }: Props) => (
  <>
    <Box title="給油カード情報" icon={<RiGasStationLine size={20} className="text-primary-700 mr-2" />}>
      <Select
        label="給油カード番号"
        options={refuelingCards?.map((r) => ({ key: r.id, value: r.number })) || []}
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
    <Box title="ETCカード情報" icon={<CiCreditCard1 size={20} className="text-primary-700 mr-2" />}>
      <Select
        label="ETCカード名"
        options={etcCards?.map((e) => ({ key: e.id, value: e.name })) || []}
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
  </>
);

export default CardInfoSection;
