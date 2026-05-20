import { UseFormRegister } from "react-hook-form";
import { CarForm } from "@/types/CarForm";
import { Box } from "@/components/ui/Box";
import { MdOutlineStickyNote2 } from "react-icons/md";

type Props = {
  register: UseFormRegister<CarForm>;
};

const NotesSection = ({ register }: Props) => (
  <Box
    title="備考欄"
    icon={<MdOutlineStickyNote2 size={20} className="text-primary-700 mr-2" />}
    className="mx-4 mt-4 mb-16"
  >
    <textarea
      {...register("notes")}
      className="h-24 w-full border-2 border-gray-200 p-2"
    />
  </Box>
);

export default NotesSection;
