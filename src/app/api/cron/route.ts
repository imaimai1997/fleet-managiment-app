import { sendInspectionMail } from "@/utils/sendmail/sendInspectionMail";
import { sendInsuaranceMail } from "@/utils/sendmail/sendInsuaranceMail";
import { NextResponse } from "next/server";

const fetchUserByInspection = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/cron/getInspectionUser`,
    {
      cache: "no-store",
    },
  );

  const data = await res.json();
  if (!data.car || data.car.length === 0) {
    throw new Error("No data found");
  }
  return data.car;
};

const fetchUserByInsuarance = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/cron/getInsuaranceUser`,
    {
      cache: "no-store",
    },
  );

  const data = await res.json();
  if (!data.car || data.car.length === 0) {
    throw new Error("No data found");
  }
  return data.car;
};

export const GET = async () => {
  try {
    //車検期限1カ月前の車両管理者にメール送信
    const inspectionMailData = await fetchUserByInspection();
    for (const data of inspectionMailData) {
      const inspectionEmail = data.employee.email;
      const inspectionCarlabel = data.label;

      await sendInspectionMail(inspectionEmail, inspectionCarlabel);
    }
    //保険期限1カ月前の車両管理者にメール送信
    const insuaranceMailData = await fetchUserByInsuarance();
    for (const data of insuaranceMailData) {
      const insuaranceEmail = data.employee.email;
      const insuaranceCarlabel = data.label;

      await sendInsuaranceMail(insuaranceEmail, insuaranceCarlabel);
    }

    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
