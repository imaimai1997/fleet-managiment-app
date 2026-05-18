import { sendInspectionMail } from "@/lib/sendmail/sendInspectionMail";
import { sendInsuaranceMail } from "@/lib/sendmail/sendInsuaranceMail";
import { NextResponse } from "next/server";

type noticeEmail = {
  email: string;
};

const fetchUserByInspection = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/cron/getInspectionUser`,
  );

  const data = await res.json();
  return data.car;
};

const fetchUserByInsuarance = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/cron/getInsuaranceUser`,
  );

  const data = await res.json();
  return data.car;
};
const fetchUserByNotice = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/cron/getNoticeUser`,
  );

  const data = await res.json();
  const noticeUser: noticeEmail[] = data.user;
  return noticeUser.map((item) => item.email);
};

export const GET = async () => {
  try {
    const [noticeUser, inspectionMailData, insuaranceMailData] =
      await Promise.all([
        fetchUserByNotice(),
        fetchUserByInspection(),
        fetchUserByInsuarance(),
      ]);

    await Promise.all([
      // 車検期限1カ月前の車両管理者にメール送信
      Promise.all(
        inspectionMailData.map(
          (data: { employee: { email: string }; label: string }) =>
            sendInspectionMail(data.employee.email, noticeUser, data.label),
        ),
      ),
      // 保険期限1カ月前の車両管理者にメール送信
      Promise.all(
        insuaranceMailData.map(
          (data: { employee: { email: string }; label: string }) =>
            sendInsuaranceMail(data.employee.email, noticeUser, data.label),
        ),
      ),
    ]);

    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "エラーが発生しました" },
      { status: 500 },
    );
  }
};
