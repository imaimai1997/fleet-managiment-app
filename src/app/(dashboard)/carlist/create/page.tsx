import React from "react";
import CarDetail from "../../../../../components/CarDetail";
import Link from "next/link";
import PrimaryButton from "../../../../../components/PrimaryButton";

const CreateCar = () => {
  return (
    <>
      <h2 className="m-16 text-xl">車両登録画面</h2>
      <div>
        <CarDetail />
      </div>
      <div className="w-5/6 fixed bottom-0 py-2 bg-white shadow-inner">
        <div className="flex justify-end max-w-5xl mx-auto">
          <Link href="/carlist">
            <PrimaryButton name="追加" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default CreateCar;
