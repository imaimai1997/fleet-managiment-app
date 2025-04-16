import { prisma, prismaExecute } from "@/utils/prisma/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const currentDate = new Date();
  const oneMonthLater = new Date(currentDate);

  oneMonthLater.setMonth(currentDate.getMonth() + 1);
  oneMonthLater.setUTCHours(0, 0, 0, 0);
  try {
    return await prismaExecute(async () => {
      const car = await prisma.car.findMany({
        where: { inspection_expires_date: oneMonthLater },
        include: {
          employee: true,
        },
      });
      return NextResponse.json({ message: "Success", car }, { status: 200 });
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
