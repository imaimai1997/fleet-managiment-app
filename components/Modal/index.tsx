import React, { ReactNode } from "react";
import { RxCross2 } from "react-icons/rx";

type Props = {
  open: boolean;
  onCancel: () => void;
  name: string;
  children: ReactNode;
};

const Modal = (props: Props) => {
  return props.open ? (
    <>
      <div
        className="bg-black bg-opacity-70 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-10  "
        onClick={() => props.onCancel()}
      >
        <div className="relative w-screen h-screen">
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 bg-white border-2 rounded-lg shadow-xs  z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mx-auto text-gray-800 font-semibold ">
              {props.name}
              <RxCross2 size={36} onClick={() => props.onCancel()} />
            </div>
            {props.children}
          </div>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};

export default Modal;
