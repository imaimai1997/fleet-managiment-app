import { prisma, prismaExecute } from "@/utils/prisma/prisma";
import { NextResponse } from "next/server";

//給油カード取得
export const GET = async () => {
  try {
    return await prismaExecute(async () => {
      const refuelingCards = await prisma.refueling_card.findMany({});
      return NextResponse.json(
        { message: "Success", refuelingCards },
        { status: 200 },
      );
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
export const POST = async (req: Request) => {
  const { number, period } = await req.json();

  try {
    return await prismaExecute(async () => {
      const refuelingCard = await prisma.refueling_card.create({
        data: {
          number,
          period,
        },
      });
      return NextResponse.json(
        { message: "Success", refuelingCard },
        { status: 201 },
      );
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
