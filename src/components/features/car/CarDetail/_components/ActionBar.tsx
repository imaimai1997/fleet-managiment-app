import { Button } from "@/components/ui/Button";
import { FaRegTrashAlt } from "react-icons/fa";

type CreateProps = {
  mode: "create";
};

type EditProps = {
  mode: "edit";
  onDelete: () => void;
  onUpdate: () => void;
};

type Props = CreateProps | EditProps;

const ActionBar = (props: Props) => (
  <div className="w-[calc(100vw-240px)] fixed bottom-0 py-2 bg-white shadow-inner">
    <div className="flex justify-end gap-4 max-w-5xl mx-auto">
      {props.mode === "create" && <Button rounded="full">追加</Button>}
      {props.mode === "edit" && (
        <>
          <Button
            onClick={props.onDelete}
            variant="secondary"
            rounded="full"
            className="flex gap-2 items-center justify-center"
          >
            削除
            <FaRegTrashAlt />
          </Button>
          <Button onClick={props.onUpdate} rounded="full">
            保存
          </Button>
        </>
      )}
    </div>
  </div>
);

export default ActionBar;
