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

//給油カード取得
export const GET = async () => {
  try {
    await main();
    const refueling_cards = await prisma.refueling_card.findMany({});
    return NextResponse.json(
      { message: "Success", refueling_cards },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
