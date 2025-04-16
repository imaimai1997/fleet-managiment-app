import { prisma, prismaExecute } from "@/utils/prisma/prisma";
import { NextResponse } from "next/server";

//車両リスト取得
export const GET = async () => {
  try {
    return await prismaExecute(async () => {
      const cars = await prisma.car.findMany({
        select: {
          id: true,
          label: true,
          employeeName: true,
          leasingName: true,
          leasing_finish_date: true,
          harf_year_inspection: true,
          inspection_expires_date: true,
          insuarance_expires_date: true,
        },
      });
      return NextResponse.json({ message: "Success", cars }, { status: 200 });
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
