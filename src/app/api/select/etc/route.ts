import { PrismaClient } from "@prisma/client";
import { main } from "@/utils/prisma/prismaMain";
import { NextResponse } from "next/server";


const prisma = new PrismaClient();
//ETCカード取得
export const GET = async () => {
  try {
    await main();
    const etc_cards = await prisma.etc_card.findMany({});
    return NextResponse.json({ message: "Success", etc_cards }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
