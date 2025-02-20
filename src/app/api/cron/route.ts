import { init, send } from "@emailjs/browser";
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

const sendEmail = async (name: string, email: string, carlabel: string) => {
  const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

  if (userId && serviceId && templateId) {
    //emailjsを初期化する
    init(userId);

    const params = {
      name: name,
      email: email,
      content: carlabel,
    };

    await send(serviceId, templateId, params);
  }
};

export const GET = async () => {
  try {
    const mailData = await fetchUserByInspection();
    for (const data of mailData) {
      const name = data.employee.name;
      const email = data.employee.email;
      const carlabel = data.label;

      // メール送信処理
      await sendEmail(name, email, carlabel);
    }
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
