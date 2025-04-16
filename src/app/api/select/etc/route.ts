import { prisma, prismaExecute } from "@/utils/prisma/prisma";
import { NextResponse } from "next/server";

//ETCカード取得
export const GET = async () => {
  try {
    return await prismaExecute(async () => {
      const etc_cards = await prisma.etc_card.findMany({});
      return NextResponse.json(
        { message: "Success", etc_cards },
        { status: 200 },
      );
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  const { name, number, period } = await req.json();

  try {
    return await prismaExecute(async () => {
      const etcCard = await prisma.etc_card.create({
        data: {
          name,
          number,
          period,
        },
      });
      return NextResponse.json(
        { message: "Success", etcCard },
        { status: 201 },
      );
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
