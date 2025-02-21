import { sendMail } from "@/utils/sendmail/sendMail";
import { NextResponse } from "next/server";

const fetchUserByInspection = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/cron/getuser`,
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
    const mailData = await fetchUserByInspection();
    for (const data of mailData) {
      const email = data.employee.email;
      const carlabel = data.label;

      // メール送信処理
      await sendMail(email, carlabel);
    }
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
