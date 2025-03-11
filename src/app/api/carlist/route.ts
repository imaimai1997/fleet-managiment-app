import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    console.error("DB接続エラー:", err);
    return new Error("DB接続に失敗しました");
  }
}

//車両リスト取得
export const GET = async () => {
  try {
    await main();
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
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
