import { prisma, prismaExecute } from "@/utils/prisma/prisma";
import { NextResponse } from "next/server";

type CsvRow = {
  usageDate: string;
  carNumber: string;
  mileage: number;
};

export const GET = async () => {
  try {
    return await prismaExecute(async () => {
      const cars = await prisma.car.findMany({
        select: {
          label: true,
        },
      });
      return NextResponse.json({ message: "Success", cars }, { status: 200 });
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  const body = await req.json();
  try {
    return await prismaExecute(async () => {
      const mileages = await prisma.mileage.createMany({
        data: body.map((item: CsvRow) => ({
          car_label: item.carNumber,
          mileage_date: new Date(`${item.usageDate}-01`),
          mileage: item.mileage,
        })),
      });
      return NextResponse.json(
        { message: "Success", mileages },
        { status: 201 },
      );
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
