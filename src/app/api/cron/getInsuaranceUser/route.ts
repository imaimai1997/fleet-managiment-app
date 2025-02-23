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

export const GET = async () => {
  const currentDate = new Date();
  const oneMonthLater = new Date(currentDate);

  oneMonthLater.setMonth(currentDate.getMonth() + 1);
  oneMonthLater.setUTCHours(0, 0, 0, 0);
  try {
    await main();
    const car = await prisma.car.findMany({
      where: { insuarance_expires_date: oneMonthLater },
      include: {
        employee: true,
      },
    });
    return NextResponse.json({ message: "Success", car }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
