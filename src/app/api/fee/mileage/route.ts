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

type CsvRow = {
  usageDate: string;
  carNumber: string;
  mileage: number;
};

export const GET = async () => {
  try {
    await main();
    const cars = await prisma.car.findMany({
      select: {
        label: true,
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

export const POST = async (req: Request) => {
  const body = await req.json();

  try {
    await main();
    const mileages = await prisma.mileage.createMany({
      data: body.map((item: CsvRow) => ({
        car_label: item.carNumber,
        mileage_date: new Date(`${item.usageDate}-01`),
        mileage: item.mileage,
      })),
    });
    return NextResponse.json({ message: "Success", mileages }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
